export const formatDate = (date: Date | undefined) => {
  if (!date) return
  return new Date(date).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  // Format: Jul 2, 2023
}
