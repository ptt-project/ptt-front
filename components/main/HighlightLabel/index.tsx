import React, { FC } from 'react'
import styles from './HighlightLabel.module.scss'

interface IHighlightLabelProps {
  title: string
  color?: string
}

const HighlightLabel: FC<IHighlightLabelProps> = (props: IHighlightLabelProps) => {
  let key: string
  switch (props.color) {
    case 'primary':
      key = 'labelPrimary'
      break
    case 'secondary':
      key = 'labelSecondary'
      break
    case 'success':
      key = 'labelSuccess'
      break
    case 'info':
      key = 'labelInfo'
      break
    case 'warning':
      key = 'labelWarning'
      break
    case 'error':
      key = 'labelError'
      break
    default:
      key = 'labelSecondary'
      break
  }
  return (
    <div className={styles[key]}>
      <h6>{props.title}</h6>
    </div>
  )
}

HighlightLabel.defaultProps = {
  color: 'secondary'
}

export default HighlightLabel
