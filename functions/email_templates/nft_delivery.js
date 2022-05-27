function template(params) {
  // course_title, wallet_address, nft_contract, nft_id) {
  return `
Fala builder 👷👷‍♀️!<br>
<br>
Você acaba de receber seu NFT por completar o bootcamp "<b>${params.course_title}</b>"! Já está na sua carteira <a href='https://polygonscan.com/address/${params.wallet_address}#tokentxnsErc721'>${params.wallet_address}</a>.<br>
<br>
Você já pode ver seu NFT no <a href='https://opensea.io/assets/matic/${params.nft_contract}/${params.nft_id}?force_update=true'>OpenSea.</a><br>
<br>
Vai no Twitter e mostra pro mundo sua conquista!!! Não esquece de marcar a @web3dev_ ! Isso ajuda demais a divulgar nossos bootcamps para outras pessoas :).<br>
<br>
Se você twitar um print do seu NFT, vai ficar mais lindo ainda.<br>
<br>
Nos vemos no próximo bootcamp!<br>
<br>
danicuki`
}

module.exports = template
