function d(date) {
  return date.toDate().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  })
}

function template(params) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <body>
  <p>Fala builder 👷👷‍♀️,</p>
  
  <p>É com grande satisfação que confirmamos sua inscrição no build "${ params.course.title }" da web3dev!</p>
  
  <p>Este projeto é uma oportunidade para você expandir suas habilidades de programação de forma prática na web3. 
   <br> 
   Todo o material do build está disponível em nossa <a href="https://build.w3d.community/courses/${ params.cohort.course_id }">plataforma</a>, além disso assista a gravação da sessão de kickoff disponível em nosso <a href="https://youtube.com/playlist?list=PLVX4xVoD65UMYeDxun9ejE8huvEsAAz89&si=x0M6jTkKcIcPNm0C">canal do YouTube</a>.</p>
  
  <p>Aqui estão algumas informações importantes que você precisa saber antes de começar:</p>
  
  <ol>
  <li>Ao concluir o build, você terá direito a receber um <b>NFT exclusivo</b> como reconhecimento pelo seu trabalho árduo. Além disso, você ganhará o cargo de #graduad@ em nosso Discord, o que lhe dará acesso a oportunidades de trabalho exclusivas com nossas empresas parceiras na web3.</li>
  
  <li>Não se esqueça de <b>conectar sua conta do Discord</b> à <a href="https://build.w3d.community/courses/${ params.cohort.course_id }">plataforma do build</a>. Isso é essencial para adicioná-lo ao canal secreto "#⛺ | ${ params.cohort.discord_channel }" da turma. Lá, você poderá interagir com outras pessoas e receber suporte durante todo o processo.</li>
  
  <li>Por favor, lembre-se de que este <b>não é apenas mais um "curso"</b> - é um projeto colaborativo, um treinamento prático, um hackday. Queremos que você aproveite ao máximo essa experiência e crie algo incrível com o apoio da comunidade da WEB3DEV.</li>
  </ol>
  
  <p>Se surgirem dúvidas ou questões ao longo do caminho, não hesite em compartilhá-las no canal <b>#chat-geral</b> do Discord. Estamos aqui para ajudar e apoiá-lo durante toda a jornada.</p>
  
  <p>Estamos animados para ver os projetos incríveis que serão criados! 💜💜💜</p>
  
  <p>Atenciosamente,<br>
  [danicuki]<br>
  Equipe web3dev</p>
  
  </body>
  </html>
  `
}
module.exports = template
