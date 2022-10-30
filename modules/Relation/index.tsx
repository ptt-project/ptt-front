import React, { useMemo, useState } from 'react'
import Helmet from 'react-helmet'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import styles from './Relation.module.scss'
import RelationTree from './components/RelationTree'
import RelationTable from './components/RelationTable'
import { Button, Col, message, Row, Tabs, Typography } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import { RawNodeDatum } from 'react-d3-tree/lib/types/common'
import { CopyOutlined } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useTranslation } from 'next-i18next'
import { CustomUrlUtil } from '~/utils/main'
import { IRelationTableData } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import { RelationLevelEnum } from '~/enums'

const { TabPane } = Tabs

const { Title } = Typography

enum RelationTabs {
  RELATION_TREE = 'relationTree',
  RELATION_TABLE = 'relationTable'
}

const Relation: React.FC = () => {
  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'relation'])

  const [tabActive, setTabActive] = useState<RelationTabs>(RelationTabs.RELATION_TREE)

  const inviteLink: string = 'inviteLink' // TODO: รอ inviteLink ของจริง

  const relationTableData: IRelationTableData[] = useMemo(
    () => [
      {
        username: 'zamzbugg3',
        level: RelationLevelEnum.CHILD
      },
      {
        username: 'zamzbugg4',
        level: RelationLevelEnum.CHILD
      }
    ],
    []
  )
  const relationDataTree: RawNodeDatum = useMemo(
    () => ({
      name: 'testuser01',
      children: [
        {
          name: 'zamzbugg3',
          children: [],
          level: 1
        },
        {
          name: 'zamzbugg4',
          children: [],
          level: 1
        }
      ],
      level: 0
    }),
    []
  )

  function onTabChange(tabKey: RelationTabs): void {
    setTabActive(tabKey)
  }
  message.config({
    duration: 1.5,
    maxCount: 3
  })

  function onCopyClick(test: string, isSuccess: boolean): void {
    if (isSuccess) {
      message.success(t('relation:copyInviteSuccess'))
    }
  }

  return (
    <main className="main">
      <Helmet>
        {t('common:meta.title')} | {t('relation:title')}
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('relation:breadcrumbs.setting') },
          { title: t('relation:breadcrumbs.account') },
          {
            title: t('relation:breadcrumbs.relation'),
            href: CustomUrlUtil('/settings/account/relation', router.locale)
          }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row>
            <Col xl={6}>
              <SettingSidebar sidebarType="buyer" />
            </Col>
            <Col
              className="mx-auto"
              xl={{ span: 15, offset: 1 }}
              lg={{ span: 18, offset: 3 }}
              sm={24}
              xs={24}
            >
              <Row justify="space-between">
                <Title className="hps-title" level={4}>
                  {t('relation:title')}
                </Title>
                <CopyToClipboard text={inviteLink} onCopy={onCopyClick}>
                  <Button
                    className={`${styles.copyInviteButton} hps-btn-secondary`}
                    icon={<CopyOutlined />}
                  >
                    {t('relation:button.copyInvite')}
                  </Button>
                </CopyToClipboard>
              </Row>
              <Tabs defaultActiveKey={tabActive} onChange={onTabChange}>
                <TabPane tab={t('relation:tabs.tree')} key={RelationTabs.RELATION_TREE}>
                  <RelationTree data={relationDataTree} />
                </TabPane>
                <TabPane tab={t('relation:tabs.table')} key={RelationTabs.RELATION_TABLE}>
                  <RelationTable data={relationTableData} />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default Relation
