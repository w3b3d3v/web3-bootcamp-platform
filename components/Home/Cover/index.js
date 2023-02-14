import Image from 'next/image'
import React from 'react'

export default function Cover() {
  return (
    <div>
      <Image
        width={400}
        height={400}
        src="https://firebasestorage.googleapis.com/v0/b/web3dev-bootcamp.appspot.com/o/courses_cover%2FJS_DAO.png?alt=media&token=3778f188-89dc-48c7-b557-50ae36732436"
        className="flex-1 rounded-3xl"
      />
    </div>
  )
}
