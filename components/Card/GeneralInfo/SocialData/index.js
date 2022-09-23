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
      <div className="grow sm:basis-6/12">
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
        {user?.socialLinks?.find((item) => item.name == 'github').url ? (
          <>
            <Controller
              name="github"
              control={control}
              defaultValue={findSocialLinks('github', user)?.url}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Github"
                  defaultValue={findSocialLinks('github', user)?.url}
                  id="github"
                  placeholder="https://github.com/username"
                />
              )}
            />
            <small className="text-red-500" data-testid="github-error-message">
              {errors.github?.message}
            </small>
          </>
        ) : (
          <div className="flex flex-col" data-testid="github-connect-button">
            <label
              htmlFor="githubConnect"
              className="mb-2 text-sm font-medium leading-none text-black-200 dark:text-gray-100"
            >
              Github
            </label>
            <button
              id="githubConnect"
              className="text-white inline-flex cursor-pointer rounded-md border border-transparent bg-green-600 p-2
                        text-base font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500
                        focus:ring-offset-2 sm:w-auto sm:text-sm"
              onClick={connectGithub}
            >
              Conectar Github
            </button>
          </div>
        )}
      </div>
      <div className="grow sm:basis-6/12 ">
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
    </>
  )
}
