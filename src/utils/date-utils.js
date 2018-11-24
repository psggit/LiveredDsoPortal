export function getTodayAndTomorrow() {
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  const tomorrow = new Date(today.getTime())
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setUTCHours(0, 0, 0, 0)

  return { today, tomorrow }
}

export function format(date) {
  let dd = date.getDate()
  let mm = date.getMonth() + 1
  const yyyy = date.getFullYear()

  if (dd < 10) dd = `0${dd}`
  if (mm < 10) mm = `0${mm}`

  return `${dd}/${mm}/${yyyy}`
}
