import React, { FC } from 'react'
import { Spin } from 'antd'
import styles from './Loading.module.scss'

interface ILoadingProps {
  show?: boolean
}

const Loading: FC<ILoadingProps> = (props: ILoadingProps) => {
  if (!props.show) {
    return null
  }

  return (
    <div className={styles.overlay}>
      <div className="bounce-loader">
        <Spin size="large" />
        {/* 
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
          <div className="bounce4" />
        */}
      </div>
    </div>
  )
}

Loading.defaultProps = {
  show: false
}

export default Loading
