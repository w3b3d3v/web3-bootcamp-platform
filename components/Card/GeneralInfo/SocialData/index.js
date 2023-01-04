import { GithubAuthProvider,linkWithPopup,getAuth } from 'firebase/auth'
import React from 'react'
import { findSocialLinks } from '../../../../lib/user'
import { Input } from '../../../Input'

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
    <>
      <div className="grow sm:basis-6/12" data-testid="social-data">
        <div className="flex flex-col">
          <Controller
            name="twitter"
            control={control}
            defaultValue={findSocialLinks('twitter', user)?.url}
            render={({ field }) => (
              <Input
                {...field}
                label="Twitter"
                defaultValue={findSocialLinks('twitter', user)?.url}
                id="twitter"
                placeholder="https://twitter.com/username"
              />
            )}
          />
          <small className="text-red-500" data-testid="twitter-error-message">
            {errors.twitter?.message}
          </small>
        </div>
      </div>
      <div className="grow sm:basis-6/12 w-full">
        <Controller
          name="linkedin"
          control={control}
          defaultValue={findSocialLinks('linkedin', user)?.url}
          render={({ field }) => (
            <Input
              {...field}
              label="Linkedin"
              defaultValue={findSocialLinks('linkedin', user)?.url}
              id="linkedin"
              placeholder="https://linkedin.com/username"
            />
          )}
        />
        <small className="text-red-500" data-testid="linkedin-error-message">
          {errors.linkedin?.message}
        </small>
      </div>

      <div className="grow sm:basis-6/12">
        <Controller
          name="personalWebsite"
          control={control}
          defaultValue={findSocialLinks('personalWebsite', user)?.url}
          render={({ field }) => (
            <Input
              {...field}
              label="Site Pessoal"
              defaultValue={findSocialLinks('personalWebsite', user)?.url}
              id="personalWebsite"
              placeholder="https://meuwebsite.com"
            />
          )}
        />
        <small className="text-red-500" data-testid="personalWebsite-error-message">
          {errors.personalWebsite?.message}
        </small>
      </div>

      <div className="grow sm:basis-6/12">
        {user?.socialLinks?.find((item) => item.name == 'github').url ? (
          <div className='flex justify-center'>
            <button
                id="githubConnect"
                className="flex justify-center gap-x-1 font-bold items-center text-md text-black-400 dark:bg-white-100 bg-gray-300 border-none rounded-md px-2 "
              >
                <img src="/assets/img/GitHub-Logo.svg" alt="" className='w-6 h-6' />
                <p>✅</p>
            </button>
            <small className="text-red-500" data-testid="github-error-message">
              {errors.github?.message}
            </small>
          </div>
        ) : (
          <div className="flex flex-col" data-testid="github-connect-button">
            <label
              htmlFor="githubConnect"
              className="mb-2 text-sm font-medium leading-none text-black-200 dark:text-gray-100"
            >
            </label>
              <button
                id="githubConnect"
                className="flex justify-center gap-x-4 font-bold items-center text-md text-black-400 dark:bg-white-100 bg-gray-300 border-none rounded-md"
                onClick={connectGithub}
              >
                <p>Conectar Github</p>
                <img src="/assets/img/GitHub-Logo.svg" alt="" className='w-7 h-7' />
              </button>
          </div>
        )}
      </div>
      
    </>
  )
}
