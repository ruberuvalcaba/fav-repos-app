const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const distPath = path.resolve(__dirname, 'dist')

module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    path: distPath,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        // For pure CSS
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.jsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      inject: true,
    }),
    new Dotenv({ path: './.env' }),
  ],
}
