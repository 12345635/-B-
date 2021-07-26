<template>
    <a-layout-content>
        <router-view />
    </a-layout-content>
</template>
<script>
import Search from "../search"
export default {
    components:{
        Search,
    }
}
</script>