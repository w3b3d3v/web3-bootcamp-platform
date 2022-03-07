export default function Button({
  props,
  style,
  type,
  children,
  onClick,
  disabled,
}) {
  const primaryButton =
    'text-white mx-2 my-2 rounded bg-indigo-700 px-8 py-3 text-sm transition duration-150 ease-in-out hover:bg-indigo-600'

  const secondaryButton =
    'bg-white mx-2 my-2 rounded border border-indigo-700 px-8 py-3 text-sm text-indigo-700 transition duration-150 ease-in-out hover:border-indigo-600 hover:text-indigo-600'

  return (
    <button
      disabled={disabled}
      type={type}
      className={
        style === 'primary'
          ? primaryButton
          : style === 'secondary'
          ? secondaryButton
          : primaryButton
      }
      onClick={onClick}
    >
      {children}
    </button>
  )
}
