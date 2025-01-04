/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/chat-widget',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "frame-ancestors *",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https: wss: blob:",              "child-src 'self' blob: https://verify.walletconnect.com https://*.phantom.app",              "frame-src 'self' https://verify.walletconnect.com https://*.phantom.app"            ].join('; ')          }        ]      }    ]  }}

module.exports = nextConfig