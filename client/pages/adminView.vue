<template>
  <GameAdmin />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameAdmin from '~/components/GameAdmin.vue';

@Component({
  components: {
    GameAdmin
  },
  middleware:[
    'authenticated'
  ]
})
export default class AdminView extends Vue {
}
</script>