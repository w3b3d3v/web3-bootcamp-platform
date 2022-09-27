import Image from 'next/image'
import React from 'react'

export default function Cover() {
  return (
    <div className="md:ml-28">
      <Image
        width={400}
        height={400}
        src="https://firebasestorage.googleapis.com/v0/b/web3dev-development.appspot.com/o/courses_cover%2Fsolidity_female.png?alt=media&token=ddbb1afd-5042-43a9-ba59-266c2c40476a"
        className="rounded-3xl"
      />
    </div>
  )
}
