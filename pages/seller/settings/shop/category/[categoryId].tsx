import React, { FC } from 'react'
import { isEmpty } from 'lodash'
import EditCategory from '~/modules/SellerCategory/components/EditCategory'
import { ICategoryData } from '~/model/Seller'

interface IEditCategoryContext {
  params: {
    categoryId: string
  }
}

const dataSource: ICategoryData[] = [
  {
    key: '1',
    categoryName: 'ดัมเบล',
    createdBy: 'ผู้ขาย',
    quantity: 10,
    status: 1
  },
  {
    key: '2',
    categoryName: 'รองเท้าวิ่ง',
    createdBy: 'ผู้ขาย',
    quantity: 5,
    status: 0
  },
  {
    key: '3',
    categoryName: 'อาหารเสริม',
    createdBy: 'ผู้ขาย',
    quantity: 0,
    status: 1
  }
]

export function getServerSideProps(context: IEditCategoryContext): any {
  const { categoryId } = context.params
  const data: ICategoryData = dataSource.find((item: ICategoryData) => item.key === categoryId)
  if (!isEmpty(data)) {
    return {
      props: { data }
    }
  }
  return { notFound: isEmpty(data) }
}

const EditCategoryPage: FC = (props: any) => <EditCategory category={props.data} />

export default EditCategoryPage