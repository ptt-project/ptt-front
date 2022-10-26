// eslint-disable-next-line @typescript-eslint/typedef
export const EndPointUrlConst = {
  AUTH: {
    REGISTER_VALIDATE: '/auth/register/validate',
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
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
    CATEGORIES: '/shops/categories',
    PLATFORM_CATEGORIES: '/shops/categories/platform-categories',
    PRODUCTS: '/shops/products'
  },
  WALLET: {
    WALLETS: '/wallets',
    HISTORY: '/wallets/history',
    DEPOSIT_QR_CODE: '/wallets/deposit/qrcode',
    WITHDRAW: '/wallets/withdraw'
  },
  BANK_ACCOUNT: {
    BANK_ACCOUNTS: '/bank-accounts',
    BANK_ACCOUNT_OPTIONS: '/bank-accounts/options'
  },
  IMAGES: {
    UPLOAD: '/images/upload-image'
  },
  CONFIG: {
    OPTIONS: '/configs/options'
  }
}
