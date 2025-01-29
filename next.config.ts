import type { NextConfig } from "next";

const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		domains: ['avatars.mds.yandex.net'],
	},
};

export default nextConfig;
