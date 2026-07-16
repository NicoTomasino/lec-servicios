import { createClient } from '@supabase/supabase-js'
import { readdir, readFile } from 'fs/promises'
import { join, extname, basename } from 'path'

const URL = process.env.SUPABASE_URL
const SERVICE_KEY = process.env.SERVICE_KEY
const CARPETA = 'src/assets/galeria'
const BUCKET = 'galeria'

if (!URL || !SERVICE_KEY) {
  console.error('Faltan SUPABASE_URL o SERVICE_KEY')
  process.exit(1)
}

const supabase = createClient(URL, SERVICE_KEY)

const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' }

function categoria(nombre) {
  if (nombre.startsWith('elec')) return 'electricidad'
  if (nombre.startsWith('ac-')) return 'ac'
  if (nombre.startsWith('pin')) return 'pintura'
  return 'otros'
}

function titulo(nombre) {
  return basename(nombre, extname(nombre))
    .replace(/^(elec|ac|pin|otros)-/, '')
    .replace(/\d+$/, '')
    .replace(/-/g, ' ')
    .trim()
}

// Saca acentos y caracteres raros del nombre del archivo en Storage
function limpiar(nombre) {
  return nombre
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-')
}

const archivos = (await readdir(CARPETA))
  .filter(f => MIME[extname(f).toLowerCase()])
  .sort()

console.log(`Encontrados ${archivos.length} archivos\n`)

let orden = 0
for (const archivo of archivos) {
  const buffer = await readFile(join(CARPETA, archivo))
  const path = `${Date.now()}-${limpiar(archivo)}`

  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType: MIME[extname(archivo).toLowerCase()] })

  if (upErr) {
    console.error(`✗ ${archivo}: ${upErr.message}`)
    continue
  }

  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(path)

  const { error: dbErr } = await supabase.from('fotos').insert({
    url: publicUrl,
    storage_path: path,
    titulo: titulo(archivo),
    categoria: categoria(archivo),
    orden: orden++,
  })

  if (dbErr) console.error(`✗ ${archivo} (db): ${dbErr.message}`)
  else console.log(`✓ ${archivo} → ${categoria(archivo)}`)
}

console.log('\nListo.')
