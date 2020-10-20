import request from '@/utils/request'

export function searchKeyWords(userRole) { // 用户身份
    return request({
        url:'/keyword/select',
        method:'get',
        params:userRole
    })
}

export function searchCase(keyword) { // 获取案例
   
   
    return request({
        url:'/keyword/cases',
        method:'get',
        params:{keyword}
    })
}