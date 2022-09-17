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
  MEMBER: {
    PROFILE: '/members/profile',
    ADDRESSES: '/members/addresses',
    EMAIL: '/members/email',
    MOBILES: '/members/mobiles',
    CHANGE_PASSWORD: '/members/change-password'
  },
  SELLER: {
    REGISTER: '/sellers/register',
    SHOP_INFO: '/sellers/shop-info'
  },
  SHOP: {
    CATEGORIES: '/shops/categories',
    PRODUCTS: '/shops/products'
  },
  WALLET: {
    WALLETS: '/wallets',
    HISTORY: '/wallets/history',
    DEPOSIT_QR_CODE: '/wallets/deposit/qrcode',
    WITHDRAW: '/wallets/withdraw'
  },
  BANK_ACCOUNT: {
    BANK_ACCOUNTS: '/bank-accounts'
  }
}
