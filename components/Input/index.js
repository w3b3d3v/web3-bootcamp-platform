import React from 'react'

export const Input = React.forwardRef((props, ref) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={props?.id}
        className="mb-2 text-sm font-medium leading-none text-black-200 dark:text-gray-100"
      >
        {props?.label}
      </label>
      <input
        type={props?.type || 'text'}
        ref={ref}
        id={props?.id}
        placeholder={props?.placeholder}
        defaultValue={props?.defaultValue}
        onChange={props?.onChange}
        className="mb-3 w-full rounded-lg border-2 border-solid p-2 font-sans 
            text-sm font-medium text-black-300 focus:outline-primary-200 dark:text-white-100"
      ></input>
    </div>
  )
})
