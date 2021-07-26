<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <Meun />
      <Main />
  </a-layout>
</template>
<script>
import Meun from "./components/Meun"
import Main from "./components/Main"
export default {
  components:{
      Meun,
      Main,
  }
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
