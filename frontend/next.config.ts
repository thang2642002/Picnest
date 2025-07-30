const nextConfig = {
  images: {
    domains: ["source.unsplash.com", "images.unsplash.com"],
  },
  turbopack: {
    // Chỉ thêm các thuộc tính có trong TurbopackOptions
    resolveExtensions: [".ts", ".tsx", ".js", ".jsx"],
    resolveAlias: {
      "@": "./src",
    },
  },
};

export default nextConfig;
