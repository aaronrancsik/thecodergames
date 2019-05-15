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
        console.log("id:", socket.id);
        import('../game/game').then(game =>{
            this.downloaded =true;
            this.$nextTick(()=>{
                game.launch('viewScene');
                this.gameInst =game.getGame();
            });
        });

        socket.on('createplayers',(players)=>{
            console.log("create players");
            this.gameInst.createplayers(players);
        })

        socket.on('start',(m)=>{
            this.gameInst.action('0','left', socket);
            //alert('startGame'+m);
        });
        socket.on("step",(id,useername, action)=>{
            this.gameInst.action(useername, action, ()=>{
                console.log("callback");
                socket.emit("ok", useername,id);
            });
        });
        socket.emit('subAdmins', [this['$cookies'].get('auth')]);
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
