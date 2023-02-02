import { GithubAuthProvider,linkWithPopup,getAuth } from 'firebase/auth'
import React from 'react'
import { findSocialLinks } from '../../../../lib/user'
import { Input, Button, Container, Col } from '@nextui-org/react'

export default function SocialData({ Controller, control, errors, user }) {
  const connectGithub = async (e) => {
    e.preventDefault()

    const provider = new GithubAuthProvider()
    const auth = getAuth()

    await linkWithPopup(auth.currentUser, provider)
      .then((result) => {

        const github_id = result.user.providerData.find(
          (item) => item.providerId == result.providerId
        ).uid
        fetch(`https://api.github.com/user/${github_id}`)
          .then((res) => res.json())
          .then(async (data) => {
            await updateUserData(data.html_url)
            })
          })

      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <Container css={{ height: '70vh', alignItems: 'center', justifyContent: 'center' }}>
      <div className="mb-4 flex flex-col">
        <Controller
          name="twitter"
          control={control}
          defaultValue={findSocialLinks('twitter', user)?.url}
          render={({ field }) => (
            <Input
              {...field}
              label="Twitter"
              color={'primary'}
              bordered
              defaultValue={findSocialLinks('twitter', user)?.url}
              id="twitter"
              placeholder="https://twitter.com/username"
              helperText={errors.twitter?.message}
            />
          )}
        />
        <Controller
          name="linkedin"
          control={control}
          defaultValue={findSocialLinks('linkedin', user)?.url}
          render={({ field }) => (
            <Input
              {...field}
              label="Linkedin"
              color={'primary'}
              bordered
              defaultValue={findSocialLinks('linkedin', user)?.url}
              id="linkedin"
              placeholder="https://linkedin.com/username"
              helperText={errors.linkedin?.message}
            />
          )}
        />
        <Controller
          name="personalWebsite"
          control={control}
          defaultValue={findSocialLinks('personalWebsite', user)?.url}
          render={({ field }) => (
            <Input
              {...field}
              label="Site Pessoal"
              bordered
              defaultValue={findSocialLinks('personalWebsite', user)?.url}
              id="personalWebsite"
              placeholder="https://meuwebsite.com"
              helperText={errors.personalWebsite?.message}
            />
          )}
        />
      </div>

      <div className="">
        {user?.socialLinks?.find((item) => item.name == 'github').url ? (
          <div className="flex items-center justify-center">
            <Button id="githubConnect" color={''} boardered>
              <img src="/assets/img/GitHub-Logo.svg" alt="" className="h-6 w-6" />
              <p>✅</p>
            </Button>
            <small className="text-red-500" data-testid="github-error-message">
              {errors.github?.message}
            </small>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center " data-testid="github-connect-button">
            <label htmlFor="githubConnect"></label>
            <Button 
            id="githubConnect" 
            onClick={connectGithub} 
            color={''}
            size={'sm'}
            >
              <div className="flex items-center justify-center gap-4">
                <p className="text-black-100">Conectar Github</p>
                <img src="/assets/img/GitHub-Logo.svg" alt="" className="h-7 w-7" />
              </div>
            </Button>
          </div>
        )}
      </div>
    </Container>
  )
}
