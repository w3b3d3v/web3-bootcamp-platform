import { Popover,Button, Text, Container } from '@nextui-org/react'
import { RiErrorWarningFill } from 'react-icons/ri'

export function TollTip () {
    return (
      <Container css={{  }} >
        <Popover placement={'bottom'}  >
          <Popover.Trigger>
            <Button
              color={'error'}
              icon={<RiErrorWarningFill />}
            > Aviso</Button>
          </Popover.Trigger>
          <Popover.Content>
            <Text css={{ p: '$10' }}>
              🚧 O site está em desenvolvimento.
              <br />
              Use o tema claro para evitar bugs
            </Text>
          </Popover.Content>
        </Popover>
      </Container>
    )
}