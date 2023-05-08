import Image from 'next/image'
import React from 'react'

export default function Cover() {
  return (
      <Image
        width={400}
        height={400}
      src="https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/courses_cover%2FSolana_NFTs.png?alt=media&token=6562a486-7682-4c64-9bfd-a33c26d82199"
        className="rounded-3xl"
      />
  )
}
