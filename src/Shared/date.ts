import dayjs, { Dayjs } from 'dayjs'

export const formatDate = (date: Dayjs) => {
  const now = dayjs()
  const days = now.diff(date, 'day')
  if (days === 0) return `Today, ${date.format('hh:mm A')}`
  else if (days === 1) return `Yesterday, ${date.format('hh:mm A')}`
  else return date.format('MMM DD, hh:mm A')
}
