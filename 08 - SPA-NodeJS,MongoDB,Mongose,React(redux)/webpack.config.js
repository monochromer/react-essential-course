const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = (process.env.NODE_ENV || 'development').trim();
const isProd = NODE_ENV === 'production';
const isDev = !isProd;

let webpackConfig = options => {
  return {
    context: path.join(__dirname, 'client'),
    entry: './main',
      // ? [
      //   'react-hot-loader/patch',
      //   './main'
      // ]
      // : [
      //   './main'
      // ],
    output: {
      path: path.join(__dirname, 'public'),
      filename: '[name].js',
      publicPath: '/',
    },

    resolve: {
        modules: [
          path.join(__dirname, 'src'),
          'node_modules'
        ],
        extensions: ['.js', '.jsx', '.tsx', '.csx', '.coffee']
    },

    resolveLoader: {
      modules: ['node_modules']
    },

    module: {
      rules: [
        {
          test: /\.js|.jsx$/,
          use: ['babel-loader'],
          exclude: [/node_modules/, /build/]
        },

        {
          test: /\.css$/,
          exclude: [/build/],
          use: isDev
            ? [
                { loader: 'style-loader' },
                { loader: 'css-loader' },
                { loader: 'postcss-loader' }
            ]
            : ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                { loader: 'css-loader' },
                { loader: 'postcss-loader' }
              ]
            })
        },

        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          loaders: [
            'file-loader', {
              loader: 'image-webpack-loader',
              query: {
                progressive: true,
                optimizationLevel: 7,
                interlaced: false,
                pngquant: {
                  quality: '65-90',
                  speed: 4
                }
              }
            }
          ]
        },

        {
           test: /\.(woff|woff2|eot|ttf|otf)$/,
           use: ['file-loader']
        }
      ]
    },

    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),

      new webpack.NoEmitOnErrorsPlugin(),

      new webpack.DefinePlugin({
        'NODE_ENV': JSON.stringify(NODE_ENV),
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
      }),

      // выделение общего кода из точек входа
      new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          // filename: 'vendor-[hash].js',
          minChunks: function (module) {
              return module.context && module.context.indexOf('node_modules') !== -1;
          },
      }),

      new ExtractTextPlugin({
        filename: '[name].css',
        disable: !isProd,
        allChunks: true
      })

      // new HtmlWebpackPlugin({
      //   filename: 'index.html',
      //   template: 'template/index.html',
      //   chunksSortMode: 'dependency',
      //   minify: {
      //       collapseWhitespace : false
      //   }
      // })
    ].concat( isDev
      ? [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
      ]
      : [
        new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          comments: false,
          mangle: {
            screw_ie8 : true,
            keep_fnames: true
          },
          compress: {
            screw_ie8: true,
            sequences : true,
            booleans : true,
            loops : true,
            unused : true,
            warnings : false
            // drop_console: true
          }
        }),
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
        })
       ]
    ),

    watch: isDev,
    watchOptions: {
        aggregateTimeout: 150
    },

    devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',

    devServer: {
      host: 'localhost',
      proxy: {
        "/api": "http://localhost:8080"
      },
      port: '9000',
      contentBase: [
          path.resolve(__dirname, 'public')
      ],
      hot: true,
      historyApiFallback: true
    }
  }
};

module.exports = webpackConfig;