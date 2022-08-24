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
Pick<InputProps, 'suffix'> & {
  value?: string
  onChange?: (value: number) => void
}

const InputNumberFormat: React.FC<IInputNumberFormatProps> = (props: IInputNumberFormatProps) => {
  const { value, onChange, ...restProps } = props

  const handleChange = useCallback(
    (values: NumberFormatValues): void => {
      const { floatValue } = values
      onChange?.(floatValue)
    },
    [onChange]
  )

  return (
    <NumberFormat
      {...restProps}
      value={value}
      // customInput={(customInputProps: any) => <Input {...customInputProps} suffix={suffix} />}
      customInput={Input}
      onValueChange={handleChange}
    />
  )
}

InputNumberFormat.defaultProps = {
  value: undefined,
  onChange: undefined
}

export default InputNumberFormat
