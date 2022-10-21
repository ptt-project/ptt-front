import { IProduct, IShop } from '.'

export interface ICartProduct extends IProduct {
  index: number
  name?: string
  amount?: number
  isProduct?: boolean
  isShop?: boolean
}

export interface ICartProductItem extends IShop {
  products: ICartProduct[]
  isProduct?: boolean
}
