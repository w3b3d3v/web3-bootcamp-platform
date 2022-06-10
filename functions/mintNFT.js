const { ethers } = require('ethers')
const contractABI = require('./W3DBootcampContract.json')
const { sendEmail } = require('./emails')
const contractAddress = process.env.NFT_CONTRACT_ADDRESS

async function mint(cohort, nft_title, user) {
  const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY)
  const signer = new ethers.Wallet(process.env.CONTRACT_PRIVATE_KEY, provider)
  const nftContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

  console.log(
    `Minting NFT ${nft_title} cohort ${cohort.name} for user: ${user.email} wallet: ${user.wallet}`
  )

  nftContract.once('Transfer', async (a, wallet, id) => {
    if (wallet.toString() !== user.wallet) {
      console.log('Wallet is not from user')
      console.log('User wallet: ' + user.wallet)
      console.log('object wallet: ' + wallet)
      return
    }
    const params = {
      cohort,
      course_title: nft_title,
      wallet_address: user.wallet,
      nft_contract: contractAddress,
      nft_id: id,
    }
    await sendEmail(
      'nft_delivery.js',
      '👷👷‍♀️ WEB3DEV - NFT Recebido: ' + nft_title,
      user.email,
      params
    )
  })
  const tx = await nftContract.mintCertificate(cohort.name, nft_title, user.wallet, {
    gasLimit: 999999,
  })

  await tx.wait()
}

module.exports = { mint }