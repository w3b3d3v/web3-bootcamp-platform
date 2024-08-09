const constants = {
  links: {
    twitter: 'https://twitter.com/web3dev_',
    discord: 'https://pt.discord.w3d.community',
    github: 'https://github.com/w3b3d3v',
    forum: 'https://pt.w3d.community/',
    youtube: 'https://www.youtube.com/@web3dev',
    linkedin: 'https://www.linkedin.com/company/w3d-community',
    glossary: 'https://pt.glossario.w3d.community/',
    manual: 'https://pt.docs.w3d.community/',
  },
}

export const links = constants.links
export default constants
export function camelize(text) {
  const a = text.toLowerCase().replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
  return a.substring(0, 1).toLowerCase() + a.substring(1)
}
