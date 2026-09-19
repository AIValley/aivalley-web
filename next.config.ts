import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // 资源 logo 使用 emoji，博客无外部图片，无需远程图片域名
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
