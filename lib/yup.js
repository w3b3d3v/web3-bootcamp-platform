import * as yup from 'yup'
import i18n from '../i18n'

export const t = (key) => i18n.t(key)

export const profileSchema = yup
  .object({
    name: yup.string().required(t('validation.required')),
    email: yup
      .string()
      .typeError(t('validation.email.typeError'))
      .email(t('validation.email.invalid'))
      .required(t('validation.email.required')),
    twitter: yup.string().nullable(true).url(t('validation.url.invalid')),
    linkedin: yup.string().nullable(true).url(t('validation.url.invalid')),
    github: yup.string().nullable(true).url(t('validation.url.invalid')),
    personalWebsite: yup.string().nullable(true).url(t('validation.url.invalid')),
    biography: yup.string().nullable(true),
    devExp: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable(true)
      .integer(t('validation.number.integer'))
      .positive()
      .min(1982, t('validation.devExp.min'))
      .max(new Date().getFullYear(), t('validation.number.max')),
    blockchainExp: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable(true)
      .integer(t('validation.number.integer'))
      .positive()
      .min(2008, t('validation.blockchainExp.min'))
      .max(new Date().getFullYear(), t('validation.number.max')),
  })
  .required()

