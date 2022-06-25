import React, { useState, FC } from 'react'
import { useRouter, NextRouter } from 'next/router'
import NextLink from 'next/link'
import Helmet from 'react-helmet'
import { Typography } from 'antd'
import ProfileForm from './components/ProfileForm'
import t from '~/locales'

const { Link } = Typography
interface IFormModel {
  firstName: string
  lastName: string
  mobileNo: string
  email: string
  username: string
  password: string
}

const Profile: FC = () => {
  const router: NextRouter = useRouter()
  const [form, setForm] = useState<IFormModel>({
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: '',
    username: '',
    password: ''
  })
  const [step, setStep] = useState<number>(0)

  function renderStep(): JSX.Element {
    switch (step) {
      case 0:
        return <ProfileForm setForm={setForm} setStep={setStep} />
      default:
        return <ProfileForm setForm={setForm} setStep={setStep} />
    }
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('meta.title')} | {t('accountProfile.title')}
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
      {renderStep()}
    </main>
  )
}

export default Profile
