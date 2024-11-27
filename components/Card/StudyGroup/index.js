import { Card, Text, Collapse, Button, Link } from '@nextui-org/react'
import { useState } from 'react'
import { MdExpandMore } from 'react-icons/md'
import Tabs from '../../Tabs'
import { useTranslation } from 'react-i18next'
import RenderField from '../../RenderField'

export function StudyGroupCard({ studyGroup }) {
  if (!studyGroup.active) return null

  const [showMore, setShowMore] = useState(false)
  const { t } = useTranslation()

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
        '@media (min-width: 768px)': {
          minHeight: '850px',
        },
        paddingBlock: '$10',
      }}
      isHoverable
      key={studyGroup.id}
      id={studyGroup.id}
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
        <Card.Image src={studyGroup.image_url} key={studyGroup.id}></Card.Image>
      </Card.Header>
      <Tabs course={studyGroup} />
      <Link href={`/study-groups/${studyGroup.slug}`}>
        <Button color={'primary'} rounded css={{ margin: 10 }} animated shadow>
          <Text weight={'bold'} color={''}>
            {t('studyGroup.enterGroup')}{' '}
          </Text>
        </Button>
      </Link>
      <Card.Divider />
      <Button css={{ margin: 'auto', mt: '$5' }} color={'success'} rounded flat size={'xs'}>
        {studyGroup.difficulty}
      </Button>
      <Collapse.Group>
        <div className="mt-1">
          {!showMore && (
            <div>
              <Text>
                <RenderField object={studyGroup} field="description" maxSize={200} />
              </Text>
              <Button
                onPress={() => setShowMore(true)}
                css={{ margin: 'auto', mt: '$10' }}
                color="gradient"
                auto
                icon={<MdExpandMore />}
              ></Button>
            </div>
          )}
          {showMore && (
            <div>
              <Text>
                <RenderField object={studyGroup} field="description" />
              </Text>
              <Button
                css={{ margin: 'auto', mt: '$10' }}
                onPress={() => setShowMore(false)}
                color="gradient"
              >
                {' '}
                ^{' '}
              </Button>
            </div>
          )}
        </div>
      </Collapse.Group>
    </Card>
  )
}
