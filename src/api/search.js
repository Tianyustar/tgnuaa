import request from '@/utils/request'

export function searchKeyWords(userRole) { // 用户身份
    return request({
        url:'/keyword/select',
        method:'get',
        params:userRole
    })
}