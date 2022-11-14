import React, { FC } from 'react'
import SidebarContainer from '~/components/main/SidebarContainer'
import styles from './SearchSidebar.module.scss'
import { useTranslation } from 'next-i18next'
import { Typography, Button, Select, Checkbox, Input, Radio, Rate } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import { IOption } from '~/interfaces'
import { ShopTypeEnum } from '~/enums'

const { Text, Title } = Typography

const SearchSidebar: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'search'])

  const regionOptions: IOption[] = [
    { label: t('search:sidebar.region.inland'), value: 'in' },
    { label: t('search:sidebar.region.outland'), value: 'out' },
    { label: t('search:sidebar.region.capital'), value: 'cap' },
    { label: t('search:sidebar.region.north'), value: 'n' },
    { label: t('search:sidebar.region.northEast'), value: 'ne' },
    { label: t('search:sidebar.region.east'), value: 'east' },
    { label: t('search:sidebar.region.central'), value: 'c' },
    { label: t('search:sidebar.region.west'), value: 'w' },
    { label: t('search:sidebar.region.south'), value: 's' }
  ]

  const shopTypeOptions: IOption[] = [
    { label: t('search:sidebar.shopType.mall'), value: ShopTypeEnum.NORMAL },
    { label: t('search:sidebar.shopType.recommended'), value: ShopTypeEnum.MALL }
  ]

  const serviceOptions: IOption[] = [
    { label: t('search:sidebar.service.discount'), value: 0 },
    { label: t('search:sidebar.service.readyToShip'), value: 1 },
    { label: t('search:sidebar.service.freeDelivery'), value: 2 }
  ]

  return (
    <SidebarContainer>
      <div className={styles.container}>
        <div className={styles.section}>
          <Title level={5}>{t('search:sidebar.category')}</Title>
          <div className={styles.control}>
            <Select style={{ width: '100%' }}>
              <Select.Option value="">{t('common:form.option')}</Select.Option>
            </Select>
          </div>
        </div>
        <div className={styles.section}>
          <Title level={5}>{t('search:sidebar.region.title')}</Title>
          <div className={styles.control}>
            <Checkbox.Group className={styles.checkbox} options={regionOptions} />
          </div>
        </div>
        <div className={styles.section}>
          <Title level={5}>{t('search:sidebar.amount')}</Title>
          <div className={styles.control}>
            <div className={styles.flex}>
              <Input />
              <Text className="ml-2 mr-2">-</Text>
              <Input />
            </div>
            <Button type="primary">{t('common:ok')}</Button>
          </div>
        </div>
        <div className={styles.section}>
          <Title level={5}>{t('search:sidebar.rating')}</Title>
          <div className={styles.control}>
            <Radio.Group className={styles.radio}>
              <Radio value={1}>
                <Rate className={styles.rating} disabled defaultValue={5} />
              </Radio>
              <Radio value={2}>
                <Rate className={styles.rating} disabled defaultValue={4} />
              </Radio>
              <Radio value={3}>
                <Rate className={styles.rating} disabled defaultValue={3} />
              </Radio>
              <Radio value={4}>
                <Rate className={styles.rating} disabled defaultValue={2} />
              </Radio>
              <Radio value={5}>
                <Rate className={styles.rating} disabled defaultValue={1} />
              </Radio>
            </Radio.Group>
          </div>
        </div>
        <div className={styles.section}>
          <Title level={5}>{t('search:sidebar.shopType.title')}</Title>
          <div className={styles.control}>
            <Checkbox.Group className={styles.checkbox} options={shopTypeOptions} />
          </div>
        </div>
        <div className={styles.section}>
          <Title level={5}>{t('search:sidebar.service.title')}</Title>
          <div className={styles.control}>
            <Checkbox.Group className={styles.checkbox} options={serviceOptions} />
          </div>
          <Button className="hps-btn-secondary">{t('common:removeAll')}</Button>
        </div>
      </div>
    </SidebarContainer>
  )
}

export default SearchSidebar
