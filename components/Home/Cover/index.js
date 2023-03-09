import Image from 'next/image'
import React from 'react'

export default function Cover() {
  return (
      <Image
        width={400}
        height={400}
      src="https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/courses_cover%2FSolana_And_Web3.png?alt=media&token=c10c7dc7-2910-4028-83fc-2fc3df3a961f"
        className="rounded-3xl"
      />
  )
}
