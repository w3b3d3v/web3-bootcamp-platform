const hre = require("hardhat");

async function deployNFTContract() {
  const [signer]= await ethers.getSigners();
  const BootcampNFTContract = await hre.ethers.getContractFactory("W3DBootcamp");
  const nft_Contract = await BootcampNFTContract.deploy();

  await nft_Contract.deployed();

  console.log("BootcampNFTContract deployed to:", nft_Contract.address);
  return nft_Contract;
}

async function generateNFT(BTADDRESS, course_name, student, cohort){
  const [signer]= await ethers.getSigners();
  // console.log("signer: %s", signer.address)
  const BTCAMPNFTABI = (await ethers.getContractFactory("W3DBootcamp")).interface
  const BTCAMPNFTContract = await new ethers.Contract(BTADDRESS, BTCAMPNFTABI, signer);

  const tx = await BTCAMPNFTContract.mintCertificate(cohort, course_name, student);
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

async function addCourse(bootcamp_contract_address){
  const [signer]= await ethers.getSigners();
  const bootcamp_contract_interface = (await ethers.getContractFactory("W3DBootcamp")).interface
  const bootcampContract = await new ethers.Contract(bootcamp_contract_address, bootcamp_contract_interface, signer);

  const tx = await bootcampContract.addCourse("Smart Contract Solidity", "Certification for completing the Solidity Smart Contract bootcamp - (Pioneiros cohort)");
  // const tx1 = await bootcampContract.addCourse("NFT Collection", "Certification for completing the NFT Collection bootcamp - (Pioneiros cohort)");
  console.log("Course registered at: %s", tx.hash);
  // console.log("Course registered at: %s", tx1.hash);
}

async function runTest(){
  try {
    nft_Contract = await deployNFTContract();  
    await addCourse(nft_Contract.address);

    await generateNFT(nft_Contract.address, "Smart Contract Solidity", "0x988d8063f521aa948FEc4AC1a4EDa72a5BdCBFb0", "PIONEIROS");
    // await generateNFT(nft_Contract.address, "NFT Collection", "0x988d8063f521aa948FEc4AC1a4EDa72a5BdCBFb0", "PIONEIROS");
    // await generateNFT(nft_Contract.address, "Smart Contract Solidity", "0x19E776E2ff69d8E6600c776d3f1Ef4586606805F", "ATRASADOS");

    // await generateNFT(nft_Contract.address, "Smart Solidity", "0x516E98eb5C1D826FCca399b8D8B13BD8e4E12bC8", "PIONEIROS");
    // await generateNFT(nft_Contract.address, "Smart Contract Solidity", "0x988d8063f521aa948FEc4AC1a4EDa72a5BdCBFb0", "PIONEIROS");
    // await getSupply(nft_Contract.address);

  } catch (error) {
    console.error(error);
    process.exit(1);
  } 
}

runTest()