require('dotenv').config({ path: '../.env' })
const { ethers } = require('hardhat')

async function main() {
  // Load environment variables
  const contractAddress = process.env.NFT_BOOTCAMP_CONTRACT_ADDRESS

  if (!contractAddress) {
    console.error(
      'Please set the NFT_BOOTCAMP_CONTRACT_ADDRESS environment variable in the .env file'
    )
    process.exit(1)
  }

  // Get the first signer from Hardhat's configured signers
  const [signer] = await ethers.getSigners()
  console.log('Signer address:', signer.address)

  // Connect to the contract
  const contract = await ethers.getContractAt('W3DBootcamp', contractAddress, signer)

  // Define function parameters
  const newCourse = 'Rust State Machine'
  const description = `Certification for completing the ${newCourse} Bootcamp`

  // Call the addCourse function
  const tx = await contract.addCourse(newCourse, description)

  // Wait for the transaction confirmation
  await tx.wait()
  console.log('Course registered at:', tx.hash)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
