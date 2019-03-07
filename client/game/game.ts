import "phaser";
import {LevelScene} from "./scenes/levelScene";
// main game configuration
let Ls = new LevelScene();
let  config =()=>{
  return {
  scale:{
    parent: "gameid",
    mode:Phaser.Scale.FIT,
    width:1040,
    height:1040,
    max:{
      height:1040,
      width:1040
    },
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
  },
  type: Phaser.AUTO,
    scene: Ls
  }
}

// game class
export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
  public  alma=()=>{
    Ls.moveForward();
}
}
let gamee:Game;

function launch(){
  gamee = new Game(config());
    
}

function getGame(): Game {
  return gamee;
}

export default launch;

export {launch};