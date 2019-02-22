const pkg = require('./package');

export default {
  srcDir: './client/',
  buildDir: './client/dist',
  generate: {
    dir: './client/stat-dist'
  },
  plugins: ['~/plugins/hello'],
  mode: 'universal',
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  }
  ,css:[
    '~/assets/main.css'
  ]
}
