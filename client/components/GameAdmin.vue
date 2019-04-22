<template>
    <section class="sec">
        <v-btn @click="ok" color="success">text</v-btn>
        <v-btn @click="foo" color="success">foo</v-btn>
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

    beforeMount() {
        
        socket.on('message', (message) => {
            alert(message);
        });
    }
    ok(){
        
        //socket.connect();
        //console.log(this.$store.state.auth.accessToken);
        
    }

    foo(){
        alert(socket.connected);
        //socket!.emit('message',"Hello World!");
    }
    
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
