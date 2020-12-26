/* eslint-disable */
const path = require('path');

const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = (config) => {
  // NOTE(krishan711): mark no packages as external so everything is bundled
  config.externals = {};
  config.plugins = [
    ...(config.plugins || []),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            { source: path.join(config.output.path, 'index.js'), destination: './runnable/' },
          ],
        },
      },
    }),
  ];
  return config;
};
