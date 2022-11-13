// eslint-disable-next-line @typescript-eslint/typedef
export const RegExpConst = {
  CHECK_NUMBER: /^[0-9\b]+$/,
  CHECK_EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  CHECK_PASSWORD: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/,
  ALLOW_NUMBER: /\D/g,
  ALLOW_NUMBER_AND_DOT: /[^0-9.]/g,
  ALLOW_LETTER: /[^\u0E00-\u0E7Fa-zA-Z]/g,
  MATCH_THAI_LETTER: /[\u0E00-\u0E7F]/g
}
