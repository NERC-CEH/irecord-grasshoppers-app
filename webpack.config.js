require('dotenv').config({ silent: true });
const webpack = require('webpack');
const appConfig = require('@flumens/webpack-config');

const required = [
  'APP_SENTRY_KEY',
  'APP_BACKEND_CLIENT_ID',
  'APP_BACKEND_CLIENT_PASS',
];

const development = {
  APP_BACKEND_URL: '',
};

appConfig.plugins.unshift(
  new webpack.EnvironmentPlugin(required),
  new webpack.EnvironmentPlugin(development)
);

appConfig.module.rules.push({
  test: /(\.mp3)/,
  loader: 'file-loader',
  options: { name: './[name].[ext]' },
});

module.exports = appConfig;
