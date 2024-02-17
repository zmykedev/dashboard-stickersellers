import {
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
  ValidationResult,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { Description, fieldBorderStyles, FieldError, Input, Label } from '../Field'
import { ctrp, focusRing } from '../utils'

const inputStyles = tv({
  extend: focusRing,
  base: 'border-2 rounded-md',
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    ...fieldBorderStyles.variants,
  },
})

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  onChange?: (value: string) => void
}

export function TextField({
  label,
  description,
  errorMessage,
  onChange,
  ...props
}: TextFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }
  return (
    <AriaTextField {...props} className={ctrp(props.className, 'flex flex-col gap-1')}>
      {label && <Label>{label}</Label>}
      <Input className={inputStyles} onChange={handleChange} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  )
}
