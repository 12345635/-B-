<template>
  <a-form-model ref="ruleForm" :model="ruleForm" v-bind="layout">
    <div class="logon">
      <h2>注册/<RouterLink to="login">登录</RouterLink></h2>
    </div>
    <a-form-model-item has-feedback label="用户名" prop="username">
      <a-input v-model="ruleForm.username" type="text" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="邮箱" prop="email">
      <a-input v-model="ruleForm.email" type="text" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="密码" prop="password">
      <a-input v-model="ruleForm.password" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item label="验证码" prop="code">
      <a-input v-model="ruleForm.code" type="text" autocomplete="off" />
      <a-button type="primary" :disabled="loading" @click="getCode">
        {{ loading ? "获取验证码" + time : "获取验证码" }}
      </a-button>
    </a-form-model-item>
    <a-form-model-item has-feedback label="角色">
      <a-radio-group v-model="ruleForm.value">
        <a-radio value="customer"> 普通用户 </a-radio>
        <a-radio value="admin"> 管理员 </a-radio>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm('ruleForm')"> 提交 </a-button>
      <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
        重置
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      ruleForm: {
        email: "",
        password: "",
        code: "",
        username: "",
        value: "",
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  computed: mapState("codeStatus",["loading","time"]),
  methods: {
    submitForm() {
      const reg = /^\w+@\w+.[com,cn,con]{1,3}/;
      if (
        this.ruleForm.code &&
        this.ruleForm.email &&
        this.ruleForm.password &&
        this.ruleForm.value &&
        this.ruleForm.username
      ) {
        if (reg.test(this.ruleForm.email)) {
          this.$api
            .logon(
              `email=${this.ruleForm.email}&password=${this.ruleForm.password}&username=${this.ruleForm.username}&code=${this.ruleForm.code}&value=${this.ruleForm.value}`
            )
            .then(
              (r) => {
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
        alert("表单信息不全");
      }
    },
    resetForm() {
      this.ruleForm.email = "";
      this.ruleForm.password = "";
      this.ruleForm.username = "";
      this.ruleForm.code = "";
      this.ruleForm.value = "";
    },
    getCode() {
      console.log(this.ruleForm.email)
      this.$api.getCode(`email=${this.ruleForm.email}`).then(
        (r) => {
          alert("请前往邮箱查看验证码")
        },
        (error) => {
          alert(error);
        }
      );
      this.$store.dispatch("changeCode");
    },
  },
};
</script>
<style lang="less" scoped>
.ant-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #eee;
  width: 70%;
  padding: 60px 0;
}
.logon {
  text-align: center;
  padding-bottom: 30px;
}
</style>