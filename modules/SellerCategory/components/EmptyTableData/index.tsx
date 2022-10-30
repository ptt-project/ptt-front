import React, { FC } from 'react'
import styles from './EmptyTableData.module.scss'
import { useTranslation } from 'next-i18next'
import { Typography, Image } from 'antd'
import { LocaleNamespaceConst } from '~/constants'

const { Text } = Typography

const EmptyTableData: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.category'])

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
      <Text type="secondary">{t('seller.category:table.empty')}</Text>
    </div>
  )
}

export default EmptyTableData
