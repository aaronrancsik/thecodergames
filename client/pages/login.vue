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
                    v-model="stpassword"
                    name="stpassword"
                    label="Jelszó"
                    :append-icon="show2 ? 'visibility' : 'visibility_off'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
                <v-btn
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


@Component({
  middleware:[
      'notAuthenticated'
  ]
})
export default class Login extends Vue {
    show2= false;
    dialog=false;
    err="";
    valid= false;
    email= '';
    username ="";
    stpassword ="";
    postLogin() {
        this['$axios'].post('/user/login',{username:this.username, password:this.stpassword}).then((res,err)=>{

            let auth = res.data["token"];
            let roles = res.data["roles"];
            
            this['$cookies'].set('auth', auth, {
                path: '/',
            });
            this['$cookies'].set('roles', roles, {
                path : '/',
            });
            this.$router.push('/');
            
        }).catch((error)=> {
            console.log(error);
            if (error.response) {
                this.err = "Hibás felhasználó név, vagy jelszó";
                this.dialog=true;
            }
        });
    }
}
</script>
