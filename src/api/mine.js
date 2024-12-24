import request from "@/utils/request";

// 退出登录
export function logoutApi(data) {
    return request({
      url: '/auth/logout',
      method: 'post',
      data
    })
  }


  // 个人中心
  export function getUserInfoApi() {
    return request({
      url: '/home/advice/userInfo',
      method: 'get',
    })
  }