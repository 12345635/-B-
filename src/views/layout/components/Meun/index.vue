<template>
  <a-layout-sider v-model="collapsed" collapsible>
    <a-menu
      theme="dark"
      :default-selected-keys="[$router.currentRoute.name]"
      :default-open-keys="defaultOpenKeys"
      :selectedKeys="selectedKeys"
      mode="inline"
    >
      <a-sub-menu v-for="router in meuns" :key="router.name">
        <span slot="title">
          <a-icon :type="router.meta.icon" />
          <span>{{ router.meta.title }}</span>
        </span>
        <a-menu-item v-for="item in router.children" :key="item.name">
          <RouterLink :to="item.path">
            <a-icon :type="item.meta.icon" /> {{ item.meta.title }}
          </RouterLink>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      collapsed: false,
      defaultOpenKeys:[],
      selectedKeys:[],
    };
  },
  computed: {
    ...mapState("isLogin", ["cookie"]),
    ...mapGetters("isLogin",["meuns"]),
    },
  created() {
    this.defaultOpenKeys.push(`${this.$router.currentRoute.matched[0].name}`);
    this.selectedKeys = [this.$router.currentRoute.name];
  },
  watch:{
    $route(val){
      this.selectedKeys = [this.$router.currentRoute.name];
    }
  }
};
</script>