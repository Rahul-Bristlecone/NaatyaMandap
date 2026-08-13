export function hexToRgba(hex, alpha) {
  const raw = (hex || '').replace('#', '').trim()
  if (![3, 6].includes(raw.length)) return null

  const full = raw.length === 3
    ? raw.split('').map((c) => `${c}${c}`).join('')
    : raw

  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
