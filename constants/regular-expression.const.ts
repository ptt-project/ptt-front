export const RegExpConst: {
  CHECK_NUMBER: RegExp
  ALLOW_NUMBER: RegExp
  ALLOW_LETTER: RegExp
  CHECK_EMAIL: RegExp
  CHECK_PASSWORD: RegExp
} = {
  CHECK_NUMBER: /^[0-9\b]+$/,
  ALLOW_NUMBER: /[^0-9.]/g,
  ALLOW_LETTER: /[^\u0E00-\u0E7Fa-zA-Z ]/g,
  CHECK_EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  CHECK_PASSWORD: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/
}
