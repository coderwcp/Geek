const TOKEN_KEY = 'geek-pc-19'

export function setTokne(token) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
}

export function getToken() {
  return JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}')
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}