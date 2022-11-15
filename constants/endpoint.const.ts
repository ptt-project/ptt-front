// eslint-disable-next-line @typescript-eslint/typedef
export const EndPointUrlConst = {
  AUTH: {
    REGISTER_VALIDATE: '/auth/register/validate',
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    REQUEST_RESET_PASSWORD_BY_EMAIL: '/auth/forgot-password',
    RESET_PASSWORD_BY_EMAIL: '/auth/reset-password/email',
    RESET_PASSWORD_BY_MOBILE: '/auth/reset-password/mobile'
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
    INFO: '/shops/shop-info',
    CATEGORIES: '/shops/categories',
    PLATFORM_CATEGORIES: '/shops/categories/platform-categories',
    PRODUCTS: '/shops/products',
    PRODUCTS_PROFILE: '/shops/products-profile'
  },
  WALLET: {
    WALLETS: '/wallets',
    HISTORY: '/wallets/history',
    DEPOSIT_QR_CODE: '/wallets/deposit/qrcode',
    WITHDRAW: '/wallets/withdraw'
  },
  BANK_ACCOUNT: {
    BANK_ACCOUNTS: '/bank-accounts',
    OPTIONS: '/bank-accounts/options'
  },
  IMAGES: {
    UPLOAD: '/images/upload-image',
    IMAGE: '/images'
  },
  CONFIG: {
    OPTIONS: '/configs/options'
  },
  HAPPY_POINT: {
    BALANCE: '/happy-points/balance',
    LOOKUP: '/happy-points/lookup',
    BUY: '/happy-points/buy',
    TRANSFER: '/happy-points/transfer',
    SELL: '/happy-points/sell',
    HISTORY: '/happy-points/history'
  },

  PRODUCTS: '/products'
}
