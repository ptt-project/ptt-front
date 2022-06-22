const withLess = require('next-with-less')

module.exports = withLess({
  lessLoaderOptions: {},
  // basePath: '/react/riode/demo-3'
  distDir: 'build',
  trailingSlash: true,
  i18n: {
    locales: ['th', 'en'],
    defaultLocale: 'th',
    localeDetection: false
  },
  reactStrictMode: true,
  images: {
    domains: ['', 'localhost']
  }
})
