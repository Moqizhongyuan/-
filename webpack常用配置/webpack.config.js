const autoprefixer = require("autoprefixer"); // 引入 autoprefixer 模块，自动添加 CSS 前缀（浏览器适配）
const path = require("path"); // 引入 path 模块，用于处理文件路径
const { VueLoaderPlugin } = require("vue-loader/dist/index"); // 引入 vue-loader 插件，用于加载 Vue 单文件组件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 引入 clean-webpack-plugin 插件，用于清理打包目录
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 引入 html-webpack-plugin 插件，用于生成 HTML 文件
const { DefinePlugin } = require("webpack"); // 引入 webpack 的 DefinePlugin 插件，用于定义全局变量

module.exports = {
  mode: "development", // 设置为开发模式
  entry: "./src/main.js", // 入口文件
  output: {
    filename: "bundle.js", // 输出的文件名
    path: path.resolve(__dirname, "./build"), // 输出的路径
    clean: true, // 在输出之前清理输出目录
  },
  resolve: {
    extensions: [".js", ".json", ".vue", ".jsx", ".ts", "tsx"], // 自动解析的扩展名
    alias: {
      utils: path.resolve(__dirname, "./src/utils"), // 设置别名，用于导入模块时的路径简化
    },
  },
  devServer: {
    hot: true, // 启用热更新
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 对 CSS 文件使用以下加载器
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/, // 对 LESS 文件使用以下加载器
        use: ["style-loader", "css-loader", "less-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/, // 对图片文件使用以下加载器
        type: "asset", // 使用 asset 模块类型
        parser: {
          dataUrlCondition: {
            maxSize: 60 * 1024, // 设置将小于 60KB 的图片转为 base64 编码
          },
        },
        generator: {
          filename: "img/[name]_[hash:8][ext]", // 图片的输出文件名规则
        },
      },
      {
        test: /\.js/, // 对 JS 文件使用以下加载器
        use: [
          {
            loader: "babel-loader", // 使用 babel-loader 进行转译
            // options: {
            //   plugins: []
            // }
          },
        ],
      },
      {
        test: /\.vue$/, // 对 Vue 单文件组件使用以下加载器
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(), // VueLoaderPlugin 插件实例
    new HtmlWebpackPlugin({
      title: "电商项目", // 生成的 HTML 文件的标题
    }),
    new DefinePlugin({
      BASE_URL: "'./'", // 定义全局变量 BASE_URL
      coderwhy: "'why'", // 定义全局变量 coderwhy
      counter: "123", // 定义全局变量 counter
    }),
  ],
};
