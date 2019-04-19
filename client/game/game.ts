import "phaser";
import {LevelScene} from "./scenes/levelScene";
// main game configuration
let Ls = new LevelScene();
let  config =()=>{
  return {
    scale:{
      parent: "gameid",
      mode:Phaser.Scale.FIT,
      width:960,
      height:960,
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
  public moveForward=(callback)=>{
    Ls.moveForward(callback);
  }
  public moveBackward=(callback)=>{
    Ls.moveBackward(callback);
  }
  public turnLeft=(callback)=>{
    Ls.turnLeft(callback);
  }
  public turnRight=(callback)=>{
    Ls.turnRight(callback);
  }
}
let gamee:Game;

function launch(){
  gamee = new Game(config());
}

function getGame(): Game {
  return gamee;
}
function getLs(){
  return this.Ls;
}

//export default launch;

export {launch, getGame, getLs};