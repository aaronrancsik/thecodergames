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
            this.gameInst.alma();
        });
        this.$nuxt.$on('STEP_BACK', data => {
            alert("STEP_BACK"+data);
        });
        this.$nuxt.$on('TURN_LEFT', data => {
            alert("TURN_LEFT"+data);
        });
        this.$nuxt.$on('TURN_RIGHT', data => {
            alert("TURN_RIGHT"+data);
        });
    }

    @Provide() downloaded:boolean =false;

    mounted(){
        import('../game/game').then(game =>{
            this.downloaded =true;
            this.$nextTick(()=>game.launch());
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
