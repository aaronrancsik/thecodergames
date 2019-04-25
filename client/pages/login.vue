<template>
    <v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
                <v-alert
                    :value="dialog"
                    type="error"
                    transition="scale-transition"
                >
                    {{ err }}
                </v-alert>
    
        <v-card class="elevation-12">
            
            <v-toolbar>
            <v-toolbar-title>Bejelentkezés</v-toolbar-title>
            <v-spacer></v-spacer>
            
            </v-toolbar>
            <v-form @submit="postLogin()" onSubmit="return false;">
                <v-card-text>
                    <v-text-field
                    prepend-icon="person"
                    v-model="username"
                    label="Felhasználó"
                    required
                    ></v-text-field>
                    <v-text-field
                        required
                        prepend-icon="lock"
                        v-model="stpassword"
                        name="stpassword"
                        label="Jelszó"
                        :append-icon="show2 ? 'visibility' : 'visibility_off'"
                        :type="show2 ? 'text' : 'password'"
                        @click:append="show2 = !show2"
                    ></v-text-field>
                
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    round
                    type="submit"
                    outline
                    color="primary"
                >
                Belépés
                </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
        </v-flex>
    </v-layout>
    </v-container>
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
                setTimeout(() => {
                    this.dialog=false;
                }, 2000);
            }
        });
    }
}
</script>
