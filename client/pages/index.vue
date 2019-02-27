<template>
<Game/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '~/components/HelloWorld.vue';
import Game from '~/components/Game.vue'

@Component({
  components: {
    HelloWorld,
    Game
  }
})
export default class Home extends Vue {}
</script>

<style>
</style>


