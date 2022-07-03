/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { ReactNode, useEffect, useMemo } from 'react'
import Helmet from 'react-helmet'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import { Col, Row, Typography } from 'antd'
import t from '~/locales'
import SideBarSettingMenu from '~/components/main/SideBarSettingMenu'

const getTextGenerator = (param: any, query: any) => null
const getDefaultTextGenerator = (path: any, query: any) => path
const generatePathParts = (pathStr: any) => {
  const pathWithoutQuery: any = pathStr.split('?')[0]
  return pathWithoutQuery.split('/').filter((v: any) => v.length > 0)
}

const Crumb: React.FC<any> = ({ text: defaultText, textGenerator, href, last = false }: any) => {
  const [text, setText] = React.useState(defaultText)

  useEffect(() => {
    // If `textGenerator` is nonexistent, then don't do anything
    if (!textGenerator) {
      return
    }
    // Run the text generator and set the text again
    textGenerator().then((finalText: string) => {
      setText(finalText)
    })
  }, [textGenerator])

  if (last) {
    return <Typography.Text>{text}</Typography.Text>
  }

  return (
    <li>
      <Link href={href}>{text}</Link>
    </li>
  )
}

interface IProfileLayoutProps {
  children: ReactNode
}
const ProfileLayout: React.FC<IProfileLayoutProps> = (props: IProfileLayoutProps) => {
  const { children } = props

  const router: NextRouter = useRouter()
  const breadcrumbs: any[] = useMemo((): any[] => {
    const asPathNestedRoutes: any = generatePathParts(router.asPath)
    const pathnameNestedRoutes: any = generatePathParts(router.pathname)

    const crumblist: any = asPathNestedRoutes.map((subpath: any, idx: any) => {
      // Pull out and convert "[post_id]" into "post_id"
      const param: any = pathnameNestedRoutes[idx].replace('[', '').replace(']', '')

      const href: any = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/')
      return {
        href,
        textGenerator: getTextGenerator(param, router.query),
        text: getDefaultTextGenerator(subpath, href)
      }
    })

    return [{ href: '/', text: 'Home' }, ...crumblist]
  }, [router.asPath, router.pathname, router.query, getTextGenerator, getDefaultTextGenerator])

  return (
    <main className="main account">
      <Helmet>
        <title>
          {t('meta.title')} | {t('accountProfile.form.title')}
        </title>
      </Helmet>
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            {breadcrumbs.map((crumb: any, idx: any) => (
              <Crumb {...crumb} key={`${idx}-a`} last={idx === breadcrumbs.length - 1} />
            ))}
          </ul>
        </div>
      </nav>
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6} lg={0}>
              <SideBarSettingMenu />
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} md={24}>
              {children}
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default ProfileLayout
