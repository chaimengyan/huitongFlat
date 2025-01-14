import request from "@/utils/request";

  // 查询业主服务约定公告
  export function getOwnerServicesNotifyListApi() {
    return request({
      url: '/home/notify/getOwnerServicesNotifyList',
      method: 'get',
    })
  }

    // 免登录查询业主服务约定公告
    export function noSignGetOwnerServicesNotifyListApi() {
      return request({
        url: '/home/api/getOwnerServicesNotifyList',
        method: 'get',
      })
    }