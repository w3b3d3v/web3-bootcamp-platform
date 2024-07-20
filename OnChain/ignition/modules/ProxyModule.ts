import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("ProxyModule", (m) => {
  const proxyAdminOwner = m.getAccount(0);

  const erc721 = m.contract("Web3DevNFT");

  const proxy = m.contract("TransparentUpgradeableProxy", [
    erc721,
    proxyAdminOwner,
    "0x",
  ]);
  
  const proxyAdminAddress = m.readEventArgument(
    proxy,
    "AdminChanged",
    "newAdmin"
  );

  const proxyAdmin = m.contractAt("ProxyAdmin", proxyAdminAddress);

  return { proxyAdmin, proxy };
});