import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <div data-testid='footer' className="container flex justify-center mx-auto px-6 py-2 sm:px-6 md:px-6 lg:px-32 xl:py-0 ">
      <p className='text-black-100 dark:text-white-100'>
        Desenvolvido com ❤️ pela <Link href='https://www.web3dev.com.br/'><a data-testid='web3dev-link' target="_blank" className='text-black-100 dark:text-white-100'>
          web3dev
        </a></Link>
        {' '}e inspirado pela <Link href='https://buildspace.so/'><a data-testid='buildspace-link' target="_blank" className='text-black-100 dark:text-white-100'>
          buildspace
        </a></Link>
        {' '}✨
      </p>
    </div>
  );
}
