import React, { FC } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { Breadcrumb } from 'antd'
import { IBreadcrumb, IBreadcrumbItem } from '~/interfaces'
import { CustomUrl } from '~/utils/main'

const Breadcrumbs: FC<IBreadcrumb> = (props: IBreadcrumb) => {
  const router: NextRouter = useRouter()

  function renderItem(): JSX.Element | JSX.Element[] {
    if (props.items && props.items.length) {
      return props.items.map((item: IBreadcrumbItem) => {
        if (item.href) {
          return (
            <Breadcrumb.Item key={item.title} href={CustomUrl.href(item.href, router.locale)}>
              {item.title}
            </Breadcrumb.Item>
          )
        }
        return <Breadcrumb.Item key={item.title}>{item.title}</Breadcrumb.Item>
      })
    }
    return null
  }

  return (
    <div className="container">
      <div className="mt-5 mb-5">
        <Breadcrumb separator={<i className="fas fa-chevron-right" />}>
          <Breadcrumb.Item href={CustomUrl.href('/', router.locale)}>
            <i className="fas fa-home" />
          </Breadcrumb.Item>
          {renderItem()}
        </Breadcrumb>
      </div>
    </div>
  )
}

export default Breadcrumbs
