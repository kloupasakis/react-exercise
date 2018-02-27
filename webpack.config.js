const isProd = process.env.NODE_ENV === "production";

module.exports = {
    entry: {
        index: './src/index',
    },
    output: {
        path: __dirname + '/public/script',
        filename: 'app.min.js'
    },
    devtool: isProd ? 'cheep-module-source-map' : false,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
      ]
    }
  };