const hre = require("hardhat");

async function deployNFTContract() {
  const [signer]= await ethers.getSigners();
  const BootcampNFTContract = await hre.ethers.getContractFactory("W3DBootcamp");
  const nft_Contract = await BootcampNFTContract.deploy();

  await nft_Contract.deployed();

  console.log("BootcampNFTContract deployed to:", nft_Contract.address);
  return nft_Contract;
}

async function generateNFT(BTADDRESS, course_name){
  const [signer]= await ethers.getSigners();
  console.log("signer: %s", signer.address)
  const BTCAMPNFTABI = (await ethers.getContractFactory("W3DBootcamp")).interface
  const BTCAMPNFTContract = await new ethers.Contract(BTADDRESS, BTCAMPNFTABI, signer);

  const tx = await BTCAMPNFTContract.mintCertificate("PIONEIROS", course_name, "Certification for completing the Solidity Smart Contract bootcamp - (Pioneiros cohort)", "001", signer.address);
  // const tx = await BTCAMPNFTContract.makeAnEpicNFT();
  return tx.wait().then((receipt) => {
    console.log("NFT Gerada: %s", tx.hash);
    return true;
  }, (error) => {
      // This is entered if the status of the receipt is failure
      console.log("Error", error);
      return false;
  });
}

async function getSupply(BTADDRESS){
  const [signer]= await ethers.getSigner();
  const BTCAMPNFTABI = (await ethers.getContractFactory("BootcampNFTContract")).interface
  const BTCAMPNFTContract = await new ethers.Contract(BTADDRESS, BTCAMPNFTABI, signer);

  const tx0 = await BTCAMPNFTContract.totalSupply();
  console.log("TotalSupply: %s", tx0);
}

async function runTest(){
  try {
    nft_Contract = await deployNFTContract();  
    await generateNFT(nft_Contract.address, "Smart Contract Solidity");
    await generateNFT(nft_Contract.address, "Smart Contract Solidity2222");
    // await getSupply(nft_Contract.address);

  } catch (error) {
    console.error(error);
    process.exit(1);
  } 
}

runTest()