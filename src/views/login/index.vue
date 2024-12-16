<template>
  <div class="container loginBg" >
    
    <div class="content loginForm">
      <van-form @submit="onSubmit">
        <van-cell-group >
          <van-field
            v-model="username"
            left-icon="/imgs/login/phone3x.png"
            name="用户名"
            label=""
            placeholder="请输入您的手机号码"
            :rules="[{ required: true, message: '请输入您的手机号码' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"            
            left-icon="/imgs/login/password3x.png"
            label=""
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请输入密码' }]"
          />
          <van-field
            v-model="sms"
            center
            left-icon="/imgs/login/code3x.png"
            clearable
            label=""
            placeholder="请输入验证码"
          >
            <template #button>
              <div style="color: #fff">获取验证码</div>
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block color="#1989fa" plain native-type="submit">
            登录
          </van-button>
          <van-button round block color="#1989fa" style="margin-top:10px;" >
            注册
          </van-button>
        </div>
      </van-form>
    </div>
    <!-- 底部导航 -->
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  setup() {
    const username = ref('');
    const password = ref('');
    const sms = ref('');
    const onSubmit = (values) => {
      console.log('submit', values);
    };
    onMounted(() => {
      console.log('66666');
    })
    return {
      username,
      password,
      onSubmit,
    };
  },
});
</script>

<style lang="less" scoped>
.loginForm {
  position: absolute;
  width: 100%;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -28%);
}
.loginBg {
  background-image: url('@/assets/images/login/loginBg3x.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100vh;
}
</style>
