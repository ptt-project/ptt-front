/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable no-template-curly-in-string */
import React, { useCallback } from 'react'
import { Input, InputProps } from 'antd'
import NumberFormat, {
  InputAttributes,
  NumberFormatPropsBase,
  NumberFormatValues
} from 'react-number-format'

type IInputNumberFormatProps = Omit<
  NumberFormatPropsBase<InputAttributes>,
  'value' | 'onChange' | 'customInput' | 'onValueChange' | 'suffix'
> &
  Pick<InputProps, 'suffix'> &
  (
    | {
        value?: number
        onChange?: (value: number) => void
        onBlur?: () => void
        isValueString?: false
      }
    | {
        value?: string
        onChange?: (value: string) => void
        onBlur?: () => void
        isValueString?: true
      }
  )

const InputNumberFormat: React.FC<IInputNumberFormatProps> = (props: IInputNumberFormatProps) => {
  const { value, onChange, onBlur, isValueString, suffix, ...restProps } = props

  const handleChange = useCallback(
    (values: NumberFormatValues): void => {
      const { floatValue, value: stringValue } = values

      if (isValueString) {
        onChange?.(stringValue)
      } else if (isValueString === false) {
        onChange?.(floatValue)
      }
    },
    [onChange, isValueString]
  )

  const renderCustomInput = useCallback(
    (customInputProps: any) => <Input {...customInputProps} suffix={suffix} />,
    [suffix]
  )

  return (
    <NumberFormat
      {...restProps}
      value={value}
      customInput={renderCustomInput}
      onBlur={onBlur}
      onValueChange={handleChange}
    />
  )
}

InputNumberFormat.defaultProps = {
  value: undefined,
  onChange: undefined,
  isValueString: false
}

export default InputNumberFormat
