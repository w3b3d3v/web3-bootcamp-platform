import Image from 'next/image'
import React from 'react'
import Loading from '../../../Loading'
import { Col, Container, Input,NextUIProvider,Textarea } from '@nextui-org/react'

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
    <Container css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', h:'70vh' }}>
        <div className='flex flex-col justify-center' >
          <div className="align-center mb-16 flex justify-center gap-x-24">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  defaultValue={user?.name}
                  labelPlaceholder="Nome"
                  id="name"
                  placeholder="Nome"
                  size="md"
                  bordered
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue={user?.email}
              render={({ field }) => (
                <Input
                  {...field}
                  labelPlaceholder="Email"
                  defaultValue={user?.email}
                  id="email"
                  placeholder="Email"
                  size="md"
                  bordered
                  helperText={errors.name?.message}
                />
              )}
            />
          </div>
          <div>
            <Controller
              id="biography"
              name="bio"
              control={control}
              defaultValue={user?.bio}
              render={({ field }) => (
                <Textarea
                  {...field}
                  labelPlaceholder="Descreva de maneira breve sua experiência com web3"
                  defaultValue={user?.bio}
                  id="biography"
                  size="lg"
                  clearable
                  bordered
                  helperText={errors.bio?.message}
                  width={'100%'}
                />
              )}
            />
          </div>
        </div>

      <div className="mt-2 hidden w-full flex-col items-center justify-center lg:flex-row">
        <label className="bg-black-500 cursor-pointer rounded-md p-3 text-sm text-black-400 dark:bg-white-100">
          Alterar foto de perfil 📷
          <input
            type="file"
            onChange={(event) => setFile(event.target.files[0])}
            id="change-profile-picture"
            name="change-profile-picture"
            data-testid="change-profile-picture"
            className="hidden"
          />
        </label>
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
    </Container>
  )
}
