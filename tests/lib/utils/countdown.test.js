import countdown from '../../../lib/utils/countdown'

describe('countdown test', () => {
  const d2 = new Date(2020, 1, 1, 0, 0, 0)
  it('should count down seconds', () => {
    const d1 = new Date(2020, 1, 1, 0, 0, 1)
    expect(countdown(d1, d2)).toEqual('0d 0h 0m 1s')
  })

  it('should count down minutes', () => {
    const d1 = new Date(2020, 1, 1, 0, 1, 1)
    expect(countdown(d1, d2)).toEqual('0d 0h 1m 1s')
  })

  it('should count down hours', () => {
    const d1 = new Date(2020, 1, 1, 1, 2, 3)
    expect(countdown(d1, d2)).toEqual('0d 1h 2m 3s')
  })

  it('should count down days', () => {
    const d1 = new Date(2020, 1, 2, 1, 2, 3)
    const d2 = new Date(2020, 1, 1, 0, 0, 0)
    expect(countdown(d1, d2)).toEqual('1d 1h 2m 3s')
  })

  it('should return null if time is up', () => {
    const d1 = new Date(2020, 1, 1, 0, 0, 0)
    const d2 = new Date(2020, 1, 1, 0, 0, 1)
    expect(countdown(d1, d2)).toEqual(null)
  })
})
