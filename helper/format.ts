export const formatDollar = (number: number): string => number.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const formatCustomDate = (date: string): string => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}
