var options ={ 
    media: './blockly/media/',
    toolbox: document.getElementById('toolbox'),
    zoom:{
      controls: true,
      wheel: false,
      startScale: 3.4,
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

/*
Custom Blocks
*/
Blockly.Blocks['leftstep'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Balra lépés");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(75);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['leftstep'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'leftStep();\n';
  return code;
};

Blockly.Blocks['rightstep'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Jobbra lépés");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(75);
this.setTooltip("");
this.setHelpUrl("");
  }
};
Blockly.JavaScript['rightstep'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'rightstep();\n';
  return code;
};

Blockly.Blocks['upstep'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Felfele lépés");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(75);
this.setTooltip("");
this.setHelpUrl("");
  }
};
Blockly.JavaScript['upstep'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'upstep();\n';
  return code;
};

Blockly.Blocks['downstep'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Lefele lépés");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(75);
this.setTooltip("");
this.setHelpUrl("");
  }
};
Blockly.JavaScript['downstep'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'downstep()\n';
  return code;
};

workspace.registerButtonCallback("SEND_SERVER", sendServer);
workspace.addChangeListener(sendServer);


function sendServer(){
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  var xml = Blockly.Xml.workspaceToDom(workspace);
  var xml_text = Blockly.Xml.domToPrettyText(xml);
 
  socket.emit("codeUpdate", {"code":xml_text});
}