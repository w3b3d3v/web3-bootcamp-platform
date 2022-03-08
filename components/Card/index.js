import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Button from '../../components/Button'

export default function Card(props) {
  const { title, img, desc, children, id } = props
  return (
    <>
      <div className="mx-2 mb-8 rounded-lg shadow-xl lg:mb-0">
        <div className="">
          <Link href={'/courses/' + id}>
            <img
              src={img}
              className="h-full w-full rounded-tr-xl rounded-tl-xl"
            />
          </Link>
        </div>
        <div className="bg-white">
          <div className="p-4">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold">
                <Link href={'/courses/' + id}>{title}</Link>
              </h2>
            </div>
            <p className="mt-2 text-xs text-gray-600">{desc}</p>

            <div className="flex items-center justify-between py-4">
              <Button>Ver projeto</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
