import React from 'react'

export const Button = React.forwardRef((props, ref) => {
  const stdClass =
    'text-black-300 border-transparent font-bold text-sm rounded-lg bg-primary-300 px-2 py-2 transition duration-150 ease-in-out no-underline'
  const primaryButton = props?.disabled
    ? `${stdClass} ${props?.customClass}`
    : `${stdClass} cursor-pointer hover:scale-105 ${
        props?.customClass || ''
      }`

  const secondaryButton = `bg-transparent font-medium rounded-lg px-4 py-3 cursor-pointer border-2 border-primary-300 text-sm text-primary-300 transition duration-150 ease-in-out hover:border-primary-400 hover:text-primary-400 font-bold  ${
    props?.customClass || ''
  }`
  return (
    <button
      disabled={props?.disabled}
      type={props?.type || 'button'}
      ref={ref}
      id={props?.id}
      data-testid={props.dataTestId}
      className={
        props?.style === 'primary'
          ? primaryButton
          : props?.style === 'secondary'
          ? secondaryButton
          : primaryButton
      }
      onClick={props?.onClick || null}
    >
      {props?.children}
    </button>
  )
})
