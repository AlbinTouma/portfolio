/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    distDir: 'out',
    experimental: {
        mdxRs: true,
    },
}

const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)