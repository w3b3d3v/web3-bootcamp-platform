import React from 'react'
import { Text, Button } from '@nextui-org/react'
import { getHomeCourse } from '../../lib/course'
import Cover from './Cover'

export default function Main() {
  const ref = React.createRef()
  const [course, setCourse] = React.useState(null);
  const [link, setLink] = React.useState(null);

  React.useEffect(() => {
    getHomeCourse().then((course) => {
      setCourse(course);
    });
  }, []);

  React.useEffect(() => {
    if (course) {
      setLink(`/courses/${course.id}`);
    }
  }, [course]);

  return (
    <div className="max-w-7xl mx-auto mb-14 px-8 mt-4 flex flex-col justify-between lg:mt-16 lg:flex-row items-center gap-0 lg:gap-52 z-0">
      <div className="flex flex-col items-center mx-auto flex-1">
        <div>
          <div className='max-w-lg m-auto' >
            <Text h1 auto className="text-center font-bold mb-4">
              Crie uma coleção de NFTs em{' '}
              <span className="lp-gradient-text bg-gradient-to-r from-green-400 to-teal-400"></span>{' '}
              <span className="lp-gradient-text bg-gradient-to-r from-teal-400 to-fuchsia-500 ">
                Solana{' '}
              </span>
            </Text>
          </div>
          <div className='flex justify-center mb-7 text-justify'>
            <Cover imageUrl={course.image_url}/>
          </div>
          <div className="max-w-2xl">
            <Text>
            { course?.description }
            </Text>
            <br/>
          </div>
        </div>
        <br />
        <div className="lg:self-start m-auto mb-8 z-0">
          <a href={link}>
            <Button id="wish-to-sign-in" color={'success'} ref={ref}>
              <Text weight={'extrabold'} >Quero me inscrever!</Text>
            </Button>
          </a>
        </div>
      </div>
      
    </div>
  )
}
