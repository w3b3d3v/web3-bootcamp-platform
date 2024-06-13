import { useTranslation } from 'react-i18next'

export default function RenderField({ object, field, isHtml, maxSize }) {
  const { i18n } = useTranslation()
  let content

  if (object?.metadata) {
    content = object.metadata[i18n.resolvedLanguage || 'en']?.[field]
  } else {
    content = object?.[field]
  }

  if (maxSize && content?.length > maxSize) {
    content = `${content.substring(0, maxSize)}...`
  }

  if (!content) {
    return null
  }

  if (isHtml) {
    return <div dangerouslySetInnerHTML={{ __html: content }} />
  }

  return <>{content}</>
}
