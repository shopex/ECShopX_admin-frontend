const path = require('path')
const QiniuPlugin = require('qiniu-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackAliyunOss = require('webpack-aliyun-oss')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const webpackPluginsAutoI18n = require('webpack-auto-i18n-plugin')
const { VolcengineTranslator, EmptyTranslator, Translator } = require('webpack-auto-i18n-plugin')
const axios = require('axios')
const { generateId } = require('./build/utils')

const i18nPlugin = new webpackPluginsAutoI18n.default({
  // translator: new VolcengineTranslator({
  //   // appId: '20240823002130819',
  //   // appKey: 'QJ9R65g8iL0kFJuh3SLm'
  //   apiKey: '88735fb4-c7a2-4beb-9d5a-cdc35dc78695',
  //   model: 'doubao-pro-32k-241215'
  // }),
  translator: new Translator({
    name: 'DeepseekAI翻译',
    fetchMethod: async (text, fromKey, toKey, separator) => {
      let salt = new Date().getTime()
      const textArr = text.split(separator)
      const sourceMap = Object.fromEntries(textArr.map(text => [generateId(text), text]))
      const data = {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `
              ###
              假如你是一个专业的翻译助手，你将根据一个web项目中使用的文本组成的JSON对象，来解决将数组每个成员从源语言A翻译成目标语言B并返回翻译后的JSON对象的任务。根据以下规则一步步执行：
              1. 明确源语言A和目标语言B。
              2. 对JSON对象中数组的每个成员进行从源语言A到目标语言B的翻译。
              3. 将翻译后的内容以JSON对象格式返回。

              参考例子：
              示例1：
              输入：zh-cn -> en { "awfgx": "你好", "qwfga": "世界" }
              输出：{ "awfgx": "Hello", "qwfga": "World" }

              示例2：
              输入：de -> fr { "gweaq": "Hallo", "wtrts": "Welt" }
              输出：{ "gweaq": "Bonjour", "wtrts": "Monde" }

              请回答问题：
              输入：源语言A -> 目标语言B { "wghhj": "XXX" }
              输出：

              要求：
              1 以JSON对象格式输出
              2 JSON对象中每个成员为翻译后的内容
              ###
          `
          },
          {
            role: 'user',
            content: `${fromKey} -> ${toKey} ${JSON.stringify(sourceMap)}`
          }
        ]
      }

      console.log('🚀 大模型请求数据：', data)
      const response = await axios.post(
        `https://api.deepseek.com/chat/completions?t=${salt}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer sk-7157cc3b2135484bb3e67772b456e65a`
          }
        }
      )

      let resultTextArr = Array.from(textArr).fill('')
      const content = response.data.choices[0].message.content.match(/```json\n([\s\S]*?)\n```/)[1]
      console.log('🚀 大模型返回文本：', content)
      try {
        let resultMap
        try {
          resultMap = JSON.parse(content)
        } catch (error) {
          throw new Error('大模型返回文本解析失败')
        }
        if (typeof resultMap !== 'object' || !resultMap) {
          throw new Error('大模型返回文本解析后类型不正确')
        }
        const isMiss = Object.keys(resultMap).some(key => !(key in sourceMap))
        if (isMiss) {
          throw new Error('大模型返回文本内容不完整')
        }
        resultTextArr = textArr.map(
          text => (resultMap)[generateId(text)]
        ) // 用textArr遍历，保证顺序
      } catch (error) {
        const message = error instanceof Error ? error.message : '未知错误'
        console.warn('⚠', message)
        console.warn('⚠ 返回的文本内容：', content)
        console.warn('⚠ 原文本内容：', JSON.stringify(sourceMap))
      }

      return resultTextArr.join(separator)
    },
    onError: (error, cb) => {
      cb(error)
      console.error(
        '请确保在Deepseek控制台开通了对应模型，且有足够的token余额。'
      )
    },
    maxChunkSize: 1000, // 太长可能会导致返回文本不完整
    interval: 1000
  })
})

const SRC_PATH = path.resolve(__dirname, 'src')
const envVars = process.env
const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

// 输出环境变量信息
console.log(`🚀 构建模式: ${process.env.NODE_ENV}`)
console.log(`🚀 构建平台: ${process.env.PLATFORM}`)
console.log('📋 环境变量:')
Object.keys(envVars).forEach((key) => {
  if (key.indexOf('VUE_APP') > -1) {
    console.log(`  ${key}: ${envVars[key]}`)
  }
})

// 在构建完成后复制微前端文件
const getNewpcCopyConfig = () => {
  const sourceDir = process.env.PLATFORM === 'bbc' ? './newpc_bbc' : './newpc_b2c'
  return {
    patterns: [
      {
        from: path.resolve(__dirname, sourceDir),
        to: path.resolve(__dirname, './dist/newpc'),
        noErrorOnMissing: true
      }
    ]
  }
}

module.exports = {
  // 基础配置
  lintOnSave: isDev, // 只在开发环境启用 lint
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',
  runtimeCompiler: true,
  productionSourceMap: false, // 生产环境不生成 source map

  // CSS 配置
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: [SRC_PATH]
        },
        additionalData: `@import "~@/styles/imports.sass"`
      },
      scss: {
        additionalData: `@import "~@/styles/imports.scss";`
      }
    },
    // 生产环境提取 CSS
    extract: isProd ? {
      ignoreOrder: true // 忽略 CSS 顺序警告
    } : false
  },

  // Webpack 配置
  configureWebpack: config => {
    // 开发环境配置
    if (isDev) {
      config.devtool = 'eval-cheap-module-source-map' // 更快的 source map
      // 开发环境性能优化
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename]
        }
      }
    }

    // 生产环境优化
    if (isProd) {
      // 代码压缩配置
      config.optimization = {
        ...config.optimization,
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.warn']
              },
              output: {
                comments: false
              }
            },
            extractComments: false,
            parallel: true
          }),
          new CssMinimizerPlugin({
            parallel: true,
            minimizerOptions: {
              preset: [
                'default',
                {
                  discardComments: { removeAll: true },
                  normalizeWhitespace: false
                }
              ]
            }
          })
        ],
        // 代码分割优化
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            elementUI: {
              name: 'chunk-elementUI',
              test: /[\\/]node_modules[\\/]element-ui[\\/]/,
              priority: 30,
              chunks: 'all',
              reuseExistingChunk: true
            },
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
              chunks: 'all',
              reuseExistingChunk: true
            },
            commons: {
              name: 'chunk-commons',
              minChunks: 2,
              priority: 10,
              chunks: 'all',
              reuseExistingChunk: true
            },
            styles: {
              name: 'styles',
              test: /\.(css|scss|sass)$/,
              chunks: 'all',
              enforce: true,
              priority: 40,
              reuseExistingChunk: true
            }
          }
        }
      }

      // 在主构建流程中添加文件复制插件
      config.plugins.push(new CopyWebpackPlugin(getNewpcCopyConfig()))
    }

    // OSS CDN 上传配置
    if (process.env.VUE_APP_OSS_CDN === 'true') {
      try {
        config.plugins.push(
          new WebpackAliyunOss({
            from: ['./dist/**', '!./dist/**/*.html', '!./dist/**/*.ico'],
            dist: '/ecshopx-admin',
            region: process.env.VUE_APP_ALIOSS_REGION,
            accessKeyId: process.env.VUE_APP_ALIOSS_ACCESS_KEY_ID,
            accessKeySecret: process.env.VUE_APP_ALIOSS_ACCESS_KEY_SECRET,
            bucket: process.env.VUE_APP_ALIOSS_BUCKET,
            deleteAll: false, // 不删除远程文件
            timeout: 120000 // 2分钟超时
          })
        )
        console.log('✅ OSS CDN 上传插件已启用')
      } catch (error) {
        console.warn('⚠️  OSS CDN 配置错误:', error.message)
      }
    }

    // 别名配置
    return {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          'assets': path.resolve(__dirname, './src/assets'),
          'components': path.resolve(__dirname, './src/components'),
          'lodash': 'lodash-es'
        },
        extensions: ['.js', '.vue', '.json', '.ts', '.png', '.jpg', '.jpeg', '.gif', '.svg'],
        modules: ['node_modules', path.resolve(__dirname, 'src')]
      },
      module: {
        rules: [
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 4 * 1024 // 4kb
              }
            },
            generator: {
              filename: 'img/[name].[hash:8][ext]'
            }
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 4 * 1024 // 4kb
              }
            },
            generator: {
              filename: 'fonts/[name].[hash:8][ext]'
            }
          }
        ]
      },
      performance: {
        hints: 'warning',
        maxEntrypointSize: 1024 * 1024, // 入口文件大小限制为1MB
        maxAssetSize: 1024 * 1024 // 单个资源大小限制为1MB
      }
    }
  },

  // Webpack 链式配置
  chainWebpack: config => {
    // 删除预加载和预获取
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    config.plugin('i18n').use(i18nPlugin)

    config.plugin('define').tap(args => {
      args[0]['process.env'] = {
        ...args[0]['process.env'],
        // 添加自定义环境变量
        VUE_APP_PLATFORM: JSON.stringify(process.env.PLATFORM || 'bbc')
      }
      return args
    })

    // 生产环境优化
    if (isProd) {
      // 启用 gzip 压缩
      const CompressionPlugin = require('compression-webpack-plugin')
      config.plugin('compressionPlugin')
        .use(new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240, // 只压缩大于10kb的文件
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 保留原文件
        }))

      // 优化CSS提取
      config.plugin('mini-css-extract')
        .use(MiniCssExtractPlugin, [{
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css',
          ignoreOrder: true  // 忽略 CSS 顺序警告
        }])

      // Bundle 分析（可选）
      if (process.env.ANALYZE) {
        const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
        config.plugin('bundle-analyzer')
          .use(BundleAnalyzerPlugin)
      }
    }

    // 优化图片加载
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .type('asset')
      .parser({
        dataUrlCondition: {
          maxSize: 4096 // 4kb
        }
      })
      .set('generator', {
        filename: 'img/[name].[hash:8][ext]'
      })

    // 添加别名
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))
      .set('assets', path.join(__dirname, 'src/assets'))
      .set('components', path.join(__dirname, 'src/components'))

    // 配置字体资源处理
    config.module
      .rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
      .type('asset')
      .set('parser', {
        dataUrlCondition: {
          maxSize: 4 * 1024 // 4kb
        }
      })
      .set('generator', {
        filename: 'fonts/[name].[hash:8][ext]'
      })
  },

  // 开发服务器配置
  devServer: {
    port: 8080,
    hot: true,
    open: true,
    compress: true, // 启用 gzip 压缩
    historyApiFallback: true, // 支持 HTML5 History API
    // 性能优化
    client: {
      logging: 'warn', // 只显示警告和错误
      progress: true,
      overlay: {
        errors: true,
        warnings: false
      }
    },
    // 代理配置示例
    proxy: {
      '/website/decorate': {
        target: process.env.VUE_APP_TEMPLATE_URL,
        changeOrigin: true,
        // pathRewrite:{
        //   '^/website/decorate': '/template'
        // }
      },
      '/_nuxt': {
        target: process.env.VUE_APP_TEMPLATE_URL,
        changeOrigin: true,
        // pathRewrite:{
        //   '^/post_template': ''
        // }
      }
      // '/api': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': ''
      //   }
      // }
    }
  },

  // 并行处理
  parallel: require('os').cpus().length > 1,

  // PWA 配置（如果需要）
  // pwa: {
  //   name: 'EcshopX Admin',
  //   themeColor: '#4DBA87',
  //   msTileColor: '#000000',
  //   appleMobileWebAppCapable: 'yes',
  //   appleMobileWebAppStatusBarStyle: 'black'
  // }
}
