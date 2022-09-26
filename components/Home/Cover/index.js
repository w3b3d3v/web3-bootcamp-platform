import Image from 'next/image'
import React from 'react'

export default function Cover() {
  return (
    <div className="md:ml-28">
      <Image
        width={400}
        height={400}
        src="https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/courses_cover%2FSolana_And_Web3.png?alt=media&token=bad7dae5-ad5a-4bdc-9d84-d14d572e334e"
        className="rounded-3xl"
      />
    </div>
  )
}
