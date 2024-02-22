const fetch = require('node-fetch')

const lastCommitId = async (user, repo, branch) => {
  const result = await fetch(
    `https://${process.env.NEXT_GITHUB_USER}@api.github.com/repos/${user}/${repo}/commits/${branch}`
  )
  const data = await result.json()
  return data['sha']
  // return "aa51ee330922852322c1b69b6d59f95b7210c982"
}

const user = 'w3b3d3v';
const repo = 'buildspace-projects';

// Check if NEXT_PUBLIC_ENVIRONMENT is "dev" and NEXT_PUBLIC_CONTENT_DEV_BRANCH is not empty
const branch = process.env.NEXT_PUBLIC_ENVIRONMENT === "dev" && process.env.NEXT_PUBLIC_CONTENT_DEV_BRANCH !== "" ? process.env.NEXT_PUBLIC_CONTENT_DEV_BRANCH : "web3dev-version";

export { lastCommitId, user, repo, branch }
