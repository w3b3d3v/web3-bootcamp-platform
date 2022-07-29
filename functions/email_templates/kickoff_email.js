function template(params) {
  return `
<!DOCTYPE html>Fala builder!!<br>
<br>
Faltam 5 minutos ⌛ para o lançamento do bootcamp ${params.course.title}(19h horário Brasília). A transmissão será <a href="https://twitch.tv/web3dev">pelo nosso Twitch</a><br>
<br>
Ah! Não esquece de entrar no <a href="https://discord.web3dev.com.br">nosso Discord</a> A sua turma já está lá pra codar esse projeto com você. :-)<br>
<br>
danicuki`
}
module.exports = template
