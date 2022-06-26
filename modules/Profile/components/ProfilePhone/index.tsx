import React, { FC } from 'react'
import { Typography, Button, Row, Col, Form, Input} from 'antd'
import t from '~/locales'
import styles from './ProfilePhone.module.scss'
import Link from 'next/link'
const { Text } = Typography
interface IFormEmailModel {
  email: string
  password: string
}
interface IProfilePhoneProps {
  setForm: (form: IFormEmailModel) => void
  setStep: (step: number) => void
}
const ProfilePhone: FC<IProfilePhoneProps> = (props: IProfilePhoneProps) => {
  const [form] = Form.useForm()
  function onSubmit(values: IFormEmailModel): void {
    props.setForm(values)
    props.setStep(1)
  }
  return (  
    <>  
      <Text>
        <h4 className={`text-center mb-5 ${styles.textEmailTitle}`}>{t('accountProfile.phone.titleEdit')}</h4>
      </Text>
        <Row gutter={[16, 8]}>
          <Col md={12} xs={12}>
            <Text className={styles.textPhoneList}>{t('accountProfile.phone.phoneList')}</Text>
          </Col>
          <Col md={12} xs={12} className='text-right'>
            <Link href="" >
              <Button className={styles.btnAddPhone}><i className={`fas fa-plus ${styles.paddingRight5}`}/>{t('accountProfile.button.addPhone')}</Button>
            </Link>
          </Col>
          <Col md={24} xs={64} className="alert alert-message alert-light alert-primary">
            <Text className={`${styles.textPhone} ${styles.paddingRight5}`} >081-111-1111</Text>
            <Button><i className={`fas fa-star ${styles.paddingRight5}`}/>{t('accountProfile.button.mainNumber')}</Button>
          </Col>
          
        </Row>
    </>    
  )
}

export default ProfilePhone
