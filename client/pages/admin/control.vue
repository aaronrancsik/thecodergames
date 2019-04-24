<template>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
    middleware:[
      'authenticated',
      'admin'

    ]
})
export default class AdminControl extends Vue {
    mounted() {
        window.open("/admin/view","","status");
     }
}
</script>
