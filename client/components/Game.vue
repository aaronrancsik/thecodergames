<template>
    <div>
        <div id="gameid" v-if="downloaded" />
        <div class="placeholder"  v-else >
            Downloading...
        </div>
    </div>
    
    
</template>
<script>
export default {
    name: 'Game',
    data(){
        return {
            downloaded:false
        }
    },
    mounted(){
        import('../game/game').then(game =>{
            this.downloaded =true;
            this.$nextTick(()=>game.launch());
        })
    }
}
</script>