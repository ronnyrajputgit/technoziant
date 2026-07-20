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
      id SERIAL PRIMARY KEY, title VARCHAR(500) NOT NULL, slug VARCHAR(500) UNIQUE NOT NULL,
      content JSONB NOT NULL DEFAULT '{}', excerpt TEXT DEFAULT '', cover_image TEXT DEFAULT '',
      author_id INTEGER REFERENCES users(id), published BOOLEAN DEFAULT false, tags TEXT[] DEFAULT '{}',
      category VARCHAR(100) DEFAULT '', created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
    )`)
    // CMS Tables
    await client.query(`CREATE TABLE IF NOT EXISTS site_settings (id SERIAL PRIMARY KEY, key VARCHAR(255) UNIQUE NOT NULL, value TEXT DEFAULT '', created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS featured_projects (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT DEFAULT '', image TEXT DEFAULT '', link TEXT DEFAULT '', tech TEXT[] DEFAULT '{}', category VARCHAR(100) DEFAULT '', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS services (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT DEFAULT '', icon VARCHAR(50) DEFAULT '', features TEXT[] DEFAULT '{}', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS industries (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT DEFAULT '', icon VARCHAR(50) DEFAULT '', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS tech_stack (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, category VARCHAR(100) DEFAULT '', icon VARCHAR(50) DEFAULT '', level VARCHAR(50) DEFAULT 'intermediate', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS testimonials (id SERIAL PRIMARY KEY, client_name VARCHAR(255) NOT NULL, company VARCHAR(255) DEFAULT '', feedback TEXT DEFAULT '', rating INTEGER DEFAULT 5, avatar VARCHAR(500) DEFAULT '', approved BOOLEAN DEFAULT false, created_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS why_choose (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT DEFAULT '', icon VARCHAR(50) DEFAULT '', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS team_members (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, role VARCHAR(255) DEFAULT '', image VARCHAR(500) DEFAULT '', bio TEXT DEFAULT '', social_links JSONB DEFAULT '{}', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS stats (id SERIAL PRIMARY KEY, label VARCHAR(255) NOT NULL, value VARCHAR(255) DEFAULT '', icon VARCHAR(50) DEFAULT '', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS awards (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, year VARCHAR(50) DEFAULT '', icon VARCHAR(50) DEFAULT '', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS about_content (id SERIAL PRIMARY KEY, section VARCHAR(255) NOT NULL, title VARCHAR(500) DEFAULT '', description TEXT DEFAULT '', image VARCHAR(500) DEFAULT '', updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS footer_content (id SERIAL PRIMARY KEY, section VARCHAR(255) NOT NULL, title VARCHAR(500) DEFAULT '', url VARCHAR(500) DEFAULT '', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS work_items (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT DEFAULT '', image VARCHAR(500) DEFAULT '', link VARCHAR(500) DEFAULT '', category VARCHAR(100) DEFAULT '', tech TEXT[] DEFAULT '{}', display_order INTEGER DEFAULT 0, visible BOOLEAN DEFAULT true, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())`)
    await client.query(`CREATE TABLE IF NOT EXISTS feedback_submissions (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) DEFAULT '', company VARCHAR(255) DEFAULT '', rating INTEGER DEFAULT 5, feedback TEXT DEFAULT '', project VARCHAR(255) DEFAULT '', created_at TIMESTAMP DEFAULT NOW())`)
    console.log('Database tables initialized')
  } finally {
    client.release()
  }
}

module.exports = { pool, initDB }
