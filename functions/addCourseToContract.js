const { ethers } = require('ethers')
const contractABI = require('./W3DBootcampContract.json')
const contractAddress = process.env.NFT_CONTRACT_ADDRESS

async function addCourseToContract(course_name, description) {
  const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY)
  const signer = new ethers.Wallet(process.env.CONTRACT_PRIVATE_KEY, provider)
  const nftContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

  console.log(`Adding course ${course_name}, description: ${description} to the smart contract`)
  await nftContract.addCourse(course_name, description)
}

module.exports = { addCourseToContract }
