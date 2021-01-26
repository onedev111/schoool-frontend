import dayjs from 'dayjs'

export const formatTime = (seconds: number) => {
  const time = dayjs(0).utc().second(seconds)
  if (time.hour() > 0) return time.format('hh:mm:ss')
  else return time.format('mm:ss')
}
