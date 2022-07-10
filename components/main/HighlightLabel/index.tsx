import React, { FC, CSSProperties } from 'react'
import styles from './HighlightLabel.module.scss'

interface IHighlightLabelProps {
  title: string
  color?: string
  className?: string
  style?: CSSProperties
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

  const className: string = props.className ? `${styles[key]} ${props.className}` : styles[key]

  return (
    <div className={className} style={props.style}>
      <h6>{props.title}</h6>
    </div>
  )
}

HighlightLabel.defaultProps = {
  color: 'secondary',
  className: '',
  style: {}
}

export default HighlightLabel
