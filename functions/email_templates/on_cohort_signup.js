function formatDate(date) {
  return new Date(date._seconds * 1000).toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  })
}

const fs = require('fs')
const path = require('path')

function template(params) {
  const htmlContent = fs.readFileSync(path.join(__dirname, 'cohort_signup.html'), 'utf8')

  // Replace placeholders in the HTML content with actual values
  let formattedContent = htmlContent
    .replace(/{{course_title}}/g, params.course.title)
    .replace(/{{kickoff_start_time}}/g, formatDate(params.cohort.kickoffStartTime))
    .replace(/{{course_id}}/g, params.cohort.course_id)
    .replace(/{{end_date}}/g, formatDate(params.cohort.endDate))

  return formattedContent
}

module.exports = template
