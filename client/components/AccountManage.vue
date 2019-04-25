<template>
 <v-toolbar light dense>
      <v-toolbar-title >Szerkersztő panel</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="">
        <v-btn flat @click="logout">Kilépés</v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AccountManage extends Vue {
    logout() {
      this['$cookies'].remove('auth');
      this['$cookies'].remove('roles');
      this.$router.push('/');
    }
}
</script>


