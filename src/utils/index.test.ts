import { formatDate } from '.'
describe('formatDate', () => {
  test('Returns undefined date for falsey date value', () => {
    expect(formatDate(undefined)).toBe(undefined)
  })
  test('Returns formatted date', () => {
    expect(formatDate(new Date('2016-11-11T12:17:27Z'))).toBe('Nov 11, 2016')
  })
})
