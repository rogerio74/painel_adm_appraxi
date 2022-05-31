import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
  useCallback,
  useState
} from 'react'
import { FieldError } from 'react-hook-form'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import style from './styles.module.scss'

interface IInputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  isPassword?: boolean
  Icon?: ReactNode
  error?: FieldError | undefined
  label?: string
}

export const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputBaseProps> = (
  { Icon, label, isPassword = false, error = null, ...rest },
  ref
) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleShowPassword = () => setShowPassword(!showPassword)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputOnBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  return (
    <div className={style.container_input}>
      {label && (
        <label className={style.label} htmlFor={label}>
          {label}
        </label>
      )}
      <div data-isfocus={isFocused} className={style.wrapper_input}>
        {isPassword ? (
          <>
            {Icon}
            <input
              onFocus={handleInputFocus}
              id={label}
              ref={ref}
              type={!showPassword ? 'password' : 'text'}
              {...rest}
              onBlur={handleInputOnBlur}
              autoComplete="off"
            />
            {showPassword ? (
              <AiFillEye className={style.icon_input_eyes} onClick={() => handleShowPassword()} />
            ) : (
              <AiFillEyeInvisible
                className={style.icon_input_eyes}
                onClick={() => handleShowPassword()}
              />
            )}
          </>
        ) : (
          <>
            {Icon}
            <input
              onFocus={handleInputFocus}
              ref={ref}
              {...rest}
              onBlur={handleInputOnBlur}
              autoComplete="off"
            />
          </>
        )}
      </div>
      {!!error && <span className="error">{error.message}</span>}
    </div>
  )
}

export const Input = forwardRef(InputBase)
