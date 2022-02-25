const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'main-bundle.js'
	},
	devServer: {
		port: 3000
	},
	module: {
		rules: [
			{
				test: /\.less$/i,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'less-loader' }
				]
			}
		]
	}
};