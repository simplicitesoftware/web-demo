const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'main-bundle.js',
		publicPath: 'auto'
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