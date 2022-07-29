function template(params) {
  return `
        <!DOCTYPE html>Fala builder! danicuki da web3dev aqui.<br>
        <br>
        Eu tô muito feliz que você está na turma ${params.course.title} do bootcamp de ${params.cohort.course_id.split('_').join(' ')}!
        Mas eu percebi que você ainda não enviou nenhuma lição e isso deixou a mim e ao Yan bem tristes pra te falar a verdade.<br>
        <br>
        Eu quero te lembrar que essa oportunidade pode ser <b>única</b> e pode <b>alavancar sua carreira</b> de verdade!<br>
        <br>
        Se tiver alguma dificuldade, nosso discord está lotado de alunos que estão tentando ajudar, então não se preocupe, você pode falar comigo no discord e eu ou outro mentor vai te ajudar.<br>
        <br>
        Agora, sem mais delongas, te vejo no discord hein! Quero acompanhar seu progresso e te dar a NFT como certificado de conclusão do bootcamp.<br>
        <br>
        danicuki
    `
}
module.exports = template
