import { expect } from "chai";
import { ignition, ethers } from "hardhat";

import DemoModule from "../ignition/modules/transparent_upgradeable/DemoModule";
import DemoV2Module from "../ignition/modules/transparent_upgradeable/DemoV2Module";
import { Contract } from "ethers";

describe("Demo Proxy", function () {
  describe("Proxy interaction", async function () {
    it("Should be interactable via proxy", async function () {
      const [, otherAccount] = await ethers.getSigners();

      const { demo } = await ignition.deploy(DemoModule);

      expect(await (demo.connect(otherAccount) as Contract).version()).to.equal("1.0.0");
    });
  });

  describe("Upgrading", function () {
    it("Should have upgraded the proxy to DemoV2", async function () {
      const [, otherAccount] = await ethers.getSigners();

      const { demo } = await ignition.deploy(DemoV2Module);

      expect(await (demo.connect(otherAccount) as Contract).version()).to.equal("2.0.0");
    });

    it("Should have set the name during upgrade", async function () {
      const [, otherAccount] = await ethers.getSigners();

      const { demo } = await ignition.deploy(DemoV2Module);

      expect(await (demo.connect(otherAccount) as Contract).name()).to.equal("Example Name");
    });
  });
});