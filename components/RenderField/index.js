import { useTranslation } from 'react-i18next'

export default function RenderField({ object, field, isHtml, maxSize }) {
  const { i18n } = useTranslation()
  const defaultLanguage = 'en'
  const language = i18n.resolvedLanguage || defaultLanguage

  let content = object?.metadata?.[language]?.[field] ?? object?.[field]

  if (maxSize && content?.length > maxSize) {
    content = `${content.substring(0, maxSize)}...`
  }

  if (!content) {
    return null
  }

  if (isHtml) {
    return <span dangerouslySetInnerHTML={{ __html: content }} />
  }

  return <>{content}</>
}
