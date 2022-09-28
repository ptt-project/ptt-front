/* eslint-disable @typescript-eslint/typedef */
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import { isNumber } from 'lodash'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import InputNumberFormat from '~/components/main/InputNumberFormat'
import styles from './InputCounter.module.scss'

interface IInputCounterProps {
  value?: number
  onChange?: (value: number) => void
  onBlur?: (value: number) => void
  onValueToZero?: (value: number) => void
  min?: number
  max?: number
  step?: number
}

const InputCounter: FC<IInputCounterProps> = (props: IInputCounterProps) => {
  const { value, onChange, onBlur, onValueToZero, min, max, step = 1 } = props

  const [localValue, setLocalValue] = useState<number>(value)

  const getNewValue = useCallback(
    (newValue: number) => {
      let tempValue: number = Number(newValue ?? 0)
      const isConfigMax = isNumber(max)
      const isConfigMin = isNumber(min)
      if (isConfigMax) {
        tempValue = Math.min(max, tempValue)
      }
      if (isConfigMin) {
        tempValue = Math.max(min, tempValue)
      }
      return tempValue
    },
    [max, min]
  )

  const handleIncreaseClick: VoidFunction = useCallback((): void => {
    const newValue: number = getNewValue((value || 0) + step)
    onBlur?.(newValue)
    setLocalValue(newValue)
    onChange?.(newValue)
  }, [getNewValue, step, value, onChange, onBlur])

  const handleDecreaseClick: VoidFunction = useCallback((): void => {
    const newValue: number = getNewValue((value || 0) - step)
    if (newValue === 0 && onValueToZero) {
      onValueToZero(newValue)
    } else {
      onBlur?.(newValue)
      setLocalValue(newValue)
      onChange?.(newValue)
    }
  }, [getNewValue, step, value, onChange, onBlur, onValueToZero])

  const handleBlur: VoidFunction = useCallback((): void => {
    const newValue: number = getNewValue(localValue)
    onBlur?.(localValue)
    setLocalValue(newValue)
    onChange?.(newValue)
  }, [localValue, onChange, getNewValue, onBlur])

  const isMinimum: boolean = useMemo(
    (): boolean => (isNumber(min) ? value <= min : false),
    [min, value]
  )

  const isMaximum: boolean = useMemo(
    (): boolean => (isNumber(max) ? value >= max : false),
    [max, value]
  )

  useEffect(() => {
    if (value === undefined) {
      onChange?.(min ?? 0)
    }
  }, [min, value, onChange])

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  return (
    <Row className={styles.layout} wrap={false} align="middle">
      <Col className={styles.decreaseLayout}>
        <Button
          type="text"
          icon={<MinusOutlined />}
          onClick={handleDecreaseClick}
          disabled={isMinimum}
        />
      </Col>
      <Row>
        <InputNumberFormat
          value={localValue}
          allowEmptyFormatting={false}
          onChange={(v: number): void => {
            setLocalValue(v)
          }}
          onBlur={handleBlur}
        />
      </Row>
      <Col className={styles.increaseLayout}>
        <Button
          type="text"
          icon={<PlusOutlined />}
          onClick={handleIncreaseClick}
          disabled={isMaximum}
        />
      </Col>
    </Row>
  )
}

InputCounter.defaultProps = {
  value: undefined,
  onChange: undefined,
  onBlur: undefined,
  onValueToZero: undefined,
  min: undefined,
  max: undefined,
  step: 1
}

export default InputCounter
