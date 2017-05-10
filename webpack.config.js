var path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'vuexActionDebounce',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            test: /\.js$/,
            use: [
                {
                    loader: 'babel-loader'
                }
            ]
        ]
    }
}