const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const babel = require('./webpack/babel');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const path = require('path');

const common = merge([
    {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.[hash].js'
        },
        plugins: [
            new HtmlWebpackPlugin(
                {
                    template: path.resolve(__dirname, './index.html'),
                    filename: 'index.html'
                }
            )
        ],
    },
    babel()
]);

module.exports = function(env) {
    if(env === 'production') {
        return merge([
            common,
            extractCSS(),
            uglifyJS()
        ]);
    }
    if(env === 'development') {
        return merge([
            common,
            devserver(),
            css()
        ])
    }
};
