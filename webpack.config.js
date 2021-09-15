const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const cssLoader = (loader) => ({ loader, options: { sourceMap: true } });

module.exports = (env, argv) => {
    const isProduction = (argv.mode === 'production')
    return {
        entry: "./src/app.js",
        output: {
            path: path.join(__dirname, 'public'),
            // publicPath: path.join(__dirname, 'public'),
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
                use: [ MiniCssExtractPlugin.loader, 
                    // cssLoader('css-loader'),
                    // cssLoader('sass-loader'),
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ],
            }]
        }, 
        devtool: isProduction ? 'source-map' : 'inline-cheap-module-source-map',
        plugins: [new webpack.HotModuleReplacementPlugin(), new MiniCssExtractPlugin({ filename: 'styles.css' })],
        devServer: {
            static: {
                // directory: __dirname,
                directory: path.join(__dirname, 'public'),
                // publicPath: '/'
            }
        }
    }
};

// module.exports = {
//     entry: path.join(__dirname, "src", "app.js"),
//     output: {
//         path: path.resolve(__dirname, 'public', 'scripts'),
//         filename: 'bundle.js'
//     },
//     resolve: {
//         extensions: ['*', '.js', '.jsx'],
//     },
//     module: {
//         rules: [{
//             test: /\.(js|jsx)$/,
//             exclude: /node_modules/,
//             use: {
//                 loader: "babel-loader",
//                 options: {
//                     presets: ["@babel/preset-env", "@babel/preset-react"]
//                 }
//             },
//         }, {
//             test: /\.s?[ac]ss$/,
//             use: [
//             'style-loader',
//             'css-loader',
//             {
//                 loader: 'sass-loader',
//                 options: {
//                     implementation: require('sass')
//                 }
//             }
//         ]
//         }]
//     },
//     devtool: 'eval-cheap-module-source-map',
//     plugins: [new webpack.HotModuleReplacementPlugin()],
//     devServer: {
//         static: {
//             directory: path.join(__dirname, 'public'),
//         }
//     }
// };