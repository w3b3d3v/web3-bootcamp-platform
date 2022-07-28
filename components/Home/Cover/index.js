import Image from 'next/image'
import React from 'react'

export default function Cover() {
  return (
    <div className="md:ml-28">
      <Image
        width={400}
        height={400}
        src="https://firebasestorage.googleapis.com/v0/b/web3dev-development.appspot.com/o/courses_cover%2FJS_DAO.png?alt=media&token=5ffb03a3-e144-4ad6-a760-e1fb2328f953"
        className="rounded-3xl"
      />
    </div>
  )
}
