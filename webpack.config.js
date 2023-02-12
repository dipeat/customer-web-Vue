const path = require("path");
const webpack = require("webpack");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
    public: "dipeat.com",
  },
  // ... other configuration options ...
};