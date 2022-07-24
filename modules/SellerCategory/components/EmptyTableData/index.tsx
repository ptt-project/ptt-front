import React, { FC } from 'react'
import { Typography, Image } from 'antd'
import t from '~/locales'
import styles from './EmptyTableData.module.scss'

const { Text } = Typography

const EmptyTableData: FC = () => (
  <div className={styles.tableEmpty}>
    <div className={styles.imgContainer}>
      <Image
        rootClassName={styles.imgWrapper}
        preview={false}
        src="./images/main/seller/shop-category-empty.png"
        alt="register-success"
      />
    </div>
    <Text type="secondary">{t('sellerCategory.table.empty')}</Text>
  </div>
)

export default EmptyTableData
