<!--
 * @Author: xiongying@xgd.com
 * @Date: 2020-04-11 13:47:19
 * @Description: 登录
 -->
<template>
  <div class="login-bg">
    <header>
      <div class="header-center">
        <h1>
          <a href="https://www.jlpay.com/"
             title="嘉联支付首页"
             target="_top">
            <img class="normal hide"
                 src="../assets/images/jl_wt_logo.png"
                 alt="jlpay-logo">
            <span class="split-line">丨</span>
            <img class="normal hide"
                 src="../assets/images/jlpay-logo_1.png"
                 alt="jlpay-logo">
          </a>
        </h1>
      </div>
    </header>
    <div class="login-form">
      <el-tabs v-model="activeLogin"
               @tab-click="switchLogin">
        <el-tab-pane label="商户登录"
                     name="merch-login">
          <el-form ref="form"
                   :model="form">
            <el-form-item>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="onSubmit">登录</el-button>
            </el-form-item>
            <el-form-item>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="集团登录"
                     name="group-login">

        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  data () {
    return {
      activeLogin: 'merch-login',
      form: {
        name: ''
      }
    }
  },
  methods: {
    switchLogin () {

    },
    onSubmit () {

    }
  },
  mounted () {
    Message('123')
  }
}
</script>

<style lang="scss" scoped>
.login-bg {
  height: 100%;
  header {
    line-height: 70px;
    background: rgba(0, 0, 0, 0.5);
    .header-center {
      width: 1080px;
      margin: 0 auto;
      .split-line {
        font-size: 20px;
        color: #ffffff;
      }
    }
  }
  .login-form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 35px 50px;
  }
}
</style>
