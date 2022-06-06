const lastCommitId = async (user, repo, branch) => {
  const result = await fetch(
    `https://${process.env.NEXT_GITHUB_USER}@api.github.com/repos/${user}/${repo}/commits/${branch}`
  )
  const data = await result.json()
  return data['sha']
}

const [user, repo, branch] = [
  'w3b3d3v',
  'buildspace-projects',
  'web3dev-version',
]

export { lastCommitId, user, repo, branch }
