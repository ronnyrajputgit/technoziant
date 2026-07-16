import express from 'express'
import cors from 'cors'
import pg from 'pg'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { Pool } = pg

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '22701'),
  ssl: { rejectUnauthorized: false }
})

const JWT_SECRET = process.env.JWT_SECRET || 'technoziant-blog-secret-key-2026'

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3001',
  'https://www.technoziant.com',
  'https://technoziant.com'
]
app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json({ limit: '50mb' }))

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token provided' })
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

function makeSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now()
}

// AUTH
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body
    if (!email || !password || !name) return res.status(400).json({ error: 'All fields required' })
    const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email])
    if (exists.rows.length) return res.status(400).json({ error: 'Email already registered' })
    const hash = await bcrypt.hash(password, 10)
    const result = await pool.query('INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, role', [email, hash, name])
    const token = jwt.sign({ id: result.rows[0].id, email, role: result.rows[0].role }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ user: result.rows[0], token })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (!result.rows.length) return res.status(401).json({ error: 'Invalid credentials' })
    const user = result.rows[0]
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' })
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role }, token })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, name, role FROM users WHERE id = $1', [req.user.id])
    if (!result.rows.length) return res.status(404).json({ error: 'User not found' })
    res.json(result.rows[0])
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// BLOGS
app.get('/api/blogs', async (req, res) => {
  try {
    const { category, tag } = req.query
    let query = 'SELECT b.*, u.name as author_name FROM blogs b LEFT JOIN users u ON b.author_id = u.id WHERE b.published = true'
    const params = []
    if (category) { params.push(category); query += ` AND b.category = $${params.length}` }
    if (tag) { params.push(tag); query += ` AND $${params.length} = ANY(b.tags)` }
    query += ' ORDER BY b.created_at DESC'
    const result = await pool.query(query, params)
    res.json(result.rows)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.get('/api/blogs/all', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT b.*, u.name as author_name FROM blogs b LEFT JOIN users u ON b.author_id = u.id ORDER BY b.created_at DESC')
    res.json(result.rows)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.get('/api/blogs/:slug', async (req, res) => {
  try {
    const result = await pool.query('SELECT b.*, u.name as author_name FROM blogs b LEFT JOIN users u ON b.author_id = u.id WHERE b.slug = $1', [req.params.slug])
    if (!result.rows.length) return res.status(404).json({ error: 'Blog not found' })
    res.json(result.rows[0])
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.post('/api/blogs', authMiddleware, async (req, res) => {
  try {
    const { title, content, excerpt, cover_image, tags, category, published } = req.body
    if (!title) return res.status(400).json({ error: 'Title is required' })
    const slug = makeSlug(title)
    const result = await pool.query(
      'INSERT INTO blogs (title, slug, content, excerpt, cover_image, author_id, published, tags, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [title, slug, JSON.stringify(content || {}), excerpt || '', cover_image || '', req.user.id, published || false, tags || [], category || '']
    )
    res.json(result.rows[0])
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.put('/api/blogs/:id', authMiddleware, async (req, res) => {
  try {
    const { title, content, excerpt, cover_image, tags, category, published } = req.body
    const result = await pool.query(
      `UPDATE blogs SET title = COALESCE($1, title), content = COALESCE($2, content), excerpt = COALESCE($3, excerpt),
       cover_image = COALESCE($4, cover_image), tags = COALESCE($5, tags), category = COALESCE($6, category),
       published = COALESCE($7, published), updated_at = NOW() WHERE id = $8 RETURNING *`,
      [title, content ? JSON.stringify(content) : null, excerpt, cover_image, tags, category, published, req.params.id]
    )
    if (!result.rows.length) return res.status(404).json({ error: 'Blog not found' })
    res.json(result.rows[0])
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.delete('/api/blogs/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM blogs WHERE id = $1', [req.params.id])
    res.json({ success: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ status: 'ok', db: 'connected' })
  } catch (err) { res.json({ status: 'error', db: err.message }) }
})

let initialized = false
async function ensureDB() {
  if (initialized) return
  const client = await pool.connect()
  try {
    await client.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL, role VARCHAR(50) DEFAULT 'admin', created_at TIMESTAMP DEFAULT NOW()
    )`)
    await client.query(`CREATE TABLE IF NOT EXISTS blogs (
      id SERIAL PRIMARY KEY, title VARCHAR(500) NOT NULL, slug VARCHAR(500) UNIQUE NOT NULL,
      content JSONB NOT NULL DEFAULT '{}', excerpt TEXT DEFAULT '', cover_image VARCHAR(1000) DEFAULT '',
      author_id INTEGER REFERENCES users(id), published BOOLEAN DEFAULT false, tags TEXT[] DEFAULT '{}',
      category VARCHAR(100) DEFAULT '', created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
    )`)
    const exists = await client.query('SELECT id FROM users WHERE email = $1', ['admin@technoziant.com'])
    if (!exists.rows.length) {
      const hash = await bcrypt.hash('admin123', 10)
      await client.query('INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4)', ['admin@technoziant.com', hash, 'Admin', 'admin'])
    }
    initialized = true
  } finally { client.release() }
}

export default async function handler(req, res) {
  await ensureDB()
  return app(req, res)
}
