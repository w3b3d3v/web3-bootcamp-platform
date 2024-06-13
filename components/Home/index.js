import React from 'react'
import { Text, Button } from '@nextui-org/react'
import Cover from './Cover'
import { useTranslation } from 'react-i18next'
import RenderField from '../RenderField'
export default function Main({ course }) {
  const { t, i18n } = useTranslation()
  const ref = React.createRef()
  const [link, setLink] = React.useState(null)

  React.useMemo(() => {
    if (course) {
      setLink(`/courses/${course.id}`)
    }
  }, [course])

  return course == null ? (
    ''
  ) : (
    <div className="z-0 mx-auto mb-14 mt-4 flex max-w-7xl flex-col items-center justify-between gap-0 px-8 lg:mt-4 lg:flex-row lg:gap-52">
      <div className="mx-auto flex flex-1 flex-col items-center">
        <div>
          <div className="m-auto max-w-lg">
            <Text h2 auto="true" className="mb-4 text-center font-bold">
              <RenderField field={course} fieldName="title" />
            </Text>
          </div>
          <div className="mb-7 flex justify-center text-justify">
            <Cover imageUrl={course.image_url} />
          </div>
          <div className="max-w-2xl">
            <RenderField object={course} field="description" isHtml={true} />
            <br />
          </div>
        </div>
        <div className="z-0 m-auto mb-8 lg:self-start">
          <a href={link}>
            <Button id="wish-to-sign-in" color={'success'} ref={ref}>
              <Text weight={'extrabold'}>{t('subscribeNow')}!</Text>
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}