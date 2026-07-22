const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '22701'),
  ssl: { rejectUnauthorized: false }
})

async function initDB() {
  const client = await pool.connect()
  try {
    await client.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL, role VARCHAR(50) DEFAULT 'admin', created_at TIMESTAMP DEFAULT NOW()
    )`)
    await client.query(`CREATE TABLE IF NOT EXISTS blogs (
      id SERIAL PRIMARY KEY, title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL,
      content JSONB NOT NULL DEFAULT '{}', excerpt TEXT DEFAULT '', cover_image TEXT DEFAULT '',
      author_id INTEGER REFERENCES users(id), published BOOLEAN DEFAULT false, tags TEXT[] DEFAULT '{}',
      category TEXT DEFAULT '', created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
    )`)
    // CMS Tables
    await client.query(`CREATE TABLE IF NOT EXISTS site_settings (id SERIAL PRIMARY KEY, key VARCHAR(255) UNIQUE NOT NULL, value TEXT DEFAULT '', created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS featured_projects (id SERIAL PRIMARY KEY, title TEXT NOT NULL, subtitle TEXT DEFAULT '', description TEXT DEFAULT '', image TEXT DEFAULT '', link TEXT DEFAULT '', tech TEXT[] DEFAULT '{}', category TEXT DEFAULT '', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, client TEXT DEFAULT '', year TEXT DEFAULT '', duration TEXT DEFAULT '', team TEXT DEFAULT '', result TEXT DEFAULT '', logo TEXT DEFAULT '', images TEXT[] DEFAULT '{}', created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS services (id SERIAL PRIMARY KEY, title TEXT NOT NULL, description TEXT DEFAULT '', icon TEXT DEFAULT '', features TEXT[] DEFAULT '{}', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS industries (id SERIAL PRIMARY KEY, title TEXT NOT NULL, description TEXT DEFAULT '', icon TEXT DEFAULT '', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS tech_stack (id SERIAL PRIMARY KEY, name TEXT NOT NULL, category TEXT DEFAULT '', icon TEXT DEFAULT '', level VARCHAR(50) DEFAULT 'intermediate', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS testimonials (id SERIAL PRIMARY KEY, client_name TEXT NOT NULL, company TEXT DEFAULT '', feedback TEXT DEFAULT '', rating INTEGER DEFAULT 5, avatar TEXT DEFAULT '', approved BOOLEAN DEFAULT false, created_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS why_choose (id SERIAL PRIMARY KEY, title TEXT NOT NULL, description TEXT DEFAULT '', icon TEXT DEFAULT '', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS team_members (id SERIAL PRIMARY KEY, name TEXT NOT NULL, role TEXT DEFAULT '', image TEXT DEFAULT '', bio TEXT DEFAULT '', achievements TEXT[] DEFAULT '{}', stats JSONB DEFAULT '[]', social_links JSONB DEFAULT '{}', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS stats (id SERIAL PRIMARY KEY, label TEXT NOT NULL, value TEXT DEFAULT '', icon TEXT DEFAULT '', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS awards (id SERIAL PRIMARY KEY, title TEXT NOT NULL, year TEXT DEFAULT '', icon TEXT DEFAULT '', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS about_content (id SERIAL PRIMARY KEY, section TEXT NOT NULL, title TEXT DEFAULT '', description TEXT DEFAULT '', image TEXT DEFAULT '', updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS footer_content (id SERIAL PRIMARY KEY, section TEXT NOT NULL, title TEXT DEFAULT '', url TEXT DEFAULT '', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS work_items (id SERIAL PRIMARY KEY, title TEXT NOT NULL, description TEXT DEFAULT '', image TEXT DEFAULT '', link TEXT DEFAULT '', category TEXT DEFAULT '', tech TEXT[] DEFAULT '{}', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS feedback_submissions (id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT DEFAULT '', company TEXT DEFAULT '', rating INTEGER DEFAULT 5, feedback TEXT DEFAULT '', project TEXT DEFAULT '', created_at TIMESTAMP DEFAULT NOW())`)
    await client.query("ALTER TABLE site_settings ALTER COLUMN value TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE feedback_submissions ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending'").catch(() => {})
    await client.query("ALTER TABLE testimonials ALTER COLUMN avatar TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE team_members ALTER COLUMN image TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE team_members ADD COLUMN IF NOT EXISTS achievements TEXT[] DEFAULT '{}'").catch(() => {})
    await client.query("ALTER TABLE team_members ADD COLUMN IF NOT EXISTS gender TEXT DEFAULT ''").catch(() => {})
    await client.query("ALTER TABLE team_members ADD COLUMN IF NOT EXISTS stats JSONB DEFAULT '[]'").catch(() => {})
    await client.query("ALTER TABLE about_content ALTER COLUMN image TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE about_content ALTER COLUMN title TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE footer_content ALTER COLUMN title TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE footer_content ALTER COLUMN url TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE work_items ALTER COLUMN image TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE work_items ALTER COLUMN link TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE work_items ALTER COLUMN client TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE blogs ALTER COLUMN title TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE blogs ALTER COLUMN slug TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE blogs ALTER COLUMN category TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE services ALTER COLUMN icon TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE industries ALTER COLUMN icon TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE tech_stack ALTER COLUMN icon TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE why_choose ALTER COLUMN icon TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE stats ALTER COLUMN icon TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE awards ALTER COLUMN icon TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE featured_projects ADD COLUMN IF NOT EXISTS subtitle TEXT DEFAULT ''").catch(() => {})
    await client.query("ALTER TABLE featured_projects ADD COLUMN IF NOT EXISTS client TEXT DEFAULT ''").catch(() => {})
    await client.query("ALTER TABLE featured_projects ADD COLUMN IF NOT EXISTS year TEXT DEFAULT ''").catch(() => {})
    await client.query("ALTER TABLE featured_projects ADD COLUMN IF NOT EXISTS duration TEXT DEFAULT ''").catch(() => {})
    await client.query("ALTER TABLE featured_projects ADD COLUMN IF NOT EXISTS team TEXT DEFAULT ''").catch(() => {})
    await client.query("ALTER TABLE featured_projects ADD COLUMN IF NOT EXISTS result TEXT DEFAULT ''").catch(() => {})
    await client.query("ALTER TABLE featured_projects ADD COLUMN IF NOT EXISTS logo TEXT DEFAULT ''").catch(() => {})
    await client.query("ALTER TABLE featured_projects ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}'").catch(() => {})
    await client.query("ALTER TABLE featured_projects ALTER COLUMN title TYPE TEXT").catch(() => {})
    await client.query("ALTER TABLE featured_projects ALTER COLUMN category TYPE TEXT").catch(() => {})
    await client.query(`CREATE TABLE IF NOT EXISTS database_connections (
      id SERIAL PRIMARY KEY, name TEXT NOT NULL, type TEXT DEFAULT 'PostgreSQL',
      host TEXT DEFAULT 'localhost', port TEXT DEFAULT '5432', database_name TEXT DEFAULT '',
      username TEXT DEFAULT '', password TEXT DEFAULT '', ssl BOOLEAN DEFAULT false,
      is_active BOOLEAN DEFAULT false, status TEXT DEFAULT 'untested',
      last_tested TEXT DEFAULT '', created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
    )`).catch(() => {})
    await client.query(`CREATE TABLE IF NOT EXISTS contact_inquiries (
      id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL,
      phone TEXT DEFAULT '', company TEXT DEFAULT '', service TEXT DEFAULT '',
      message TEXT NOT NULL, ip_address TEXT DEFAULT '', location TEXT DEFAULT '',
      status TEXT DEFAULT 'new', reply TEXT DEFAULT '', replied_at TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW()
    )`).catch(() => {})
    await client.query("ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS location TEXT DEFAULT ''").catch(() => {})
    await client.query("ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS country TEXT DEFAULT ''").catch(() => {})
    await client.query("ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS region TEXT DEFAULT ''").catch(() => {})
    await client.query("ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS city TEXT DEFAULT ''").catch(() => {})
    await client.query("ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS latitude NUMERIC DEFAULT NULL").catch(() => {})
    await client.query("ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS longitude NUMERIC DEFAULT NULL").catch(() => {})
    await client.query("ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS gender TEXT DEFAULT ''").catch(() => {})
    const dbCount = await client.query('SELECT COUNT(*) FROM database_connections').catch(() => ({ rows: [{ count: '0' }] }))
    if (parseInt(dbCount.rows[0].count) === 0) {
      const dbUser = process.env.DB_USER || ''
      const dbHost = process.env.DB_HOST || 'localhost'
      const dbName = process.env.DB_NAME || ''
      const dbPort = process.env.DB_PORT || '22701'
      await client.query(
        'INSERT INTO database_connections (name, type, host, port, database_name, username, ssl, is_active, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
        ['Current Database', 'PostgreSQL', dbHost, dbPort, dbName, dbUser, true, true, 'connected']
      ).catch(() => {})
    }
    console.log('Database tables initialized')
  } finally {
    client.release()
  }
}

module.exports = { pool, initDB }
