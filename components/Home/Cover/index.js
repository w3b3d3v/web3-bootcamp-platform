import Image from 'next/image'
import React from 'react'

export default function Cover(props) {
  return <Image width={350} height={350} src={props.imageUrl} className="rounded-3xl" />
}
