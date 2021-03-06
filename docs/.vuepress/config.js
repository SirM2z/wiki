module.exports = {
  title: "Ryan's wiki",
  description: 'Just playing around',
  base: '',
  markdown: {},
  themeConfig: {
    lastUpdated: '上次更新',
    nav: [
      { text: '前端', link: '/frontend/html' },
      { text: '服务端', link: '/backend/' },
      { text: '数据库', link: '/db/postgresql' },
      { text: '算法', link: '/algorithm/' },
      { text: '工具库', link: '/library/html2canvas' },
      { text: '命令', link: '/command/' },
      { text: '译文', link: '/translation/promisesaplus' },
      // { text: '关于我', link: 'https://sirm2z.github.io/about/' },
      { text: 'Ryan\'s BLOG', link: 'https://www.ryanc.top/' },
      { text: 'Github', link: 'https://github.com/SirM2z/wiki' },
    ],
    sidebar: {
      '/frontend/': [
        {
          title: '前端',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            'html',
            'css',
            'js',
            'react',
            'regexp',
            'crossDomain',
            'browser'
          ]
        }
      ],
      '/db/': [
        {
          title: '数据库',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            'postgresql',
          ]
        }
      ],
      '/library/': [
        {
          title: '工具库',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            'html2canvas',
            'vscode',
          ]
        }
      ],
      '/translation/': [
        {
          title: '译文',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            'promisesaplus',
          ]
        }
      ],
    }
  },
  plugins: [
    '@vuepress/back-to-top',
    ['@vuepress/medium-zoom', {
      options: {
        margin: 24,
        background: 'rgba(0, 0, 0, 0.8)',
      }
    }],
    [ 
      '@vuepress/google-analytics',
      {
        'ga': 'UA-140679869-2'
      }
    ],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: {
        message: "有新的内容可用。",
        buttonText: "刷新"
      }
    }]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@img': '../assets/img',
      }
    }
  }
}
