export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  // Format: Jul 2, 2023
}
