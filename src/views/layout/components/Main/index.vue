<template>
  <a-layout>
    <a-layout-header>
      <a-breadcrumb>
        <a-breadcrumb-item>{{ title }}</a-breadcrumb-item>
        <a-breadcrumb-item>{{ subtitle }}</a-breadcrumb-item>
      </a-breadcrumb>
      <ul>
        <li>{{ cookie ? cookie.username : "" }}</li>
        <li @click="logon">退出</li>
      </ul>
    </a-layout-header>
    <Content />
  </a-layout>
</template>
<script>
import { mapState } from "vuex";
import Content from "../Content";
export default {
  data() {
    return {
      title: "",
      subtitle: "",
    };
  },
  components: {
    Content,
  },
  async created() {
    this.username = await this.$cookie.get("username");
    this.title = this.$route.matched[0].meta.title;
    this.subtitle = this.$route.matched[1].meta.title;
  },
  computed: mapState("isLogin", ["cookie"]),
  methods: {
    logon() {
      this.$store.dispatch("isLogin/unlogin");
      this.$router.push("/login");
    },
  },
  watch: {
    $route(val) {
      this.title = val.matched[0].meta.title;
      this.subtitle = val.matched[1].meta.title;
    },
  },
};
</script>
<style scoped lang="less">
.ant-layout-header {
  display: flex;
  padding: 0 50px;
  background: #fff;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  .ant-breadcrumb {
    line-height: 62px;
  }
  ul {
    padding-top: 12px;
    &:hover {
      li:nth-child(2) {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
  li {
    border: 1px solid #eee;
    padding: 0 30px;
    height: 42px;
    line-height: 42px;
    transition: 0.3s;
    text-align: center;
    cursor: pointer;
  }
  li:nth-child(2) {
    opacity: 0;
    transform: translateY(-100%);
    background: #eee;
  }
}
.ant-layout-content {
  height: 100%;
  padding: 24px;
  background: #fff;
}
</style>