import Image from 'next/image'
import React from 'react'

export default function Cover() {
  return (
    <div className="md:ml-28">
      <Image
        width={400}
        height={400}
        src="https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/courses_cover%2Fsolidity_female.png?alt=media&token=355e7922-8ccd-4fb7-8975-a23348f6f4f7"
        className="rounded-3xl"
      />
    </div>
  )
}
