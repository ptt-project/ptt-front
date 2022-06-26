import React, { useState, FC } from 'react'
import { useRouter, NextRouter } from 'next/router'
import NextLink from 'next/link'
import Helmet from 'react-helmet'
import { Typography, Row, Col } from 'antd'
import ProfileForm from './components/ProfileForm'
import ProfileEmail from './components/ProfileEmail'
import ProfilePhone from './components/ProfilePhone'
import t from '~/locales'

const {  Link } = Typography
interface IFormModel {
  firstName: string
  lastName: string
  mobileNo: string
  email: string
}

const Profile: FC = () => {
  const router: NextRouter = useRouter()
  const [form, setForm] = useState<IFormModel>({
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: ''
  })
  const [step, setStep] = useState<number>(0)

  function renderStep(): JSX.Element {
    switch (step) {
      case 0:
        return <ProfileForm setForm={setForm} setStep={setStep}/>
      case 1:
        return <ProfileEmail setForm={setForm} setStep={setStep}/>
      case 2:
        return <ProfilePhone setForm={setForm} setStep={setStep}/>
      default:
        return <ProfileForm setForm={setForm} setStep={setStep} />
    }
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('meta.title')} | {t('accountProfile.form.title')}
        </title>
      </Helmet>
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <NextLink href="/" locale={router.locale}>
                <Link>
                  <i className="d-icon-home" />
                </Link>
              </NextLink>
            </li>
            <li>{t('accountProfile.setting')}</li>
            <li>{t('accountProfile.personal_information')}</li>
            <li>{t('accountProfile.title')}</li>
          </ul>
        </div>
      </nav>
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6} lg={0}>
              Menu
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} md={24}>
              {renderStep()}
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default Profile
