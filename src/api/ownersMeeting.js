import request from "@/utils/request";

  // 查询业主大会公示信息
  export function getOwnersMeetingNotifyListApi() {
    return request({
      url: '/home/notify/getOwnersMeetingNotifyList',
      method: 'get',
    })
  }

  // 免登录查询业主大会公示信息
  export function noSignGetOwnersMeetingNotifyListApi() {
    return request({
      url: '/home/api/getOwnersMeetingNotifyList',
      method: 'get',
    })
  }