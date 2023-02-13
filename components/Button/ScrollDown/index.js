import { Button } from "@nextui-org/react"
import { AiFillDownCircle } from 'react-icons/ai'

export function ScrollDownButton () { 
    return (
  <Button
    rounded={'true'}
    color={'success'}
    auto
    icon={<AiFillDownCircle size={30} />}
    css={{ marginLeft: 'auto', maxW: '100px' }}
  />
) 
}
