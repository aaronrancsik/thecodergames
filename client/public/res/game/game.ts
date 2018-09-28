const cwidth: number = 1260;
const cheight: number = 1008;
const blockSize: number = 84;
const blockY:number = 11;
const blockX:number = 15;

let scorecontainer = document.getElementById("score");

enum Dir{
    Up = 0,
    Right = 1.5708,
    Down = 3.14159,
    Left= 4.71239
}

class Player {
    public score:number;
    public posX:number;
    public posY:number;
    public oldX:number;
    public oldY:number;
    private mygame:Game;
    public dir:Dir;


    constructor(posX:number,posY:number, dir:Dir){
        this.dir =dir;
        this.posX = posX;
        this.posY = posY;
        this.oldX =posX;
        this.oldY =posY;
        this.score =0;
    }

    plusScore(plus:number){
        this.score += plus;
        scorecontainer.innerText = this.score.toString();

    }

    setGame(mygame:Game):void{
        this.mygame =mygame;
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
    public getOldX():number{
        return this.oldX;
    }
    public getOldY():number{
        return this.oldY;
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

        
        this.oldX =this.posX;
        this.oldY =this.posY;
        console.log(this.dir);
        
        if(this.dir==0){
            if(mygame.map.getBlock(this.posY-1,this.posX).breakable){
                this.posY--;
            }
        }else if(this.dir ==2){
            if(mygame.map.getBlock(this.posY+1,this.posX).breakable){
                this.posY++;
            }
        }else if(this.dir == 3){
            if(mygame.map.getBlock(this.posY,this.posX-1).breakable){
                this.posX--;
            }
        }else if(this.dir==1){
            if(mygame.map.getBlock(this.posY-1,this.posX+1).breakable){
                this.posX++;
            }
        }
        
        
        mygame.draw();
        this.plusScore(mygame.map.getBlock(this.posY,this.posX).getCore());
    }

    public stepBack():void{
        this.oldX =this.posX;
        this.oldY =this.posY;

        if(this.dir==0){
            if(mygame.map.getBlock(this.posY+1,this.posX).breakable){
                this.posY++
            }
            
        }else if(this.dir ==2){
            if(mygame.map.getBlock(this.posY-1,this.posX).breakable){
                this.posY--;
            }
            
        }else if(this.dir == 3){
            if(mygame.map.getBlock(this.posY,this.posX+1).breakable){
                this.posX++;
            }
           
        }else if(this.dir==1){
            if(mygame.map.getBlock(this.posY-1,this.posX-1).breakable){
                this.posX--;
            }
            
        }
        
        mygame.draw();
        this.plusScore(mygame.map.getBlock(this.posY,this.posX).getCore());

     
    }

    public rotLeft():void{
        
        this.dir = (this.dir+3) % 4;
        mygame.draw();
    }
    public rotRight():void{
        this.dir = (this.dir+1) % 4;
        mygame.draw();
    }
}



class Game{

    public map:GameMap;
    private player:Player;
    private context:CanvasRenderingContext2D;

    constructor(canvas:HTMLCanvasElement, player:Player){

        this.map;
        this.player = player;
        this.context = canvas.getContext("2d");
        this.context.webkitImageSmoothingEnabled = false;
        this.context.mozImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;

        
    }

    public loadMap(num){
        this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height);
        switch(num){
            case "0": 
                this.map  = GameMap.MapFromTxt("s;s;s;s;s;s;s;s;s;s;s;s;s;s;s_s;a;a;a;a;a;a;a;a;a;a;a;a;a;s_s;a;a;a;a;a;a;a;a;a;a;a;a;a;s_s;a;a;a;a;a;a;a;a;a;a;a;a;a;s_s;a;a;a;a;a;a;a;a;a;a;a;a;a;s_s;a;a;a;g;g;g;a;g;g;g;a;a;a;s_s;a;a;a;b;b;b;b;b;b;b;a;a;a;s_s;a;a;a;f;f;f;f;f;f;f;a;a;a;s_s;a;a;a;s;s;s;s;s;s;s;a;a;a;s_s;a;a;s;s;s;d;d;s;s;s;s;a;a;s_s;s;s;s;s;s;s;s;s;s;s;s;s;s;s");
                this.player.posX =7;
                this.player.oldX =7;
                this.player.posY = 5;
                this.player.oldY = 5;
                this.player.dir = Dir.Up;
                this.player.score =0;
                
                break;
            case "1": 
                
                this.map  = GameMap.MapFromTxt("s;s;s;s;s;s;s;s;s;s;s;s;s;s;s_s;g;f;f;f;f;f;g;b;f;f;f;f;f;s_s;f;f;f;f;f;f;f;b;f;f;f;f;f;s_s;f;f;f;f;f;f;f;b;f;f;f;f;f;s_s;f;f;f;f;f;f;f;b;f;f;f;f;f;s_s;g;f;f;f;f;f;a;b;f;f;f;f;g;s_s;f;f;f;f;f;f;f;b;f;f;f;f;f;s_s;f;f;f;f;f;f;f;b;f;f;f;f;f;s_s;f;f;f;f;f;f;f;b;f;f;f;f;f;s_s;f;f;f;f;f;f;g;f;f;f;f;f;g;s_s;s;s;s;s;s;s;s;s;s;s;s;s;s;s");
                this.player.posX =7;
                this.player.oldX =7;
                this.player.posY = 5;
                this.player.oldY = 5;
                this.player.dir = Dir.Up;
                this.player.score =0;
                break;

            case "2":
                
                this.map  = GameMap.MapFromTxt("s;s;s;s;s;s;s;s;s;s;s;s;s;s;s_s;f;f;f;f;f;f;f;f;f;f;f;f;f;s_s;f;f;f;f;f;b;b;b;f;f;f;f;f;s_s;f;f;f;f;b;g;g;g;b;f;f;f;f;s_s;f;f;f;b;g;a;a;a;g;b;f;f;f;s_s;f;f;f;b;g;a;g;a;g;b;f;f;f;s_s;f;f;f;b;g;a;a;a;g;b;f;f;f;s_s;f;f;f;f;b;g;g;g;b;f;f;f;f;s_s;f;f;f;f;f;b;f;b;f;f;f;f;f;s_s;f;f;f;f;f;f;f;f;f;f;f;f;d;s_s;s;s;s;s;s;s;s;s;s;s;s;s;s;s");
                this.player.posX =7;
                this.player.oldX =7;
                this.player.posY = 5;
                this.player.oldY = 5;
                this.player.dir = Dir.Up;
                this.player.score =0;
                break;
            case "3": 
            
                break;
            case "4": 
                //this.player =  new Player(7,5,Dir.Up);
                this.player.posX =7;
                this.player.oldX =7;
                this.player.posY = 5;
                this.player.oldY = 5;
                this.player.dir = Dir.Up;
                this.player.score =0;

                this.map  = GameMap.MapFromTxt("b;b;b;b;b;b;b;b;b;b;b;b;b;b;b_b;a;a;a;a;a;a;a;a;a;a;a;a;a;b_b;a;a;a;d;a;a;g;a;a;g;a;a;a;b_b;a;a;a;a;s;s;a;a;a;a;a;a;a;b_b;a;a;a;a;s;s;a;a;a;a;a;a;a;b_b;a;a;a;g;a;a;a;f;f;g;a;a;a;b_b;a;a;a;a;s;s;a;b;b;b;a;a;a;b_b;a;a;a;a;s;s;a;b;b;b;f;f;f;b_b;f;f;f;g;a;a;g;b;b;b;b;b;b;b_b;s;s;s;s;s;s;s;s;s;s;s;s;s;b_b;b;b;b;b;b;b;b;b;b;b;b;b;b;b");
                break;
            
                //load users saved stuffs
            
        }

        for(let i =0; i< this.map.getWdth();i++){
            for(let j =0; j<this.map.getHeight();j++){
                let defImg:HTMLImageElement = new Image();
                defImg.src = "/res/game/images/air_00000.png";
                defImg.onload =()=>{
                    let pattern = this.context.createPattern(defImg, 'repeat');
                    this.context.fillStyle = pattern;
                    this.context.drawImage(defImg, i*84, j*84, 84, 84);
                };

                let img:HTMLImageElement = new Image();
                img.src = this.map.getBlock(j,i).getimgSrc();
                img.onload = ()=> {
                    let pattern = this.context.createPattern(img, 'repeat');
                    this.context.fillStyle = pattern;
                    this.context.drawImage(img, i*84, j*84, 84, 84);
                };
        }};
        
        this.draw();
        
    }

    public draw():void{
       
        let cleanUp:HTMLImageElement = new Image();
        cleanUp.src = "/res/game/images/air_00000.png";
        cleanUp.onload = () =>{
            let pattern = this.context.createPattern(cleanUp, 'repeat');
            this.context.fillStyle = pattern;
            this.context.drawImage(cleanUp,  this.player.getOldX()*84, this.player.getOldY()*84, 84, 84);
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
                        tmpBLock.breakable=false;
                        break;
                    case "f":
                        tmpBLock = new Dirt();
                        tmpBLock.breakable=true;
                        break;
                    case "g":
                        tmpBLock = new Gold();
                        tmpBLock.breakable=true;
                        break;
                    case "t":
                        tmpBLock = new Tnt();
                        tmpBLock.breakable=true;
                        break;
                    case "d":
                        tmpBLock = new Diamond();
                        tmpBLock.breakable=true;
                        break;
                    case "s":
                        tmpBLock = new Stone();
                        tmpBLock.breakable=false;
                        break;
                    default :
                        tmpBLock =new Air();
                        tmpBLock.breakable=true;
                        break;
                }
                
                tmpBLock.posX =j;
                tmpBLock.posY=i;
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
    getCore(): number {
        return 0;
    }
    isDeath(): boolean {
        return false;
    }
    breakable: boolean;
    posX: number;
    posY: number;
    getimgSrc(): string {
        return "/res/game/images/brick_00000.png";
    }
}

class Air implements MyBlock{
    getCore(): number {
        return 0;
    }
    isDeath(): boolean {
        return false;
    }
    breakable: boolean;
    posX: number;
    posY: number;
    getimgSrc(): string {
        return "/res/game/images/air_00000.png";
    }
}

class Dirt implements MyBlock{
    getCore(): number {
        return 20;
    }
    isDeath(): boolean {
        return false;
    }
    breakable: boolean;
    posX: number;
    posY: number;
    getimgSrc(): string {
        return "/res/game/images/dirt_00000.png";
    }
}

class Gold implements MyBlock{
    used:boolean = false;
    getCore(): number {
        if(!this.used){
            this.used =true;
            return 100;
        }
        return 0;
    }
    isDeath(): boolean {
        return false;
    }
    breakable: boolean;
    posX: number;
    posY: number;
    getimgSrc(): string {
        return "/res/game/images/gold_00000.png";
    }
}

class Tnt implements MyBlock{
    used:boolean =false;
    getCore(): number {
        if(!this.used){
            this.used =true;
            return 500;
        }
        return 0;
    }
    isDeath(): boolean {
        return true;
    }
    breakable: boolean;
    posX: number;
    posY: number;
    getimgSrc(): string {
        return "/res/game/images/tnt_00000.png";
    }
}

class Diamond implements MyBlock{
    used:boolean =false;
    getCore(): number {
        if(!this.used){
            this.used=true;
            return 200;
           
        }
        return 0;       
    }
    isDeath(): boolean {
        return false;
    }
    breakable: boolean;
    posX: number;
    posY: number;
    getimgSrc(): string {
        return "/res/game/images/diamond_00000.png";
    }
}

class Stone implements MyBlock{
    getCore(): number {
        return 0;
    }
    isDeath(): boolean {
        return false;
    }
    breakable: boolean;
    posX: number;
    posY: number;
    getimgSrc(): string {
        return "/res/game/images/rock_00000.png";
    }
}

interface MyBlock {

    posX:number;
    posY:number;
    getimgSrc():string;
    breakable:boolean;
    isDeath():boolean;
    getCore():number;
}



//mygame.draw();
var player:Player = new Player(7,5,Dir.Up);

var mygame:Game = new Game(<HTMLCanvasElement>document.getElementById("main"),player);


//mygame.draw();



