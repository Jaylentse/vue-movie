/**
 * Created by Jaylen on 16/7/2.
 */
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [path.join(__dirname,'/app/main.js')],
    output: {
        path: './app/dist/',
        publicPath: './app/dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file?name=[name].[ext]?[hash]'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'vue-html-loader'
            }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
};
if(process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
} else {
    module.exports.devtool = '#source-map';
    module.exports.plugins = [
        new webpack.HotModuleReplacementPlugin()
    ]
}