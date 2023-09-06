function d(date) {
  return date.toDate().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  })
}

function template(params) {
  return `
      <!DOCTYPE html>Fala builder 👷👷‍♀️!! danicuki da web3dev aqui.<br>
      <br>
      Sua inscrição foi feita no bootcamp "${
        params.course.title
      }".&nbsp; O bootcamp começa com a live de kickoff em ${d(
    params.cohort.kickoffStartTime
  )}. Para acompanhar é só entrar no <a href="https://www.twitch.tv/web3dev">nosso Twitch</a>.<br>
      <br>
      <b>Esse projeto é praticamente todo assíncrono.</b>&nbsp;O único momento ao vivo será nossa live. Se não puder participar, não se preocupe. Ela também será gravada e disponibilizada para você assistir!<br>
      <br>
      <b>O material do bootcamp será aberto oficialmente às 19h, junto com a live <a href="https://build.w3d.community/courses/${
        params.cohort.course_id
      }">aqui</a>&nbsp;<br>
      <br>
      <h3>Algumas informações importantes</h3>
      1. Se você terminar o projeto até ${d(
        params.cohort.endDate
      )}, você terá direito a receber um <b>NFT exclusivo</b>. Vamos dar para você o cargo de #graduad@ no nosso Discord e terá acesso a vagas de trabalho web3 em nossos parceiros.<br>
      <br>
      2. Não se esqueça de conectar seu Discord na <a href="https://build.w3d.community/courses/${
        params.cohort.course_id
      }">plataforma de bootcamps</a>, pois precisamos adicionar você no canal secreto "#⛺ | ${
    params.cohort.discord_channel
  }" da turma que fará parte deste bootcamp junto com você.<br>
      <br>
      3. Por favor, não chama isso de "curso"! É um projeto, bootcamp, hackday, chama do que quiser. Só quero que você faça um trabalho legal com um pouco de guia :-).<br>
      <br>
      Se tiver perguntas, mande no canal #chat-geral.<br>
      <br>
      Estou animado para ver o projeto de todo mundo 💜💜💜.<br>
      <br>
      danicuki
  `
}
module.exports = template
