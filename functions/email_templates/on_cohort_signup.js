function d(date) {
  return date.toDate().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  })
}

function template(params) {
  return `
      <!DOCTYPE html>
Hello builder 👷👷‍♀️!! danicuki from WEB3DEV here.<br>
<br>
You have been enrolled in the build "${
    params.course.title
  }".  The build starts with the kickoff live session on ${d(
    params.cohort.kickoffStartTime
  )}. To join, just head over to <a href="https://www.twitch.tv/web3dev">our Twitch</a>.<br>
<br>
<b>This project is almost entirely asynchronous.</b> The only live moment will be our kickoff session. If you can't attend, don't worry. It will be recorded and made available for you to watch!<br>
<br>
<b>The build material will be officially released at 7 PM, along with the live session <a href="https://build.w3d.community/courses/${
    params.cohort.course_id
  }">here</a> <br>
<br>

<h3>Some important information</h3>
1. If you finish the project by ${d(
    params.cohort.endDate
  )}, you will be eligible to receive an <b>exclusive NFT</b>. We will grant you the #graduated role on our Discord, and you'll have access to web3 job opportunities from our partners.<br>
<br>
2. Don't forget to connect your Discord on the <a href="https://build.w3d.community/courses/${
    params.cohort.course_id
  }">builds platform</a>, as we need to add you to the secret channel "#⛺ | ${
    params.cohort.discord_channel
  }" of the build you will be part of.<br>
<br>
3. Please don't call this a "course"! It's a project, bootcamp, hackday, call it what you want. I just want you to do some cool work with a bit of guidance :-).<br>
<br>
If you have any questions, post them in the #chat-builds channel.<br>
<br>
I'm excited to see everyone's project 💜💜💜.<br>
<br>
Danicuki

------------------------
Fala builder 👷👷‍♀️!! danicuki da web3dev aqui.<br>
<br>
Sua inscrição foi feita no build "${
    params.course.title
  }".&nbsp; O build começa com a live de kickoff em ${d(
    params.cohort.kickoffStartTime
  )}. Para acompanhar é só entrar no <a href="https://www.twitch.tv/web3dev">nosso Twitch</a>.<br>
<br>
<b>Esse projeto é praticamente todo assíncrono.</b>&nbsp;O único momento ao vivo será nossa live. Se não puder participar, não se preocupe. Ela também será gravada e disponibilizada para você assistir!<br>
<br>
<b>O material do build será aberto oficialmente às 19h, junto com a live <a href="https://build.w3d.community/courses/${
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
  }">plataforma de builds</a>, pois precisamos adicionar você no canal secreto "#⛺ | ${
    params.cohort.discord_channel
  }" da turma que fará parte deste build junto com você.<br>
<br>
3. Por favor, não chama isso de "curso"! É um projeto, bootcamp, hackday, chama do que quiser. Só quero que você faça um trabalho legal com um pouco de guia :-).<br>
<br>
Se tiver perguntas, mande no canal #chat-builds.<br>
<br>
Estou animado para ver o projeto de todo mundo 💜💜💜.<br>
<br>
danicuki
  `
}
module.exports = template
