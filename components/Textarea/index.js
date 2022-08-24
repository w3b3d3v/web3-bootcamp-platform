import React from 'react'

export const Textarea = React.forwardRef((props, ref) => {
  return (
    <>
      <div className="flex flex-col">
        <textarea
          type={props?.type || 'text'}
          ref={ref}
          id={props?.id}
          placeholder={props?.placeholder}
          defaultValue={props?.defaultValue}
          onChange={props?.onChange}
          className="border-4 mb-3 w-full border-indigo-200 border-t-transparent border-r-indigo-500 border-l-indigo-500 border-b-indigo-500 bg-transparent p-2 font-sans text-sm font-medium text-black-300 focus:outline-primary-200 dark:text-white-100"
        >
        </textarea>
      </div>
    </>
  )
})
