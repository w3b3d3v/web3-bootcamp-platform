import { GithubAuthProvider,linkWithPopup,getAuth } from 'firebase/auth'
import React from 'react'
import { findSocialLinks } from '../../../../lib/user'
import { Input, Button, Container } from '@nextui-org/react'
import { FiGithub } from 'react-icons/fi'
import { ScrollDownButton } from '../../../Button/ScrollDown'
import { Content } from '../../../../styles/components/Card/SocialData/index'
 

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
    <Container>
      <Content>
        <h1 className="text-center" id="socialLinks">
          Redes Sociais
        </h1>
        <div className="mb-4 flex flex-col gap-4">
          <Controller
            name="twitter"
            control={control}
            defaultValue={findSocialLinks('twitter', user)?.url}
            render={({ field }) => (
              <Input
                {...field}
                label="Twitter"
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
                bordered
                defaultValue={findSocialLinks('linkedin', user)?.url}
                id="linkedin"
                placeholder="https://linkedin.com/username"
                helperText={errors.linkedin?.message}
                width={'100%'}
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
            <div
              className="flex items-center justify-center gap-4"
              data-testid="github-connect-button"
            >
              <label htmlFor="githubConnect"></label>
              <Button
                id="githubConnect"
                rounded
                onClick={connectGithub}
                size={'md'}
                css={{ color: 'White', background: 'black', display: 'flex', gap: '$5' }}
                icon={<FiGithub />}
              >
                Conectar Github
              </Button>
              <a href="#professionalData">
                <ScrollDownButton />
              </a>
              {/*
              button to use when connect whit linkedin feature
              <Button
                id="linkedinConnect"
                shadow
                rounded
                onClick={''}
                size={'md'}
                css={{ color: 'White', display: 'flex', gap: '$5' }}
                icon={<GrLinkedin />}
                disabled
              >
                Conectar Linkedin
              </Button> */}
            </div>
          )}
        </div>
      </Content>
    </Container>
  )
}
