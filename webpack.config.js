const LwcWebpackPlugin = require('lwc-webpack-plugin');
const path = require('path');

module.exports = {
    plugins: [new LwcWebpackPlugin()],
    entry: {
        app: './pages/app/app.js',
        option: './pages/option/option.js'
    },
    output: {
        path: path.resolve(__dirname, 'pages'),
        filename: '[name]/[name].bundle.js'
    }
};