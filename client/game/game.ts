import "phaser";
import LevelScene from "./scenes/levelScene";
// main game configuration
const config: GameConfig = {
  scale:{
    parent: "gameid",
    mode:Phaser.Scale.FIT,
    width:1040,
    height:1040,
    max:{
      height:1040,
      width:1040
    },
    min:{
      height:300,
      width:300
    },
    autoCenter:Phaser.Scale.CENTER_BOTH
    

  },
  type: Phaser.AUTO,
  scene: LevelScene,
};

// game class
export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

function launch(){
  new Game(config);
}

export default launch;

export {launch};