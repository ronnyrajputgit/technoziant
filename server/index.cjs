const express = require('express')
const cors = require('cors')
const path = require('path')
const { initDB, pool } = require('./db.cjs')
const authRoutes = require('./routes/auth.cjs')
const blogRoutes = require('./routes/blogs.cjs')
const contentRoutes = require('../api/routes/content.cjs')

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

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token provided' })
  try {
    const jwt = require('jsonwebtoken')
    const JWT_SECRET = process.env.JWT_SECRET || 'technoziant-blog-secret-key-2026'
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

app.get('/api/stats/dashboard', authMiddleware, async (req, res) => {
  try {
    const [blogsRes, teamRes, inquiriesRes, testimonialsRes, feedbackRes, servicesRes, workRes, featuredRes, techRes, awardsRes, industriesRes] = await Promise.all([
      pool.query('SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE published = true) as published, COUNT(*) FILTER (WHERE published = false) as drafts FROM blogs'),
      pool.query(`SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE gender = 'male') as male, COUNT(*) FILTER (WHERE gender = 'female') as female, COUNT(*) FILTER (WHERE gender = 'other' OR gender = '' OR gender IS NULL) as other FROM team_members`),
      pool.query(`SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE status = 'new') as new_inq, COUNT(*) FILTER (WHERE status = 'replied') as replied, COUNT(*) FILTER (WHERE status = 'archived') as archived, COUNT(*) FILTER (WHERE gender = 'male') as male, COUNT(*) FILTER (WHERE gender = 'female') as female, COUNT(*) FILTER (WHERE gender = 'other' OR gender = '' OR gender IS NULL) as other FROM contact_inquiries`),
      pool.query('SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE approved = true) as approved, COUNT(*) FILTER (WHERE approved = false) as pending FROM testimonials'),
      pool.query("SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE status = 'approved') as approved, COUNT(*) FILTER (WHERE status = 'pending') as pending FROM feedback_submissions"),
      pool.query('SELECT COUNT(*) as total FROM services'),
      pool.query('SELECT COUNT(*) as total FROM work_items'),
      pool.query('SELECT COUNT(*) as total FROM featured_projects'),
      pool.query('SELECT COUNT(*) as total FROM tech_stack'),
      pool.query('SELECT COUNT(*) as total FROM awards'),
      pool.query('SELECT COUNT(*) as total FROM industries'),
    ])

    const monthlyInquiries = (await pool.query(`SELECT TO_CHAR(created_at, 'YYYY-MM') as month, COUNT(*) as count FROM contact_inquiries GROUP BY month ORDER BY month DESC LIMIT 12`)).rows || []
    const monthlyBlogs = (await pool.query(`SELECT TO_CHAR(created_at, 'YYYY-MM') as month, COUNT(*) as count FROM blogs GROUP BY month ORDER BY month DESC LIMIT 12`)).rows || []
    const serviceSplit = (await pool.query(`SELECT service, COUNT(*) as count FROM contact_inquiries WHERE service != '' GROUP BY service ORDER BY count DESC LIMIT 10`)).rows || []
    const topCountries = (await pool.query(`SELECT country, COUNT(*) as count FROM contact_inquiries WHERE country != '' GROUP BY country ORDER BY count DESC LIMIT 10`)).rows || []

    res.json({
      blogs: { total: parseInt(blogsRes.rows[0].total), published: parseInt(blogsRes.rows[0].published), drafts: parseInt(blogsRes.rows[0].drafts), monthly: monthlyBlogs.reverse() },
      team: { total: parseInt(teamRes.rows[0].total), male: parseInt(teamRes.rows[0].male), female: parseInt(teamRes.rows[0].female), other: parseInt(teamRes.rows[0].other) },
      inquiries: { total: parseInt(inquiriesRes.rows[0].total), new: parseInt(inquiriesRes.rows[0].new_inq), replied: parseInt(inquiriesRes.rows[0].replied), archived: parseInt(inquiriesRes.rows[0].archived), male: parseInt(inquiriesRes.rows[0].male), female: parseInt(inquiriesRes.rows[0].female), other: parseInt(inquiriesRes.rows[0].other), monthly: monthlyInquiries.reverse(), byService: serviceSplit, byCountry: topCountries },
      testimonials: { total: parseInt(testimonialsRes.rows[0].total), approved: parseInt(testimonialsRes.rows[0].approved), pending: parseInt(testimonialsRes.rows[0].pending) },
      feedback: { total: parseInt(feedbackRes.rows[0].total), approved: parseInt(feedbackRes.rows[0].approved), pending: parseInt(feedbackRes.rows[0].pending) },
      content: { services: parseInt(servicesRes.rows[0].total), workItems: parseInt(workRes.rows[0].total), projects: parseInt(featuredRes.rows[0].total), techStack: parseInt(techRes.rows[0].total), awards: parseInt(awardsRes.rows[0].total), industries: parseInt(industriesRes.rows[0].total) }
    })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.use('/api/content', contentRoutes(pool))

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
