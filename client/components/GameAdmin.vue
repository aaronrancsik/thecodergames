<template>
    <section class="sec">
        <div id="gameid" v-if="downloaded" />
        <div class="placeholder"  v-else >
            Downloading...
        </div>
    </section>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Provide
} from "vue-property-decorator";

@Component
export default class GameAdmin extends Vue  {
    gameInst
    created(){
    }

    @Provide() downloaded:boolean = false;

    mounted(){
        import('../game/game').then(game =>{
            this.downloaded =true;
            this.$nextTick(()=>{
                game.launch('viewScene');
                this.gameInst =game.getGame();
            });
        });
    }
}
</script>
<style scoped>
#gameid{
    height: 100%;
}
.sec{
    height: 100%;
}
</style>
