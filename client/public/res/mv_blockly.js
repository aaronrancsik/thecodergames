var options = { 
    media: './blockly/media/',
    //toolbox: document.getElementById('toolbox'),
    scrollbars:true,
    zoom:{
      controls: true,
      wheel: false,
      startScale: 1.6,
      maxScale: 6,
      minScale: 0.3,
      scaleSpeed: 1.2
    },
    collapse : true, 
    comments : true, 
    disable : true, 
    maxBlocks : Infinity,  
    horizontalLayout : true, 
    toolboxPosition : 'start',
    css : true, 
    rtl : false,
    sounds : false, 
    trashcan: false,
    grid:{ 
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: false
    }
}

var blocklyArea = document.getElementById('blocklyArea1');

var blocklyDiv = document.getElementById('blocklyDiv');

var workspace = Blockly.inject(blocklyDiv, options);




var onresize = function(e) {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  var element = blocklyArea;

  var x = 0;

  var y = 0;

  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);

  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';

  blocklyDiv.style.top = y + 'px';

  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';

  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';

  Blockly.svgResize(workspace);

  
};

window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);


//Color
Blockly.HSV_SATURATION = 0.7;
Blockly.HSV_VALUE = 0.9;
//hat
Blockly.BlockSvg.START_HAT = true;
//highlight

Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
Blockly.JavaScript.addReservedWords('highlightBlock');
function highlightBlock(id) {
  workspace.highlightBlock(id);
}

/*
Custom Blocks
*/
Blockly.Blocks['iterations'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Lépések");
    this.appendStatementInput("iterationsin")
        .setCheck(null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['iterations'] = function(block) {
  block.setDeletable(false);
  var statements_iterationsin = Blockly.JavaScript.statementToCode(block, 'iterationsin');
  // TODO: Assemble JavaScript into code variable.
  var code = 'function Iteration(){\n'+statements_iterationsin+'\n};\n';
  return code;
};


Blockly.Blocks['stepforward'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Előre lépés ⬆");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(33);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['stepforward'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'StepForward();\n';
  return code;
};

Blockly.Blocks['stepback'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Hátra lépés ⬇");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(33);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['stepback'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'StepBack();\n';
  return code;
};

Blockly.Blocks['turnright'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Jobbra fordulás ↩ ");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['turnright'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'TurnRight();\n';
  return code;
};

Blockly.Blocks['turnleft'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Balra fordulás ↪");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['turnleft'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'TurnLeft();\n';
  return code;
};

/*
workspace.registerButtonCallback("SEND_SERVER", sendServer);
workspace.addChangeListener(sendServer);
*/
//
var socket = io({query: {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidmlld2VyIiwiaWF0IjoxNTM3OTE5MjY4fQ.KA20flfIPRDQaas6Eq20KnzlEiJ6hKXVKPXGcEyA1IY"}});
var user = "";
var aktamap =0;
var userF = document.getElementById("userF");
var mapf = document.getElementById("mapF");
function changeUser(newUser){

  if(newUser==""){
    workspace.clear();
    user ="";
  }else{
    user =newUser;
  }
  userF.innerText = newUser;
}

function changeMap(number){
  mygame.loadMap(number);
  aktamap = number;  
  mapf.innerText =(parseInt(number));
  
}

socket.on("changeMap",(m)=>{
  
  changeMap(m.map);
});

socket.on("inspectUser",(user)=>{
  changeUser(user.username);
  socket.emit("forceUpdate",{});
});

socket.on("toViwer",(code)=>{
  
  
  if(user==code.name){
    workspace.clear();
    var xml = Blockly.Xml.textToDom(code.code.code);
    Blockly.Xml.domToWorkspace(xml, workspace);

    function getBlocksByType(type) {
      var blocks = [];
      for (var blockID in workspace.blockDB_) {
        if (workspace.blockDB_[blockID].type == type) {
          blocks.push(workspace.blockDB_[blockID]);
        }
      }
      return(blocks);
    }
    var block = getBlocksByType("iterations")[0];
    block.select();
    
        // *block* is the block to scroll into view.

    var mWs = workspace;
    var xy = block.getRelativeToSurfaceXY();	// Scroll the workspace so that the block's top left corner
    var m = mWs.getMetrics();					// is in the (0.2; 0.3) part of the viewport.
    mWs.scrollbar.set(	
      xy.x * mWs.scale - m.contentLeft - m.viewWidth  * 0.1,
      xy.y * mWs.scale - m.contentTop  - m.viewHeight * 0.05
    );
  }
  
  
});


function StepForward(){
  player.stepForward();
}
function  StepBack(){
  player.stepBack();
}
function TurnLeft(){
  player.rotLeft()
}
function TurnRight(){
  player.rotRight()
}
var reducer = (accumulator, currentValue) => accumulator + currentValue;
var ulf = document.getElementById("ul");
socket.on("leaderUpdate",(m)=>{
  ulf.innerHTML ="";
  console.log(m);
  
  m.users.forEach(element => {
    var sum =0;
    element.scoreLevel.forEach(e => {
      sum += parseInt(e);
    });
    ulf.innerHTML +="<li>" +element.name +" - " + sum + "</li>"  
  });
  
})

socket.on("playGame",(code)=>{
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  
  //alert(code);
  

  var initApi = function(myInterpreter, scope){
    var wrapper = function() {
      return StepForward();
    };
    myInterpreter.setProperty(scope, 'StepForward',
    myInterpreter.createNativeFunction(wrapper));

    wrapper = function() {
      return StepBack();
    };
    myInterpreter.setProperty(scope, 'StepBack',
    myInterpreter.createNativeFunction(wrapper));

    wrapper = function() {
      return TurnLeft();
    };
    myInterpreter.setProperty(scope, 'TurnLeft',
    myInterpreter.createNativeFunction(wrapper));

    wrapper = function() {
      return TurnRight();
    };
    myInterpreter.setProperty(scope, 'TurnRight',
    myInterpreter.createNativeFunction(wrapper));

    //highlightBlock
    wrapper = function(text) {
      return highlightBlock(text);
    };
    myInterpreter.setProperty(scope, 'highlightBlock',
    myInterpreter.createNativeFunction(wrapper));

  }
  var myInterpreter = new Interpreter(code+"\n Iteration();", initApi);

  var maxStep = 5000;
  
  function nextStep() {
    if (myInterpreter.step()) {
      if(maxStep>0){
        maxStep--;
        window.setTimeout(nextStep, 4);
      }else{
        //alert("Tűl sok lépés")
      }
     
    }else{
      socket.emit("updateScore",{"map": aktamap,"user":user,"score": document.getElementById("score").innerText});
     

      //socket.emit("")
    }
  }
  nextStep();
  
  });

