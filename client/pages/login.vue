<template>
<div>
    <v-dialog
        background-color="yellow accent-4"
        v-model="dialog"
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card class="error">
          <v-card-title
            class="headline"
            primary-title
            color="error"
            background-color="error"
          >
          {{ err }}
          </v-card-title>
        </v-card>
      </v-dialog>
    <v-form v-model="valid">
        <v-container>
            <v-flex xs12>
                <h1>Bejelentkezés</h1>
            </v-flex>
            <v-layout row wrap>
            <v-flex xs12 md6>
                <v-text-field
                v-model="username"
                label="Felhasználó"
                required
                ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
                <v-text-field
                    v-model="password"
                    name="name"
                    label="Jelszó"
                    :append-icon="password ? 'visibility' : 'visibility_off'"
                    @click:append="() => (password = !password)"
                    :type="password ? 'password' : 'text'"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
                <v-btn
                    :disabled="!valid"
                    color="primary"
                    @click="postLogin"
                >
                Belépés
                </v-btn>
            </v-flex>
            </v-layout>
        </v-container>    
    </v-form>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '~/components/HelloWorld.vue';
import Game from '~/components/Game.vue';

const Cookie = process.client ? require('js-cookie') : undefined

@Component({
  middleware:[
      'notAuthenticated'
  ]
})
export default class Login extends Vue {
    dialog=false;
    err="";
    valid= false;
    email= '';
    username ="";
    password ="";
    postLogin() {
        let a = this;
        // we simulate the async request with timeout.
        this['$axios'].post('/user/login',{username:this.username,password:this.password}).then((res,err)=>{
            
            let auth = {accessToken : res.data["token"]};
            this.$store.commit('setAuth', auth) // mutating to store for client rendering
            Cookie.set('auth', auth) // saving token in cookie for server rendering
            console.log(auth);
            this.$router.push('/craft');
        }).catch(function (error) {
            if (error.response) {
                a.err = "Hibás felhasználó név, vagy jelszó";
                a.dialog=true;
            }
        });
    }
}
</script>
