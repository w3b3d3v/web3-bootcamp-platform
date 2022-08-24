import React from 'react'
import Select from 'react-select'
import { langOptions } from '../../../../lib/utils/constants'

export default function ProfessionalData({ Controller, control, errors, register }) {
  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'rgb(59, 59, 59)', border: '2px solid rgb(99 102 241)' }),
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? '#8960F3' : 'rgb(59, 59, 59)',
        color: 'white',
      }
    },
    input: (styles) => ({ ...styles, color: 'white' }),
  }

  return (
    <>
      <div className="flex w-full flex-col gap-x-8 lg:flex-row">
        <div className="grow sm:basis-2/12 ">
          <div className="flex flex-col">
            <label
              htmlFor={'devExp'}
              className="mb-2 text-sm font-medium leading-none text-black-200 dark:text-gray-100"
            >
              Qual ano você começou a trabalhar com desenvolvimento?
            </label>
            <input
              {...register('devExp')}
              id={'devExp'}
              placeholder="Insira o ano de início da sua experiência profissional com desenvolvimento"
              className="border-3 mb-3 w-full border-indigo-200 border-t-transparent border-r-transparent border-l-transparent border-b-indigo-500 bg-transparent p-2 font-sans text-sm font-medium text-black-300 focus:outline-primary-200 dark:text-white-100"
            />
          </div>
          <small className="text-red-500">{errors.devExp?.message}</small>
        </div>
        <div className="grow sm:basis-2/12">
          <div className="flex flex-col">
            <label
              htmlFor={'blockchainExp'}
              className="mb-2 text-sm font-medium leading-none text-black-200 dark:text-gray-100"
            >
              Qual ano você começou a trabalhar com blockchain?
            </label>
            <input
              {...register('blockchainExp')}
              id={'blockchainExp'}
              placeholder="Insira o ano de início da sua experiência profissional com blockchain"
              className="border-3 mb-3 w-full border-indigo-200 border-t-transparent border-r-transparent border-l-transparent border-b-indigo-500 bg-transparent p-2 font-sans text-sm font-medium text-black-300 focus:outline-primary-200 dark:text-white-100"
            />
          </div>
          <small className="text-red-500">{errors.blockchainExp?.message}</small>
        </div>
      </div>
      <div className="grow sm:basis-5/12">
        <div className="flex flex-col">
          <label
            htmlFor="technologies"
            className="mb-1 text-sm font-medium leading-none text-black-200 dark:text-gray-100 lg:mb-9 xl:mb-6 2xl:mb-3"
          >
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
    </>
  )
}
