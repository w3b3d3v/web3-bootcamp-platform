import Image from 'next/image'
import React from 'react'

export default function Cover() {
  return (
      <Image
        width={400}
        height={400}
      src="https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/courses_cover%2FGPT3_Writer.png?alt=media&token=ebc653dd-64b1-4647-80e9-cc9cc4c85463"
        className="rounded-3xl"
      />
  )
}
