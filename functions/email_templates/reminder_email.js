function template(params) {
  return `
        <!DOCTYPE html>Fala builder! danicuki da web3dev aqui.<br>
        <br>
        Eu tô muito feliz que você está na turma ${params.cohort.name} do bootcamp <b>"${params.course.title}"</b>!<br>
        <br>
        Se você ainda não terminou as lições, ainda dá tempo! Eu quero te lembrar que essa oportunidade pode ser <b>única</b> e pode <b>alavancar sua carreira</b> de verdade!<br>
        <br>
        Se tiver alguma dificuldade, nosso Discord está lotado de alunos que estão tentando ajudar, então não se preocupe, você pode falar com a gente no Discord e eu ou outro mentor vamos te ajudar.<br>
        <br>
        Agora, sem mais delongas, te vejo no Discord hein! Quero acompanhar seu progresso e te dar a NFT como certificado de conclusão do bootcamp.<br>
        <br>
        danicuki
    `
}
module.exports = template
