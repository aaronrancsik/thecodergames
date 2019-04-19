<template>
 <v-toolbar light dense>
      <v-toolbar-title >Szerkersztő panel</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="logout">Kilépés</v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
const Cookie = process.client ? require('js-cookie') : undefined
@Component
export default class AccountManage extends Vue {
    logout() {
      //todo add server call
      Cookie.remove('auth');
      this.$store.commit('setAuth', null);
      location.reload(true);
    }
}
</script>


