import Link from 'next/link';
import React from 'react';
import { links, camelize } from '../../lib/constants';
import Image from 'next/image';
import { Text } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div
      data-testid="footer"
      className="mx-auto mt-14 mb-4 flex max-w-7xl flex-col justify-center px-6 py-2 text-center sm:px-6 md:px-6 lg:px-32 xl:py-0 "
    >
      <div className="mr-auto mb-4 flex gap-3 uppercase">
        <Image width={30} height={30} src="/assets/img/w3d-logo-symbol-ac.svg" />
        <Text transform="uppercase" weight={'bold'}>
          {' '}
          WEB3DEV{' '}
        </Text>
      </div>
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
          {['forum', 'manual', 'glossary'].map((link) => {
            return (
              <li className="">
                <Link href={links[link]}>{t(link)}</Link>
              </li>
            )
          })}
        </ul>
      </div>

      <p className="flex-row">
        {t('developedBy')}{' '}
        <Link href="https://links.w3d.community/">
          <a data-testid="web3dev-link" target="_blank" className="font-bold">
            WEB3DEV
          </a>
        </Link>{' '}
        {t('inspiredBy')}{' '}
        <Link href="https://buildspace.so/">
          <a data-testid="buildspace-link" target="_blank" className="font-bold">
            Buildspace
          </a>
        </Link>{' '}
        ✨
      </p>
    </div>
  )
}
