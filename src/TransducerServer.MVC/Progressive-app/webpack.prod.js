const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  plugins: [
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            exclude: [/node_modules/, /src/],
            maximumFileSizeToCacheInBytes: 99999999999,
            clientsClaim: true,
            skipWaiting: true,
            swDest: './service-worker.js'
          }),
    ]
});