const cwidth: number = 1260;
const cheight: number = 1008;
const blockSize: number = 84;
const blockY:number = 11;
const blockX:number = 15;


enum Dir{
    Up = 0,
    Right = 1.5708,
    Down = 3.14159,
    Left= 4.71239
}

class Player implements MyBlock{
    private posX:number;
    private posY:number;
    private dir:Dir;

    constructor(posX:number,posY:number, dir:Dir){
        this.dir =dir;
        this.posX = posX;
        this.posY = posY;
    }
    getimgSrc(): string {
        if(this.dir==3)
            return "/res/game/images/character_left_00000.png";

        if(this.dir==1)
            return "/res/game/images/character_right_00000.png";

        if(this.dir==2)
            return "/res/game/images/character_down_00000.png";

        return "/res/game/images/character_up_00000.png";

    }

    public getPosX():number{
        return this.posX;
    }
    public getPosY():number{
        return this.posY;
    }

    public getDir():Dir {
        return this.dir;
    }

    public setDir(dir:Dir):void{
        this.dir =dir;
    }

    public stepForward():void{
        if(this.dir==0){
            this.posY--;
        }else if(this.dir ==2){
            this.posY++;
        }else if(this.dir == 3){
            this.posX--;
        }else if(this.dir==1){
            this.posX++;
        }
    }

    public stepBack():void{
        if(this.dir==0){
            this.posY++
        }else if(this.dir ==2){
            this.posY--;
        }else if(this.dir == 3){
            this.posX++;
        }else if(this.dir==1){
            this.posX--;
        }
    }

    public rotLeft():void{
        this.dir = (this.dir+3) % 4;

    }
    public rotRight():void{
        this.dir = (this.dir+1) % 4;
    }
}



class Game{

    private map:GameMap;
    private player:Player;
    private context:CanvasRenderingContext2D;

    constructor(canvas:HTMLCanvasElement, player:Player){
        this.player = player;

        this.map = GameMap.MapFromTxt("b;b;b;b;b;b;b;b;b;b;b;b;b;b;b_b;a;a;a;a;a;a;a;a;a;a;a;a;a;b_b;a;a;a;d;a;a;g;a;a;g;a;a;a;b_b;a;a;a;a;t;t;a;a;a;a;a;a;a;b_b;a;a;a;a;t;t;a;a;a;a;a;a;a;b_b;a;a;a;g;a;a;a;f;f;g;a;a;a;b_b;a;a;a;a;s;s;a;b;b;b;a;a;a;b_b;a;a;a;a;s;s;a;b;b;b;f;f;f;b_b;f;f;f;g;a;a;g;b;b;b;b;b;b;b_b;s;s;s;s;s;s;s;s;s;s;s;s;s;b_b;b;b;b;b;b;b;b;b;b;b;b;b;b;b");
        this.context = canvas.getContext("2d");
        this.context.webkitImageSmoothingEnabled = false;
        this.context.mozImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;

        for(let i =0; i< this.map.getWdth();i++){
            for(let j =0; j<this.map.getHeight();j++){

                //Background 1st layer
                let defImg:HTMLImageElement = new Image();
                defImg.src = "/res/game/images/air_00000.png";
                defImg.onload =()=>{
                    let pattern = this.context.createPattern(defImg, 'repeat');
                    this.context.fillStyle = pattern;
                    this.context.drawImage(defImg, i*84, j*84, 84, 84);
                };

                //Blocks 2nd layer
                
        }}
    }

    public draw():void{

        for(let i =0; i< this.map.getWdth();i++){
            for(let j =0; j<this.map.getHeight();j++){
                let img:HTMLImageElement = new Image();
                img.src = this.map.getBlock(j,i).getimgSrc();
                img.onload = ()=> {
                    let pattern = this.context.createPattern(img, 'repeat');
                    this.context.fillStyle = pattern;
                    this.context.drawImage(img, i*84, j*84, 84, 84);
                };
                
            }
        }
        //Players 3rd layer
        let playerImg1:HTMLImageElement = new Image();
        playerImg1.src = this.player.getimgSrc();
        playerImg1.onload = () =>{
            let pattern = this.context.createPattern(playerImg1, 'repeat');
            this.context.fillStyle = pattern;
            this.context.drawImage(playerImg1,this.player.getPosX()*84, this.player.getPosY()*84, 84, 84);
        }



    }
}

class GameMap{

    public static MapFromTxt(str:string):GameMap{
        let retMap:GameMap = new GameMap();

        let sorok:Array<string> = str.split('_');
        for(let i:number = 0; i < sorok.length; i++){
            let oszlopEgySorban:Array<string> = sorok[i].split(';');

            for(let j:number = 0; j < oszlopEgySorban.length; j++){
                let tmpBLock:MyBlock;
                switch(oszlopEgySorban[j]){
                    case "b":
                        tmpBLock = new Brick();
                        break;
                    case "f":
                        tmpBLock = new Dirt();
                        break;
                    case "g":
                        tmpBLock = new Gold();
                        break;
                    case "t":
                        tmpBLock = new Tnt();
                        break;
                    case "d":
                        tmpBLock = new Diamond();
                        break;
                    case "s":
                        tmpBLock = new Stone();
                        break;
                    default :
                        tmpBLock =new Air();
                        break;
                }
                retMap.setBlock(i,j, tmpBLock);
                
            }
        }
        
        return retMap; 
    }

    private width:number;
    private height:number;
    private blocks:MyBlock[][] = new Array<Array<MyBlock>>(); 
    constructor(){
        this.width=blockX;
        this.height=blockY;
        for(let i:number =0; i<this.width;i++){
            this.blocks[i] = [];
            //for(let j:number =0; j<this.height;j++){
                //this.blocks[i][j] = new MyBlock("/res/game/images/gold_00000.png");
            //}
        }
    }
    public getWdth():number{
        return this.width;
    }
    public getHeight():number{
        return this.height;
    }
    public getBlock(x:number,y:number):MyBlock{
        return this.blocks[x][y];
    }
    public setBlock(x:number,y:number, newBlock:MyBlock):void{
        this.blocks[x][y] = newBlock;
    }
}

class Brick implements MyBlock{
    getimgSrc(): string {
        return "/res/game/images/brick_00000.png";
    }
}

class Air implements MyBlock{
    getimgSrc(): string {
        return "/res/game/images/air_00000.png";
    }
}

class Dirt implements MyBlock{
    getimgSrc(): string {
        return "/res/game/images/dirt_00000.png";
    }
}

class Gold implements MyBlock{
    getimgSrc(): string {
        return "/res/game/images/gold_00000.png";
    }
}

class Tnt implements MyBlock{
    getimgSrc(): string {
        return "/res/game/images/tnt_00000.png";
    }
}

class Diamond implements MyBlock{
    getimgSrc(): string {
        return "/res/game/images/diamond_00000.png";
    }
}

class Stone implements MyBlock{
    getimgSrc(): string {
        return "/res/game/images/rock_00000.png";
    }
}

interface MyBlock {
    getimgSrc():string;
}


let player:Player = new Player(7,5,Dir.Up);
var mygame:Game = new Game(<HTMLCanvasElement>document.getElementById("main"), player);


mygame.draw();



