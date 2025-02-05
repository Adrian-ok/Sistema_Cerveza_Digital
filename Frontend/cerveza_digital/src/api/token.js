import { TOKEN } from '../libs/constants'

export function setToken(token) {
    localStorage.setItem(TOKEN, token)
}

export function getToken() {
    return localStorage.getItem(TOKEN)
}

export function deleteToken() {
    localStorage.removeItem(TOKEN)
}