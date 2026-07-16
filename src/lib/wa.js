// Si el tío escribe mal el teléfono, usamos este como red de seguridad
const FALLBACK = '5492364694855'

export function waLink(telefono, mensaje = 'Hola! Quiero hacer una consulta.') {
  const digits = (telefono || '').replace(/\D/g, '')
  const numero = digits.length >= 11 ? digits : FALLBACK
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
}