const constants = {
  links: {
    twitter: 'https://twitter.com/web3dev_',
    discord: 'https://discord.web3dev.com.br',
    github: 'https://github.com/w3b3d3v',
    forum: 'https://www.web3dev.com.br',
    youtube: 'https://www.youtube.com/@web3dev',
    linkedin: 'https://www.linkedin.com/company/web3dev',
    glossario: 'https://glossario.web3dev.com.br/',
    manual: 'https://docs.web3dev.com.br/',
  },
  referral_link: 'https://bootcamp.web3dev.com.br/?referral_id=',
}

export const links = constants.links
export default constants
export function camelize(text) {
  const a = text.toLowerCase().replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
  return a.substring(0, 1).toLowerCase() + a.substring(1)
}
