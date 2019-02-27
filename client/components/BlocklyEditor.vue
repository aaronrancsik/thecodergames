<template>
    <div ref="blocklyDiv" class="blocklyDiv"></div>
</template>
<script lang="ts">
import {Component ,Vue} from 'vue-property-decorator'
import base64 from 'base-64';

declare const Blockly;
@Component
export default class BlocklyEditor extends Vue{
    
    
    mounted(){
        
        let sendServer =()=>{
            let code = Blockly.JavaScript.workspaceToCode(workspace);
            let xml = Blockly.Xml.workspaceToDom(workspace);
            let xml_text = Blockly.Xml.domToPrettyText(xml);
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
            var code = 'Iteration(){\n'+statements_iterationsin+'\n};\n';
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

        let blocklyDiv = this.$refs.blocklyDiv;
        let workspace = Blockly.inject(blocklyDiv, options);

        //Blockly.svgResize(workspace);
        
        let xmlInitBlocks =  new DOMParser().parseFromString(
            base64.decode(
                require('../assets/initBlocks.xml').substring(21+7).toString()
            )
            ,"text/xml"
        ).firstChild;
        Blockly.Xml.domToWorkspace(xmlInitBlocks, workspace);
 
        //workspace.registerButtonCallback("SEND_SERVER", sendServer);
        workspace.addChangeListener(sendServer);
        workspace.toolbox_.flyout_.autoClose = false;
        workspace.scrollbar.setContainerVisible(false);
    }   
}
</script>

<style>
.blocklyDiv{
    height: 100%;

}
</style>