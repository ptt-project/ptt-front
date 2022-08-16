const baseUrl: string = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`

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
    ADDRESSES: '/members/addresses'
  }
}
