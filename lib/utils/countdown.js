const SECONDS_IN_HOUR = 1000 * 60 * 60
const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24
export default function countdown(date, currentDate) {
  const parsedDate = new Date(currentDate)
  const now = parsedDate.getTime()
  const distance = date - now
  if (distance <= 1) return null
  const days = Math.floor(distance / SECONDS_IN_DAY)
  if (isNaN(days)) return null
  const hours = Math.floor((distance % SECONDS_IN_DAY) / SECONDS_IN_HOUR)
  const minutes = Math.floor((distance % SECONDS_IN_HOUR) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)
  return `${days}d ${hours}h ${minutes}m ${seconds}s`
}
