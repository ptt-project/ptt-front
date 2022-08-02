const withLess = require('next-with-less')
const { i18n } = require('./next-i18next.config')

module.exports = withLess({
  // basePath: '/react/riode/demo-3'
  swcMinify: true,
  lessLoaderOptions: {},
  i18n,
  distDir: 'build',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    domains: ['', 'localhost']
  }
})
