<template>
    <div class="conti">   
        <Game class="game" />
        <BlocklyEditor class="editor" />
    </div>
</template>
<script lang="ts">

import { Vue, Component} from "vue-property-decorator";
import Game from "~/components/Game.vue";
import BlocklyEditor from "~/components/BlocklyEditor.vue";

@Component({
  components: {
    Game,
    BlocklyEditor
  }
})

export default class Crafter extends Vue {

    mounted() { }
}
</script>
<style scoped>
.conti{
    margin:0;
    height: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 100%; 
    grid-template-areas: "game editor"
    /* height: 100%; */
}
</style>
