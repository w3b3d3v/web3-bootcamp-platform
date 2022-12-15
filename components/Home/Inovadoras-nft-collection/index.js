import React from 'react'
import { Button } from '../../Button'
import Cover from '../Inovadoras-nft-collection/Cover'

function Main() {
  const ref = React.createRef()
  return (
    <main className="max-w-7xl mx-auto mb-14 px-8 mt-4 flex flex-col justify-between lg:mt-16 lg:flex-row items-center gap-0 lg:gap-52">
      <div className="flex flex-col items-center mx-auto flex-1">
        <div>
          <h1 className='text-4xl font-bold text-center sm:text-start m-0'>
            Construa sua coleção de  
            <span className="lp-gradient-text bg-gradient-to-r from-green-400 to-teal-400"></span>{' '}
            <span className="lp-gradient-text bg-gradient-to-r from-teal-400 to-fuchsia-500">
              NFTS{' '}
            </span>
          </h1>
          <p className="mt-8">
            Um projeto onde você irá aprender a programar e gerar sua própria coleção de <b>NFT</b>, construa seu próprio React dApp para permitir que amigos conectem suas carteiras e interajam com seus NFTs. Perfeito para mulheres inovadoras, entusiastas em blockchain e desenvolvedoras.
          </p>
        </div>
        <br />
        <div className="lg:self-start mb-8">
          <a href="/courses/NFT_Collection">
            <Button id="wish-to-sign-in" ref={ref}>
              Quero me inscrever!
            </Button>
          </a>
        </div>
      </div>
      <Cover />
    </main>
  )
}

export default Main
