import React from 'react'

export const Textarea = React.forwardRef((props, ref) => {
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={props?.id} className="text-sm font-medium leading-none text-black-200 dark:text-gray-100 mb-2">
          {props?.label}
        </label>
        <textarea
          type={props?.type || 'text'}
          ref={ref}
          id={props?.id}
          placeholder={props?.placeholder}
          defaultValue={props?.defaultValue}
          onChange={props?.onChange}
          className="w-full rounded-lg border-2 p-2 border-solid text-black-300 dark:text-white-100 
            font-medium text-sm font-sans focus:outline-primary-200 resize-y mb-3"
        >
        </textarea>
      </div>
    </>
  )
})
