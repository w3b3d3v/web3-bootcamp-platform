import Image from 'next/image'
import React from 'react'

export default function Cover() {
  return (
    <div className="md:ml-28">
      <Image
        width={400}
        height={400}
        src="https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/courses_cover%2FSolana_NFTs.png?alt=media&token=9b1830c6-c058-4723-a890-15885c8263ee"
        className="rounded-3xl"
      />
    </div>
  )
}
