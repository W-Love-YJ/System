<template>
  <div class="main">
    <div class="container">
      <div class="boxLogin">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
          style="width: 100%; padding: 0 3rem"
        >
          <h2 style="padding-bottom: 1.25rem; font-weight: 300">系统登陆</h2>
          <el-form-item label="" prop="username">
            <el-input
              v-model="ruleForm.username"
              placeholder="请输入账号"
              @keydown.enter="submitForm('ruleForm')"
            >
              <template #prepend><i class="el-icon-user" /></template>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="请输入密码"
              show-password
              @keydown.enter="submitForm('ruleForm')"
            >
              <template #prepend><i class="el-icon-unlock" /></template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              round
              style="width: 100%"
              type="primary"
              :loading="loginLoading"
              @click="submitForm('ruleForm')"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="container__overlay">
        <h1>易系统</h1>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loginLoading: false,
    };
  },
  computed: {},
  created() {},
  methods: {
    ...mapActions({
      login: "user/login",
      installMenu: "user/installMenu",
    }),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginLoading = true;
          this.login(this.ruleForm)
            .then(() => {
              this.loginLoading = false;
              this.installMenu().then(() => {
                this.$router.push("/home");
              });
            })
            .catch(() => {
              this.loginLoading = false;
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url("../assets/login_bg_yanqing.jpg");
}
.boxLogin {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e9e9e9;
  /* padding: 0 3rem; */
}
.container {
  max-width: 758px;
  max-height: 420px;
  border-radius: 0.7rem;
  box-shadow: 0 0.9rem 1.7rem rgb(0 0 0 / 25%), 0 0.7rem 0.7rem rgb(0 0 0 / 22%);
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
}
.container__overlay {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
