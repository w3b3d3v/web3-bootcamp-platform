import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import ProxyModule from "./ProxyModule";

export default buildModule("DemoModule", (m) => {
    const { proxy, proxyAdmin } = m.useModule(ProxyModule);
    const demo = m.contractAt("Demo", proxy);

    return { demo, proxy, proxyAdmin };
});