import "phaser";
import LevelScene from "./scenes/levelScene";
// main game configuration


// game class
export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}


function launch(){
  new Game({
    width: 1040,
    height: 1040,
    type: Phaser.AUTO,
    parent: "gameid",
    scene: LevelScene,
  });
}

export default launch;

export {launch};