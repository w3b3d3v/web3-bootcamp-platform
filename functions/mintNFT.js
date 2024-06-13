const { ethers } = require('ethers')
const contractABI = require('./W3DBootcampContract.json')
const contractAddress = process.env.NFT_CONTRACT_ADDRESS

async function mint(cohort, nft_title, user, callback) {
  const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY)
  const signer = new ethers.Wallet(process.env.CONTRACT_PRIVATE_KEY, provider)
  const nftContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

  console.log(
    `Minting NFT ${nft_title} cohort ${cohort.name} for user: ${user.email} wallet: ${user.wallet}`
  )
  let sent = false

  nftContract.on('Transfer', async (a, wallet, id) => {
    if (wallet.toString().toUpperCase() !== user.wallet.toUpperCase()) {
      console.log('Wallet is not from user')
      console.log('User wallet: ' + user.wallet)
      console.log('object wallet: ' + wallet)
      return
    }
    nftContract.removeAllListeners('Transfer')
    if (sent) {
      console.log('repeated event, ignore...')
      return
    }
    sent = true
    console.log('calling callback...')
    callback({
      cohort,
      course_title: nft_title,
      wallet_address: user.wallet,
      nft_contract: contractAddress,
      nft_id: id.toNumber(),
      user,
      user_id: user.id,
      cohort_id: cohort.id,
      cohort_name: cohort.name,
      created_at: new Date(),
    })
  })

  const maxGasPrice = 500000000000
  const gasPrice = await provider.getGasPrice()
  if (gasPrice > maxGasPrice) {
    console.log(`gas price too high (${gasPrice}). did not mint`)
    // do something
  }

  const tx = await nftContract.mintCertificate(cohort.name, nft_title, user.wallet, {
    gasPrice: gasPrice,
  })

  await tx.wait()
}

module.exports = { mint }