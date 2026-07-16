const express = require('express')
const { pool } = require('../db.cjs')
const { authMiddleware } = require('../middleware/auth.cjs')

const router = express.Router()

function makeSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now()
}

router.get('/', async (req, res) => {
  try {
    const { category, tag } = req.query
    let query = 'SELECT b.*, u.name as author_name FROM blogs b LEFT JOIN users u ON b.author_id = u.id WHERE b.published = true'
    const params = []
    if (category) { params.push(category); query += ` AND b.category = $${params.length}` }
    if (tag) { params.push(tag); query += ` AND $${params.length} = ANY(b.tags)` }
    query += ' ORDER BY b.created_at DESC'
    const result = await pool.query(query, params)
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/all', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT b.*, u.name as author_name FROM blogs b LEFT JOIN users u ON b.author_id = u.id ORDER BY b.created_at DESC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:slug', async (req, res) => {
  try {
    const result = await pool.query('SELECT b.*, u.name as author_name FROM blogs b LEFT JOIN users u ON b.author_id = u.id WHERE b.slug = $1', [req.params.slug])
    if (!result.rows.length) return res.status(404).json({ error: 'Blog not found' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content, excerpt, cover_image, tags, category, published } = req.body
    if (!title) return res.status(400).json({ error: 'Title is required' })
    const slug = makeSlug(title)
    const result = await pool.query(
      'INSERT INTO blogs (title, slug, content, excerpt, cover_image, author_id, published, tags, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [title, slug, JSON.stringify(content || {}), excerpt || '', cover_image || '', req.user.id, published || false, tags || [], category || '']
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/:id', authMiddleware, async (req, res) => {
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
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM blogs WHERE id = $1', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/upload', authMiddleware, async (req, res) => {
  try {
    if (!req.files || !req.files.image) return res.status(400).json({ error: 'No image uploaded' })
    const image = req.files.image
    const ext = image.name.split('.').pop()
    const filename = `blog-${Date.now()}.${ext}`
    const uploadPath = `./public/uploads/${filename}`
    await image.mv(uploadPath)
    res.json({ url: `/uploads/${filename}` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
