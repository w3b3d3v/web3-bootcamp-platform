/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useTranslation } from "react-i18next"

export default function TwitterModal({ openExternal, onClose, twitterShare }) {
  const cancelButtonRef = useRef(null)
  const { t } = useTranslation()

  return (
    <Transition.Root show={openExternal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => onClose}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-white-100 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className=" mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      {t('twitter-share')}
                    </Dialog.Title>
                    <span className="flex items-center justify-center">
                      <Image src="/assets/img/twitter-logo.svg" width="50" height="50" />
                    </span>
                    <div className="mt-2 text-gray-900">
                      <div className="flex justify-between px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          id="modal-send-lesson"
                          className="text-white inline-flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-sky-400 px-4 py-2 text-base font-medium shadow-sm hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => {
                            onClose()
                            window.open(
                              `https://twitter.com/intent/tweet?text=${twitterShare}`,
                              '_blank'
                            )
                          }}
                        >
                          {t('share')}
                        </button>
                        <button
                          className="mt-3 inline-flex w-full cursor-pointer justify-center rounded-md border border-gray-300 bg-white-100 px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:bg-red-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={onClose}
                          id="modal-cancel-button"
                          ref={cancelButtonRef}
                        >
                        {t('cancel')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
