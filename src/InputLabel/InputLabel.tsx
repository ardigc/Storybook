import classNames from 'classnames'
import { useContext, ReactNode } from 'react'
import { FormControlContext } from '../FormControl/FormControl'

export interface InputLabelProps {
  children?: ReactNode
  className?: string
  htmlFor?: string
  disableAnimation?: boolean
  shrink?: boolean
  color?: 'primary' | 'secundary' | 'error' | 'warning' | 'info' | 'success'
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
  disabled?: boolean
  error?: boolean
  size?: 'medium' | 'small'
  margin?: 'dense' | 'none'
  variant?: 'filled' | 'outlined' | 'standard'
}
export default function InputLabel({
  children,
  htmlFor,
  className,
  disableAnimation,
  shrink,
  error,
  color = error ? 'error' : 'primary',
  labelProps,
  disabled,
  margin,
  size = 'medium',
  variant,
}: InputLabelProps) {
  const { contextVariant, contextTouched, setLabel, contextColor, contextDisabled } = useContext(FormControlContext)
  variant = contextVariant ? contextVariant : variant
  shrink=contextTouched?contextTouched:shrink
  color=contextColor?contextColor:color
disabled=contextDisabled?contextDisabled:disabled

  if(setLabel)setLabel(children)
  return (
    <label
      htmlFor={htmlFor}
      className={classNames({
        relative: !shrink && !variant,
        'absolute origin-top-left text-lg cursor-text left-0  z-10 ':
          !shrink || variant,

        'normal-label-text-field-filled':
          (variant === 'filled' && !shrink) ||
          (variant === 'outlined' && !shrink && size === 'medium'),
        ' translate-x-3 translate-y-3 ':
          variant === 'outlined' && !shrink && size === 'small',
        '-translate-y-2 translate-x-4  scale-75':
          variant === 'outlined' && shrink,
        'mini-label-text-field-filled': variant === 'filled' && shrink,
        ' translate-y-4': variant === 'standard' && !shrink,
        ' -translate-y-1  scale-75': variant === 'standard' && shrink,
        'opacity-30': disabled,
        'opacity-70': !disabled,
        'transition-all': !disableAnimation,
        'mt-2 mb-1': margin === 'dense',
        // [`text-${color}-color`]: shrink && color,
        'text-primary-color': shrink && color === 'primary',
        'text-secundary-color': shrink && color === 'secundary',
        'text-error-color': shrink && color === 'error',
        'text-warning-color': shrink && color === 'warning',
        'text-info-color': shrink && color === 'info',
        'text-success-color': shrink && color === 'success',

        [className || '']: className,
      })}
      {...labelProps}
    >
      {children}
    </label>
  )
}
