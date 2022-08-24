import React from 'react'

export const Input = React.forwardRef((props, ref) => {
  return (
    <div className="flex w-full flex-col">
      <input
        type={props?.type || 'text'}
        ref={ref}
        id={props?.id}
        placeholder={props?.placeholder}
        defaultValue={props?.defaultValue}
        onChange={props?.onChange}
        className={`border-3 mb-3 w-full border-indigo-200 border-t-transparent border-r-transparent border-l-transparent border-b-indigo-500 bg-transparent p-2 font-sans text-sm font-medium text-black-300 focus:outline-primary-200 dark:text-white-100`}
      ></input>
    </div>
  )
})
