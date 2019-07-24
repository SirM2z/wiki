module.exports = {
  title: "Ryan's wiki",
  description: 'Just playing around',
  base: '',
  markdown: {},
  themeConfig: {
    lastUpdated: '上次更新',
    nav: [
      { text: '前端', link: '/frontend/html' },
      { text: '服务端', link: '/backend/nestjs' },
      { text: '数据库', link: '/db/postgresql' },
      { text: '工具库', link: '/library/html2canvas' },
      { text: '命令', link: '/command/' },
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
            'crossDomain',
            'browser'
          ]
        }
      ],
      '/backend/': [
        {
          title: '服务端',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            'nestjs',
            'nginx',
            'caddy'
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
          ]
        }
      ],
    },
    serviceWorker: {
      // updatePopup: true // Boolean | Object, 默认值是 undefined.
      // 如果设置为 true, 默认的文本配置将是: 
      updatePopup: { 
        message: "有新的内容可用。", 
        buttonText: "刷新" 
      }
    }
  },
  plugins: [
    '@vuepress/back-to-top',
    [ 
      '@vuepress/google-analytics',
      {
        'ga': 'UA-140679869-2'
      }
    ]
  ]
}
