import Image from 'next/image'
import React from 'react'

export default function Cover() {
  return (
    <div className="">
      <Image
        width={400}
        height={400}
        src="https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/courses_cover%2FNFT_COLLECTION_INOVADORAS.png?alt=media&token=f6fae749-7356-45ab-837f-7a0da08fb5a3"
        className="rounded-3xl flex-1"
      />
    </div>
  )
}
