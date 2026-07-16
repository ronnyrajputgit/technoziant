const express = require('express')
const cors = require('cors')
const { initDB, pool } = require('../server/db.cjs')
const authRoutes = require('../server/routes/auth.cjs')
const blogRoutes = require('../server/routes/blogs.cjs')

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3001',
  'https://www.technoziant.com',
  'https://technoziant.com'
]
app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

app.use('/api/auth', authRoutes)
app.use('/api/blogs', blogRoutes)

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ status: 'ok', db: 'connected' })
  } catch (err) {
    res.json({ status: 'error', db: err.message })
  }
})

let initialized = false
async function ensureDB() {
  if (!initialized) {
    await initDB()
    const bcrypt = require('bcryptjs')
    const exists = await pool.query('SELECT id FROM users WHERE email = $1', ['admin@technoziant.com'])
    if (!exists.rows.length) {
      const hash = await bcrypt.hash('admin123', 10)
      await pool.query('INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4)', ['admin@technoziant.com', hash, 'Admin', 'admin'])
    }
    initialized = true
  }
}

module.exports = app
module.exports.config = { api: { bodyParser: { sizeLimit: '50mb' } } }
module.exports.handler = async (req, res) => {
  await ensureDB()
  return app(req, res)
}
