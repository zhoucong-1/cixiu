/**
 * 本地模拟登录/注册
 * - users: 保存已注册用户（用户名+密码）
 * - auth: 保存当前登录态（token + user）
 */

export interface AuthUser {
  username: string
  displayName: string
  avatar?: string
}

type UsersMap = Record<
  string,
  {
    password: string
    displayName: string
    createdAt: string
  }
>

const USERS_KEY = 'cixiu_users'
const AUTH_TOKEN_KEY = 'cixiu_auth_token'
const AUTH_USER_KEY = 'cixiu_auth_user'

function safeParseJSON<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function readUsers(): UsersMap {
  if (typeof window === 'undefined') return {}
  return safeParseJSON<UsersMap>(window.localStorage.getItem(USERS_KEY), {})
}

function writeUsers(users: UsersMap) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  return safeParseJSON<AuthUser | null>(window.localStorage.getItem(AUTH_USER_KEY), null)
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(AUTH_TOKEN_KEY)
}

export function isLoggedIn(): boolean {
  return Boolean(getToken())
}

export function register(params: { username: string; password: string }) {
  const username = params.username.trim()
  const password = params.password.trim()

  if (!username || !password) {
    return { ok: false, message: '请输入用户名和密码' }
  }
  if (username.length < 2) {
    return { ok: false, message: '用户名至少 2 位' }
  }
  if (password.length < 4) {
    return { ok: false, message: '密码至少 4 位' }
  }

  const users = readUsers()
  if (users[username]) {
    return { ok: false, message: '该用户名已存在，请直接登录' }
  }

  users[username] = {
    password,
    displayName: username,
    createdAt: new Date().toISOString(),
  }
  writeUsers(users)

  // 注册成功后自动登录
  const user: AuthUser = { username, displayName: username, avatar: '👤' }
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
    window.localStorage.setItem(AUTH_TOKEN_KEY, `mock_${Date.now()}`)
  }

  return { ok: true, user }
}

export function login(params: { username: string; password: string }) {
  const username = params.username.trim()
  const password = params.password.trim()

  if (!username || !password) {
    return { ok: false, message: '请输入用户名和密码' }
  }

  const users = readUsers()
  const existing = users[username]
  if (!existing) {
    return { ok: false, message: '账号不存在，请先注册' }
  }
  if (existing.password !== password) {
    return { ok: false, message: '密码不正确' }
  }

  const user: AuthUser = { username, displayName: existing.displayName, avatar: '👤' }
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
    window.localStorage.setItem(AUTH_TOKEN_KEY, `mock_${Date.now()}`)
  }

  return { ok: true, user }
}

export function logout() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(AUTH_TOKEN_KEY)
  window.localStorage.removeItem(AUTH_USER_KEY)
}


