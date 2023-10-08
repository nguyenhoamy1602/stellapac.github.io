export default {
  server: {
    host: true,
    port: 3000,
  },
  build: {
    target: 'esnext', // or "es2019",
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/[name][extname]`;
          } else if (/\.(json)$/i.test(assetInfo)) {
            return `assets/[name][extname]`;
          }
          return `[name]-[hash][extname]`;
        },
        chunkFileNames: '[name].js',
        entryFileNames: '[name].js',
      },
    },
  },
};
