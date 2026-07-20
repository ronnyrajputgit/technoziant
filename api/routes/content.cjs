const express = require('express')
const router = express.Router()

const TABLES_WITH_CATEGORY = [
  'featured_projects', 'services', 'tech_stack', 'work_items'
]

const TABLES_WITH_UPDATED_AT = [
  'site_settings', 'featured_projects', 'services', 'industries', 'tech_stack',
  'testimonials', 'why_choose', 'team_members', 'stats', 'awards',
  'about_content', 'footer_content', 'work_items'
]

const TABLES_WITH_VISIBLE = [
  'featured_projects', 'services', 'industries', 'tech_stack', 'why_choose',
  'team_members', 'stats', 'awards', 'footer_content', 'work_items'
]

const TABLES = [...TABLES_WITH_UPDATED_AT, 'feedback_submissions']

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

module.exports = function(pool) {
  // POST /api/content/feedback - public feedback submission (must be before generic /:table)
  router.post('/feedback', (req, res) => {
    const { name, email, company, rating, feedback, project } = req.body
    if (!name || !email || !feedback) return res.status(400).json({ error: 'Name, email, and feedback are required' })
    pool.query(
      `INSERT INTO feedback_submissions (name, email, company, rating, feedback, project) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, email, company || '', rating || 0, feedback, project || ''],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json({ success: true, submission: result.rows[0] })
      }
    )
  })

  // GET /api/content/:table - list all (public)
  router.get('/:table', (req, res) => {
    const { table } = req.params
    if (!TABLES.includes(table)) return res.status(400).json({ error: 'Invalid table' })
    const { category, visible } = req.query
    let query = `SELECT * FROM ${table}`
    const conditions = []
    const params = []
    if (visible !== undefined && TABLES_WITH_VISIBLE.includes(table)) {
      params.push(visible === 'true')
      conditions.push(`visible = $${params.length}`)
    }
    if (category && TABLES_WITH_CATEGORY.includes(table)) {
      params.push(category)
      conditions.push(`category = $${params.length}`)
    }
    if (conditions.length > 0) query += ` WHERE ${conditions.join(' AND ')}`
    if (table === 'site_settings') {
      query += ' ORDER BY key'
    } else if (TABLES_WITH_UPDATED_AT.includes(table)) {
      query += ' ORDER BY display_order ASC, created_at DESC'
    } else {
      query += ' ORDER BY created_at DESC'
    }
    pool.query(query, params, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json(result.rows)
    })
  })

  // POST /api/content/:table - create (auth)
  router.post('/:table', authMiddleware, (req, res) => {
    const { table } = req.params
    if (!TABLES.includes(table)) return res.status(400).json({ error: 'Invalid table' })

    const data = { ...req.body }

    const columns = {
      site_settings: ['key', 'value'],
      featured_projects: ['title', 'description', 'image', 'link', 'tech', 'category', 'display_order', 'visible'],
      services: ['title', 'description', 'icon', 'features', 'display_order', 'visible'],
      industries: ['title', 'description', 'icon', 'display_order', 'visible'],
      tech_stack: ['name', 'category', 'icon', 'level', 'display_order', 'visible'],
      testimonials: ['client_name', 'company', 'feedback', 'rating', 'avatar', 'approved'],
      why_choose: ['title', 'description', 'icon', 'display_order', 'visible'],
      team_members: ['name', 'role', 'image', 'bio', 'social_links', 'display_order', 'visible'],
      stats: ['label', 'value', 'icon', 'display_order', 'visible'],
      awards: ['title', 'year', 'icon', 'display_order', 'visible'],
      about_content: ['section', 'title', 'description', 'image'],
      footer_content: ['section', 'title', 'url', 'display_order', 'visible'],
      work_items: ['title', 'description', 'image', 'link', 'category', 'tech', 'display_order', 'visible'],
      feedback_submissions: ['name', 'email', 'company', 'rating', 'feedback', 'project']
    }

    const cols = columns[table]
    if (!cols) return res.status(400).json({ error: 'Invalid table' })

    const fields = []
    const values = []
    const placeholders = []
    let idx = 1

    for (const col of cols) {
      if (data[col] !== undefined) {
        let val = data[col]
        if (Array.isArray(val)) val = JSON.stringify(val)
        if (typeof val === 'object' && val !== null && col !== 'tech' && col !== 'features' && col !== 'social_links') {
          val = JSON.stringify(val)
        }
        fields.push(col)
        values.push(val)
        placeholders.push(`$${idx}`)
        idx++
      }
    }

    if (fields.length === 0) return res.status(400).json({ error: 'No data provided' })

    pool.query(
      `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`,
      values,
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(result.rows[0])
      }
    )
  })

  // PUT /api/content/:table/:id - update (auth)
  router.put('/:table/:id', authMiddleware, (req, res) => {
    const { table, id } = req.params
    if (!TABLES.includes(table)) return res.status(400).json({ error: 'Invalid table' })

    const data = { ...req.body }
    const setClauses = []
    const values = []
    let idx = 1

    for (const [key, val] of Object.entries(data)) {
      if (key === 'id') continue
      let value = val
      if (Array.isArray(value)) value = JSON.stringify(value)
      if (typeof value === 'object' && value !== null) value = JSON.stringify(value)
      setClauses.push(`${key} = $${idx}`)
      values.push(value)
      idx++
    }

    if (setClauses.length === 0) return res.status(400).json({ error: 'No data provided' })

    values.push(id)
    const updatedAtClause = TABLES_WITH_UPDATED_AT.includes(table) ? ', updated_at = NOW()' : ''
    pool.query(
      `UPDATE ${table} SET ${setClauses.join(', ')}${updatedAtClause} WHERE id = $${idx} RETURNING *`,
      values,
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        if (!result.rows.length) return res.status(404).json({ error: 'Not found' })
        res.json(result.rows[0])
      }
    )
  })

  // DELETE /api/content/:table/:id - delete (auth)
  router.delete('/:table/:id', authMiddleware, (req, res) => {
    const { table, id } = req.params
    if (!TABLES.includes(table)) return res.status(400).json({ error: 'Invalid table' })
    pool.query(`DELETE FROM ${table} WHERE id = $1`, [id], (err) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ success: true })
    })
  })

  return router
}
