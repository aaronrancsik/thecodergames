<template>
    <div>
        <table>
            <tr>
                <td id="blocklyArea"></td>
            </tr>
        </table>

        <div id="blocklyDiv" style="position: absolute"></div>
        
        <xml id="toolbox" style="display: none">
            <category name="Dash" colour="%{BKY_LOGIC_HUE}">
                <block type="stepforward"></block>
                <block type="stepback"></block>
                <block type="turnleft"></block>
                <block type="turnright"></block>
                <block type="controls_repeat" ></block>
            </category>
        </xml>

        <xml id="startBlocks" style="display: none">
            <block type="iterations"  x="20" y="20"></block>
        </xml>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    
})
</script>

<style scoped>
table{
    background-color: blueviolet;
}
</style>


