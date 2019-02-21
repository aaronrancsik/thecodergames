import "phaser";
import LevelScene from "./scenes/levelScene";
// main game configuration
const config: GameConfig = {
  width: 1040,
  height: 1040,
  type: Phaser.AUTO,
  parent: "game",
  scene: LevelScene,
};

// game class
export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
// window.onload = () => {
//   let game = new Game(config);
// };
