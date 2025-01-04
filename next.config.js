/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/chat-widget',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://lexicon-agent-demo.netlify.app"
          },
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://lexicon-agent-demo.netlify.app'
          }
        ]
      }
    ]
  }
}
module.exports = nextConfig