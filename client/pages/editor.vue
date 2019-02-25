<template>
    <span>
        <BlocklyEditor />
    </span>
    
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Game from "~/components/Game.vue";
import BlocklyEditor from "~/components/BlocklyEditor.vue";

@Component({
    components:{
        Game,
        BlocklyEditor
    }
})
export default class Editor extends Vue{

}
</script>

<style>

</style>