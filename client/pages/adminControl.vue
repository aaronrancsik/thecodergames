<template>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
    middleware:[
      'authenticated'
    ]
})
export default class AdminControl extends Vue {
    mounted() {
        console.log(window['$nuxt']._route.params);
        window.open("/adminView","","status");
     }
}
</script>
