// 存储 token 到本地的 键名（key）
const TOKEN_KEY = 'geek-pc-19'
// 保存 token 到本地
export function setTokne(token) {
  localStorage.setItem(TOKEN_KEY, token)
}
// 从本地获取 token
export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || ""
}
// 将 token 从把本地缓存中移除
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}