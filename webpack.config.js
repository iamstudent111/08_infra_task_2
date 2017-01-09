var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        cdp: [
            './src/index.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: 'build/',
        filename: 'js/[name].js'
    },
    devtool: (function () {
        if (process.env.NODE_ENV !== 'production') { 
            return 'source-map'; 
        }
    })(),
    resolve: {
        modulesDirectories: [
            'node_modules',
            'bower_components'
        ]
    },
    plugins: (function () {
        var plugins = [
            new webpack.ProvidePlugin({
                $: 'jquery/dist/jquery',
                jQuery: 'jquery/dist/jquery',
                'window.jQuery': 'jquery/dist/jquery'
            }),
            new ExtractTextPlugin('css/cdp.css')
        ];
        var prodPlugins = [
            new webpack.optimize.UglifyJsPlugin({
                mangle: true,
                screw_ie8: true,
                comments: false,
                compress: {
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: false, // we need to console.log results from our package according to task
                    warnings: false
                }
            })
        ];
        var devPlugins = [
            new webpack.HotModuleReplacementPlugin()
        ];
        if (process.env.NODE_ENV === 'production') {
            return plugins.concat(prodPlugins);
        }
        return plugins.concat(devPlugins);
    })(),
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
            },
            {
                test: /\.(png|jpg|ttf|eot|svg|woff)/,
                loader: 'url?name=../[name].[ext]'
            }
        ]
    },
    postcss: function () {
        var plugins = [
            autoprefixer({ browsers: ['last 2 versions'] })
        ];
        var prodPlugins = [
            cssnano()
        ];
        if (process.env.NODE_ENV === 'production') {
            return plugins.concat(prodPlugins);
        }
        return plugins;
    }
};