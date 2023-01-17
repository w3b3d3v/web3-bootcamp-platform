import Image from 'next/image'
import React from 'react'

export default function Cover() {
  return (
    <div>
      <Image
        width={400}
        height={400}
        src="https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/courses_cover%2FSolidity_And_Smart_Contracts.png?alt=media&token=9837e5a9-888a-4b7f-9292-e1f4626156ab"
        className="rounded-3xl flex-1"
      />
    </div>
  )
}
