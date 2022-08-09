import React from 'react'
import { Col, Row, Typography } from 'antd'
import { useTranslation } from 'next-i18next'
import styles from './RelationCount.module.scss'
import { LocaleNamespaceConst } from '~/constants'

const { Text } = Typography

interface IRelationCountProps {
  relationLevelLabel: string
  relationLevel: number
  count: number
}
const RelationCount: React.FC<IRelationCountProps> = (props: IRelationCountProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'relation'])

  return (
    <Row
      className={`${styles.relationCount} ${styles[`relation-level-${props.relationLevel}`]}`}
      gutter={[8, 8]}
      align="middle"
    >
      <Col>
        <Text>{props.relationLevelLabel}</Text>
      </Col>
      <Col className="text-right font-weight-bold" flex="auto">
        <Text>
          {props.count.toLocaleString('en-En', {
            maximumFractionDigits: 0
          })}
        </Text>
      </Col>
      <Col>
        <Text>{t('relation:table.childrenUnit')}</Text>
      </Col>
    </Row>
  )
}

export default RelationCount
