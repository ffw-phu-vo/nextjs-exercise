export const formatDollar = (number: number): string => number.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
})
