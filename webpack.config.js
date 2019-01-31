var path = require('path');
var pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(pathToPhaser, 'dist/phaser.js');

module.exports = {
    entry: './client/src/game/game.ts',
    watch:true,
    output: {
      path: __dirname+'/client/build/game',
      filename: 'game_boudle.js',
    },
    module: {
      rules: [
        { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
        { test: /phaser\.js$/, loader: 'expose-loader?Phaser' }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        phaser: phaser
      }
    }
  };
  