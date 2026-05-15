const path = require("path");

module.exports = (env, argv) => {
  const isProd = argv && argv.mode === "production";

  return {
    mode: isProd ? "production" : "development",
    context: __dirname,
    entry: "./frontend/IOU.jsx",
    output: {
      path: path.resolve(__dirname, "app", "assets", "javascripts"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", "@babel/preset-env"]
            }
          }
        }
      ]
    },
    devtool: isProd ? false : "source-map",
    resolve: {
      extensions: [".js", ".jsx", "*"]
    }
  };
};
