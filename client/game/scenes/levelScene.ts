import * as Phaser from 'phaser';
import Crate from '../sprites/crate';
import Player from '../sprites/player';

export type PlayerDirection = 'playerLeft' | 'playerRight' | 'playerUp' | 'playerDown';


class LevelScene extends Phaser.Scene {

    private updatePlayer(direction: PlayerDirection | null) {
        if (!direction) {
            return;
        }
        this.troToMovePlayer(direction);
    }

    private troToMovePlayer(direction: PlayerDirection) {


        const { x, y } = this.player;
        const currentTile = this.tileMap.getTileAtWorldXY(x, y, true);


        const wall = this.getNextTile(currentTile, direction, this.wallLayer);


        if (wall !== null) { // got wall
            return;
        }

        const floor = this.getNextTile(currentTile, direction, this.floorLayer);
        if (floor === null) { //out of boudle
            return;
        }

        const crate = this.getCrateAt(floor);

        
        if (crate !== null) {
            const oneFurther = this.getNextTile(floor, direction, this.floorLayer);
            if ((oneFurther===null)) { // out of bounds            
                return false;
            }
            if (!this.checkIfLocationIsFree(oneFurther)) {
                return false;
            }
        }
        this.movePlayer(floor);
    }

    private checkIfLocationIsFree(oneFurther:Phaser.Tilemaps.Tile): boolean {
        if (oneFurther.x < 0 || oneFurther.x >= this.tileMap.width || oneFurther.y < 0 || oneFurther.y >= this.tileMap.height) {
            return false;
        }
        const hasWall = !!this.wallLayer.getTileAt(oneFurther.x, oneFurther.y);
        if (hasWall) {
            return false;
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

    private getNextTile(
        start: Phaser.Tilemaps.Tile,
        direction: PlayerDirection,
        layer: Phaser.Tilemaps.DynamicTilemapLayer | Phaser.Tilemaps.StaticTilemapLayer,
    ): Phaser.Tilemaps.Tile {
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

    private movePlayer(tile:Phaser.Tilemaps.Tile) {
        
        const { x, y } = this.tileToWordFixOrigin(tile);
        const ol = this.tileMap.tileToWorldXY(tile.x,tile.y);
        
        const crate = this.getCrateAt(tile);
        if (crate) {
            // not the prettiest way, we simply move the crate along the same direction
            // knowing that the next spot is available
            const crateX = crate.x + x - this.player.x;
            const crateY = crate.y + y - this.player.y;
            const newTile = this.floorLayer.getTileAtWorldXY(crateX, crateY);
            crate.moveTo(crateX, crateY, newTile);
        }
        this.player.moveTo(ol.x, ol.y);
    }



    private leftKeys: Phaser.Input.Keyboard.Key[];
    private rightKeys: Phaser.Input.Keyboard.Key[];
    private upKeys: Phaser.Input.Keyboard.Key[];
    private downKeys: Phaser.Input.Keyboard.Key[];

    private createInputHandler() {
        this.leftKeys = [Phaser.Input.Keyboard.KeyCodes.LEFT, Phaser.Input.Keyboard.KeyCodes.A, Phaser.Input.Keyboard.KeyCodes.Q].map((key) => {
            return this.input.keyboard.addKey(key);
        });
        this.rightKeys = [Phaser.Input.Keyboard.KeyCodes.RIGHT, Phaser.Input.Keyboard.KeyCodes.D].map((key) => {
            return this.input.keyboard.addKey(key);
        });
        this.upKeys = [Phaser.Input.Keyboard.KeyCodes.UP, Phaser.Input.Keyboard.KeyCodes.W, Phaser.Input.Keyboard.KeyCodes.Z].map((key) => {
            return this.input.keyboard.addKey(key);
        });
        this.downKeys = [Phaser.Input.Keyboard.KeyCodes.DOWN, Phaser.Input.Keyboard.KeyCodes.S].map((key) => {
            return this.input.keyboard.addKey(key);
        });
    }

    private getPlayerDirection(): PlayerDirection | null {
        if (this.leftKeys.some((key) => key.isDown)) {
            //console.log("left");
            return 'playerLeft';
        }
        if (this.rightKeys.some((key) => key.isDown)) {
            //console.log("right");
            return 'playerRight';
        }

        if (this.upKeys.some((key) => key.isDown)) {
            //console.log("up");
            return 'playerUp';
        }
        if (this.downKeys.some((key) => key.isDown)) {
            //console.log("down");
            return 'playerDown';
        }
        return null;
    }

    
    private player: Player;
    private crates: Phaser.GameObjects.Group;

    //tilemap
    private tileSet: Phaser.Tilemaps.Tileset;
    private tileMap: Phaser.Tilemaps.Tilemap;

    // return the tiles to word centered coordinate
    private tileToWordFixOrigin(tile:Phaser.Tilemaps.Tile):Phaser.Math.Vector2{
        let vec = this.tileMap.tileToWorldXY(tile.x,tile.y);
        vec.x += tile.width/2;
        vec.y += tile.height/2;
        return vec;
    }

    //Layers

    private floorLayer: Phaser.Tilemaps.DynamicTilemapLayer;
    private wallLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private spawnLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private goalLayer: Phaser.Tilemaps.StaticTilemapLayer;
    private crateLayer: Phaser.Tilemaps.StaticTilemapLayer;

    constructor() {
        super({
            key: 'LevelScene',
        });
    }

    preload() {
        this.load.atlas("assets", './assets/assets.png', './assets/assets.json');
        this.load.tilemapTiledJSON('level01', './assets/levels/level01.json');
    }
    create() {
        
        
        this.tileMap = this.make.tilemap({ key: 'level01' });
        this.tileSet = this.tileMap.addTilesetImage('assets');
        this.createLevel();
        this.createPlayer();
        this.createGridLines();
        this.createInputHandler();
    }
    update() {
        
        if(this.player.state!=='moving'){
            this.updatePlayer(this.getPlayerDirection());
        }
        
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
        this.goalLayer = this.tileMap.createStaticLayer('Goals', this.tileSet, x, y);
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

    private createPlayer() {
        const playerSpawn = this.getSpawn();
        const { x, y } = this.tileToWordFixOrigin(playerSpawn);
        this.player = new Player(this, x, y);
        this.add.existing(this.player);
    }

    private getSpawn() {
        const spawns = this.getTiles((tile) => {
            return tile.index > - 1
        }, this.spawnLayer);
        if (spawns.length !== 1) {
            throw new Error(`[LevelScene] Expected single spawn`);
        }
        return spawns[0];
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

    private addGridLine(
        startX: number,
        startY: number,
        next: (x: number, y: number) => { x: number, y: number },
        skip: (x: number, y: number) => { x: number, y: number },
        stop: (x: number, y: number) => boolean,
    ) {
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

export default LevelScene;

