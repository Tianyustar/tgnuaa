import request from '@/utils/request'

export function analysis(identity, fileName) { // 分析数据
    return request({
        url:'/analysis/algorithm',
        method:'get',
        params:{identity, fileName}
    })
}

