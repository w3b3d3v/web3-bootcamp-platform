import React from 'react'
import { Text, Button } from '@nextui-org/react'
import { getHomeCourse, defaultCourse } from '../../lib/course'
import Cover from './Cover'

export default function Main() {
  const ref = React.createRef()
  const [course, setCourse] = React.useState(null)
  const [link, setLink] = React.useState(null)

  React.useEffect(() => {
    getHomeCourse().then((course) => {
      setCourse(course)
    })
  }, [])

  React.useMemo(() => {
    if (course) {
      setLink(`/courses/${course.id}`)
    }
  }, [course])

  return course == null ? (
    ''
  ) : (
    <div className="z-0 mx-auto mb-14 mt-4 flex max-w-7xl flex-col items-center justify-between gap-0 px-8 lg:mt-16 lg:flex-row lg:gap-52">
      <div className="mx-auto flex flex-1 flex-col items-center">
        <div>
          <div className="m-auto max-w-lg">
            <Text h1 auto className="mb-4 text-center font-bold">
              {course.title}
            </Text>
          </div>
          <div className="mb-7 flex justify-center text-justify">
            <Cover imageUrl={course.image_url} />
          </div>
          <div className="max-w-2xl">
            <Text>{course?.description}</Text>
            <br />
          </div>
        </div>
        <br />
        <div className="z-0 m-auto mb-8 lg:self-start">
          <a href={link}>
            <Button id="wish-to-sign-in" color={'success'} ref={ref}>
              <Text weight={'extrabold'}>Quero me inscrever!</Text>
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
