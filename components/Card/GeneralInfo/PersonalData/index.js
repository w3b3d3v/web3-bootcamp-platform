import Image from 'next/image'
import React from 'react'
import Loading from '../../../Loading'
import {  Container, Input, Textarea, Radio, Col, Spacer } from '@nextui-org/react'
import { Content, EnglishLevelContainer, InputsContainer } from '../../../../styles/components/Card/GenerealInfo/PersonalData'
import { ScrollDownButton } from '../../../Button/ScrollDown'

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
    <Container>
      <Content>
        <InputsContainer>
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
                bordered
                helperText={errors.name?.message}
                width={'100%'}
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
                bordered
                helperText={errors.name?.message}
                width={'100%'}
              />
            )}
          />
        </InputsContainer>

        <div>
          <Controller
            id="biography"
            name="bio"
            control={control}
            defaultValue={user?.bio}
            render={({ field }) => (
              <Textarea
                {...field}
                label="Descreva de maneira breve sua experiência com web3"
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

        <EnglishLevelContainer>
          <Radio.Group
            label="Nivel de inglês"
            defaultValue="1"
            orientation="horizontal"
            color={'secondary'}
            size={'sm'}
          >
            <Radio value="1">Básico</Radio>
            <Radio value="2">Intermediario</Radio>
            <Radio value="3">Avançado</Radio>
            <Radio value="4">Fluente</Radio>
          </Radio.Group>
        </EnglishLevelContainer>
      </Content>
      <a href="#socialLinks">
        <ScrollDownButton />
      </a>

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
