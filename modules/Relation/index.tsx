import React, { useMemo, useState } from 'react'
import { Button, Col, message, Row, Tabs, Typography } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import { RawNodeDatum } from 'react-d3-tree/lib/types/common'
import { concat, groupBy, map } from 'lodash'
import { CopyOutlined } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import t from '~/locales'
import { CustomUrlUtil } from '~/utils/main'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import styles from './Relation.module.scss'
import RelationTree from './components/RelationTree'
import RelationTable from './components/RelationTable'
import { IRelationData, IRelationTableData } from '~/interfaces'

const { TabPane } = Tabs

const { Title } = Typography

enum RelationTabs {
  RELATION_TREE = 'relationTree',
  RELATION_TABLE = 'relationTable'
}

const Relation: React.FC = () => {
  const router: NextRouter = useRouter()
  const [tabActive, setTabActive] = useState<RelationTabs>(RelationTabs.RELATION_TREE)

  const inviteLink: string = 'inviteLink'
  const messageCopyInviteSuccess: string = t('relation.copyInviteSuccess')
  const relationData: IRelationData[] = mockRelationData

  // eslint-disable-next-line @typescript-eslint/typedef
  const customData = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/typedef
    const relationByParent = groupBy(relationData, 'parent')
    const relationTableData: IRelationTableData[] = []

    const childrenOf = (parent: string, relationLevel: number): RawNodeDatum[] =>
      map(relationByParent[parent] || [], (item: IRelationData) => {
        relationTableData.push({ ...item, relationLevel })
        return {
          name: item.username,
          children: childrenOf(item.username, relationLevel + 1)
        }
      })
    const relationDataTree: RawNodeDatum = {
      name: 'Me',
      children: childrenOf('Me', 1)
    }
    return { relationDataTree, relationTableData }
  }, [relationData])

  function onTabChange(tabKey: RelationTabs): void {
    setTabActive(tabKey)
  }
  message.config({
    duration: 1.5,
    maxCount: 3
  })

  function onCopyClick(test: string, isSuccess: boolean): void {
    if (isSuccess) {
      message.success(messageCopyInviteSuccess)
    }
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('meta.title')} | {t('relation.title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('auth.changePassword.breadcrumbs.setting') },
          { title: t('auth.changePassword.breadcrumbs.account') },
          {
            title: t('relation.breadcrumbs.relation'),
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
                  {t('relation.title')}
                </Title>
                <CopyToClipboard text={inviteLink} onCopy={onCopyClick}>
                  <Button
                    className={`${styles.copyInviteButton} hps-btn-secondary`}
                    icon={<CopyOutlined />}
                  >
                    {t('relation.button.copyInvite')}
                  </Button>
                </CopyToClipboard>
              </Row>
              <Tabs defaultActiveKey={tabActive} onChange={onTabChange}>
                <TabPane tab={t('relation.tabs.tree')} key={RelationTabs.RELATION_TREE}>
                  <RelationTree data={customData.relationDataTree} />
                </TabPane>
                <TabPane tab={t('relation.tabs.table')} key={RelationTabs.RELATION_TABLE}>
                  <RelationTable data={customData.relationTableData} />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

const mockRelationDataLevel1: IRelationData[] = [
  {
    username: 'EnthusiastBulldog',
    commission: 10,
    parent: 'Me'
  },
  {
    username: 'Lumberturtle',
    commission: 10,
    parent: 'Me'
  },
  {
    username: 'SmartsWarthog',
    commission: 1,
    parent: 'Me'
  }
]

const mockRelationDataLevel2: IRelationData[] = [
  {
    username: 'GamerPaintedTurtle',
    commission: 3,
    parent: 'EnthusiastBulldog'
  },
  {
    username: 'TechieCardinal',
    commission: 7,
    parent: 'EnthusiastBulldog'
  },
  {
    username: 'DorkTundraWolf',
    commission: 2,
    parent: 'SmartsWarthog'
  },
  {
    username: 'WizardGuineaPig',
    commission: 3,
    parent: 'SmartsWarthog'
  },
  {
    username: 'WhizFiddlerCrab',
    commission: 37,
    parent: 'SmartsWarthog'
  },
  {
    username: 'HipsterWalkingstick',
    commission: 99,
    parent: 'SmartsWarthog'
  },
  {
    username: 'NerdMoth',
    commission: 40,
    parent: 'SmartsWarthog'
  }
]

const mockRelationDataLevel3: IRelationData[] = [
  {
    username: 'GothZorro',
    commission: 20,
    parent: 'NerdMoth'
  }
]
const mockRelationData: IRelationData[] = concat(
  mockRelationDataLevel1,
  mockRelationDataLevel2,
  mockRelationDataLevel3
)

export default Relation
