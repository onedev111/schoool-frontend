export default function pluralize(text: string, number: number, suffix = 's') {
  return number === 1 ? text : text + suffix
}
