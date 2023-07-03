export const isTimestampInADay = (ts: number, day: number) => {
  return new Date(ts).setHours(0, 0, 0, 0) == new Date(day).setHours(0, 0, 0, 0)
}