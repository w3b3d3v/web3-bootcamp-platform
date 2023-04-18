import React from 'react'
import { Text, Button } from '@nextui-org/react'
import Cover from './Cover'

export default function Main() {
  const ref = React.createRef()
  return (
    <div className="max-w-7xl mx-auto mb-14 px-8 mt-4 flex flex-col justify-between lg:mt-16 lg:flex-row items-center gap-0 lg:gap-52 z-0">
      <div className="flex flex-col items-center mx-auto flex-1">
        <div>
          <div className='max-w-lg m-auto' >
            <Text h1 auto className="text-center font-bold mb-4">
              Construa seu Chat de IA com{' '}
              <span className="lp-gradient-text bg-gradient-to-r from-green-400 to-teal-400"></span>{' '}
              <span className="lp-gradient-text bg-gradient-to-r from-teal-400 to-fuchsia-500 ">
                GPT-3{' '}
              </span>
               e Open AI.
            </Text>
          </div>
          <div className='flex justify-center mb-7 text-justify'>
            <Cover />
          </div>
          <div className="max-w-2xl">
            <Text>
              A WEB3DEV oferece aos desenvolvedores de software a oportunidade de construir sua própria ferramenta de escrita assistida por AI usando GPT-3 e Open AI. 
              Os participantes aprenderão sobre as funcionalidades dessas ferramentas e como aplicá-las em seus próprios aplicativos. O projeto ensina a usar essa tecnologia para transformar aplicativos em obras-primas e a ficar atualizado nas tendências de ML/IA. Os desenvolvedores podem se inscrever agora no curso de ChatGPT para aproveitar o poder do GPT-3 em seus aplicativos e se destacar no mercado.
            </Text>
            <br/>
            <Text>
              Você também terá a chance de se conectar com outros desenvolvedores em nossa comunidade exclusiva e aprimorar ainda mais suas habilidades em tecnologias emergentes. Junte-se a nós agora e comece a construir o futuro!
            </Text>
          </div>
        </div>
        <br />
        <div className="lg:self-start m-auto mb-8 z-0">
          <a href="/courses/GPT3_Writer">
            <Button id="wish-to-sign-in" color={'success'} ref={ref}>
              <Text weight={'extrabold'} >Quero me inscrever!</Text>
            </Button>
          </a>
        </div>
      </div>
      
    </div>
  )
}
