/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable no-template-curly-in-string */
import React, { ChangeEvent, useCallback } from 'react'
import { Input, InputProps } from 'antd'
import { RegExpConst } from '~/constants'

interface ICustomInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  onlyNumber?: true
  onlyLetter?: true
}

const CustomInput: React.FC<ICustomInputProps> = (props: ICustomInputProps) => {
  const { value, onChange, onlyNumber, onlyLetter, ...restProps } = props

  const parseValue = useCallback(
    (v: string): string => {
      let tempV = v || ''

      if (onlyNumber) {
        tempV = tempV.replace(RegExpConst.ALLOW_NUMBER, '')
      } else if (onlyLetter) {
        tempV = tempV.replace(RegExpConst.ALLOW_LETTER, '')
      }
      return tempV
    },
    [onlyLetter, onlyNumber]
  )

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const tempValue = event.target.value || ''
      onChange?.(parseValue(tempValue))
    },
    [onChange, parseValue]
  )

  return <Input {...restProps} value={value} onChange={handleChange} />
}

CustomInput.defaultProps = {
  value: undefined,
  onChange: undefined,
  onlyNumber: undefined,
  onlyLetter: undefined
}

export default CustomInput
