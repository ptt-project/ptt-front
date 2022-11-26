import React, { FC } from 'react'
import styles from './EmptySellerTable.module.scss'
import { useTranslation } from 'next-i18next'
import { Typography } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import Image from '../Image'

const { Text } = Typography

const EmptySellerTable: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst])

  return (
    <div className={styles.tableEmpty}>
      <Image
        rootClassName={styles.img}
        src="./images/main/seller/shop-category-empty.png"
        alt="register-success"
        ratio={4 / 3}
      />
      <Text type="secondary">{t('common:emptyProduct')}</Text>
    </div>
  )
}

export default EmptySellerTable
