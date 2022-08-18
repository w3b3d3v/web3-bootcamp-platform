import * as yup from 'yup'

export const profileSchema = yup
  .object({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    twitter: yup
      .string()
      .url('URL inválida')
      .matches(/twitter.com\/.*$/, 'Twitter inválido'),
    linkedin: yup
      .string()
      .url('URL inválida')
      .matches(/linkedin.com\/.*$/, 'Linkedin inválido'),
    github: yup
      .string()
      .url('URL inválida')
      .matches(/github.com\/.*$/, 'Github inválido'),
    personalWebsite: yup.string().url('URL inválida'),
    biography: yup.string(),
    devExp: yup
      .number()
      .nullable(true)
      .typeError('Insira o ano que você começou')
      .integer('Somente números inteiros')
      .positive()
      .min(1982, 'Programava em cartão? O mínimo é 1982 :)')
      .max(new Date().getFullYear(), 'Ainda não inventamos a máquina do tempo, haha'),
    blockchainExp: yup
      .number()
      .nullable(true)
      .typeError('Insira o ano que você começou')
      .integer('Somente números inteiros')
      .positive()
      .min(2008, 'Satoshi, é você? O mínimo é 2008 :)')
      .max(new Date().getFullYear(), 'Ainda não inventamos a máquina do tempo, haha'),
  })
  .required()
