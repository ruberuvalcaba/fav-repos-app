import { renderHook } from '@testing-library/react-hooks'
import useDebounce from '../useDebounce'

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial value', 500))
    expect(result.current).toEqual('initial value')
  })
})
