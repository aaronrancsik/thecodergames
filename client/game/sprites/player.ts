import * as Phaser from 'phaser';

export type PlayerDirection = 'playerLeft' | 'playerRight' | 'playerUp' | 'playerDown';

const START_FRAME = 'knight iso char_idle_0';
const GAME_SPEED =120;
class Player extends Phaser.GameObjects.Sprite{
    constructor(scene: Phaser.Scene, x:number, y:number){
        super(scene,x,y,'assets',START_FRAME);
    }

    private _state:string = "standing";
    private idleTimer;
    get state():string {
        return this._state;
    }

    

    moveTo(newX: number, newY: number) {
        const direction = this.getDirection(newX, newY);
        if (!direction) {
          return;
        }
        if(this._state==="moving"){
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
          onComplete: this.onMoveComplete,
        });
      }
    
      private onMoveStart = () => {
        this._state = 'moving';
        //this.anims.play(direction);
    
        if (this.idleTimer) {
          this.idleTimer.destroy();
        }
      }
    
      private onMoveComplete = () => {
        this._state = 'standing';
        //this.anims.stop();
    
        // in the final version we have undos and restarts that destroys our player
        // this check ensures that the callback doesnt crash
        if (!this.scene) {
          return;
        }
    
        // reset player to start frame after movement is complete
        /*
        this.idleTimer = this.scene.time.delayedCall(500, () => {
          this.setFrame(START_FRAME);
          this.idleTimer = null;
        }, [], this);*/
        this.idleTimer = null;
      }
    
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