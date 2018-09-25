var options = { 
    media: './blockly/media/',
    toolbox: document.getElementById('toolbox'),
    zoom:{
      controls: true,
      wheel: false,
      startScale: 2,
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

var blocklyArea = document.getElementById('blocklyArea');
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
Blockly.BlockSvg.START_HAT = true;



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
  var code = 'Iteration(){\n'+statements_iterationsin+'\n};\n';
  return code;
};
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace);

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

workspace.registerButtonCallback("SEND_SERVER", sendServer);
workspace.addChangeListener(sendServer);

var myStorage = window.localStorage;
var savedtoken = myStorage.getItem("token");
var def ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYSIsImlhdCI6MTUzNzkxMjI0NH0.cuUnbO8xbSLNf0TQSCQ3SqWM1peFtGG8E8qH_QjKhtg"
if(savedtoken==undefined){
  savedtoken =def;
}
var socket = io( {query: {token: savedtoken}} );

function sendServer(){
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  var xml = Blockly.Xml.workspaceToDom(workspace);
  var xml_text = Blockly.Xml.domToPrettyText(xml);
 
  socket.emit("codeUpdate", {"code":xml_text});
}


$(window).on('load',function(){

  if(savedtoken === def){
    
    $('#myModal').modal('show');
  }else{
    //alert('auth_token='+savedtoken);
  }
});

function regist(){
  
  var name = document.getElementById("username").value;
  
  socket.emit("regist",{"name":name});
  
  
  
}
    
socket.on("regist",(isSuc)=>{
 

  if(isSuc.suc===true){
    console.log(socket.query.token);
    socket.query.token = isSuc.token;
    console.log(socket.query.token);
    socket.connect();
    location.reload();
    myStorage.setItem("token",isSuc.token);
    $('#myModal').modal('hide');
    
  }else{
    alert("Ez a név már foglalt kérlek válassz másikat");
  }
})