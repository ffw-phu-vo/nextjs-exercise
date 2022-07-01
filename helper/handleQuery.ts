export const handleQuery = (query: object, property:object): object => {
  return {...query, ...property}
}
