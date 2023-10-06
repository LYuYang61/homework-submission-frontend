const webpack = require('webpack')
module.exports = {
  /*
  ** Headers of the page
  */
  server: {
    port: 8000, // default: 3000
    host: 'localhost', // default: localhost,
  },
  head: {
    title: '雪豹作业云',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { homeworkId: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/weblogo.png' }
    ]
  },

  /*modules: [
    ['@nuxtjs/axios',"@nuxtjs/proxy"]
  ],

  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8082/',
      pathRewrite: {'^/api' : ''},
      changeOrigin: true,     // target是域名的话，需要这个参数，
      secure: false,          // 设置支持https协议的代理
    },
  },*/

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  mode:'spa',
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'element-ui'],
    babel: {
      'plugins': [['component', [
        {
          'libraryName': 'element-ui',
          'styleLibraryName': 'theme-chalk'
        },
        'transform-async-to-generator',
        'transform-runtime'
      ]]],
      comments: true
    },
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        '_': 'lodash'
      })
    ]
  },
  plugins: [
    { src: '~plugins/element-ui.js' },
    { src: '~plugins/quill-plugins.js',ssr:false},
    {src: '~plugins/lodash.js', ssr: false},
  ],

}

