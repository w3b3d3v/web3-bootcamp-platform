import * as yup from 'yup'

export const profileSchema = yup
  .object({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    twitter: yup.string().nullable(true).url('URL inválida'),
    linkedin: yup.string().nullable(true).url('URL inválida'),
    github: yup.string().nullable(true).url('URL inválida'),
    personalWebsite: yup.string().nullable(true).url('URL inválida'),
    biography: yup.string().nullable(true),
    devExp: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable(true)
      .integer('Somente números inteiros')
      .positive()
      .min(1982, 'Programava em cartão? O mínimo é 1982 :)')
      .max(new Date().getFullYear(), 'Ainda não inventamos a máquina do tempo, haha'),
    blockchainExp: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable(true)
      .integer('Somente números inteiros')
      .positive()
      .min(2008, 'Satoshi, é você? O mínimo é 2008 :)')
      .max(new Date().getFullYear(), 'Ainda não inventamos a máquina do tempo, haha'),
  })
  .required()
