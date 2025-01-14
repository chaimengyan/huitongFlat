import request from "@/utils/request";

  // 查询小区动态公告信息
  export function getCommunityDynamicsNotifyListApi() {
    return request({
      url: '/home/notify/getCommunityDynamicsNotifyList',
      method: 'get',
    })
  }

    // 免登录查询小区动态公告信息
    export function noSignGetCommunityDynamicsNotifyListApi() {
      return request({
        url: '/home/api/getCommunityDynamicsNotifyList',
        method: 'get',
      })
    }