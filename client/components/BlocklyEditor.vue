<template>
<div class="base">
    <div class="">
        <v-toolbar dense >
            <v-menu class="hidden-md-and-up">
                <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
                <v-list>
                <v-list-tile v-for="item in menu" :key="item.icon" @click="menuSwitch(item.title)">
                    <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>   
                </v-list>
            </v-menu>
            
            <v-toolbar-items class="hidden-sm-and-down" v-for="item in menu" :key="item.id">
                <v-btn
                    v-bind:color="item.color"
                    v-bind:flat="item.flat"
                    v-on:click="menuSwitch(item.title)"
                >
                <v-icon>{{item.icon}}</v-icon>
                </v-btn>
            </v-toolbar-items>

        </v-toolbar>
    </div>
    <div ref="blocklyDiv" class="blocklyDiv"></div>
</div>
   
</template>

<style>
#__nuxt, #__layout{
    height: 100%;
    overflow: hidden; 
}
#app{
    height: 100%;
}
.blocklyToolboxDiv{
    background-color: #202020;
}
.blocklyFlyoutBackground{
    background-color:#333;
    fill-opacity: 0.2;
}
.blocklySvg{
    background-color: #24343D;
}
</style>


<style scoped>
.start{
    background-color: seagreen;
}
.stop{
    background-color: tomato;
}
.blocklyDiv{
    height: 99%;
    padding-bottom: 50px;
    /* position: relative; */
}
.base{
    
    height: 100%;
    /* display: grid;
    grid-template-rows: 50px auto;  */
}

</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import base64 from 'base-64';
// import { constants } from 'crypto';
// import { truncate, truncateSync } from 'fs';
//import axios from 'axios';

declare const Blockly;
declare const Interpreter:any;
@Component
export default class BlocklyEditor extends Vue{
    menu = [
        {flat:true, icon:'save', color:'success', title:'Save'},
        {flat:false, icon:'play_arrow', color:'success',title:'Play'},
        {flat:false, icon:'stop', color:'error',title:'Stop'},
        {flat:true, icon:'cloud_download', color:'info',title:'Load Saved'},
    ]


    code:string = "";
    xmlCode:string ="";
    workspace :any;
    isCancel =false;

    menuSwitch(title:string){
        switch(title){
            case "Play" : this.run(); break;
            case "Save" : this.saveToServer(); break;
            case "Stop" : this.stop(); break;
            case "Load Saved" : this.loadFromServer(); break;

        }
    }
    stop(){
        this.isCancel=true;
        this.workspace.highlightBlock(null);
    }
    
    run(){
        //Make blockly not accessable in running but not needed
        //let bd:any = this.$refs.blocklyDiv;
        //let block = document.createElement('div');
        //block.setAttribute("style", "position: absolute; min-width: 100%;min-height: 100%;z-index: 100; background-color: #00ff6e21;");
        //bd.insertBefore(block,bd.firstChild);

        this.isCancel = false;
        let highlightBlock= (id)=>{
            this.workspace.highlightBlock(id);
        }
        let StepForward=()=>{
            move =true;
            this.$nuxt.$emit('STEP_FORWARD',()=>{
                move =false;
                uresJaras();
            });
            //console.log("player.stepForward()");
        }
        let StepBack=()=>{
            move =true;
            this.$nuxt.$emit('STEP_BACK',()=>{
                move =false;
                uresJaras();
            });
            //console.log("player.stepBack()");
        }
        let TurnLeft=()=>{
            move =true;
            this.$nuxt.$emit('TURN_LEFT',()=>{
                move =false;
                uresJaras();
            });
            //console.log("player.rotLeft()");
        }
        let TurnRight=()=>{
            move =true;
            this.$nuxt.$emit('TURN_RIGHT',()=>{
                move =false;
                uresJaras();
            });
            //console.log("player.rotRight()");
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
        var myInterpreter = new Interpreter(myCode, initApi);

        let move =false;

        let db = 1000000;
        let uresJaras = ()=>{
            try{
                while(myInterpreter.step() && !move && !this.isCancel && db > 0){
                    db--;
                    if(db == 0){
                        alert("Végtelen ciklust, vagy túlsok számolást csináltál! :)")
                    }
                }
            }catch(e){
                alert(e);
                this.isCancel = true;
            }
        };
        uresJaras();

    }

    saveToServer(){
        let thiss = this;
        this['$axios'].post('/updatecode',{level:0,code:this.xmlCode}).then((res,err)=>{
        }).catch(function (error) {
            if (error) {
                console.log("Hiba a menetesben");
                console.log(error);
            }
        });
    }

    loadFromServer(){
        this['$axios'].get('/getcode',{level:0,code:this.xmlCode}).then((res,err)=>{
            //console.log(res.data);
            if(res.data){
                var xml = Blockly.Xml.textToDom(res.data);
                this.workspace.clear();
                Blockly.Xml.domToWorkspace(xml, this.workspace);
                //taChange();
            }

        })
        .catch((error) => {
            if (error) {
                console.log("Hiba a menetesben");
                console.log(error);
            }
        });
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
            this.code = Blockly.JavaScript.workspaceToCode(this.workspace);
            let xml = Blockly.Xml.workspaceToDom(this.workspace);
            this.xmlCode = Blockly.Xml.domToPrettyText(xml);
            
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
            Blockly.HSV_SATURATION = 0.8;
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
            horizontalLayout : true, 
            toolboxPosition : 'end', 
            css : true, 
            rtl : false,
            sounds : false, 
            trashcan: true,
            grid:{ 
                spacing: 20,
                length: 3,
                colour: '#1E1E1E',
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

