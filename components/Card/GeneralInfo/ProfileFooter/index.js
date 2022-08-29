import React from 'react'
import { Button } from '../../../Button'

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
    <div className="flex justify-between lg:py-8 flex-col-reverse lg:flex-row" data-testid="profile-footer">
      <Button type="submit" id="update-profile">
        Salvar
      </Button>
      <div className="flex justify-around lg:w-2/5 justify-between mb-4 lg:mb-0 ">
        <Button
          onClick={previousFormStep}
          customClass="bg-orange-300 p-4 rounded-lg text-black-100 disabled:bg-slate-50 dark:hover:text-white-100 disabled:dark:hover:text-black-100"
          disabled={showPersonalData}
          dataTestId="previous-profile-form-step"
        >
          Voltar
        </Button>
        <Button
          onClick={nextFormStep}
          customClass="bg-orange-300 p-4 rounded-lg text-black-100 disabled:bg-slate-50 dark:hover:text-white-100 disabled:dark:hover:text-black-100"
          disabled={showProfessionalData}
          dataTestId="next-profile-form-step"
        >
          Avançar
        </Button>
      </div>
    </div>
  )
}
