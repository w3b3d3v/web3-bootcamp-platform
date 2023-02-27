import Head from 'next/head'
import { getAllCourses } from '../../lib/courses'
import { Card, Container, Text, Collapse, Button } from '@nextui-org/react'

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
                  <Button color={'primary'} rounded css={{ margin: 10 }} animated shadow>
                    <Text weight={'bold'} color={''}>
                      Começar agora 🚀
                    </Text>
                  </Button>
                  <Button color={'success'} rounded flat size={'xs'}>
                    {c?.difficulty}
                  </Button>
                  <Card.Divider />
                  <Collapse.Group>
                    <Collapse title="Saiba mais">
                      <Text size="$sm">{c?.description}</Text>
                    </Collapse>
                  </Collapse.Group>
                  <Card.Footer></Card.Footer>
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
