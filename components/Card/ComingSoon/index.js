import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ComingSoonCard() {
  const { t } = useTranslation()
  return (
    <>
      <div className="min-w-full rounded-lg bg-white-100 shadow-xl dark:bg-black-200">
        <div className="flex min-w-full">
          <div className="flex min-w-full items-center justify-between px-6 py-5">
            <div className="flex-col">
              <p className="text-base font-medium leading-none text-black-200 dark:text-gray-100">
                &#x1F98F; {t('comming_soon.timeHasCome')}
              </p>
              <p className="pt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                {t('comming_soon.preparingEvent')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
