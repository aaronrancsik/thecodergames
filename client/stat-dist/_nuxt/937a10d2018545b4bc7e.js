(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{1281:function(t,e,r){"use strict";r.r(e);r(194);var n,o=r(275),l=(n=function(t,b){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,b){t.__proto__=b}||function(t,b){for(var p in b)b.hasOwnProperty(p)&&(t[p]=b[p])})(t,b)},function(t,b){function e(){this.constructor=t}n(t,b),t.prototype=null===b?Object.create(b):(e.prototype=b.prototype,new e)}),h=function(t){switch(t){case 0:default:return"boxWooden"}},c=function(t){function e(e,r,n,o){var l=t.call(this,e,r,n,"assets",h(o))||this;return l.crateType=o,l.state="standing",l.onMoveStart=function(t,object,e){l.state="moving"},l.onMoveComplete=function(){l.state="standing",l.anims.stop(),l.scene},l}return l(e,t),e.prototype.getDirection=function(t,e){return t>this.x?"playerRight":t<this.x?"playerLeft":e>this.y?"playerDown":e<this.y?"playerUp":null},e.prototype.moveTo=function(t,e,r){var n=this.getDirection(t,e);n&&"moving"!==this.state&&(this.state="moving",this.scene.tweens.add({targets:this,x:t,y:e,duration:120,onStart:this.onMoveStart,onStartParams:[n],onComplete:this.onMoveComplete}))},e}(Phaser.GameObjects.Sprite),y=function(){var t=function(e,b){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,b){t.__proto__=b}||function(t,b){for(var p in b)b.hasOwnProperty(p)&&(t[p]=b[p])})(e,b)};return function(e,b){function r(){this.constructor=e}t(e,b),e.prototype=null===b?Object.create(b):(r.prototype=b.prototype,new r)}}(),f="knight iso char_idle_0",d=function(t){function e(e,r,n){var o=t.call(this,e,r,n,"assets",f)||this;return o._state="standing",o.onMoveStart=function(t,object,e){o._state="moving",o.idleTimer&&o.idleTimer.destroy()},o.onMoveComplete=function(){o._state="standing",o.scene&&(o.idleTimer=null)},o}return y(e,t),Object.defineProperty(e.prototype,"state",{get:function(){return this._state},enumerable:!0,configurable:!0}),e.prototype.moveTo=function(t,e){var r=this.getDirection(t,e);r&&"moving"!==this._state&&(this._state="moving",this.scene.tweens.add({targets:this,x:t+this.width/2,y:e+this.height/2,duration:120,onStart:this.onMoveStart,onStartParams:[r],onComplete:this.onMoveComplete}))},e.prototype.getDirection=function(t,e){return t>this.x?"playerRight":t<this.x?"playerLeft":e>this.y?"playerDown":e<this.y?"playerUp":null},e}(o.GameObjects.Sprite),v=function(){var t=function(e,b){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,b){t.__proto__=b}||function(t,b){for(var p in b)b.hasOwnProperty(p)&&(t[p]=b[p])})(e,b)};return function(e,b){function r(){this.constructor=e}t(e,b),e.prototype=null===b?Object.create(b):(r.prototype=b.prototype,new r)}}(),w=function(t){function e(){return t.call(this,{key:"LevelScene"})||this}return v(e,t),e.prototype.updatePlayer=function(t){t&&this.troToMovePlayer(t)},e.prototype.troToMovePlayer=function(t){var e=this.player,r=e.x,n=e.y,o=this.tileMap.getTileAtWorldXY(r,n,!0);if(null===this.getNextTile(o,t,this.wallLayer)){var l=this.getNextTile(o,t,this.floorLayer);if(null!==l){if(null!==this.getCrateAt(l)){var h=this.getNextTile(l,t,this.floorLayer);if(null===h)return!1;if(!this.checkIfLocationIsFree(h))return!1}this.movePlayer(l)}}},e.prototype.checkIfLocationIsFree=function(t){return!(t.x<0||t.x>=this.tileMap.width||t.y<0||t.y>=this.tileMap.height)&&(!this.wallLayer.getTileAt(t.x,t.y)&&!this.getCrateAt(t))},e.prototype.getCrateAt=function(t){var e=this.crates.getChildren(),r=this.tileToWordFixOrigin(t),n=r.x,l=r.y,h=e.filter(function(t){var e=new o.Math.Vector2(t.x,t.y);return e.x===n&&e.y===l});return 0===h.length?null:h[0]},e.prototype.getNextTile=function(t,e,r){var n=t.x,o=t.y;switch(e){case"playerDown":return r.getTileAt(n,o+1);case"playerUp":return r.getTileAt(n,o-1);case"playerLeft":return r.getTileAt(n-1,o);case"playerRight":return r.getTileAt(n+1,o);default:throw new Error("Unexpected direction")}},e.prototype.movePlayer=function(t){var e=this.tileToWordFixOrigin(t),r=e.x,n=e.y,ol=this.tileMap.tileToWorldXY(t.x,t.y),o=this.getCrateAt(t);if(o){var l=o.x+r-this.player.x,h=o.y+n-this.player.y,c=this.floorLayer.getTileAtWorldXY(l,h);o.moveTo(l,h,c)}this.player.moveTo(ol.x,ol.y)},e.prototype.createInputHandler=function(){var t=this;this.leftKeys=[o.Input.Keyboard.KeyCodes.LEFT,o.Input.Keyboard.KeyCodes.A,o.Input.Keyboard.KeyCodes.Q].map(function(e){return t.input.keyboard.addKey(e)}),this.rightKeys=[o.Input.Keyboard.KeyCodes.RIGHT,o.Input.Keyboard.KeyCodes.D].map(function(e){return t.input.keyboard.addKey(e)}),this.upKeys=[o.Input.Keyboard.KeyCodes.UP,o.Input.Keyboard.KeyCodes.W,o.Input.Keyboard.KeyCodes.Z].map(function(e){return t.input.keyboard.addKey(e)}),this.downKeys=[o.Input.Keyboard.KeyCodes.DOWN,o.Input.Keyboard.KeyCodes.S].map(function(e){return t.input.keyboard.addKey(e)})},e.prototype.getPlayerDirection=function(){return this.leftKeys.some(function(t){return t.isDown})?"playerLeft":this.rightKeys.some(function(t){return t.isDown})?"playerRight":this.upKeys.some(function(t){return t.isDown})?"playerUp":this.downKeys.some(function(t){return t.isDown})?"playerDown":null},e.prototype.tileToWordFixOrigin=function(t){var e=this.tileMap.tileToWorldXY(t.x,t.y);return e.x+=t.width/2,e.y+=t.height/2,e},e.prototype.preload=function(){this.load.atlas("assets","./assets/assets.png","./assets/assets.json"),this.load.tilemapTiledJSON("level01","./assets/levels/level01.json")},e.prototype.create=function(){this.tileMap=this.make.tilemap({key:"level01"}),this.tileSet=this.tileMap.addTilesetImage("assets"),this.createLevel(),this.createPlayer(),this.createGridLines(),this.createInputHandler()},e.prototype.update=function(){"moving"!==this.player.state&&this.updatePlayer(this.getPlayerDirection())},e.prototype.createLevel=function(){this.createLayers(),this.createCrates()},e.prototype.createLayers=function(){this.spawnLayer=this.tileMap.createStaticLayer("Spawns",this.tileSet,0,0),this.spawnLayer.setVisible(!1),this.crateLayer=this.tileMap.createStaticLayer("Crates",this.tileSet,0,0),this.crateLayer.setVisible(!1),this.floorLayer=this.tileMap.createDynamicLayer("Floors",this.tileSet,0,0),this.wallLayer=this.tileMap.createStaticLayer("Walls",this.tileSet,0,0),this.goalLayer=this.tileMap.createStaticLayer("Goals",this.tileSet,0,0)},e.prototype.createCrates=function(){var t=this,e=this.getTiles(function(t){return t.index>-1},this.crateLayer).map(function(e){var r=t.tileToWordFixOrigin(e),n=r.x,o=r.y,l=e.properties.type,h=new c(t,n,o,l);return t.add.existing(h),h});this.crates=this.add.group(e)},e.prototype.createPlayer=function(){var t=this.getSpawn(),e=this.tileToWordFixOrigin(t),r=e.x,n=e.y;this.player=new d(this,r,n),this.add.existing(this.player)},e.prototype.getSpawn=function(){var t=this.getTiles(function(t){return t.index>-1},this.spawnLayer);if(1!==t.length)throw new Error("[LevelScene] Expected single spawn");return t[0]},e.prototype.getTiles=function(t,e){return this.tileMap.setLayer(e||this.floorLayer),this.tileMap.filterTiles(function(e){return t(e)},this,0,0,this.tileMap.width,this.tileMap.height)},e.prototype.createGridLines=function(){this.addVerticalLines(6,2),this.addHorizontalLines(6,2)},e.prototype.addVerticalLines=function(t,e){for(var r=0,n=this.tileMap.widthInPixels,o=this.tileMap.heightInPixels,l=function(e,r){return{x:e,y:r+t}},h=function(t,r){return{x:t,y:r+e}},c=function(t,e){return e>=o};r<=n;)this.addGridLine(r,0,l,h,c),r+=this.tileMap.tileWidth},e.prototype.addHorizontalLines=function(t,e){for(var r=0,n=this.tileMap.widthInPixels,o=this.tileMap.heightInPixels,l=function(e,r){return{x:e+t,y:r}},h=function(t,r){return{x:t+e,y:r}},c=function(t,e){return t>=n};r<=o;)this.addGridLine(0,r,l,h,c),r+=this.tileMap.tileHeight},e.prototype.addGridLine=function(t,e,r,n,o){var l=t,h=e,line=this.add.graphics({x:0,y:0,lineStyle:{width:1,alpha:.5,color:0},fillStyle:{color:0,alpha:1}});for(line.beginPath(),line.moveTo(t,e);!o(l,h);){var c=r(l,h),y=c.x,f=c.y;line.lineTo(y,f);var d=n(y,f),v=d.x,w=d.y;line.moveTo(v,w),l=v,h=w}line.closePath(),line.strokePath(),line.fillPath()},e}(o.Scene);r.d(e,"Game",function(){return m}),r.d(e,"launch",function(){return L});var x=function(){var t=function(e,b){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,b){t.__proto__=b}||function(t,b){for(var p in b)b.hasOwnProperty(p)&&(t[p]=b[p])})(e,b)};return function(e,b){function r(){this.constructor=e}t(e,b),e.prototype=null===b?Object.create(b):(r.prototype=b.prototype,new r)}}(),m=(Phaser.AUTO,function(t){function e(e){return t.call(this,e)||this}return x(e,t),e}(Phaser.Game));function L(){new m({width:1040,height:1040,type:Phaser.AUTO,parent:"gameid",scene:w})}e.default=L}}]);