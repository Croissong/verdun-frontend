const {
  override,
  addBabelPlugins,
  addBundleVisualizer,
  addWebpackPlugin,
  addBabelPlugin,
  adjustWorkbox
} = require('customize-cra');

const CompressionPlugin = require('compression-webpack-plugin');
const addCompressionPlugin = (config) => {
  isProd(config) &&
    config.plugins.push(
      new CompressionPlugin({
        compressionOptions: {
          numiterations: 15
        },
        algorithm(input, compressionOptions, callback) {
          return zopfli.gzip(input, compressionOptions, callback);
        }
      })
    );
  return config;
};
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const zopfli = require('@gfx/zopfli');

module.exports = override(
  addCompressionPlugin,
  addBundleVisualizer({ analyzerMode: 'disabled' }), // 'server'
  ...addBabelPlugins(
    [
      'prismjs',
      {
        languages: ['yaml'],
        theme: 'tomorrow',
        css: true
      }
    ],
    // TODO: Needed?
    [
      'ramda',
      {
        useES: true
      }
    ]
  ),
  addWebpackPlugin(
    new WebappWebpackPlugin({
      logo: 'images/verdun-icon.svg', // svg works too!
      favicons: {
        appName: 'Verdun',
        appDescription: 'Kubernetes Cluster',
        developerName: 'Jan Möller',
        developerURL: 'patrician.gold', // prevent retrieving from the nearest package.json
        background: '#0f3445',
        theme_color: '#0f3445',
        icons: {
          coast: false,
          yandex: false
        }
      }
    })
  ),
  adjustWorkbox((wb) =>
    Object.assign(wb, {
      navigateFallbackBlacklist: [/api/]
    })
  )
);

const isProd = (config) => config.mode === 'production';
