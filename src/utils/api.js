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

  getContent: (table, params) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : ''
    return apiFetch(`/content/${table}${qs}`)
  },
  createContent: (table, data) => apiFetch(`/content/${table}`, { method: 'POST', body: JSON.stringify(data) }),
  updateContent: (table, id, data) => apiFetch(`/content/${table}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteContent: (table, id) => apiFetch(`/content/${table}/${id}`, { method: 'DELETE' }),

  submitFeedback: (data) => apiFetch('/content/feedback', { method: 'POST', body: JSON.stringify(data) }),
  submitInquiry: (data) => apiFetch('/content/inquiry', { method: 'POST', body: JSON.stringify(data) }),
  getInquiries: () => apiFetch('/content/contact_inquiries'),
  getFeedback: () => apiFetch('/content/feedback_submissions'),
  updateFeedback: (id, data) => apiFetch(`/content/feedback_submissions/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteFeedback: (id) => apiFetch(`/content/feedback_submissions/${id}`, { method: 'DELETE' }),

  getSettings: () => apiFetch('/content/site_settings'),
  updateSettings: async (data) => {
    const results = await Promise.all(
      Object.entries(data).map(([key, value]) =>
        apiFetch('/content/site_settings', { method: 'POST', body: JSON.stringify({ key, value: String(value ?? '') }) })
      )
    )
    return results
  },
}
