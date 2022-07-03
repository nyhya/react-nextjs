/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

// const withImages = require('next-images');

// module.exports = withImages({
// 	images: {
// 		disableStaticImages: true,
// 	},
// });

const nextConfig = {
	reactStrictMode: true,
	images: {
		disableStaticImages: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	env: {
		REACT_APP_PUBLIC_URL: process.env.REACT_APP_PUBLIC_URL,
	},
	webpack(config) {
		config.resolve.modules.push(__dirname); // 추가
		return config;
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `http://localhost:8888/:path*`,
			},
		];
	},
};

module.exports = nextConfig;
