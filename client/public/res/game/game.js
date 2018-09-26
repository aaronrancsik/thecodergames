var cwidth = 1260;
var cheight = 1008;
var blockSize = 84;
var blockY = 11;
var blockX = 15;
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
    }
    Player.prototype.getimgSrc = function () {
        if (this.dir == 3)
            return "/res/game/images/character_left_00000.png";
        if (this.dir == 1)
            return "/res/game/images/character_right_00000.png";
        if (this.dir == 2)
            return "/res/game/images/character_down_00000.png";
        return "/res/game/images/character_up_00000.png";
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
        if (this.dir == 0) {
            this.posY--;
        }
        else if (this.dir == 2) {
            this.posY++;
        }
        else if (this.dir == 3) {
            this.posX--;
        }
        else if (this.dir == 1) {
            this.posX++;
        }
    };
    Player.prototype.stepBack = function () {
        if (this.dir == 0) {
            this.posY++;
        }
        else if (this.dir == 2) {
            this.posY--;
        }
        else if (this.dir == 3) {
            this.posX++;
        }
        else if (this.dir == 1) {
            this.posX--;
        }
    };
    Player.prototype.rotLeft = function () {
        this.dir = (this.dir + 3) % 4;
    };
    Player.prototype.rotRight = function () {
        this.dir = (this.dir + 1) % 4;
    };
    return Player;
}());
var Game = /** @class */ (function () {
    function Game(canvas, player) {
        var _this = this;
        this.player = player;
        this.map = GameMap.MapFromTxt("b;b;b;b;b;b;b;b;b;b;b;b;b;b;b_b;a;a;a;a;a;a;a;a;a;a;a;a;a;b_b;a;a;a;d;a;a;g;a;a;g;a;a;a;b_b;a;a;a;a;t;t;a;a;a;a;a;a;a;b_b;a;a;a;a;t;t;a;a;a;a;a;a;a;b_b;a;a;a;g;a;a;a;f;f;g;a;a;a;b_b;a;a;a;a;s;s;a;b;b;b;a;a;a;b_b;a;a;a;a;s;s;a;b;b;b;f;f;f;b_b;f;f;f;g;a;a;g;b;b;b;b;b;b;b_b;s;s;s;s;s;s;s;s;s;s;s;s;s;b_b;b;b;b;b;b;b;b;b;b;b;b;b;b;b");
        this.context = canvas.getContext("2d");
        this.context.webkitImageSmoothingEnabled = false;
        this.context.mozImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                //Background 1st layer
                var defImg = new Image();
                defImg.src = "/res/game/images/air_00000.png";
                defImg.onload = function () {
                    var pattern = _this.context.createPattern(defImg, 'repeat');
                    _this.context.fillStyle = pattern;
                    _this.context.drawImage(defImg, i * 84, j * 84, 84, 84);
                };
                //Blocks 2nd layer
            };
            for (var j = 0; j < this_1.map.getHeight(); j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.map.getWdth(); i++) {
            _loop_1(i);
        }
    }
    Game.prototype.draw = function () {
        var _this = this;
        var _loop_3 = function (i) {
            var _loop_4 = function (j) {
                var img = new Image();
                img.src = this_2.map.getBlock(j, i).getimgSrc();
                img.onload = function () {
                    var pattern = _this.context.createPattern(img, 'repeat');
                    _this.context.fillStyle = pattern;
                    _this.context.drawImage(img, i * 84, j * 84, 84, 84);
                };
            };
            for (var j = 0; j < this_2.map.getHeight(); j++) {
                _loop_4(j);
            }
        };
        var this_2 = this;
        for (var i = 0; i < this.map.getWdth(); i++) {
            _loop_3(i);
        }
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
                    default:
                        tmpBLock = new Air();
                        break;
                }
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
    Brick.prototype.getimgSrc = function () {
        return "/res/game/images/brick_00000.png";
    };
    return Brick;
}());
var Air = /** @class */ (function () {
    function Air() {
    }
    Air.prototype.getimgSrc = function () {
        return "/res/game/images/air_00000.png";
    };
    return Air;
}());
var Dirt = /** @class */ (function () {
    function Dirt() {
    }
    Dirt.prototype.getimgSrc = function () {
        return "/res/game/images/dirt_00000.png";
    };
    return Dirt;
}());
var Gold = /** @class */ (function () {
    function Gold() {
    }
    Gold.prototype.getimgSrc = function () {
        return "/res/game/images/gold_00000.png";
    };
    return Gold;
}());
var Tnt = /** @class */ (function () {
    function Tnt() {
    }
    Tnt.prototype.getimgSrc = function () {
        return "/res/game/images/tnt_00000.png";
    };
    return Tnt;
}());
var Diamond = /** @class */ (function () {
    function Diamond() {
    }
    Diamond.prototype.getimgSrc = function () {
        return "/res/game/images/diamond_00000.png";
    };
    return Diamond;
}());
var Stone = /** @class */ (function () {
    function Stone() {
    }
    Stone.prototype.getimgSrc = function () {
        return "/res/game/images/rock_00000.png";
    };
    return Stone;
}());
var player = new Player(7, 5, Dir.Up);
var mygame = new Game(document.getElementById("main"), player);
mygame.draw();
