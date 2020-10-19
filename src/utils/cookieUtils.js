import Cookies from 'js-cookie'
export function setCookie(key, value) {
    return Cookies.set(key, value)
}

export function getCookieValue(key) {
    return Cookies.get(key)
}