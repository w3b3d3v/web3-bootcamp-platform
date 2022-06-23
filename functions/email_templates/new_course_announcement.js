function d(date) {
  return new Date(date._seconds * 1000).toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  })
}

function template(params) {
  return `
<!DOCTYPE html>
Fala builder 👷👷‍♀️!<br>
<br>
Estamos lançando mais um bootcamp incrível na WEB3DEV!<br>
<br>
<b><a href="https://bootcamp.web3dev.com.br/?utm_medium=email&utm_source=non-subscribed">Aprenda a criar sua própria Coleção NFT</a></b><br>
<br>
O bootcamp começa dia ${d(
    params.cohort.startDate
  )} e as inscrições já estão abertas! Só clicar no link acima! <br>
<br>
Tem curiosidade sobre como criar um NFT? Esse bootcamp é perfeito para você! Você vai gerar programaticamente sua própria 
coleção de NFTs, aprendendo a escrever e implementar um contrato inteligente em Solidity. Além disso, vai fazer sua própria React dApp e pedir para seus amigos conectarem as carteiras e interagirem com seus NFTs!!! ⭐😎
<br>
<br>
danicuki
`
}
module.exports = template
