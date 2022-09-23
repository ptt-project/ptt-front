// eslint-disable-next-line @typescript-eslint/typedef
export const EndPointUrlConst = {
  AUTH: {
    REGISTER_VALIDATE: '/auth/register/validate',
    REGISTER: '/auth/register',
    LOGIN: '/auth/login'
  },
  OTP: {
    REQUEST: '/otp/request'
  },
  MEMBERS: {
    PROFILE: '/members/profile',
    ADDRESSES: '/members/addresses',
    EMAIL_UPDATE: '/members/edit-email',
    MOBILES: '/members/mobiles',
    MOBILES_ADD: '/members/mobiles/add',
    MOBILES_DELETE: '/members/mobiles/delete',
    MOBILES_SET_MAIN: '/members/mobiles/set-main',
    CHANGE_PASSWORD: '/members/change-password'
  },
  SELLERS: {
    REGISTER: '/sellers/register',
    SHOP_INFO: '/sellers/shop-info'
  },
  SHOPS: {
    CATEGORIES: '/shops/categories',
    PRODUCTS: '/shops/products'
  },
  IMAGES: {
    UPLOAD: '/images/upload-image'
  }
}
