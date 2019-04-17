<template>
    <AdminGame />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AdminGame from '~/components/AdminGame.vue';

@Component({
  components: {
    AdminGame
  }
})
export default class AdminView extends Vue {}
</script>