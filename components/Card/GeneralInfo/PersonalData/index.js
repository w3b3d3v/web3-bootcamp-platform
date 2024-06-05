import React, { useState, useMemo } from 'react';
import { Container, Input, Textarea, Button } from '@nextui-org/react';
import { Content, InputsContainer } from '../../../../styles/components/Card/GenerealInfo/PersonalData';
import { countries } from 'countries-list';
import { Dropdown } from "@nextui-org/react";
import Image from 'next/image';
import Loading from '../../../Loading';
import { useTranslation } from 'react-i18next'

export default function PersonalData({
  Controller,
  control,
  errors,
  user,
  file,
  setFile,
  setCountry,
  country,
  setZip,
  loading,
}) {
  const { t, i18n } = useTranslation()
  const countryOptions = Object.keys(countries).map((countryCode) => ({
    value: countryCode,
    label: countries[countryCode].name,
  }))

  const selectedValue = React.useMemo(
    () => Array.from(country).join(', ').replaceAll('_', ' '),
    [country]
  )

  const handleZip = (zip) => {
    setZip(zip.target.value)
  }

  return (
    <Container>
      <Content>
        <Button color={''} css={{ maxWidth: '100px', margin: 'auto' }}>
          <label className="">
            {t('profile.changeProfilePicture')} 📷
            <input
              type="file"
              onChange={(event) => setFile(event.target.files[0])}
              id="change-profile-picture"
              name="change-profile-picture"
              data-testid="change-profile-picture"
              className="hidden"
            />
          </label>
        </Button>
        <div className="flex w-full flex-col items-center justify-center">
          {file && (
            <>
              <Image
                src={URL.createObjectURL(file)}
                alt="profile-pic-preview"
                width="100px"
                height="100px"
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

        <InputsContainer>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                bordered
                helperColor="success"
                defaultValue={user?.name}
                labelPlaceholder="Nome"
                id="name"
                placeholder="Nome"
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
                bordered
                labelPlaceholder="Email"
                defaultValue={user?.email}
                id="email"
                placeholder="Email"
                helperText={errors.name?.message}
                width={'100%'}
              />
            )}
          />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <>
                <span style={{ marginBottom: '-2rem' }}>Onde você está?</span>
                <Dropdown {...field}>
                  <Dropdown.Button flat css={{ tt: 'capitalize' }}>
                    {selectedValue}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={country}
                    onSelectionChange={setCountry}
                  >
                    {countryOptions.map((option) => (
                      <Dropdown.Item key={option.label} value={option.label}>
                        {option.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          />
          <Controller
            name="zip"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                onChange={handleZip}
                bordered
                labelPlaceholder="CEP / Zip Code"
                id="zip"
                placeholder="90000004"
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
                bordered
                label="Descreva de maneira breve sua experiência com web3"
                defaultValue={user?.bio}
                id="biography"
                size="lg"
                clearable
                helperText={errors.bio?.message}
                width={'100%'}
              />
            )}
          />
        </div>
        {/* <EnglishLevelContainer>
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
        </EnglishLevelContainer> */}
      </Content>
    </Container>
  )
}
