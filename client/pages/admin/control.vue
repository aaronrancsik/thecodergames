<template>
  <v-container fluid fill-height>
    <v-layout row >
         <v-flex shrink pa-1>
              <v-btn outline @click="getUsers()">Get Users</v-btn>
              <v-btn outline @click="viewer()">Open Viewer</v-btn>
              <v-btn outline @click="startGame()">Start</v-btn>
              <v-btn outline @click="stopGame()">Stop</v-btn>
        </v-flex>
        <v-flex shrink pa-1>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="onlineUsers"
            item-key="username"
            select-all
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>
                <v-checkbox
                  v-model="props.selected"
                  primary
                  hide-details
                ></v-checkbox>
              </td>
              <td>{{ props.item.username }}</td>
              <td class="text-xs-right limit">{{ props.item.auth }}</td>
              <td class="text-xs-right">{{ props.item.socketid }}</td>
            </template>
          </v-data-table>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import socket from '~/plugins/socket.io';

@Component({
    middleware:[
      'authenticated',
      'admin'

    ]
})
export default class AdminControl extends Vue {
    selected:any = [];
    headers=[
      {
        text: 'Username',
        align: 'left',
        sortable: false,
        value: 'username'
      },
      { text: 'auth', value: 'calories' },
      { text: 'socketid', value: 'socketid' }
    ];
    onlineUsers:any = [{username:'us1',socketid:'sock',auth:'au'  }];
    viewer() {
        window.open("/admin/view","","status");
     }
     getUsers(){
       socket.emit('getOnlineUsers',[this['$cookies'].get('auth')]);
     }

     startGame(){
       socket.emit('start',"hello World");
     }

     stopGame(){

     }

     mounted(){
       socket.emit('subAdmins', [this['$cookies'].get('auth')]);
       socket.on("getOnlineUsers",(m)=>{
         this.onlineUsers = [];
         this.onlineUsers.push(m);
         console.log(this.onlineUsers);
       });
       
     }
}
</script>
<style scoped>
.limit{
  word-wrap: break-word;
  max-width: 400px;
}
</style>
