export default function countdown(date) {
  const now = new Date().getTime()
  const distance = date - now
  if (distance <= 1) return null
  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  if (isNaN(days)) return null
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)
  return `${days}d ${hours}h ${minutes}m ${seconds}s`
}
