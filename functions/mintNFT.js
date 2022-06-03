const { ethers } = require("ethers")

export async function mint(createdLesson, course, user) {
  const contractABI = require('../nfts/artifacts/contracts/BootcampNFTContract.sol/W3DBootcamp.json')
  const contractAddress = '0xeA4aDb7A75a2452585204E8B411c64C2f3693845'
  const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY)
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  const nftContract = new ethers.Contract(contractAddress, contractABI.abi, signer)
  await nftContract.mintCertificate(createdLesson.cohort_id, course.nft_title, user.wallet)
  nftContract.once('Transfer', async (a, b, id) => {
    console.log('new id ' + id + ' for ' + b)
    const params = {
      cohort,
      course_title: course.nft_title,
      wallet_address: user.data().wallet,
      nft_contract: contractAddress,
      nft_id: id,
    }
    await sendEmail('nft_delivery.js', '👷👷‍♀️ WEB3DEV - NFT Recebido: Smart Contract Solidity', user.data().email, params)
  })
}
