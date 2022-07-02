import React from 'react'

export const Input = React.forwardRef((props, ref) => {
  return (
    <>
      <div class="flex flex-col">
        <label for={props?.id} class="text-sm font-medium leading-none text-black-200 dark:text-gray-100 mb-2">
            {props?.label}
        </label>
        <input
          type={props?.type || 'text'}
          ref={ref}
          id={props?.id}
          placeholder={props?.placeholder}
          defaultValue={props?.defaultValue}
          onChange={props?.onChange}
          class="w-full rounded-lg border-2 p-2 border-solid text-black-300 dark:text-white-100 
            font-medium text-sm font-sans focus:outline-primary-200 mb-3"
        >
        </input>
      </div>
    </>
  )
})
