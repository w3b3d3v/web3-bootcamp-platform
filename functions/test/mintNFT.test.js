
const { mint } = require('../mintNFT');
const { ethers } = require('ethers');

jest.mock('ethers');
jest.mock('../W3DBootcampContract.json', () => ({
  abi: 'contract-abi',
}));

describe('mint', () => {
  it('should mint an NFT and call the callback with the expected data', async () => {
    const cohort = { name: 'cohort-name', id: 'cohort-id' };
    const nft_title = 'nft-title';
    const user = { email: 'user-email', wallet: 'user-wallet', id: 'user-id' };
    const callback = jest.fn();

    const providerMock = { getGasPrice: jest.fn().mockResolvedValue(300000000000) };
    const signerMock = { on: jest.fn() };
    const nftContractMock = {
        on: jest.fn(),
        removeAllListeners: jest.fn(),
        mintCertificate: jest.fn().mockResolvedValue({ wait: jest.fn() }),
    }

    ethers.providers.JsonRpcProvider.mockImplementation(() => providerMock);
    ethers.Wallet.mockImplementation(() => signerMock);
    ethers.Contract.mockImplementation(() => nftContractMock);

    const transferEvent = {
        args: {
            a: 'some-value',
            wallet: user.wallet.toUpperCase(),
            id: { toNumber: () => 123 },
        },
    };

    nftContractMock.on.mockImplementationOnce((eventName, callback) => {
        if (eventName === 'Transfer') {
            callback(transferEvent.args.a, transferEvent.args.wallet, transferEvent.args.id);
        }
    });

    await mint(cohort, nft_title, user, callback);

    expect(ethers.providers.JsonRpcProvider).toHaveBeenCalledWith(undefined);
    expect(ethers.Wallet).toHaveBeenCalledWith(undefined, providerMock);
    expect(ethers.Contract).toHaveBeenCalledWith(undefined, 'contract-abi', signerMock);

    expect(nftContractMock.mintCertificate).toHaveBeenCalledWith(
      cohort.name,
      nft_title,
      user.wallet,
      { gasPrice: 300000000000 }
    );

    expect(callback).toHaveBeenCalledWith({
        cohort,
        course_title: nft_title,
        wallet_address: user.wallet,
        nft_contract: undefined,
        nft_id: 123,
        user,
        user_id: user.id,
        cohort_id: cohort.id,
        cohort_name: cohort.name,
        created_at: expect.any(Date),
    });
  });
});
