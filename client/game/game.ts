import "phaser";
import {LevelScene} from "./scenes/levelScene";
import { ViewScene } from "./scenes/viewScene";
// main game configuration
let Ls = new LevelScene();
let Vs = new ViewScene();

let  config =(scene:string)=>{
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
    scene: scene==="levelScene" ? Ls : Vs
  }
}

// game class
export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
  public restart =()=>{
    Ls.restart();
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
  public action =(username:string, action:string,callback:any)=>{
    Vs.action(username, action, callback);
  }
  public createplayers(m){
    Vs.createplayers(m)
  }
}
let gamee:Game;

function launch(scene:string){
  gamee = new Game(config(scene));
}

function getGame(): Game {
  return gamee;
}
function getLs(){
  return this.Ls;
}

export {launch, getGame, getLs};