<template>
  <div class="container loginBg" >
    <!-- <NavBar title="登录" :left-arrow="true" /> -->
    
    <div class="content loginForm">
      <van-form @submit="onSubmit">
        <van-cell-group >
          <van-field
            v-model="form.username"
            left-icon="/imgs/login/phone3x.png"
            name="用户名"
            label=""
            placeholder="请输入您的手机号码"
            :rules="[{ required: true, message: '请输入您的手机号码' }]"
          />
          <van-field
            v-model="form.password"
            type="password"
            name="密码"            
            left-icon="/imgs/login/password3x.png"
            label=""
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请输入密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block color="#1989fa" plain native-type="submit">
            登录
          </van-button>
          <van-button round block color="#1989fa" style="margin-top:10px;" @click="toRegister" >
            注册
          </van-button>
        </div>
      </van-form>
    </div>
    <!-- 底部导航 -->
    <tab-bar></tab-bar>
  </div>
</template>

<script setup name="Login">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { useAppStore } from "@/store";
import { useLoading } from "@/hooks/useLoading";
import {getSmsApi, loginApi} from "@/api/login.js"
import {isPhoneNumber} from "@/utils/validate.js"
import {setToken, getToken} from "@/utils/auth.js"
import { showToast } from 'vant';

    const form = ref({
      clientId: '428a8310cd442757ae699df5d894f051',
      grantType: 'password',
      code: '',
      tenantId: '',
      username: '',
      password: '',
    })
    const router = useRouter();
    const store = useUserStore();
    const appStore = useAppStore();
    const { startLoading, stopLoading } = useLoading();
    const MSGINIT = '发送验证码'
    const MSGSCUCCESS = '${time}'+`后重发`
    const MSGTIME = 120;
    const msgText = ref(MSGINIT)
    const msgTime = ref(MSGTIME)
    const msgKey = ref(false)

    const onSubmit = (values) => {
      loginApi(form.value).then(res => {
        if(res.code === 200) {
              setToken(res.data.access_token)
              console.log(getToken(), 'getToken()');
              router.push('/dynamics')
            } else {
              showToast(res.msg)
            }
      })
      
    };
    function toRegister() {
      router.push("/register");
    }
    function handleSend() {
        // 判断是否可以发送（时间限制）
        if (msgKey.value) return;
        // 发送验证码
        if(isPhoneNumber(form.value.phonenumber)) {
          timeCacl();
          getSmsApi(form.value.phonenumber).then(res => {
            if(res.data.status == 200) {
              showToast(res.data.message)
              timeCacl();
            }
          })
        }else {
          showToast('请输入正确的手机号')
        }
      }

      function timeCacl() {
        // 计时避免重复发送
        msgText.value = MSGSCUCCESS.replace("${time}", msgTime.value);
        msgKey.value = true;
        const time = setInterval(() => {
          msgTime.value--;
          msgText.value = MSGSCUCCESS.replace("${time}", msgTime.value);
          if (msgTime.value === 0) {
            msgTime.value = MSGTIME;
            msgText.value = MSGINIT;
            msgKey.value = false;
            clearInterval(time);
          }
        }, 1000);
      }
    onMounted(() => {
      console.log('66666');
    })


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
