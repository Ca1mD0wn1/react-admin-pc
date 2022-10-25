const path = require("path")
const CracoAntDesignPlugin = require('craco-antd');
const addPath = dir => path.join(__dirname, dir);
module.exports = {
  webpack: {
    alias: {
      "@": addPath("src")
    }
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': '#1DA57A',
        },
      },
    },
  ],
}

export { }