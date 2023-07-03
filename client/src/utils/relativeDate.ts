export const stringDateRelative = (date: Date) => {
  const formatter = new Intl.RelativeTimeFormat('fr', {
    numeric: 'auto',
  });
  let time = Math.abs(date.getTime() - Date.now());
  if (time < 60 * 1000) {
    return formatter.format(-Math.floor(time / 1000), 'second');
  }
  if (time < 60 * 60 * 1000) {
    return formatter.format(-Math.floor(time / (60 * 1000)), 'minute');
  }
  if (time < 24 * 60 * 60 * 1000) {
    return formatter.format(-Math.floor(time / (60 * 60 * 1000)), 'hour');
  }
  if (time < 30 * 24 * 60 * 60 * 1000) {
    return formatter.format(-Math.floor(time / (24 * 60 * 60 * 1000)), 'day');
  }
  if (time < 12 * 30 * 24 * 60 * 60 * 1000) {
    return formatter.format(-Math.floor(time / (30 * 24 * 60 * 60 * 1000)), 'month');
  }
  return formatter.format(-Math.floor(time / (12 * 30 * 24 * 60 * 60 * 1000)), 'year');
};