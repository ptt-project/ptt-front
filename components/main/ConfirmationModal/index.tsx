import React, { useState, useEffect, FC } from 'react'
import { Typography, Button, Row, Col, Input, Modal } from 'antd'
import t from '~/locales'
import styles from './OtpModal.module.scss'

const { Text } = Typography


interface IConfirmationModalProps {
    isOpen: boolean
    toggle: () => void
    title?: string
    content: string
  }
const ConfirmationModal : FC<IConfirmationModalProps> = (props: IConfirmationModalProps) => {
    return ()
}

ConfirmationModal.defaultProps = {
  title: ''
}

export default ConfirmationModal