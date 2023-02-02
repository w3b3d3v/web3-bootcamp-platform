import { Card, Input, Grid } from '@nextui-org/react'
import React from 'react'
import Select from 'react-select'
import { builderEmojis, builderOptions, langOptions } from '../../../../lib/utils/constants'

export default function ProfessionalData({
  Controller,
  control,
  errors,
  register,
  getValues,
  setValue,
}) {
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: 'rgb(59, 59, 59)',
      border: '2px solid rgb(99 102 241)',
    }),
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? '#8960F3' : 'rgb(59, 59, 59)',
        color: 'white',
      }
    },
    input: (styles) => ({ ...styles, color: 'white' }),
  }

  const getEmojiByIndex = (index) => builderEmojis[index]

  const updateUserData = (option) => {
    if (getValues('builder')?.includes(option)) {
      return setValue(
        'builder',
        getValues('builder').filter((builder) => builder !== option)
      )
    }
    if (
      !getValues('builder') ||
      (!getValues('builder')?.includes(option) && getValues('builder').length < 3)
    ) {
      getValues('builder')
        ? setValue('builder', [...getValues('builder'), option])
        : setValue('builder', [option])
    }
  }

  return (
    <>
      <div className="text-center flex gap-2 flex-col">
        <label
          htmlFor={'devExp'}
          className="mb-2 block text-sm font-medium leading-none text-black-200 dark:text-gray-100"
        ></label>
        <Input
          {...register('devExp')}
          labelPlaceholder={'Qual ano você começou a trabalhar com desenvolvimento?'}
          width={'100%'}
          id={'devExp'}
          placeholder="Insira o ano de início da sua experiência profissional com desenvolvimento"
        />
        <small className="text-red-500">{errors.devExp?.message}</small>
        <div className="mt-4">
          <div className="flex flex-col">
            <label
              htmlFor={'blockchainExp'}
            >
            </label>
            <Input
              {...register('blockchainExp')}
              id={'blockchainExp'}
              labelPlaceholder={"Insira o ano de início da sua experiência profissional com blockchain"}
            />
          </div>
          <small className="text-red-500">{errors.blockchainExp?.message}</small>
        </div>
      </div>

      <div className="grow sm:basis-5/12">
        <div className="flex flex-col">
          <label htmlFor="technologies" className="mb-3 mt-3">
            Tecnologias com que trabalha
          </label>
          <Controller
            id="technologies"
            name="technologies"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                instanceId="technologies"
                isMulti
                className=""
                options={langOptions.map((option) => ({
                  label: option,
                  value: option,
                }))}
                styles={colourStyles}
              />
            )}
          />
          <small className="text-red-500">{errors.linguagens?.message}</small>
        </div>
      </div>

      <div className="py-2">
        Que tipo de <bold>builder</bold> {''}
        é você ? Selecione até 3 opções
        <br />
        <Grid.Container gap={2} justify="center">
          <div className="flex flex-wrap items-center justify-center">
            {builderOptions.map((option, index) => (
              <Grid xs={2}>
                <Card isHoverable variant="bordered">
                  <div
                    {...register('builder')}
                    key={option}
                    onClick={() => updateUserData(option)}
                    className={`m-2 flex cursor-pointer flex-col items-center justify-center rounded-lg text-center hover:bg-indigo-400 ${
                      getValues('builder')?.includes(option) ? 'bg-indigo-400' : 'bg-transparent'
                    }`}
                  >
                    <p className="m-0">{getEmojiByIndex(index)}</p>
                    <p className="m-0">{option}</p>
                  </div>
                </Card>
              </Grid>
            ))}
          </div>
        </Grid.Container>
      </div>
    </>
  )
}
