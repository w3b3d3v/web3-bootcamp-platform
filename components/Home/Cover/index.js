import Image from 'next/image'
import React from 'react'

export default function Cover() {
  return (
    <div className="md:ml-28">
      <Image
        width={400}
        height={400}
        src="https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/courses_cover%2FSolana_Pay_Store.jpeg?alt=media&token=d347bb3a-7272-4526-9d11-cb456b525202"
        className="rounded-3xl"
      />
    </div>
  )
}
