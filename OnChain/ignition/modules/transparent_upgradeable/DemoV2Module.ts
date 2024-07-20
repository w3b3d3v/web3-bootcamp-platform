import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import UpgradeModule from "./UpgradeModule";

export default buildModule("DemoV2Module", (m) => {
    const { proxy } = m.useModule(UpgradeModule);
    const demo = m.contractAt("DemoV2", proxy);

    return { demo };
});