import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import ProxyModule from "./ProxyModule";

export default buildModule("Web3DevNFTModules", (m) => {
    const proxyAdminOwner = m.getAccount(0);
    const { proxy, proxyAdmin } = m.useModule(ProxyModule);
    const erc721 = m.contractAt("Web3DevNFT", proxy);

    m.call(erc721, "initialize", [proxyAdminOwner, proxyAdminOwner, proxyAdminOwner]);

    return { erc721, proxy, proxyAdmin };
});