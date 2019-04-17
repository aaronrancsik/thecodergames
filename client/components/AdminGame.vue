<template>
    <GameBase />
</template>


<script lang="ts">
import {
  Component,
  Vue,
  Provide
} from "vue-property-decorator";
import GameBase from '~/components/GameBase.vue';
@Component({
  components: {
    GameBase
  }
})
export default class AdminGame extends Vue  {

}
</script>
<style scoped>

</style>
