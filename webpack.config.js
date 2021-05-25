const path                  = require('path');
const webpack               = require('webpack');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    entry: [
      './scripts/index.js',
      './styles/theme.scss'
    ],
    devtool: 'source-map',
    mode: 'production',
    output: {
      filename: 'main.js.liquid',
      path:      path.resolve(__dirname, 'assets')
    },
    module: {
      rules: [
        {
          test: /\.(css|s[ac]ss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename:      '[name].css.liquid',
        chunkFilename: '[id].css'
      }),
      new webpack.ProvidePlugin({
        $:      '../node_modules/jquery/dist/jquery.min.js',
        jQuery: '../node_modules/jquery/dist/jquery.min.js',
      }),
      new WebpackNotifierPlugin()
    ]
};
