import { CheckCircleIcon } from '@heroicons/react/solid'
import React from 'react'

export default function ProfileProgress({
  filledPersonalData,
  filledSocialData,
  filledProfessionalData,
}) {
  return (
    <div
      className="lg:flex max-w-sm items-center justify-center lg:w-96 my-4 lg:my-0 hidden"
      data-testid="profile-progress"
    >
      <div className="flex flex-col items-center justify-center sm:text-sm">
        <div className='flex flex-col items-center'>
          <span className="">Dados Pessoais</span>
          <CheckCircleIcon
            className="mb-4 mt-1"
            fill={filledPersonalData ? '#4CE310' : 'currentColor'}
            width="24"
            data-testid="personal-data-icon"
          />
        </div>
        <div className='flex flex-col items-center'>
          <span className="">Dados Sociais</span>
          <CheckCircleIcon
            className="mb-4 mt-1"
            fill={filledSocialData ? '#4CE310' : 'currentColor'}
            width="24"
            data-testid="social-data-icon"
          />
        </div>
        <div className='flex flex-col items-center'>
          <span className="">Dados Profissionais</span>
          <CheckCircleIcon
            className="mb-4 mt-1"
            fill={filledProfessionalData ? '#4CE310' : 'currentColor'}
            width="24"
            data-testid="professional-data-icon"
          />
        </div>
      </div>
    </div>
  )
}
