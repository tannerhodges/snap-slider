// Dependencies
const path = require('path');
const _ = require('lodash');

// Plugins
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Common Settings
const common = {
  entry: './src/snap-slider.js',
  mode: 'none',
  optimization: {
    nodeEnv: 'development',
  },
  devtool: false,
  devServer: {
    static: ['docs'],
  },
  stats: {
    modules: false,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-spread',
            ],
          },
        },
      },
    ],
  },
  output: {
    filename: 'snap-slider.js',
    path: path.resolve(__dirname, '.'),
    library: 'SnapSlider',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
};

// Bundle Analyzer
const analyzer = new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  openAnalyzer: false, // process.env.TEST !== 'true',
});

// Build Settings
const full = _.cloneDeep(common);

const fullMin = _.cloneDeep(full);
fullMin.output.filename = 'snap-slider.min.js';
fullMin.mode = 'production';
fullMin.devtool = 'source-map';

const lite = _.cloneDeep(common);
lite.optimization.nodeEnv = 'production';
lite.output.filename = 'snap-slider.lite.js';

const liteMin = _.cloneDeep(lite);
liteMin.output.filename = 'snap-slider.lite.min.js';
liteMin.mode = 'production';
liteMin.devtool = 'source-map';
liteMin.plugins = [analyzer];

// TODO: Force `npm start` to only run one build.
module.exports = [
  full,
  fullMin,
  lite,
  liteMin,
];
