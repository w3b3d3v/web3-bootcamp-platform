function template(course_id, course_title, course_duration, discord_channel) {
    return ( `
        <!DOCTYPE html>Fala pessoal! danicuki da web3dev aqui.<div><br></div>
        <div><b>Amanhã</b> é o lançamento do bootcamp "${course_title}".&nbsp; <a href="https://bootcamp.web3dev.com.br/courses/${course_id}">Esse é o link do bootcamp</a>. 
        A live começa exatamente às 19h horário de Brasília no <a href="https://www.twitch.tv/web3dev">nosso Twitch</a>.
    <div><br></div>
    <div><b>Esse projeto é praticamente todo assíncrono.</b>&nbsp;O único momento ao vivo será nossa "live". Se não puder participar, não se preocipe. Ela também será gravada e disponibilizada para você assistir!</div>
    <div><br></div>
    <div><b>O material do bootcamp será aberto oficialmente as 19h, junto com a live <a href="https://bootcamp.web3dev.com.br/courses/${course_id}">aqui</a>&nbsp;</div>
    <div>
    <div><br></div>
    <h3>Algumas informações importantes:</h3>
    <div>1. Se você terminar o projeto em até ${course_duration}, você terá direito a receber um <b> NFT exclusivo </b>. Você também será adicionado ao cargo #formado no nosso Discord e terá acesso a vagas de trabalho web3 em nossos parceiros.</div>
    <div><br></div>
    <div>2. Esse é o único e-mail que eu vou mandar. O resto estará acontecendo no canal secreto "#⛺ | ${discord_channel}" que você terá acesso caso esteja inscrito no bootcamp. Para isso, você precisa "linkar" seu Discord na plataforma de bootcamp antes de começar o projeto!
    </div>
    <div><br></div>
    <div>3. Por favor, não chama isso de "curso"! É um projeto, bootcamp, hackday, chama do que quiser. Só quero que você faça um trabalho legal com um pouco de guia :-).</div>
    <div><br></div>
    <div>Se tiver perguntas, mande no canal #chat-geral.</div>
    <div><br></div>
    <div>Estou animado para ver o projeto de todo mundo 💜💜💜.</div>
    <div><br></div>
    <div>danicuki</div>
    </div>
    ` )
} 
module.exports = template
