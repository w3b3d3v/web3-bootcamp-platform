import { getCourse } from '../../../lib/course'
import React from 'react'
import NotFound from '../../404'
import { Text,Button } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/router';

function Course({ course }) {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push(`/courses/${course.id}`);
    };

    if (!course.active) return <NotFound />
    const ref = React.createRef()
    return (
        <div className="max-w-7xl mx-auto mb-14 px-8 mt-4 flex flex-col justify-between lg:mt-16 lg:flex-row items-center gap-0 lg:gap-52">
            <div className="flex flex-col items-center mx-auto flex-1">
                <div>
                    <div className='max-w-lg m-auto' >
                        <Text h1 auto className="text-center font-bold mb-4">
                            {course.title}
                        </Text>
                    </div>
                    <div className='flex justify-center mb-7 text-justify'>
                        <Image 
                        src={course.image_url}
                        width={400}
                        height={400}
                        />  
                    </div>
                    <div className="max-w-2xl">
                        <Text>
                            {course.description}
                        </Text>
                    </div>
                </div>
                <br />
                <div className="lg:self-start m-auto mb-8">
                        <Button id="wish-to-sign-in" color={'success'} onClick={handleButtonClick}>
                            <Text weight={'extrabold'} >Quero me inscrever!</Text>
                        </Button>
                </div>
            </div>

        </div>
    )
}

export async function getServerSideProps({ params }) {
    const course = await getCourse("course", params.id)
    return {
        props: {
            course
        },
    }
}

export default Course
