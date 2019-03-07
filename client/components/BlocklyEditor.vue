<template>
<div class="blocklyDiv">
    <button @click="run"> RUN </button>
    <div ref="blocklyDiv" class="blocklyDiv"></div>
</div>
   
</template>

<script lang="ts">
import {Component ,Vue} from 'vue-property-decorator'
import base64 from 'base-64';

declare const Blockly;
declare const Interpreter:any;

@Component
export default class BlocklyEditor extends Vue{

    code:string = "";
    workspace :any;
    
    
    run(){
        let highlightBlock= (id)=>{
            this.workspace.highlightBlock(id);
        }
        function StepForward(){
            console.log("player.stepForward()");
        }
        function  StepBack(){
            console.log("player.stepBack()");
        }
        function TurnLeft(){
            console.log("player.rotLeft()");
        }
        function TurnRight(){
            console.log("player.rotRight()");
        }
        var initApi = function(myInterpreter, scope){
            let wrapper:any;
            wrapper = function() {
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
        //console.log(this.code);
        var myCode = this.code;
        //alert(myCode);

        var myInterpreter = new Interpreter(myCode, initApi);
        let maxStep = 5000;

        function nextStep() {
            if (myInterpreter.step()) {
                if(maxStep>0){
                    maxStep--;
                    window.setTimeout(nextStep, 1);
                }else{
                    //alert("Tul sok lépés")
                }
            
            }else{
            //socket.emit("updateScore",{"map": aktamap,"user":user,"score": document.getElementById("score").innerText});
            //socket.emit("")
            }
        }
        nextStep();
    }
    
    mounted(){

        let getBlocksByType=(type)=> {
            var blocks:any = [];
            for (var blockID in this.workspace.blockDB_) {
                if (this.workspace.blockDB_[blockID].type == type) {
                    blocks.push(this.workspace.blockDB_[blockID]);
                }
            }
            return(blocks);
        }
        
        let sendServer =()=>{
            this.code = Blockly.JavaScript.blockToCode(getBlocksByType("iterations")[0]);

            let code = Blockly.JavaScript.workspaceToCode(this.workspace);
            let xml = Blockly.Xml.workspaceToDom(this.workspace);
            let xml_text = Blockly.Xml.domToPrettyText(xml);
            //this.code =Blockly.JavaScript.workspaceToCode(workspace);
            //console.log(xml_text);
        }

        let addCustomBlocks=()=>{
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
            var code = statements_iterationsin;
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
        }

        let customColor=()=>{
            Blockly.HSV_SATURATION = 0.7;
            Blockly.HSV_VALUE = 0.9;
            Blockly.BlockSvg.START_HAT = true;
        }

        let xmlToolBox =  new DOMParser().parseFromString(
            base64.decode(
                require('../assets/toolbox.xml').substring(21+7).toString()
            )
            ,"text/xml"
        ).firstChild;

        let options = {
            scrollbars: true,
            media: '/blockly/media/',
            toolbox: xmlToolBox,
            zoom:{
                controls: true,
                wheel: false,
                startScale: 1,
                maxScale: 6,
                minScale: 0.3,
                scaleSpeed: 1.2
            },
            collapse : false, 
            comments : true, 
            disable : true, 
            maxBlocks : Infinity,  
            horizontalLayout : false, 
            toolboxPosition : 'end', 
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
        
        
        customColor();
        addCustomBlocks();

        Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
        Blockly.JavaScript.addReservedWords('highlightBlock');


        let blocklyDiv = this.$refs.blocklyDiv;
        this.workspace = Blockly.inject(blocklyDiv, options);
        //Blockly.svgResize(workspace);
        
        let xmlInitBlocks =  new DOMParser().parseFromString(
            base64.decode(
                require('../assets/initBlocks.xml').substring(21+7).toString()
            )
            ,"text/xml"
        ).firstChild;
        Blockly.Xml.domToWorkspace(xmlInitBlocks, this.workspace);
 
        //workspace.registerButtonCallback("SEND_SERVER", sendServer);
        this.workspace.addChangeListener(sendServer);
        this.workspace.toolbox_.flyout_.autoClose = false;
        this.workspace.scrollbar.setContainerVisible(false);
        
    }

    



}
</script>

<style>
.blocklyDiv{
    height: 100%;

}
</style>