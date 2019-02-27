const START_FRAME = 'boxWooden';
let crateTypeToAsset = (n:number):string =>{
    switch (n) {
        case 0:
            return START_FRAME;

        default:
        return START_FRAME;
    }
}

const GAME_SPEED =120;
export type PlayerDirection = 'playerLeft' | 'playerRight' | 'playerUp' | 'playerDown';
class Crate extends Phaser.GameObjects.Sprite{
    
    constructor(scene:Phaser.Scene, x:number, y:number, crateType: number){
        super(scene, x, y,'assets',crateTypeToAsset(crateType));
    }


    private _state:string = "standing";


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

    
    moveTo(newX: number, newY: number, newTile:Phaser.Tilemaps.Tile) {
        const direction = this.getDirection(newX, newY);
        if (!direction) {
          return;
        }
        if(this._state==='moving'){
            return;
        }
        this._state = 'moving';
        this.scene.tweens.add({
          targets: this,
          x: newX,
          y: newY,
          duration: GAME_SPEED,
          onStart: this.onMoveStart,
          onStartParams: [direction],
          onComplete: this.onMoveComplete,
        });
      }
    
      //tween: Phaser.Tweens.Tween, object: Phaser.GameObjects.GameObject, direction: PlayerDirection
      private onMoveStart = () => {
        this._state = 'moving';
        //this.anims.play(direction);****************************************************
      }
    
      private onMoveComplete = () => {
        this._state = 'standing';
        this.anims.stop();
    
        // in the final version we have undos and restarts that destroys our player
        // this check ensures that the callback doesnt crash
        if (!this.scene) {
          return;
        }
    }

}

export default Crate;