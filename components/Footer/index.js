import Link from 'next/link';
import React from 'react';
import { links, camelize } from '../../lib/constants'

export default function Footer() {
  return (
    <div
      data-testid="footer"
      className="mx-auto flex max-w-7xl flex-col justify-center px-6 py-2 text-center sm:px-6 md:px-6 lg:px-32 xl:py-0"
    >
      <hr className="w-full border-gray-200" />
      <div className="m-auto flex  ">
        <ul className="footer-links list-none flex-row text-left ">
          {['twitter', 'discord', 'github', 'linkedin', 'youtube'].map((link) => {
            return (
              <li className="">
                <Link href={links[link]}>{link.upperFirst()}</Link>
              </li>
            )
          })}
        </ul>
        <ul className="footer-links list-none text-left">
          {['forum', 'manual', 'glossario'].map((link) => {
            return (
              <li className="">
                <Link href={links[link]}>{link.upperFirst()}</Link>
              </li>
            )
          })}
        </ul>
      </div>

      <p className="flex-row text-black-100 dark:text-white-100">
        Desenvolvido com ❤️ pela{' '}
        <Link href="https://www.web3dev.com.br/">
          <a
            data-testid="web3dev-link"
            target="_blank"
            className="text-black-100 dark:text-white-100"
          >
            web3dev
          </a>
        </Link>{' '}
        e inspirado pela{' '}
        <Link href="https://buildspace.so/">
          <a
            data-testid="buildspace-link"
            target="_blank"
            className="text-black-100 dark:text-white-100"
          >
            buildspace
          </a>
        </Link>{' '}
        ✨
      </p>
    </div>
  )
}
