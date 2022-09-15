function d(date) {
  return new Date(date._seconds * 1000).toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  })
}

function template(params) {
  return `
        <!DOCTYPE html>Fala pessoal! danicuki da WEB3DEV aqui.<div><br></div>
        <div><b>Amanhã</b> é o lançamento do bootcamp "${
          params.course.title
        }".&nbsp; <a href="https://bootcamp.web3dev.com.br/courses/${
    params.cohort.course_id
  }">Esse é o link do bootcamp</a>. 
        A live começa exatamente às 19h horário de Brasília no <a href="https://www.twitch.tv/web3dev">nosso Twitch</a>.
    <div><br></div>
    <div><b>Esse projeto é praticamente todo assíncrono.</b>&nbsp;O único momento ao vivo será nossa "live". Se não puder participar, não se preocupe. Ela também será gravada e disponibilizada para você assistir!</div>
    <div><br></div>
    <div><b>O material do bootcamp será aberto oficialmente as 19h, junto com a live <a href="https://bootcamp.web3dev.com.br/courses/${
      params.cohort.course_id
    }">aqui</a>&nbsp;</div>
    <div>
    <div><br></div>
    <h3>Algumas informações importantes:</h3>
    <div>1. Se você terminar o projeto até ${d(
      params.cohort.endDate
    )}, você terá direito a receber um <b> NFT exclusivo </b>. Você também receberá o cargo 🎓 graduad@ no nosso Discord e terá acesso a vagas de trabalho web3 em nossos parceiros.</div>
    <div><br></div>
    <div>2. Esse é o único e-mail que eu vou mandar. O resto estará acontecendo no canal secreto "#⛺ | ${
      params.cohort.discord_channel
    }" que você terá acesso caso se esteja bootcamp. Para isso, você precisa "linkar" seu Discord na plataforma de bootcamp antes de começar o projeto!
    </div>
    <div><br></div>
    <div>3. Por favor, não chama isso de "curso"! É um projeto, bootcamp, hackday, chama do que quiser. Só quero que você faça um trabalho legal com um pouco de guia :-).</div>
    <div><br></div>
    <div>Se tiver perguntas, mande no canal #chat-geral.</div>
    <div><br></div>
    <div>Estou animado para ver seu projeto pronto 💜💜💜.</div>
    <div><br></div>
    <div>danicuki</div>
    </div>
    `
}
module.exports = template
