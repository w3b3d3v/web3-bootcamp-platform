import { Card, Text, Collapse, Button, Link } from '@nextui-org/react'
import { BiTimeFive } from 'react-icons/bi'
import { useState } from 'react'
import { MdExpandMore } from 'react-icons/md'
import Tabs from '../../Tabs'

export function GroupCard ({group}) {
    const [showMore, setShowMore] = useState(false)
 
    return (
     <Card
         css={{
             display: 'flex',
             mw: '500px',
             textAlign: 'center',
             alignItems: 'center',
             justifyContent: 'space-between',
             gap: 5,
             height: 'auto',
             paddingBlock: '$10'

         }}
         isHoverable
         key={group.id}
         id={group.id}
     >
         <Card.Header
             css={{
                 display: 'flex',
                 justifyContent: 'space-between',
                 textAlign: 'center',
                 alignItems: 'center',
                 justifyContent: 'center',
             }}
         >
             <Card.Image src={group.image_url} key={group.id}></Card.Image>
         </Card.Header>
         <Tabs isLessonPage={false} course={group} lessonsSubmitted={[]} cohort={[]} />
         <Link href={`/groups/${group.id}`} >
             <Button color={'primary'} rounded css={{ margin: 10 }} animated shadow>
                 <Text weight={'bold'} color={''}>
                     Começar agora 🚀
                 </Text>
             </Button>
         </Link>
         {/* <Button color={'success'} rounded flat size={'xs'}>
             {group.difficulty}
         </Button> */}
         <Card.Divider />
         <Collapse.Group >
             <div className='mt-7' >
                 {(!showMore &&
                     <div>
                         <Text>{group.description.substring(0, 100) + '...'}
                         </Text>
                         <Button
                         onPress={() => setShowMore(true)}
                         css={{ margin: 'auto', mt:'$10' }}
                         color='gradient'
                         auto
                         icon={<MdExpandMore />}
                         >
                         </Button>
                     </div>
                 )}
                 {showMore && (
                     <div>
                         <Text>{group.description}</Text>
                         <Button 
                         css={{ margin: 'auto', mt:'$10' }} 
                         onPress={() => setShowMore(false)} 
                         color='gradient'
                         > ^ </Button>
                     </div>
                 )}
             </div>
         </Collapse.Group>
     </Card>
 )
}


              