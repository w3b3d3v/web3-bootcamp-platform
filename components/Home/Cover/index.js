import Image from 'next/image'
import React from 'react'

export default function Cover() {
  return (
    <div className="md:ml-28">
      <Image
        width={400}
        height={400}
        src="https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/courses_cover%2FNFT_FLOW.png"
        className="rounded-3xl"
      />
    </div>
  )
}
