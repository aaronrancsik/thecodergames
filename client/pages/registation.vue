<template>
<div>
<v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-flex xs12 sm12 md6>
                <v-alert
                    :value="dialog"
                    type="error"
                    transition="scale-transition"
                >
                    {{ err }}
                </v-alert>

        <v-card class="elevation-12">
            
            <v-toolbar>
            <v-toolbar-title>Regisztráció</v-toolbar-title>
            <v-spacer></v-spacer>
            
            </v-toolbar>
            <v-form @submit="regist()" onSubmit="return false;">
                <v-card-text>
                    <v-text-field
                        prepend-icon="home"
                        v-model="school"
                        label="Iskola"
                        required
                    ></v-text-field>
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
                    <v-text-field
                        type ="email"
                        prepend-icon="mail"
                        required
                        v-model="email"
                        label="e-mail"
                    ></v-text-field>
                      <recaptcha
                        @error="onError"
                        @success="onSuccess"
                   />
                </v-card-text>
                <v-card-actions>
                
                
                <v-btn 
                    to="/login"
                    round
                    outline
                    color="secondary"
                >
                <v-icon>navigate_next</v-icon>
                    Már van fiókom
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    round
                    type="submit"
                    outline
                    color="primary"
                >
                <v-icon>check_circle_outline</v-icon>
                    Regisztrálok
                </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
        </v-flex>
    </v-layout>
</v-container>

  
</div>
</template>
<style scoped>
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({

})
export default class Registation extends Vue {
    show2= false;
    dialog=false;
    err="";
    valid= false;
    email= '';
    username ="";
    stpassword ="";
    school ="";

    onSuccess(token){
        console.log('Succeeded:', token)
        const obj ={};
        obj['email']=this.email;
        obj['username']=this.username;
        obj['school']=this.school;
        obj['password']=this.stpassword;
        obj['recaptchatoken']=token;
        this['$axios'].post('/user/registation',obj).then((response)=>{
            //console.log(response);
            this['$router'].push('/login');
        }).catch((error)=> {
            if(error.response &&  error.response.data && error.response.data.code===11000){
                this.err = "A felhasználónév vagy email sajnos már foglalt!";
            }else{
                this.err = "Minden adatot kötelező kitölteni!";
            }
            this.dialog=true;
            setTimeout(() => {
                    this.dialog=false;
            }, 5000);
        });
    }
    onError(err){
        console.log(err);
        this.err = "Minden adatot kötelező kitölteni!";
        this.dialog=true;
        setTimeout(() => {
                this.dialog=false;
        }, 5000);

    }
    async regist(){
        try {
            const token = await this['$recaptcha'].getResponse();
            console.log('ReCaptcha token:', token)
        } catch (error) {
            console.log('Login error:', error)
        }

    }
}


</script>