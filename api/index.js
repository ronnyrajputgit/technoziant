import express from 'express'
import cors from 'cors'
import pg from 'pg'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

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
const contentRoutes = require('./routes/content.cjs')

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
    let contentStr = '{}'
    try { contentStr = JSON.stringify(content || {}) } catch (e) { contentStr = '{}' }
    const result = await pool.query(
      'INSERT INTO blogs (title, slug, content, excerpt, cover_image, author_id, published, tags, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [title, slug, contentStr, excerpt || '', cover_image || '', req.user.id, published || false, tags || [], category || '']
    )
    res.json(result.rows[0])
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.put('/api/blogs/:id', authMiddleware, async (req, res) => {
  try {
    const { title, content, excerpt, cover_image, tags, category, published } = req.body
    let contentStr = null
    if (content) { try { contentStr = JSON.stringify(content) } catch (e) { contentStr = null } }
    const result = await pool.query(
      `UPDATE blogs SET title = COALESCE($1, title), content = COALESCE($2, content), excerpt = COALESCE($3, excerpt),
       cover_image = COALESCE($4, cover_image), tags = COALESCE($5, tags), category = COALESCE($6, category),
       published = COALESCE($7, published), updated_at = NOW() WHERE id = $8 RETURNING *`,
      [title, contentStr, excerpt, cover_image, tags, category, published, req.params.id]
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

// CMS Content Routes
app.use('/api/content', contentRoutes(pool))

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
      content JSONB NOT NULL DEFAULT '{}', excerpt TEXT DEFAULT '', cover_image TEXT DEFAULT '',
      author_id INTEGER REFERENCES users(id), published BOOLEAN DEFAULT false, tags TEXT[] DEFAULT '{}',
      category VARCHAR(100) DEFAULT '', created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
    )`)
    await client.query("DO $$ BEGIN ALTER TABLE blogs ALTER COLUMN cover_image TYPE TEXT; EXCEPTION WHEN others THEN null; END $$")

    // CMS content tables
    await client.query(`CREATE TABLE IF NOT EXISTS site_settings (
      id SERIAL PRIMARY KEY, key VARCHAR(255) UNIQUE NOT NULL, value TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
    )`)
    await client.query(`CREATE TABLE IF NOT EXISTS featured_projects (
      id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT DEFAULT '',
      image TEXT DEFAULT '', link TEXT DEFAULT '', tech TEXT[] DEFAULT '{}',
      category VARCHAR(100) DEFAULT '', display_order INTEGER DEFAULT 0,
      visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
    )`)
    await client.query(`CREATE TABLE IF NOT EXISTS services (
      id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT DEFAULT '',
      icon VARCHAR(50) DEFAULT '', features TEXT[] DEFAULT '{}',
      display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
    )`)
    await client.query(`CREATE TABLE IF NOT EXISTS industries (
      id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT DEFAULT '',
      icon VARCHAR(50) DEFAULT '', display_order INTEGER DEFAULT 0,
      visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
    )`)
    await client.query(`CREATE TABLE IF NOT EXISTS tech_stack (
      id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, category VARCHAR(100) DEFAULT '',
      icon VARCHAR(50) DEFAULT '', level VARCHAR(50) DEFAULT 'intermediate',
      display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
    )`)
    await client.query(`CREATE TABLE IF NOT EXISTS testimonials (
      id SERIAL PRIMARY KEY, client_name VARCHAR(255) NOT NULL, company VARCHAR(255) DEFAULT '',
      feedback TEXT DEFAULT '', rating INTEGER DEFAULT 5, avatar TEXT DEFAULT '',
      approved BOOLEAN DEFAULT false, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
    )`)
    await client.query(`CREATE TABLE IF NOT EXISTS why_choose (
      id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT DEFAULT '',
      icon VARCHAR(50) DEFAULT '', display_order INTEGER DEFAULT 0,
      visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
    )`)
    await client.query(`CREATE TABLE IF NOT EXISTS team_members (
      id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, role VARCHAR(255) DEFAULT '',
      image TEXT DEFAULT '', bio TEXT DEFAULT '', social_links JSONB DEFAULT '{}',
      display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
    )`)
    await client.query(`CREATE TABLE IF NOT EXISTS stats (
      id SERIAL PRIMARY KEY, label VARCHAR(255) NOT NULL, value VARCHAR(255) DEFAULT '',
      icon VARCHAR(50) DEFAULT '', display_order INTEGER DEFAULT 0,
      visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
    )`)
    await client.query(`CREATE TABLE IF NOT EXISTS awards (
      id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, year VARCHAR(50) DEFAULT '',
      icon VARCHAR(50) DEFAULT '', display_order INTEGER DEFAULT 0,
      visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
    )`)
    await client.query(`CREATE TABLE IF NOT EXISTS about_content (
      id SERIAL PRIMARY KEY, section VARCHAR(255) NOT NULL, title VARCHAR(255) DEFAULT '',
      description TEXT DEFAULT '', image TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
    )`)
    await client.query(`CREATE TABLE IF NOT EXISTS footer_content (
      id SERIAL PRIMARY KEY, section VARCHAR(100) NOT NULL, title VARCHAR(255) DEFAULT '',
      url TEXT DEFAULT '', display_order INTEGER DEFAULT 0,
      visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
    )`)
    await client.query(`CREATE TABLE IF NOT EXISTS work_items (
      id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT DEFAULT '',
      image TEXT DEFAULT '', link TEXT DEFAULT '', category VARCHAR(100) DEFAULT '',
      tech TEXT[] DEFAULT '{}', display_order INTEGER DEFAULT 0,
      visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
    )`)
    await client.query(`CREATE TABLE IF NOT EXISTS feedback_submissions (
      id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL,
      company VARCHAR(255) DEFAULT '', rating INTEGER DEFAULT 5,
      feedback TEXT DEFAULT '', project VARCHAR(255) DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW()
    )`)
    await client.query("ALTER TABLE site_settings ALTER COLUMN value TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE feedback_submissions ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending'").catch(() => {})

    // Seed admin user
    const exists = await client.query('SELECT id FROM users WHERE email = $1', ['admin@technoziant.com'])
    if (!exists.rows.length) {
      const hash = await bcrypt.hash('admin123', 10)
      await client.query('INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4)', ['admin@technoziant.com', hash, 'Admin', 'admin'])
    }

    // Seed data only if tables are empty
    await seedContent(client)

    initialized = true
  } finally { client.release() }
}

async function seedContent(client) {
  // Site settings
  const settingsCheck = await client.query('SELECT COUNT(*) FROM site_settings')
  if (parseInt(settingsCheck.rows[0].count) === 0) {
    const settings = [
      ['site_name', 'Technoziant'],
      ['site_tagline', 'We craft digital products. Creative studio blending storytelling, art, and technology.'],
      ['contact_email', 'business@technoziant.com'],
      ['contact_phone', '+91 8882716189'],
      ['contact_whatsapp', '+91 9771291336'],
      ['office_address', 'Deoghar, Jharkhand'],
      ['office_hours', '10 AM - 6 PM'],
      ['copyright', '© 2026 Technoziant. All rights reserved.']
    ]
    for (const [key, value] of settings) {
      await client.query('INSERT INTO site_settings (key, value) VALUES ($1, $2)', [key, value])
    }
  }

  // Featured projects
  const projCheck = await client.query('SELECT COUNT(*) FROM featured_projects')
  if (parseInt(projCheck.rows[0].count) === 0) {
    const projects = [
      { title: 'Nebula Analytics', description: 'AI-powered analytics platform with real-time data visualization and predictive insights for enterprise clients.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', tech: ['React', 'D3.js', 'ML'], category: 'web', display_order: 1 },
      { title: 'Quantum Finance', description: 'Next-gen banking experience with biometric auth and instant transfers across 180+ countries.', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80', tech: ['React Native', 'Node.js', 'Blockchain'], category: 'mobile', display_order: 2 },
      { title: 'Echo Social', description: 'Community-driven platform with real-time collaboration and AR experiences for 2M+ users.', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80', tech: ['Next.js', 'WebRTC', 'Three.js'], category: 'web', display_order: 3 },
      { title: 'Prism Studio', description: 'Browser-based 3D modeling tool with collaborative editing capabilities and GPU rendering.', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80', tech: ['WebGL', 'Web Workers', 'WASM'], category: 'web', display_order: 4 },
      { title: 'Pulse Health', description: 'HIPAA-compliant telemedicine platform connecting patients with 10K+ doctors worldwide.', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80', tech: ['React', 'WebRTC', 'HIPAA'], category: 'web', display_order: 5 },
      { title: 'Bloom E-Commerce', description: 'Multi-vendor marketplace with AI recommendations processing high-volume annual transactions.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80', tech: ['Next.js', 'Stripe', 'PostgreSQL'], category: 'web', display_order: 6 }
    ]
    for (const p of projects) {
      await client.query(
        'INSERT INTO featured_projects (title, description, image, tech, category, display_order, visible) VALUES ($1,$2,$3,$4,$5,$6,$7)',
        [p.title, p.description, p.image, p.tech, p.category, p.display_order, true]
      )
    }
  }

  // Services
  const svcCheck = await client.query('SELECT COUNT(*) FROM services')
  if (parseInt(svcCheck.rows[0].count) === 0) {
    const svcs = [
      { title: 'Web Development', description: 'Custom websites and web applications built with cutting-edge technology for optimal performance.', icon: 'web', features: ['React/Next.js', 'Node.js', 'TypeScript', 'GraphQL'], display_order: 1 },
      { title: 'Mobile Apps', description: 'Native and cross-platform mobile applications for iOS and Android with seamless UX.', icon: 'mobile', features: ['React Native', 'Flutter', 'Swift', 'Kotlin'], display_order: 2 },
      { title: 'Brand & Identity', description: 'Visual identity systems that communicate your brand story and resonate with your audience.', icon: 'brand', features: ['Logo Design', 'Brand Guidelines', 'Motion Design', 'Typography'], display_order: 3 },
      { title: 'UI/UX Design', description: 'User-centered design that creates intuitive and delightful digital experiences.', icon: 'design', features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'], display_order: 4 },
      { title: 'Cloud & DevOps', description: 'Scalable cloud infrastructure and CI/CD pipelines for reliable deployments.', icon: 'cloud', features: ['AWS/GCP', 'Docker', 'Kubernetes', 'Terraform'], display_order: 5 },
      { title: 'AI & Machine Learning', description: 'Intelligent solutions powered by cutting-edge AI and ML technologies.', icon: 'ai', features: ['NLP', 'Computer Vision', 'Predictive Analytics', 'LLM Integration'], display_order: 6 }
    ]
    for (const s of svcs) {
      await client.query(
        'INSERT INTO services (title, description, icon, features, display_order, visible) VALUES ($1,$2,$3,$4,$5,$6)',
        [s.title, s.description, s.icon, s.features, s.display_order, true]
      )
    }
  }

  // Industries
  const indCheck = await client.query('SELECT COUNT(*) FROM industries')
  if (parseInt(indCheck.rows[0].count) === 0) {
    const inds = [
      { title: 'Startups', description: 'MVP development, rapid prototyping, scaling', icon: '🚀', display_order: 1 },
      { title: 'E-Commerce', description: 'Marketplaces, payment integration, analytics', icon: '🛒', display_order: 2 },
      { title: 'Healthcare', description: 'HIPAA compliance, telemedicine, EHR', icon: '🏥', display_order: 3 },
      { title: 'Finance', description: 'Fintech, banking, secure transactions', icon: '💰', display_order: 4 },
      { title: 'Education', description: 'LMS, virtual classrooms, assessment', icon: '📚', display_order: 5 },
      { title: 'Logistics', description: 'Fleet tracking, supply chain, optimization', icon: '🚚', display_order: 6 }
    ]
    for (const i of inds) {
      await client.query(
        'INSERT INTO industries (title, description, icon, display_order, visible) VALUES ($1,$2,$3,$4,$5)',
        [i.title, i.description, i.icon, i.display_order, true]
      )
    }
  }

  // Tech stack
  const techCheck = await client.query('SELECT COUNT(*) FROM tech_stack')
  if (parseInt(techCheck.rows[0].count) === 0) {
    const techs = [
      { name: 'React', icon: '⚛️', category: 'frontend', display_order: 1 },
      { name: 'Next.js', icon: '▲', category: 'frontend', display_order: 2 },
      { name: 'Node.js', icon: '🟢', category: 'backend', display_order: 3 },
      { name: 'TypeScript', icon: '📘', category: 'language', display_order: 4 },
      { name: 'Python', icon: '🐍', category: 'language', display_order: 5 },
      { name: 'Flutter', icon: '💙', category: 'mobile', display_order: 6 },
      { name: 'AWS', icon: '☁️', category: 'cloud', display_order: 7 },
      { name: 'Docker', icon: '🐳', category: 'devops', display_order: 8 },
      { name: 'PostgreSQL', icon: '🐘', category: 'database', display_order: 9 },
      { name: 'MongoDB', icon: '🍃', category: 'database', display_order: 10 },
      { name: 'GraphQL', icon: '◆', category: 'api', display_order: 11 },
      { name: 'Redis', icon: '🔴', category: 'database', display_order: 12 }
    ]
    for (const t of techs) {
      await client.query(
        'INSERT INTO tech_stack (name, icon, category, display_order, visible) VALUES ($1,$2,$3,$4,$5)',
        [t.name, t.icon, t.category, t.display_order, true]
      )
    }
  }

  // Testimonials
  const testCheck = await client.query('SELECT COUNT(*) FROM testimonials')
  if (parseInt(testCheck.rows[0].count) === 0) {
    const tests = [
      { client_name: 'David Park', company: 'TechVision CEO', feedback: 'They transformed our digital presence completely. The attention to detail and innovative approach exceeded all expectations.', rating: 5, avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80' },
      { client_name: 'Emma Roberts', company: 'StyleHub Founder', feedback: 'Working with this team was an absolute pleasure. They delivered a product that truly represents our brand.', rating: 5, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80' },
      { client_name: 'James Liu', company: 'FinanceApp CTO', feedback: 'The performance and design quality is unmatched. Our users love the new experience.', rating: 5, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80' },
      { client_name: 'Sarah Chen', company: 'Bloom Corp Founder', feedback: 'Technoziant built our e-commerce platform from scratch. The AI recommendations increased our sales by 40%.', rating: 5, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80' },
      { client_name: 'Mike Johnson', company: 'DataFlow CTO', feedback: 'Their cloud infrastructure setup reduced our costs by 60% while improving performance 10x.', rating: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
      { client_name: 'Priya Sharma', company: 'HealthPlus CEO', feedback: 'The mobile app they built for us has a 4.9 star rating on both App Store and Play Store.', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' }
    ]
    for (const t of tests) {
      await client.query(
        'INSERT INTO testimonials (client_name, company, feedback, rating, avatar, approved) VALUES ($1,$2,$3,$4,$5,$6)',
        [t.client_name, t.company, t.feedback, t.rating, t.avatar, true]
      )
    }
  }

  // Why choose
  const whyCheck = await client.query('SELECT COUNT(*) FROM why_choose')
  if (parseInt(whyCheck.rows[0].count) === 0) {
    const whys = [
      { title: 'Fast Delivery', description: '99% on-time delivery rate', icon: '⚡', display_order: 1 },
      { title: 'Modern Stack', description: 'React, Next.js, Node.js, Cloud', icon: '🔧', display_order: 2 },
      { title: '24/7 Support', description: 'Round the clock maintenance', icon: '🛡️', display_order: 3 },
      { title: 'Scalable', description: 'Built for growth', icon: '📈', display_order: 4 },
      { title: 'Award Winning', description: '12+ design awards', icon: '🏆', display_order: 5 },
      { title: 'Trusted', description: '50+ global clients', icon: '🤝', display_order: 6 }
    ]
    for (const w of whys) {
      await client.query(
        'INSERT INTO why_choose (title, description, icon, display_order, visible) VALUES ($1,$2,$3,$4,$5)',
        [w.title, w.description, w.icon, w.display_order, true]
      )
    }
  }

  // Team members
  const teamCheck = await client.query('SELECT COUNT(*) FROM team_members')
  if (parseInt(teamCheck.rows[0].count) === 0) {
    const members = [
      { name: 'Suman Kumar Sah', role: 'Founder', image: '/src/assets/images/Suman.jpeg', bio: 'Visionary founder leading Technoziant with a mission to deliver world-class technology solutions.', display_order: 1 },
      { name: 'Shahil Kumar Sharma', role: 'Co-founder & CEO', image: '/src/assets/images/Shahil.jpeg', bio: 'Chief Executive Officer driving the company\'s vision and growth strategy. Expert in business development and scaling digital enterprises.', display_order: 2 },
      { name: 'Ronny', role: 'CTO', image: 'https://ui-avatars.com/api/?name=Ronny&background=06d6a0&color=fff&size=400&bold=true', bio: 'Chief Technology Officer overseeing all technical operations. Expert in system architecture, scalable infrastructure, and cutting-edge technology implementations.', display_order: 3 },
      { name: 'Avnish', role: 'CMO', image: 'https://ui-avatars.com/api/?name=Avnish&background=f472b6&color=fff&size=400&bold=true', bio: 'Chief Marketing Officer driving brand strategy and digital marketing initiatives. Expert in growth marketing, brand building, and community development.', display_order: 4 }
    ]
    for (const m of members) {
      await client.query(
        'INSERT INTO team_members (name, role, image, bio, display_order, visible) VALUES ($1,$2,$3,$4,$5,$6)',
        [m.name, m.role, m.image, m.bio, m.display_order, true]
      )
    }
  }

  // Stats
  const statsCheck = await client.query('SELECT COUNT(*) FROM stats')
  if (parseInt(statsCheck.rows[0].count) === 0) {
    const statsData = [
      { label: 'Team Members', value: '4', icon: '👥', display_order: 1 },
      { label: 'Years Combined', value: '20+', icon: '📅', display_order: 2 },
      { label: 'Projects Led', value: '100+', icon: '🚀', display_order: 3 },
      { label: 'Awards Won', value: '10+', icon: '🏆', display_order: 4 }
    ]
    for (const s of statsData) {
      await client.query(
        'INSERT INTO stats (label, value, icon, display_order, visible) VALUES ($1,$2,$3,$4,$5)',
        [s.label, s.value, s.icon, s.display_order, true]
      )
    }
  }

  // Awards
  const awardsCheck = await client.query('SELECT COUNT(*) FROM awards')
  if (parseInt(awardsCheck.rows[0].count) === 0) {
    const awardsData = [
      { title: 'FWA Site of the Day', year: '2024-2026', icon: '🏆', display_order: 1 },
      { title: 'Awwwards SOTD', year: '2024-2026', icon: '🥇', display_order: 2 },
      { title: 'Webby Awards', year: '2024-2026', icon: '⭐', display_order: 3 },
      { title: 'CSS Design Awards', year: '2023-2026', icon: '🎨', display_order: 4 },
      { title: 'Red Dot Design', year: '2023-2026', icon: '🔴', display_order: 5 },
      { title: 'IF Design Award', year: '2023-2026', icon: '💎', display_order: 6 },
      { title: 'Good Design Award', year: '2024-2026', icon: '🏅', display_order: 7 },
      { title: 'German Design Award', year: '2024-2026', icon: '🎯', display_order: 8 }
    ]
    for (const a of awardsData) {
      await client.query(
        'INSERT INTO awards (title, year, icon, display_order, visible) VALUES ($1,$2,$3,$4,$5)',
        [a.title, a.year, a.icon, a.display_order, true]
      )
    }
  }

  // About content
  const aboutCheck = await client.query('SELECT COUNT(*) FROM about_content')
  if (parseInt(aboutCheck.rows[0].count) === 0) {
    const aboutData = [
      { section: 'hero', title: 'About Us', description: 'Founded with a vision to deliver world-class technology solutions, Technoziant blends innovation, art & technology as an in-house team of passionate makers. Our industry-leading approach consistently delivers award-winning work through quality & performance.' },
      { section: 'mission', title: 'Our Mission', description: 'To empower businesses with cutting-edge technology solutions that drive growth, efficiency, and innovation. We believe in creating digital experiences that make a real impact.' },
      { section: 'vision', title: 'Our Vision', description: 'To be the leading technology partner for businesses worldwide, known for our innovation, quality, and commitment to excellence. We envision a future where technology transforms every aspect of business.' }
    ]
    for (const a of aboutData) {
      await client.query(
        'INSERT INTO about_content (section, title, description) VALUES ($1,$2,$3)',
        [a.section, a.title, a.description]
      )
    }
  }

  // Footer content
  const footerCheck = await client.query('SELECT COUNT(*) FROM footer_content')
  if (parseInt(footerCheck.rows[0].count) === 0) {
    const footerData = [
      { section: 'services', title: 'Web Development', url: '/services', display_order: 1 },
      { section: 'services', title: 'Mobile Apps', url: '/services', display_order: 2 },
      { section: 'services', title: 'UI/UX Design', url: '/services', display_order: 3 },
      { section: 'services', title: 'Cloud & DevOps', url: '/services', display_order: 4 },
      { section: 'services', title: 'AI & ML', url: '/services', display_order: 5 },
      { section: 'company', title: 'About', url: '/about', display_order: 1 },
      { section: 'company', title: 'Work', url: '/work', display_order: 2 },
      { section: 'company', title: 'Careers', url: '/careers', display_order: 3 },
      { section: 'company', title: 'Contact', url: '/contact', display_order: 4 },
      { section: 'company', title: 'FAQ', url: '/faq', display_order: 5 }
    ]
    for (const f of footerData) {
      await client.query(
        'INSERT INTO footer_content (section, title, url, display_order, visible) VALUES ($1,$2,$3,$4,$5)',
        [f.section, f.title, f.url, f.display_order, true]
      )
    }
  }

  // Work items
  const workCheck = await client.query('SELECT COUNT(*) FROM work_items')
  if (parseInt(workCheck.rows[0].count) === 0) {
    const workData = [
      { title: 'Bloom E-Commerce', description: 'Multi-vendor marketplace with AI recommendations processing high-volume annual transactions.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', category: 'web', tech: ['Next.js', 'Stripe', 'PostgreSQL', 'AI'], display_order: 1 },
      { title: 'Pulse Healthcare', description: 'HIPAA-compliant telemedicine platform connecting patients with 10K+ doctors worldwide.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80', category: 'web', tech: ['React', 'WebRTC', 'HIPAA', 'PostgreSQL'], display_order: 2 },
      { title: 'FinSecure Banking', description: 'Next-gen banking experience with biometric auth and instant transfers across 180+ countries.', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&q=80', category: 'mobile', tech: ['React Native', 'Node.js', 'Blockchain'], display_order: 3 }
    ]
    for (const w of workData) {
      await client.query(
        'INSERT INTO work_items (title, description, image, category, tech, display_order, visible) VALUES ($1,$2,$3,$4,$5,$6,$7)',
        [w.title, w.description, w.image, w.category, w.tech, w.display_order, true]
      )
    }
  }
}

export default async function handler(req, res) {
  await ensureDB()
  return app(req, res)
}
