import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("ProxyModule", (m) => {
  const proxyAdminOwner = m.getAccount(0);

  const demo = m.contract("Demo");

  const proxy = m.contract("TransparentUpgradeableProxy", [
    demo,
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