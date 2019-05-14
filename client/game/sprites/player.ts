import * as Phaser from 'phaser';

export type PlayerDirection = 'playerLeft' | 'playerRight' | 'playerUp' | 'playerDown';

const START_FRAME = 'knight iso char_idle_0';
const GAME_SPEED =120;
class Player extends Phaser.GameObjects.Sprite{
    private username!:string;
    private socketid!:string;
    constructor(scene: Phaser.Scene, x:number, y:number, username:string, socketid:string){
        super(scene,x,y,'assets',START_FRAME);
        this.username = username;
        this.socketid = socketid;
    }

    

    private _state:string = "standing";
    private idleTimer;
    get state():string {
        return this._state;
    }

    

    moveTo(newX: number, newY: number, callback:CallableFunction) {
        const direction = this.getDirection(newX, newY);
        if (!direction) {
          callback();
          return;
        }
        if(this._state==="moving"){
            callback();
            return;
        }
        this._state = 'moving';
        this.scene.tweens.add({
          targets: this,
          x: newX+this.width/2,
          y: newY+this.height/2,
          duration: GAME_SPEED,
          onStart: this.onMoveStart,
          onStartParams: [direction],
          onComplete: () => {
            this._state = 'standing';
            //this.anims.stop();
        
            // in the final version we have undos and restarts that destroys our player
            // this check ensures that the callback doesnt crash
            if (!this.scene) {
              callback();
              return;
            }
        
            // reset player to start frame after movement is complete
            /*
            this.idleTimer = this.scene.time.delayedCall(500, () => {
              this.setFrame(START_FRAME);
              this.idleTimer = null;
            }, [], this);*/
            this.idleTimer = null;
            callback();
          },
        });

      }
    
      private onMoveStart = () => {
        this._state = 'moving';
        //this.anims.play(direction);
    
        if (this.idleTimer) {
          this.idleTimer.destroy();
        }
      }
    
      //private onMoveComplete = 
    
      private getDirection(newX: number, newY: number): PlayerDirection | null {
        if (newX > this.x) {
          return 'playerRight';
        }
        if (newX < this.x) {
          return 'playerLeft';
        }
        if (newY > this.y) {
          return 'playerDown';
        }
        if (newY < this.y) {
          return 'playerUp';
        }
        return null;
    }
}

export default Player;