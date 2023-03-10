import { Card, Text } from '@nextui-org/react'
import React from 'react'

export default function HomeCards({ cards }) {
  const backgroundColor = (index) => {
    switch (index) {
      case 0:
        return 'from-green-400 to-teal-400'
      case 1:
        return 'from-teal-400 to-violet-500'
      case 2:
        return 'from-violet-500 to-purple-500'
      case 3:
        return 'from-purple-400 to-pink-500'
      case 4:
        return 'from-pink-400 to-orange-500'
      default:
        return 'from-green-400 to-teal-400'
    }
  }

  return ( 
    <footer>
        <div className="mx-auto max-w-4xl flex flex-col items-center justify-between py-4 text-sm lg:flex-row lg:items-stretch font-bold text-center gap-7">
          {cards.map((card, index) => (
              <Card
                key={card}
                variant={'bordered'}
                borderWeight={'bold'}
                css={ { display:'flex' } }

              >
                <Card.Body css={{  }} >
                  <Text css={ { textAlign:'center' } } >{card}</Text>
                </Card.Body>
              </Card>
          ))}
        </div>
      <br />
    </footer>
  )
}
