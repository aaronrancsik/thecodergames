import * as Phaser from 'phaser';
import Crate from '../sprites/crate';
import Player from '../sprites/player';
import { finished } from 'stream';

export type PlayerDirection = 'playerLeft' | 'playerRight' | 'playerUp' | 'playerDown';


class BaseScene extends Phaser.Scene {

    private timeout =false;
    private timeout2 =false;
    private players:Array<Player> = new Array<Player>();
    private calls :Array<any> = new Array<any>();
    private precalls :Array<any> = new Array<any>();
    private selectedPlayer!:Player;
    private crates!: Phaser.GameObjects.Group;

    //tilemap
    private tileSet!: Phaser.Tilemaps.Tileset;
    private tileMap!: Phaser.Tilemaps.Tilemap;

    //Layers
    private floorLayer!: Phaser.Tilemaps.DynamicTilemapLayer;
    private wallLayer!: Phaser.Tilemaps.StaticTilemapLayer;
    private spawnLayer!: Phaser.Tilemaps.StaticTilemapLayer;
    private crateLayer!: Phaser.Tilemaps.StaticTilemapLayer;

    constructor(stKey:string) {
        super({
            key: stKey,
        });
    }

    public createplayers(inplayers:Array<any>) {
        console.log("create players from game");
        let spawns = this.getSpawns();
        
        // if(inplayers.length > spawns.length){ // or not needed
        //     alert('nincs ennyi spawn hely...');
        //     return;
        // }
        for(let i =0; i< inplayers.length; i++){
            const { x, y } = this.tileToWordFixOrigin(spawns[0]); // i or 0 
            this.players.push(new Player(this, x, y, inplayers[i].username, inplayers[i].socketid));
            this.add.existing(this.players[i]);
        }
        this.selectedPlayer = this.players[0];
        this.cameras.main.startFollow(this.selectedPlayer, false,0.5,0.5,0,0);
        this.cameras.main.setBounds(0,0,this.tileMap.widthInPixels,this.tileMap.heightInPixels);
        // for(let i =0; i < spawns.length && i < inplayers.length; i++){
            
        // }

    }


    public action(usname:string, action:string, callback:any){
        
        //'playerLeft' | 'playerRight' | 'playerUp' | 'playerDown'
        let play = this.players.find((x)=>{
            return x.username === usname;
        });

        if(play!==undefined){
            let dir:PlayerDirection;
            if(action=="STEP_FORWARD"){
                dir ="playerUp";
            }else if(action =="STEP_BACK"){
                dir ="playerDown";
            }else if(action=="TURN_LEFT"){
                dir = "playerLeft";
            }else{
                dir ="playerRight"
            }
            
            this.precalls.push(()=>{
                if(play!==undefined){
                    this.tryToMovePlayer(play ,dir,()=>{
                        console.log('push');
                        this.calls.push(callback);
                    
                    });
                }
            })
            
        }

        
    }


    preload() {
        this.load.atlas("assets", '/assets/assets.png', '/assets/assets.json');
        this.load.tilemapTiledJSON('level01', '/assets/levels/level02.json');
    }
    create() {
        this.tileMap = this.make.tilemap({ key: 'level01' });
        this.tileSet = this.tileMap.addTilesetImage('assets');
        this.createLevel();
       
        
        
        //this.cameras.main.setBounds(0,0,this.tileMap.widthInPixels,this.tileMap.heightInPixels);
        //this.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        this.createGridLines();
    }
    update() {
        if(this.timeout || this.players.length!=0 && this.precalls.length==this.players.length){
            for(let i =0; i < this.precalls.length; i++){
                this.precalls[i]();
            }
            this.precalls = new Array<any>();

        }

        if(this.timeout2 ||this.players.length!=0 && this.calls.length==this.players.length){

            for(let i =0; i < this.calls.length; i++){
                this.calls[i]();
            }
            this.calls = new Array<any>();
        }
        // if(this.player.state!=='moving'){
        //     this.updatePlayer(this.getPlayerDirection(),()=>{console.log("test2")}   );
        // }
    }

    private tryToMovePlayer(player:Player, direction: PlayerDirection, callback:CallableFunction) {


        const { x, y } = player;
        const currentTile = this.tileMap.getTileAtWorldXY(x, y, true);


        const wall = this.getNextTile(currentTile, direction, this.wallLayer);


        if (wall !== null) { // got wall
            callback();
            return;
        }

        const floor = this.getNextTile(currentTile, direction, this.floorLayer);
        if (floor === null) { //out of boudle
            callback();
            return;
        }

        const crate = this.getCrateAt(floor);

        
        if (crate !== null) {
            const oneFurther = this.getNextTile(floor, direction, this.floorLayer);
            if ((oneFurther===null)) { // out of bounds
                callback();            
                return false;
            }
            if (!this.checkIfLocationIsFree(oneFurther)) {
                callback();
                return false;
            }
        }
        this.movePlayer(player, floor, callback);
    }

    private checkIfLocationIsFree(oneFurther:Phaser.Tilemaps.Tile) {
        if (oneFurther.x < 0 || oneFurther.x >= this.tileMap.width || oneFurther.y < 0 || oneFurther.y >= this.tileMap.height) {
            return;
        }
        const hasWall = !!this.wallLayer.getTileAt(oneFurther.x, oneFurther.y);
        if (hasWall) {
            return;
        }
        const crate = this.getCrateAt(oneFurther);
        return !crate;
    }

    private getCrateAt(oneFurther:Phaser.Tilemaps.Tile): Crate | null {
        
        const allCrates = this.crates.getChildren() as Crate[];
        const { x, y } = this.tileToWordFixOrigin(oneFurther);
        const crateAtNewLocation = allCrates.filter((crate) => {
            let creteVec = new Phaser.Math.Vector2(crate.x,crate.y);
            return creteVec.x === x && creteVec.y === y;
        });
        if (crateAtNewLocation.length === 0) {
            return null;
        }
        return crateAtNewLocation[0];
    }

    private getNextTile(start: Phaser.Tilemaps.Tile, direction: PlayerDirection, layer: Phaser.Tilemaps.DynamicTilemapLayer | Phaser.Tilemaps.StaticTilemapLayer,): Phaser.Tilemaps.Tile {
        const { x, y } = start;
        switch (direction) {
            case 'playerDown':
                return layer.getTileAt(x, y + 1);
            case 'playerUp':
                return layer.getTileAt(x, y - 1);
            case 'playerLeft':
                return layer.getTileAt(x - 1, y);
            case 'playerRight':
                return layer.getTileAt(x + 1, y);
            default:
                throw new Error('Unexpected direction');
        }
    }

    private movePlayer(player:Player ,tile:Phaser.Tilemaps.Tile, callback:CallableFunction) {
        
        const { x, y } = this.tileToWordFixOrigin(tile);
        const ol = this.tileMap.tileToWorldXY(tile.x,tile.y);
        
        const crate = this.getCrateAt(tile);
        if (crate) {
            // not the prettiest way, we simply move the crate along the same direction
            // knowing that the next spot is available
            const crateX = crate.x + x - player.x;
            const crateY = crate.y + y - player.y;
            const newTile = this.floorLayer.getTileAtWorldXY(crateX, crateY);
            crate.moveTo(crateX, crateY, newTile);
        }
        player.moveTo(ol.x, ol.y,callback);
    }

    // return the tiles to word centered coordinate
    private tileToWordFixOrigin(tile:Phaser.Tilemaps.Tile):Phaser.Math.Vector2{
        let vec = this.tileMap.tileToWorldXY(tile.x,tile.y);
        vec.x += tile.width/2;
        vec.y += tile.height/2;
        return vec;
    }


    private createLevel() {
        this.createLayers();
        this.createCrates();
    }

    private createLayers() {
        const x = 0;
        const y = 0;
        this.spawnLayer = this.tileMap.createStaticLayer('Spawns', this.tileSet, x, y);
        this.spawnLayer.setVisible(false);
        this.crateLayer = this.tileMap.createStaticLayer('Crates', this.tileSet, x, y);
        this.crateLayer.setVisible(false);
        this.floorLayer = this.tileMap.createDynamicLayer('Floors', this.tileSet, x, y);
        this.wallLayer = this.tileMap.createStaticLayer('Walls', this.tileSet, x, y);
    }

    private createCrates() {
        const crateTiles = this.getTiles((tile) => {
            return tile.index > -1;
        }, this.crateLayer);
        const crateSprites = crateTiles.map((tile) => {
            const { x, y } = this.tileToWordFixOrigin(tile);
            const { type } = tile.properties as { type: number };
            const crate = new Crate(this, x, y, type);
            this.add.existing(crate);
            return crate;
        });
        this.crates = this.add.group(crateSprites);
    }

   

    private getSpawns():Array<Phaser.Tilemaps.Tile> {
        const spawns = this.getTiles((tile) => {
            return tile.index > - 1
        }, this.spawnLayer);
        return spawns;
    }

    private getTiles(test: (tile: Phaser.Tilemaps.Tile) => boolean, layer?: Phaser.Tilemaps.StaticTilemapLayer): Phaser.Tilemaps.Tile[] {
        this.tileMap.setLayer(layer || this.floorLayer);
        return this.tileMap.filterTiles((tile: Phaser.Tilemaps.Tile) => {
            return test(tile);
        }, this, 0, 0, this.tileMap.width, this.tileMap.height);
    }

    private createGridLines() {
        const lineLength = 6;
        const skipLength = 2;
        this.addVerticalLines(lineLength, skipLength);
        this.addHorizontalLines(lineLength, skipLength);
    }

    private addVerticalLines(lineLength: number, skipLength: number) {
        let currentX = 0;
        const stopX = this.tileMap.widthInPixels;
        const stopY = this.tileMap.heightInPixels;
        const next = (x: number, y: number) => ({ x: x, y: y + lineLength });
        const skip = (x: number, y: number) => ({ x: x, y: y + skipLength });
        const stop = (x: number, y: number) => y >= stopY;
        while (currentX <= stopX) {
            this.addGridLine(currentX, 0, next, skip, stop);
            currentX += this.tileMap.tileWidth;
        }
    }

    private addHorizontalLines(lineLength: number, skipLength: number) {
        let currentY = 0;
        const stopX = this.tileMap.widthInPixels;
        const stopY = this.tileMap.heightInPixels;
        const next = (x: number, y: number) => ({ x: x + lineLength, y: y });
        const skip = (x: number, y: number) => ({ x: x + skipLength, y: y });
        const stop = (x: number, y: number) => x >= stopX;
        while (currentY <= stopY) {
            this.addGridLine(0, currentY, next, skip, stop);
            currentY += this.tileMap.tileHeight;
        }
    }

    private addGridLine(startX: number, startY: number, next: (x: number, y: number) => { x: number, y: number }, skip: (x: number, y: number) => { x: number, y: number }, stop: (x: number, y: number) => boolean, ) {
        let currentX = startX;
        let currentY = startY;
        const line = this.add.graphics({
            x: 0, y: 0,
            lineStyle: { width: 1, alpha: 0.5, color: 0x000000 },
            fillStyle: { color: 0x000000, alpha: 1 },
        });
        line.beginPath();
        line.moveTo(startX, startY);
        while (!stop(currentX, currentY)) {
            const { x: nextX, y: nextY } = next(currentX, currentY);
            line.lineTo(nextX, nextY);
            const { x: skipX, y: skipY } = skip(nextX, nextY);
            line.moveTo(skipX, skipY);
            currentX = skipX;
            currentY = skipY;
        }
        line.closePath();
        line.strokePath();
        line.fillPath();
    }

}

export { BaseScene };

