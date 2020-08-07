export default function getSize(size) {
  let text = ''

  switch (size) {
    case 1:
      text = 'PEQUENO'
      break
    case 2:
      text = 'MÉDIO'
      break
    case 3:
      text = 'GRANDE'
      break
    default:
  }
  return text
}
