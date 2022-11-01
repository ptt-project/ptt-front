import { IProduct, IProductProfile, IShop } from '.'

export interface ICartProduct extends IProduct {
  index: number
  amount?: number
  isProduct?: boolean
  isShop?: boolean

  // ใส่ไปก่อน ให้ build ผ่าน อย่าลืมถาม logic แล้วแก้อีกที
  stock: number
  price: number
  option1?: string
  option2?: string
  shop?: IShop
  productProfile?: IProductProfile
  createdAt: Date
  updatedAt: Date
}

export interface ICartProductItem extends IShop {
  products: ICartProduct[]
  isProduct?: boolean
}

/**
 * @deprecated รอพี่ยิ้มแก้ไปใช้ interface ตัวใหม่
 */
export interface IProductData {
  /**
   * @deprecated รอพี่ยิ้มแก้ไปใช้ interface ตัวใหม่
   */
  key: string
  /**
   * @deprecated รอพี่ยิ้มแก้ไปใช้ interface ตัวใหม่
   */
  productName: string
  /**
   * @deprecated รอพี่ยิ้มแก้ไปใช้ interface ตัวใหม่
   */
  brand: string
  /**
   * @deprecated รอพี่ยิ้มแก้ไปใช้ interface ตัวใหม่
   */
  amount: number
  /**
   * @deprecated รอพี่ยิ้มแก้ไปใช้ interface ตัวใหม่
   */
  quantity: number
  /**
   * @deprecated รอพี่ยิ้มแก้ไปใช้ interface ตัวใหม่
   */
  sold: number
  /**
   * @deprecated รอพี่ยิ้มแก้ไปใช้ interface ตัวใหม่
   */
  status: number
}
