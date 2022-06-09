const { ethers } = require("ethers")
const contractABI = require('../nfts/artifacts/contracts/BootcampNFTContract.sol/W3DBootcamp.json')
const { sendEmail } = require('./emails')
const contractAddress = '0xeA4aDb7A75a2452585204E8B411c64C2f3693845'

async function mint(cohort, nft_title, user) {
  const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY)
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  const nftContract = new ethers.Contract(contractAddress, contractABI.abi, signer)
  await nftContract.mintCertificate(cohort.name, nft_title, user.wallet)
  
  nftContract.once("Transfer", async (a, wallet, id) => {
    if (wallet !== user.wallet) return;
    const params = {
      cohort,
      course_title: nft_title,
      wallet_address: user.wallet,
      nft_contract: contractAddress,
      nft_id: id,
    };
    console.log("new id1 " + id + " for " + b);
    await sendEmail(
      "nft_delivery.js",
      "👷👷‍♀️ WEB3DEV - NFT Recebido: " + nft_title,
      user.email,
      params
    );
  });
}

module.exports = { mint }