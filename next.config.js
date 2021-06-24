const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  target: "serverless",
  distDir: "build"
})

module.exports = withBundleAnalyzer()
