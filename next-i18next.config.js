const path = require('path')

module.exports = {
  i18n: {
    locales: ['th', 'en'],
    defaultLocale: 'th',
    localeDetection: false
  },
  localePath: path.resolve('./locales')
}
