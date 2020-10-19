import request from '@/utils/request'
import {getCookieValue} from '@/utils/cookieUtils'
export function login(data) {
  return request({
    url: 'user/login',
    method: 'get',
    params:data
  })
}

export function getInfo(token) {
  return  new Promise( (resolve, reject)=>{
    resolve({data:{
      name:getCookieValue('tgnuaa-username')
    }})
  })
}

export function logout() {
  return new Promise((resolve)=>{
    resolve()
  })
}
