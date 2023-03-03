import Head from 'next/head'
import { getAllCourses } from '../../lib/courses'
import { Card, Container, Text, Collapse, Button, Link } from '@nextui-org/react'
import { BiTimeFive } from 'react-icons/bi'
 
function Courses({ allCourses }) {
  return (
    <>
      <Head>
        <meta property="og:title" content="Listagem" />
        <title>Web3Dev</title>
      </Head>

      <Container
        css={{
          mt: 30,
          mb: 30,
        }}
      >
        <Container
          css={{
            display: 'flex',
            gap: '$10',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {allCourses.map((c) => {
            return (
              <>
                <Card
                  css={{
                    display: 'flex',
                    mw: '300px',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 5,
                  }}
                  isHoverable
                  key={c?.id}
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
                    <Card.Image src={c?.image_url} key={c?.id}></Card.Image>
                  </Card.Header>
                  <Button auto color={''} bordered rounded icon={<BiTimeFive/>} >
                    <Text weight={'bold'} size={'$xs'} > {c?.duration} </Text>
                  </Button>
                  <Link href={`/courses/${c?.id}`} >
                    <Button color={'primary'} rounded css={{ margin: 10 }} animated shadow>
                      <Text weight={'bold'} color={''}>
                        Começar agora 🚀
                      </Text>
                    </Button>
                  </Link>
                  <Button color={'success'} rounded flat size={'xs'}>
                    {c?.difficulty}
                  </Button>
                  <Card.Divider />
                  <Collapse.Group>
                    <Collapse title="Descrição ...">
                      <Text size="$sm">{c?.description}</Text>
                    </Collapse>
                  </Collapse.Group>
                </Card>
              </>
            )
          })}
        </Container>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const allCourses = await getAllCourses()
  return {
    props: {
      allCourses,
    },
  }
}

export default Courses
