import request from "@/utils/request";

export function loginApi(data) {
    return request({
      url: '/auth/login',
      method: 'post',
      data
    })
  }

  export function getSmsApi(phonenumber) {
    return request({
      url: '/resource/sms/code',
      method: 'get',
      params: {phonenumber}
    })
  }