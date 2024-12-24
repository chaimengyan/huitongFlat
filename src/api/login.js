import request from "@/utils/request";

// 登录
export function loginApi(data) {
    return request({
      url: '/auth/login',
      method: 'post',
      data
    })
  }

  // 注册
export function registerApi(data) {
  return request({
    url: '/auth/register',
    method: 'post',
    data
  })
}

  // 根据手机号获取验证码
  export function getSmsApi(phonenumber) {
    return request({
      url: '/resource/sms/code',
      method: 'get',
      params: {phonenumber}
    })
  }