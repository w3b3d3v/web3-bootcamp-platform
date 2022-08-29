import Image from 'next/image'
import React from 'react'
import { Input } from '../../../Input'
import Loading from '../../../Loading'
import { Textarea } from '../../../Textarea'

export default function PersonalData({
  Controller,
  control,
  errors,
  user,
  file,
  setFile,
  loading,
}) {
  return (
    <>
      <div className="grow sm:basis-5/12">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input {...field} label="Nome" defaultValue={user?.name} id="name" placeholder="Nome" />
          )}
        />
        <small className="text-red-500">{errors.name?.message}</small>
      </div>
      <div className="grow sm:basis-5/12">
        <Controller
          name="email"
          control={control}
          defaultValue={user?.email}
          render={({ field }) => (
            <Input
              {...field}
              label="Email"
              defaultValue={user?.email}
              id="email"
              placeholder="Email"
            />
          )}
        />
        <small className="text-red-500">{errors.email?.message}</small>
      </div>
      <div className="basis-12/12 mt-2 grow">
        <Controller
          id="biography"
          name="bio"
          control={control}
          defaultValue={user?.bio}
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder="Escreva um resumo sobre você"
              defaultValue={user?.bio}
              id="biography"
            />
          )}
        />
        <small className="text-red-500">{errors.bio?.message}</small>
      </div>
      <div className="flex w-full items-center justify-center">
        Alterar foto de perfil:
        <input
          type="file"
          onChange={(event) => setFile(event.target.files[0])}
          id="change-profile-picture"
          name="change-profile-picture"
          data-testid="change-profile-picture"
          className="ml-6"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        {file && (
          <>
            <Image
              src={URL.createObjectURL(file)}
              alt="profile-pic-preview"
              width="200px"
              height="200px"
              className="h-10 w-10 rounded-full object-cover"
            />
            {loading && (
              <div className="mt-2.5 ml-2.5">
                <Loading />
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
