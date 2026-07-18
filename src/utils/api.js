const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:3001/api'
  : '/api'

async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('blog_token')
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  let data
  try { data = await res.json() } catch (e) { data = { error: 'Invalid server response' } }
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
  return data
}

export const api = {
  login: (email, password) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (email, password, name) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify({ email, password, name }) }),
  me: () => apiFetch('/auth/me'),
  getBlogs: () => apiFetch('/blogs/all'),
  getPublishedBlogs: (params) => apiFetch(`/blogs?${new URLSearchParams(params || {})}`),
  getBlog: (slug) => apiFetch(`/blogs/${slug}`),
  createBlog: (data) => apiFetch('/blogs', { method: 'POST', body: JSON.stringify(data) }),
  updateBlog: (id, data) => apiFetch(`/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBlog: (id) => apiFetch(`/blogs/${id}`, { method: 'DELETE' }),
}
