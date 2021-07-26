<template>
  <div class="login">
    <h2>登录/<RouterLink to="logon">注册</RouterLink></h2>
    <a-form-model v-bind="layout">
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="email" type="text" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input v-model="password" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('ruleForm')">
          提交
        </a-button>
        <a-button style="margin-left: 10px">
          <RouterLink :to="{ name: 'FindBack' }"> 忘记密码 </RouterLink>
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm() {
      const reg = /^\w+@\w+.[com,cn,con]{1,3}/;
      if (this.email) {
        if (this.password) {
          if (reg.test(this.email)) {
            this.$api
              .login(`email=${this.email}&password=${this.password}`)
              .then(
                (r) => {
                  this.$cookie.set(r.data);
                  const resq = this.$store.dispatch("isLogin/login", r.data);
                  resq.then((r) => {
                    this.$router.push("/").catch((error) => {});
                  });
                  return r;
                },
                (error) => {
                  alert(error);
                }
              );
          } else {
            alert("邮箱格式不正确");
          }
        } else {
          alert("请输入密码");
        }
      } else {
        alert("请输入邮箱");
      }
    },
    resetForm() {
      this.email = "";
      this.password = "";
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  position: relative;
  width: 700px;
  top: 350px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #eee;
  padding: 80px 160px;
  text-align: center;
}
</style>