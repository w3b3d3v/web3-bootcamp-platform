const hre = require('hardhat')

async function deployNFTContract() {
  const BootcampNFTContract = await hre.ethers.getContractFactory('W3DBootcamp')
  const nft_Contract = await BootcampNFTContract.deploy()

  await nft_Contract.deployed()

  console.log('BootcampNFTContract deployed to:', nft_Contract.address)
  return nft_Contract
}

async function getContract(BTADDRESS) {
  const [signer] = await ethers.getSigners()
  const BTCAMPNFTABI = (await ethers.getContractFactory('W3DBootcamp')).interface
  return await new ethers.Contract(BTADDRESS, BTCAMPNFTABI, signer)
}

async function generateNFT(BTADDRESS, course_name, student, cohort) {
  const BTCAMPNFTContract = await getContract(BTADDRESS)
  const tx = await BTCAMPNFTContract.mintCertificate(
    cohort,
    course_name,
    student
    // { gasLimit: 9999999999999999999 }
  )
  return tx.wait().then(
    (receipt) => {
      console.log('NFT Gerada: %s', tx.hash)
      return receipt
    },
    (error) => {
      // This is entered if the status of the receipt is failure
      console.log('Error', error)
      return error
    }
  )
}

async function addCourse(bootcamp_contract_address) {
  const bootcampContract = await getContract(bootcamp_contract_address)

  const tx = await bootcampContract.addCourse(
    'Smart Contract Solidity',
    'Certification for completing the Solidity Smart Contract Bootcamp'
  )
  // const tx1 = await bootcampContract.addCourse("NFT Collection", "Certification for completing the NFT Collection bootcamp - (Pioneiros cohort)");
  console.log('Course registered at: %s', tx.hash)
  return tx
}

async function runTest() {
  try {
    // nft_Contract = await deployNFTContract()
    nft_Contract = { address: '0xa68580d4E41925C20aF20dBA9B4Db17A79842F19' } //polygon
    // nft_Contract = { address: '0x2ef61b0532703bf57a1735000d3ec9bc27f8f6c4' } //rinkeby
    // nft_Contract = { address: '0xb683cac9fe4a7ea60d50dfb9006099c8624275b2' } //mumbai
    // await addCourse(nft_Contract.address)

    const contract = await getContract(nft_Contract.address)

    for (let index = 1; index <= 97; index++) {
      console.log(`select ${index} number, "${await contract.ownerOf(index)}" wallet UNION ALL`)
    }
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runTest()

module.exports = { addCourse, generateNFT }
