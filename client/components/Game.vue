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
export default class Game extends Vue  {
    gameInst
    created(){
         // $on method will receive the updated count value from the sender component
        this.$nuxt.$on('STEP_FORWARD', data => {
            //alert("STEP_FORWARD"+data);
            this.gameInst.moveForward();
        });
        this.$nuxt.$on('STEP_BACK', data => {
           this.gameInst.moveBackward();
        });
        this.$nuxt.$on('TURN_LEFT', data => {
             this.gameInst.turnLeft();
        });
        this.$nuxt.$on('TURN_RIGHT', data => {
            this.gameInst.turnRight();
        });
    }

    @Provide() downloaded:boolean =false;

    mounted(){
        import('../game/game').then(game =>{
            this.downloaded =true;
            
            this.$nextTick(()=>{
                game.launch();
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
