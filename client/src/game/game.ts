import "phaser";
import LevelScene from "./scenes/levelScene";
import GameScalePlugin from 'phaser-plugin-game-scale';
// main game configuration
const config: GameConfig = {
  width: 1040,
  height: 1040,
  type: Phaser.AUTO,
  parent: "game",
  plugins: {
    global: [{
      key: 'GameScalePlugin',
      plugin: GameScalePlugin,
      sceneKey: 'gameScale',
      data: {
        debounce: false,
        debounceDelay: 50,
        maxHeight: Infinity,
        maxWidth: Infinity,
        minHeight: 0,
        minWidth: 0,
        mode: 'fit',
        resizeCameras: true,
        snap: 0
      }
    }]
  },
  scene: LevelScene,
};

// game class
export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.onload = () => {
  let game = new Game(config);
};
