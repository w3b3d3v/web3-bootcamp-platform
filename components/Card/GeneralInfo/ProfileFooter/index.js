import React from 'react'
import { Button } from '../../../Button'

export default function ProfileFooter({
  showPersonalData,
  showProfessionalData,
  setShowPersonalData,
  setShowProfessionalData,
  setShowSocialData,
  showSocialData
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
    <div className="flex justify-between lg:py-8">
      <Button type="submit" id="update-profile" >
        Salvar
      </Button>
      <div className="flex lg:w-2/5 w-1/3 justify-around">
        <Button
          onClick={previousFormStep}
          customClass="bg-orange-300 p-4 rounded-lg text-black-100 disabled:bg-slate-50 dark:hover:text-white-100 disabled:dark:hover:text-black-100"
          disabled={showPersonalData}
        >
          Voltar
        </Button>
        <Button
          onClick={nextFormStep}
          customClass="bg-orange-300 p-4 rounded-lg text-black-100 disabled:bg-slate-50 dark:hover:text-white-100 disabled:dark:hover:text-black-100"
          disabled={showProfessionalData}
        >
          Avançar
        </Button>
      </div>
    </div>
  )
}
