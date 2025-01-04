/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/chat-widget',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://lexicon-landing.pages.dev'
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://lexicon-landing.pages.dev;"
          },
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://lexicon-landing.pages.dev'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig