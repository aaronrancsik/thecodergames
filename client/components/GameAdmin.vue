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

import socket from '~/plugins/socket.io';

@Component
export default class GameAdmin extends Vue  {
    gameInst

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
<style>
#__nuxt, #__layout{
    height: 100%;
    overflow: hidden; 
}
#app{
    height: 100%;
}
</style>

<style scoped>
#gameid{
    height: 100%;
}
.sec{
    height: 100%;
}
</style>
