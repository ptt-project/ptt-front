const withLess = require('next-with-less')
const { i18n } = require('./next-i18next.config')

module.exports = withLess({
  reactStrictMode: true,
  swcMinify: true,
  lessLoaderOptions: {},
  i18n,
  distDir: 'build',
  output: 'standalone',
  images: {
    domains: ['', 'localhost']
  }
})
