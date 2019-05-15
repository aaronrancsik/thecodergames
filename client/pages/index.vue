<template>
  <HelloWorld />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '~/components/HelloWorld.vue';

@Component({
  layout:'landing',
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>
