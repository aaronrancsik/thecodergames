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
var blocklyArea2 = document.getElementById('blocklyArea2');
var blocklyDiv = document.getElementById('blocklyDiv');
var blocklyDiv2 = document.getElementById('blocklyDiv2');
var workspace = Blockly.inject(blocklyDiv, options);
var workspace2 = Blockly.inject(blocklyDiv2, options);



var onresize = function(e) {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  var element = blocklyArea;
  var element2 = blocklyArea2;
  var x = 0;
  var x2 = 0;
  var y = 0;
  var y2 = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  do{
    x2 += element2.offsetLeft;
    y2 += element2.offsetTop;
    element2 = element2.offsetParent;
  }while(element2)
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv2.style.left = x2 + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv2.style.top = y2 + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv2.style.width = blocklyArea2.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  blocklyDiv2.style.height = blocklyArea2.offsetHeight + 'px';
  Blockly.svgResize(workspace);
  Blockly.svgResize(workspace2);
  
};

window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);
Blockly.svgResize(workspace2);

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

socket.on("toViwer",(code)=>{
  workspace.clear()
  var xml = Blockly.Xml.textToDom(code.code);
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

socket.on("playGame",(code)=>{
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  
  alert(code);
  

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

  function nextStep() {
    if (myInterpreter.step()) {
      window.setTimeout(nextStep, 15);
      mygame.draw();
    }
  }
  nextStep();
});

