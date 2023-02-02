import React from 'react'
import { Button } from '@nextui-org/react'

export default function ProfileFooter({
  showPersonalData,
  showProfessionalData,
  setShowPersonalData,
  setShowProfessionalData,
  setShowSocialData,
  showSocialData,
}) {
  const nextFormStep = (e) => {
    e.preventDefault()
    if (showPersonalData) {
      setShowPersonalData(false)
      setShowSocialData(true)
    } else if (showSocialData) {
      setShowSocialData(false)
      setShowProfessionalData(true)
    }
  }
  const previousFormStep = (e) => {
    e.preventDefault()
    if (showSocialData) {
      setShowSocialData(false)
      setShowPersonalData(true)
    } else if (showProfessionalData) {
      setShowProfessionalData(false)
      setShowSocialData(true)
    }
  }
  return (
    <div data-testid="profile-footer">
        {/* <div className='flex justify-between gap-56 mt-4 mb-4'>
          <Button
            onClick={previousFormStep}
            customClass="rounded-lg w-24 h-10"
            disabled={showPersonalData}
            dataTestId="previous-profile-form-step"
          >
            Voltar
          </Button>
          
          <Button
            onClick={nextFormStep}
            customClass="rounded-lg mb-2 w-24"
            disabled={showProfessionalData}
            dataTestId="next-profile-form-step"
          >
            Avançar
          </Button>
      
      </div> */}

      <div className="flex justify-center mt-8 w-full">
          <Button type="submit" id="update-profile" color={'success'} shadow autoFocus css={{ widht:'100%' }} >
            Salvar 
          </Button>
        </div>
    </div>
  )
}
