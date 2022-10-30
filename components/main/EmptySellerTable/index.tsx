import React, { FC } from 'react'
import styles from './EmptySellerTable.module.scss'
import { useTranslation } from 'next-i18next'
import { Typography, Image } from 'antd'
import { LocaleNamespaceConst } from '~/constants'

const { Text } = Typography

const EmptySellerTable: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst])

  return (
    <div className={styles.tableEmpty}>
      <div className={styles.imgContainer}>
        <Image
          rootClassName={styles.imgWrapper}
          preview={false}
          src="./images/main/seller/shop-category-empty.png"
          alt="register-success"
        />
      </div>
      <Text type="secondary">{t('common:emptyProduct')}</Text>
    </div>
  )
}

export default EmptySellerTable
