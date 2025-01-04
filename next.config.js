/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/chat-widget',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'  // Allow all origins since the widget can be embedded anywhere
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; frame-ancestors 'self' https://lexicon-landing.pages.dev https://lexicon-agent-demo.netlify.app; script-src 'self' 'unsafe-inline' 'unsafe-eval';"
          }
        ]
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://lexicon-landing.pages.dev'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig