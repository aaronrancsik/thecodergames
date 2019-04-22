<template>
<v-container bg fill-height grid-list-md text-xs-center fluid>
  <v-layout row wrap >
    <v-flex xs12>
      <AccountManage/>
    </v-flex>
    <v-flex xs6 style="height:100%;padding-bottom: 40px;"> <!-- very ugly, but Phaser need it :( ) --> 
      <Game />
    </v-flex>
    <v-flex xs6 style="height:100%;padding-bottom:30px;">
      <BlocklyEditor />
    </v-flex>
  </v-layout>
</v-container>
</template>
<script lang="ts">

import { Vue, Component} from "vue-property-decorator";
import Game from "~/components/Game.vue";
import BlocklyEditor from "~/components/BlocklyEditor.vue";
import AccountManage from "~/components/AccountManage.vue";

@Component({
  components: {
    Game,
    BlocklyEditor,
    AccountManage
  },
  middleware:[
    'authenticated'
  ]
})

export default class Crafter extends Vue {

    mounted() { }
}
</script>
