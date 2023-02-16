import React from 'react'
import { Button } from '@nextui-org/react'
import { GiSave } from 'react-icons/gi'
 
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
      <div className="mt-8 flex w-full justify-center">
        <Button
          type="submit"
          id="update-profile"
          icon={<GiSave  size={30} />}
          color={'secondary'}
          shadow
          autoFocus
          auto
        >
          Salvar
        </Button>
      </div>
    </div>
  )
}
