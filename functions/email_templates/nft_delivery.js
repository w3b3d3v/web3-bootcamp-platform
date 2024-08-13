function template(params) {
  // course_title, wallet_address, nft_contract, nft_id) {
  return `
Hello builder 👷👷‍♀️!<br>
<br>
You have just received your NFT for completing the bootcamp <b>${params.course_title}</b>! It's already in your wallet <a href='https://polygonscan.com/address/${params.wallet_address}#tokentxnsErc721'>${params.wallet_address}</a>.<br>
<br>
You can already see your NFT on <a href='https://opensea.io/assets/matic/${params.nft_contract}/${params.nft_id}?force_update=true'>OpenSea.</a><br>
<br>
Take advantage of this moment to show the world what you've achieved!!! Go on Twitter and tag <a href='https://twitter.com/web3dev_'>@web3dev_ </a>with your NFT screenshot, I'm sure it will look great!<br>
<br>
See <a href='https://pt.w3d.community/nomadbitcoin/using-nft-certificates-on-linkedin-4hld'>how to add your certificate to linkedin.</a><br>
<br>
This helps us spread the word about our bootcamps to other people like you who want to learn more about Web3 :)<br>
<br>
I'm happy with your certification, congratulations! See you at the next bootcamp!<br>
<br>
Cheers,<br>
Yan Luiz<br>
<br>`
}

module.exports = template
