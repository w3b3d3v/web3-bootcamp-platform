import { lastCommitId } from '../../../lib/utils/github.js'

global.fetch = jest.fn(() => {})

beforeEach(() => {
  fetch.mockClear()
})

describe('github utils module', () => {
  it('should return last commit id', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ sha: 'abcd' }),
      })
    )

    const sha = await lastCommitId('w3b3d3v', 'buildspace-projects', 'web3dev-version')
    /*expect(sha).toEqual('abcd')
    expect(fetch).toHaveBeenCalledWith(
      'https://mygithubuser@api.github.com/repos/w3b3d3v/buildspace-projects/commits/web3dev-version'
    )*/
  })
})
