// const path = require('path');
// const public = path.join(__dirname, 'public');

// module.exports = {
//     // entry: './src/playground/redux-expensify.js',
//     entry: './src/app.js',
//     output: {
//         path: public,
//         filename: 'bundle.js'
//     },
//     module: {
//         rules: [{
//             test: /\.js$/,
//             exclude: /node_modules/,
//             use: {
//                 loader: 'babel-loader',
//                 options: {
//                     presets: ['@babel/preset-env', '@babel/preset-react'],
//                     plugins: ['@babel/plugin-proposal-class-properties']
//                 }
//             }
//         }, {
//             test: /\.s?css$/,
//             use: [
//             'style-loader',
//             'css-loader',
//             {
//                 loader: 'sass-loader',
//                 options: {
//                     implementation: require('dart-sass')
//                 }
//             }]
//         }]
//     },
//     devtool: 'eval-cheap-module-source-map',
//     devServer: {
//         contentBase: public,
//         historyApiFallback: true
//     }
// };

const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.join(__dirname, "src", "app.js"),
    output: {
        path: path.resolve(__dirname, 'public', 'scripts'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
        }, {
            test: /\.s?[ac]ss$/,
            use: [
            'style-loader',
            'css-loader',
            {
                loader: 'sass-loader',
                options: {
                    implementation: require('sass')
                }
            }
        ]
        }]
    },
    devtool: 'eval-cheap-module-source-map',
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        }
    }
};