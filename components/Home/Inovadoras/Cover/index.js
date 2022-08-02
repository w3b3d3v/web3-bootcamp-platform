import Image from 'next/image'
import React from 'react'

export default function Cover() {
  return (
    <div className="md:ml-28">
      <Image
        width={400}
        height={400}
        src="https://firebasestorage.googleapis.com/v0/b/web3dev-development.appspot.com/o/courses_cover%2FSolidity_And_Smart_Contracts.png?alt=media&token=b0e44fe0-02a5-4363-97de-fcf0a0752364"
        className="rounded-3xl"
      />
    </div>
  )
}
