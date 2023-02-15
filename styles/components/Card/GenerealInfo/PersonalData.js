import { styled } from '@nextui-org/react'

export const EnglishLevelContainer = styled('div',  {
    mt:'$10',
    display:'flex',    
    alignItems:'center',
    justifyContent:'center'
})

export const InputsContainer = styled('div', {
    display:'flex',
    flexDirection:'column',
    gap:'$14',
    alignItems:'center',
    justifyContent:'space-between',
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
  justifyContent: 'space-between',
  maxW: '800px',
  margin:'auto',

  div: {
    marginBottom:'$1'
  }

})