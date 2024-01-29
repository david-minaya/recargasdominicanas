export function getTimezone() {

  const date = new Date();
  const offset = date.getTimezoneOffset() / 60;

  return offset > 0
    ? `-${offset.toString().padStart(2, '0')}:00`
    : `+${Math.abs(offset).toString().padStart(2, '0')}:00`
}
