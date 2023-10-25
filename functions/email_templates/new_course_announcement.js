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
Estamos lançando mais um build incrível na WEB3DEV!<br>
<br>
<b><a href="https://build.w3d.community/?utm_medium=email&utm_source=non-subscribed">Construa sua própria DAO apenas com JavaScript em uma semana</a></b><br>
<br>
O bootcamp começa dia ${d(
    params.cohort.startDate
  )} e as inscrições já estão abertas! Só clicar no link acima! <br>
<br>
DAOs estão dominando o mundo! Construa uma você mesmo para se divertir. Talvez seja uma DAO meme, para você e seus amigos. Talvez seja um DAO que visa corrigir a mudança climática. Você decide. Analisaremos coisas como cunhar uma NFT de associação, criar/lançar um token, tesouros públicos e governança usando um token!
<br>
<br>
danicuki
`
}
module.exports = template
