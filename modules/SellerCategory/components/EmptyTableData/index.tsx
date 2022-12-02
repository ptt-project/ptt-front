import React, { FC } from 'react'
import Image from '../../../../components/main/Image'
import styles from './EmptyTableData.module.scss'
import { useTranslation } from 'next-i18next'
import { Typography } from 'antd'
import { LocaleNamespaceConst } from '~/constants'

const { Text } = Typography

const EmptyTableData: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.category'])

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

export default EmptyTableData
