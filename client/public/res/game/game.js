var cwidth = 1260;
var cheight = 1008;
var blockSize = 84;
var blockY = 11;
var blockX = 15;
var scorecontainer = document.getElementById("score");
var Dir;
(function (Dir) {
    Dir[Dir["Up"] = 0] = "Up";
    Dir[Dir["Right"] = 1.5708] = "Right";
    Dir[Dir["Down"] = 3.14159] = "Down";
    Dir[Dir["Left"] = 4.71239] = "Left";
})(Dir || (Dir = {}));
var Player = /** @class */ (function () {
    function Player(posX, posY, dir) {
        this.dir = dir;
        this.posX = posX;
        this.posY = posY;
        this.oldX = posX;
        this.oldY = posY;
        this.score = 0;
    }
    Player.prototype.plusScore = function (plus) {
        this.score += plus;
        scorecontainer.innerText = this.score.toString();
    };
    Player.prototype.setGame = function (mygame) {
        this.mygame = mygame;
    };
    Player.prototype.getimgSrc = function () {
        if (this.dir == 3)
            return "/res/game/images/character_left_00000.png";
        if (this.dir == 1)
            return "/res/game/images/character_right_00000.png";
        if (this.dir == 2)
            return "/res/game/images/character_down_00000.png";
        return "/res/game/images/character_up_00000.png";
    };
    Player.prototype.getOldX = function () {
        return this.oldX;
    };
    Player.prototype.getOldY = function () {
        return this.oldY;
    };
    Player.prototype.getPosX = function () {
        return this.posX;
    };
    Player.prototype.getPosY = function () {
        return this.posY;
    };
    Player.prototype.getDir = function () {
        return this.dir;
    };
    Player.prototype.setDir = function (dir) {
        this.dir = dir;
    };
    Player.prototype.stepForward = function () {
        this.oldX = this.posX;
        this.oldY = this.posY;
        console.log(this.dir);
        if (this.dir == 0) {
            if (mygame.map.getBlock(this.posY - 1, this.posX).breakable) {
                this.posY--;
            }
        }
        else if (this.dir == 2) {
            if (mygame.map.getBlock(this.posY + 1, this.posX).breakable) {
                this.posY++;
            }
        }
        else if (this.dir == 3) {
            if (mygame.map.getBlock(this.posY, this.posX - 1).breakable) {
                this.posX--;
            }
        }
        else if (this.dir == 1) {
            if (mygame.map.getBlock(this.posY - 1, this.posX + 1).breakable) {
                this.posX++;
            }
        }
        mygame.draw();
        this.plusScore(mygame.map.getBlock(this.posY, this.posX).getCore());
    };
    Player.prototype.stepBack = function () {
        this.oldX = this.posX;
        this.oldY = this.posY;
        if (this.dir == 0) {
            if (mygame.map.getBlock(this.posY + 1, this.posX).breakable) {
                this.posY++;
            }
        }
        else if (this.dir == 2) {
            if (mygame.map.getBlock(this.posY - 1, this.posX).breakable) {
                this.posY--;
            }
        }
        else if (this.dir == 3) {
            if (mygame.map.getBlock(this.posY, this.posX + 1).breakable) {
                this.posX++;
            }
        }
        else if (this.dir == 1) {
            if (mygame.map.getBlock(this.posY - 1, this.posX - 1).breakable) {
                this.posX--;
            }
        }
        mygame.draw();
        this.plusScore(mygame.map.getBlock(this.posY, this.posX).getCore());
    };
    Player.prototype.rotLeft = function () {
        this.dir = (this.dir + 3) % 4;
        mygame.draw();
    };
    Player.prototype.rotRight = function () {
        this.dir = (this.dir + 1) % 4;
        mygame.draw();
    };
    return Player;
}());
var Game = /** @class */ (function () {
    function Game(canvas, player) {
        this.map;
        this.player = player;
        this.context = canvas.getContext("2d");
        this.context.webkitImageSmoothingEnabled = false;
        this.context.mozImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;
    }
    Game.prototype.loadMap = function (num) {
        var _this = this;
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        switch (num) {
            case "0":
                this.map = GameMap.MapFromTxt("s;s;s;s;s;s;s;s;s;s;s;s;s;s;s_s;a;a;a;a;a;a;a;a;a;a;a;a;a;s_s;a;a;a;a;a;a;a;a;a;a;a;a;a;s_s;a;a;a;a;a;a;a;a;a;a;a;a;a;s_s;a;a;a;a;a;a;a;a;a;a;a;a;a;s_s;a;a;a;g;g;g;a;g;g;g;a;a;a;s_s;a;a;a;b;b;b;b;b;b;b;a;a;a;s_s;a;a;a;f;f;f;f;f;f;f;a;a;a;s_s;a;a;a;s;s;s;s;s;s;s;a;a;a;s_s;a;a;s;s;s;d;d;s;s;s;s;a;a;s_s;s;s;s;s;s;s;s;s;s;s;s;s;s;s");
                this.player.posX = 7;
                this.player.oldX = 7;
                this.player.posY = 5;
                this.player.oldY = 5;
                this.player.dir = Dir.Up;
                this.player.score = 0;
                break;
            case "1":
                this.map = GameMap.MapFromTxt("s;s;s;s;s;s;s;s;s;s;s;s;s;s;s_s;g;f;f;f;f;f;g;b;f;f;f;f;f;s_s;f;f;f;f;f;f;f;b;f;f;f;f;f;s_s;f;f;f;f;f;f;f;b;f;f;f;f;f;s_s;f;f;f;f;f;f;f;b;f;f;f;f;f;s_s;g;f;f;f;f;f;a;b;f;f;f;f;g;s_s;f;f;f;f;f;f;f;b;f;f;f;f;f;s_s;f;f;f;f;f;f;f;b;f;f;f;f;f;s_s;f;f;f;f;f;f;f;b;f;f;f;f;f;s_s;f;f;f;f;f;f;g;f;f;f;f;f;g;s_s;s;s;s;s;s;s;s;s;s;s;s;s;s;s");
                this.player.posX = 7;
                this.player.oldX = 7;
                this.player.posY = 5;
                this.player.oldY = 5;
                this.player.dir = Dir.Up;
                this.player.score = 0;
                break;
            case "2":
                this.map = GameMap.MapFromTxt("s;s;s;s;s;s;s;s;s;s;s;s;s;s;s_s;f;f;f;f;f;f;f;f;f;f;f;f;f;s_s;f;f;f;f;f;b;b;b;f;f;f;f;f;s_s;f;f;f;f;b;g;g;g;b;f;f;f;f;s_s;f;f;f;b;g;a;a;a;g;b;f;f;f;s_s;f;f;f;b;g;a;g;a;g;b;f;f;f;s_s;f;f;f;b;g;a;a;a;g;b;f;f;f;s_s;f;f;f;f;b;g;g;g;b;f;f;f;f;s_s;f;f;f;f;f;b;f;b;f;f;f;f;f;s_s;f;f;f;f;f;f;f;f;f;f;f;f;d;s_s;s;s;s;s;s;s;s;s;s;s;s;s;s;s");
                this.player.posX = 7;
                this.player.oldX = 7;
                this.player.posY = 5;
                this.player.oldY = 5;
                this.player.dir = Dir.Up;
                this.player.score = 0;
                break;
            case "3":
                break;
            case "4":
                //this.player =  new Player(7,5,Dir.Up);
                this.player.posX = 7;
                this.player.oldX = 7;
                this.player.posY = 5;
                this.player.oldY = 5;
                this.player.dir = Dir.Up;
                this.player.score = 0;
                this.map = GameMap.MapFromTxt("b;b;b;b;b;b;b;b;b;b;b;b;b;b;b_b;a;a;a;a;a;a;a;a;a;a;a;a;a;b_b;a;a;a;d;a;a;g;a;a;g;a;a;a;b_b;a;a;a;a;s;s;a;a;a;a;a;a;a;b_b;a;a;a;a;s;s;a;a;a;a;a;a;a;b_b;a;a;a;g;a;a;a;f;f;g;a;a;a;b_b;a;a;a;a;s;s;a;b;b;b;a;a;a;b_b;a;a;a;a;s;s;a;b;b;b;f;f;f;b_b;f;f;f;g;a;a;g;b;b;b;b;b;b;b_b;s;s;s;s;s;s;s;s;s;s;s;s;s;b_b;b;b;b;b;b;b;b;b;b;b;b;b;b;b");
                break;
            //load users saved stuffs
        }
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                var defImg = new Image();
                defImg.src = "/res/game/images/air_00000.png";
                defImg.onload = function () {
                    var pattern = _this.context.createPattern(defImg, 'repeat');
                    _this.context.fillStyle = pattern;
                    _this.context.drawImage(defImg, i * 84, j * 84, 84, 84);
                };
                var img = new Image();
                img.src = this_1.map.getBlock(j, i).getimgSrc();
                img.onload = function () {
                    var pattern = _this.context.createPattern(img, 'repeat');
                    _this.context.fillStyle = pattern;
                    _this.context.drawImage(img, i * 84, j * 84, 84, 84);
                };
            };
            for (var j = 0; j < this_1.map.getHeight(); j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.map.getWdth(); i++) {
            _loop_1(i);
        }
        ;
        this.draw();
    };
    Game.prototype.draw = function () {
        var _this = this;
        var cleanUp = new Image();
        cleanUp.src = "/res/game/images/air_00000.png";
        cleanUp.onload = function () {
            var pattern = _this.context.createPattern(cleanUp, 'repeat');
            _this.context.fillStyle = pattern;
            _this.context.drawImage(cleanUp, _this.player.getOldX() * 84, _this.player.getOldY() * 84, 84, 84);
        };
        //Players 3rd layer
        var playerImg1 = new Image();
        playerImg1.src = this.player.getimgSrc();
        playerImg1.onload = function () {
            var pattern = _this.context.createPattern(playerImg1, 'repeat');
            _this.context.fillStyle = pattern;
            _this.context.drawImage(playerImg1, _this.player.getPosX() * 84, _this.player.getPosY() * 84, 84, 84);
        };
    };
    return Game;
}());
var GameMap = /** @class */ (function () {
    function GameMap() {
        this.blocks = new Array();
        this.width = blockX;
        this.height = blockY;
        for (var i = 0; i < this.width; i++) {
            this.blocks[i] = [];
            //for(let j:number =0; j<this.height;j++){
            //this.blocks[i][j] = new MyBlock("/res/game/images/gold_00000.png");
            //}
        }
    }
    GameMap.MapFromTxt = function (str) {
        var retMap = new GameMap();
        var sorok = str.split('_');
        for (var i = 0; i < sorok.length; i++) {
            var oszlopEgySorban = sorok[i].split(';');
            for (var j = 0; j < oszlopEgySorban.length; j++) {
                var tmpBLock = void 0;
                switch (oszlopEgySorban[j]) {
                    case "b":
                        tmpBLock = new Brick();
                        tmpBLock.breakable = false;
                        break;
                    case "f":
                        tmpBLock = new Dirt();
                        tmpBLock.breakable = true;
                        break;
                    case "g":
                        tmpBLock = new Gold();
                        tmpBLock.breakable = true;
                        break;
                    case "t":
                        tmpBLock = new Tnt();
                        tmpBLock.breakable = true;
                        break;
                    case "d":
                        tmpBLock = new Diamond();
                        tmpBLock.breakable = true;
                        break;
                    case "s":
                        tmpBLock = new Stone();
                        tmpBLock.breakable = false;
                        break;
                    default:
                        tmpBLock = new Air();
                        tmpBLock.breakable = true;
                        break;
                }
                tmpBLock.posX = j;
                tmpBLock.posY = i;
                retMap.setBlock(i, j, tmpBLock);
            }
        }
        return retMap;
    };
    GameMap.prototype.getWdth = function () {
        return this.width;
    };
    GameMap.prototype.getHeight = function () {
        return this.height;
    };
    GameMap.prototype.getBlock = function (x, y) {
        return this.blocks[x][y];
    };
    GameMap.prototype.setBlock = function (x, y, newBlock) {
        this.blocks[x][y] = newBlock;
    };
    return GameMap;
}());
var Brick = /** @class */ (function () {
    function Brick() {
    }
    Brick.prototype.getCore = function () {
        return 0;
    };
    Brick.prototype.isDeath = function () {
        return false;
    };
    Brick.prototype.getimgSrc = function () {
        return "/res/game/images/brick_00000.png";
    };
    return Brick;
}());
var Air = /** @class */ (function () {
    function Air() {
    }
    Air.prototype.getCore = function () {
        return 0;
    };
    Air.prototype.isDeath = function () {
        return false;
    };
    Air.prototype.getimgSrc = function () {
        return "/res/game/images/air_00000.png";
    };
    return Air;
}());
var Dirt = /** @class */ (function () {
    function Dirt() {
    }
    Dirt.prototype.getCore = function () {
        return 20;
    };
    Dirt.prototype.isDeath = function () {
        return false;
    };
    Dirt.prototype.getimgSrc = function () {
        return "/res/game/images/dirt_00000.png";
    };
    return Dirt;
}());
var Gold = /** @class */ (function () {
    function Gold() {
        this.used = false;
    }
    Gold.prototype.getCore = function () {
        if (!this.used) {
            this.used = true;
            return 100;
        }
        return 0;
    };
    Gold.prototype.isDeath = function () {
        return false;
    };
    Gold.prototype.getimgSrc = function () {
        return "/res/game/images/gold_00000.png";
    };
    return Gold;
}());
var Tnt = /** @class */ (function () {
    function Tnt() {
        this.used = false;
    }
    Tnt.prototype.getCore = function () {
        if (!this.used) {
            this.used = true;
            return 500;
        }
        return 0;
    };
    Tnt.prototype.isDeath = function () {
        return true;
    };
    Tnt.prototype.getimgSrc = function () {
        return "/res/game/images/tnt_00000.png";
    };
    return Tnt;
}());
var Diamond = /** @class */ (function () {
    function Diamond() {
        this.used = false;
    }
    Diamond.prototype.getCore = function () {
        if (!this.used) {
            this.used = true;
            return 200;
        }
        return 0;
    };
    Diamond.prototype.isDeath = function () {
        return false;
    };
    Diamond.prototype.getimgSrc = function () {
        return "/res/game/images/diamond_00000.png";
    };
    return Diamond;
}());
var Stone = /** @class */ (function () {
    function Stone() {
    }
    Stone.prototype.getCore = function () {
        return 0;
    };
    Stone.prototype.isDeath = function () {
        return false;
    };
    Stone.prototype.getimgSrc = function () {
        return "/res/game/images/rock_00000.png";
    };
    return Stone;
}());
//mygame.draw();
var player = new Player(7, 5, Dir.Up);
var mygame = new Game(document.getElementById("main"), player);
//mygame.draw();
