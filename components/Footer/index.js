import Link from 'next/link'
import React from 'react'
import { links, camelize } from '../../lib/constants'
import Image from 'next/image'
import { Text } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'

export default function Footer() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const isLight = theme === 'light'

  return (
    <div
      data-testid="footer"
      className="mx-auto mt-14 mb-4 flex max-w-7xl flex-col justify-center px-6 py-2 text-center sm:px-6 md:px-6 lg:px-32 xl:py-0 "
    >
      <div className="mr-auto mb-4 flex gap-3 uppercase">
        <Image width={30} height={30} src="/assets/img/w3d-logo-symbol-ac.svg" />
        <Text transform="uppercase" weight={'bold'}>
          {' '}
          WEB<span style={{ color: '#99e24d' }}>3</span>DEV{' '}
        </Text>
      </div>
      <hr className="w-full border-gray-200" />
      <div
        className={`${
          isLight ? 'light-mode' : 'dark-mode'
        } m-auto flex flex-wrap justify-center gap-4 pt-4`}
      >
        {['twitter', 'discord', 'github', 'linkedin', 'youtube', 'forum', 'manual', 'glossary'].map(
          (link) => (
            <Link key={link} href={links[link]}>
              <a className="footer-link flex items-center gap-2">
                <Image
                  width={30}
                  height={30}
                  src={`/assets/img/${link}.svg`}
                  alt={`${link} icon`}
                  className="icon"
                />
              </a>
            </Link>
          )
        )}
      </div>
    </div>
  )
}
