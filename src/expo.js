export const findName = (list, num) => {
  return list.reduce((acc, v) => {
    return v.sort === num ? v.name : ''
  }, '')
}
