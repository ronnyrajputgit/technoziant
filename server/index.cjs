const express = require('express')
const cors = require('cors')
const path = require('path')
const { initDB, pool } = require('./db.cjs')
const authRoutes = require('./routes/auth.cjs')
const blogRoutes = require('./routes/blogs.cjs')

const app = express()
const PORT = process.env.PORT || 3001

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3001',
  'https://www.technoziant.com',
  'https://technoziant.com',
  'https://technoziant-api.vercel.app'
]
app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))

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

async function seedAdmin() {
  const bcrypt = require('bcryptjs')
  const exists = await pool.query('SELECT id FROM users WHERE email = $1', ['admin@technoziant.com'])
  if (!exists.rows.length) {
    const hash = await bcrypt.hash('admin123', 10)
    await pool.query('INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4)', ['admin@technoziant.com', hash, 'Admin', 'admin'])
    console.log('Admin user created: admin@technoziant.com / admin123')
  }
}

initDB().then(() => {
  seedAdmin().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
}).catch(err => {
  console.error('Failed to init DB:', err.message)
  process.exit(1)
})
