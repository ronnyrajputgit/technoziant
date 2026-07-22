import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { api } from '../../utils/api'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SortIcon from '@mui/icons-material/Sort'
import ArticleIcon from '@mui/icons-material/Article'
import PublishIcon from '@mui/icons-material/Publish'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import FolderIcon from '@mui/icons-material/Folder'
import WorkIcon from '@mui/icons-material/Work'
import ConstructionIcon from '@mui/icons-material/Construction'
import FactoryIcon from '@mui/icons-material/Factory'
import MemoryIcon from '@mui/icons-material/Memory'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import GroupsIcon from '@mui/icons-material/Groups'
import BarChartIcon from '@mui/icons-material/BarChart'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import InfoIcon from '@mui/icons-material/Info'
import InventoryIcon from '@mui/icons-material/Inventory'
import FooterIcon from '@mui/icons-material/Web'
import SettingsIcon from '@mui/icons-material/Settings'
import FeedbackIcon from '@mui/icons-material/Feedback'
import ContactPageIcon from '@mui/icons-material/ContactPage'
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'
import MailIcon from '@mui/icons-material/Mail'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts'

const sidebarLinks = [
  { path: '/dashboard', label: 'Overview', icon: <BarChartIcon sx={{ fontSize: 18 }} /> },
  { group: 'Home Page Sections', icon: <WorkIcon sx={{ fontSize: 18 }} />, children: [
    { path: '/dashboard/featured-projects', label: 'Featured Projects', icon: <WorkIcon sx={{ fontSize: 16 }} /> },
    { path: '/dashboard/cms/tech_stack', label: 'Tech Stack', icon: <MemoryIcon sx={{ fontSize: 16 }} /> },
    { path: '/dashboard/cms/why_choose', label: 'Why Choose Us', icon: <ThumbUpIcon sx={{ fontSize: 16 }} /> },
  ]},
  { group: 'Work / Portfolio', icon: <WorkIcon sx={{ fontSize: 18 }} />, children: [
    { path: '/dashboard/cms/work_items', label: 'Manage Work', icon: <WorkIcon sx={{ fontSize: 16 }} /> },
  ]},
  { group: 'Services', icon: <ConstructionIcon sx={{ fontSize: 18 }} />, children: [
    { path: '/dashboard/cms/services', label: 'Manage Services', icon: <ConstructionIcon sx={{ fontSize: 16 }} /> },
    { path: '/dashboard/cms/industries', label: 'Industries We Serve', icon: <FactoryIcon sx={{ fontSize: 16 }} /> },
    { path: '/dashboard/testimonials', label: 'Testimonials & Feedback', icon: <FormatQuoteIcon sx={{ fontSize: 16 }} /> },
    { path: '/dashboard/contact-settings', label: 'Contact Page', icon: <ContactPageIcon sx={{ fontSize: 16 }} /> },
  ]},
  { group: 'About Page', icon: <InfoIcon sx={{ fontSize: 18 }} />, children: [
    { path: '/dashboard/cms/team_members', label: 'Team Members', icon: <GroupsIcon sx={{ fontSize: 16 }} /> },
    { path: '/dashboard/cms/stats', label: 'Stats Counter', icon: <BarChartIcon sx={{ fontSize: 16 }} /> },
    { path: '/dashboard/cms/awards', label: 'Achievements', icon: <EmojiEventsIcon sx={{ fontSize: 16 }} /> },
  ]},
  { group: 'Blog Management', icon: <FolderIcon sx={{ fontSize: 18 }} />, children: [
    { path: '/dashboard/blogs', label: 'All Blogs', icon: <ArticleIcon sx={{ fontSize: 16 }} /> },
    { path: '/dashboard/editor', label: 'Create New Blog', icon: <AddIcon sx={{ fontSize: 16 }} /> },
  ]},
  { group: 'Site Management', icon: <BrandingWatermarkIcon sx={{ fontSize: 18 }} />, children: [
    { path: '/dashboard/header', label: 'Header & Logo', icon: <BrandingWatermarkIcon sx={{ fontSize: 16 }} /> },
    { path: '/dashboard/footer-links', label: 'Footer Links', icon: <FooterIcon sx={{ fontSize: 16 }} /> },
  ]},
  { group: 'Inquiries', icon: <MailIcon sx={{ fontSize: 18 }} />, children: [
    { path: '/dashboard/inquiries', label: 'Contact Inquiries', icon: <MailIcon sx={{ fontSize: 16 }} /> },
  ]},
  { group: 'Administrator', icon: <SettingsIcon sx={{ fontSize: 18 }} />, children: [
    { path: '/dashboard/db-connections', label: 'Database Connections', icon: <SettingsIcon sx={{ fontSize: 16 }} /> },
  ]},
]

function ConfirmDialog({ open, title, message, onConfirm, onCancel, danger }) {
  if (!open) return null
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onCancel}>
      <div className="liquid-glass" style={{ width: '100%', maxWidth: '400px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: danger ? 'rgba(239,68,68,0.15)' : 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <span style={{ fontSize: '24px' }}>{danger ? '🗑️' : '⚠️'}</span>
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)', marginBottom: '6px' }}>{title}</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', marginBottom: '20px', lineHeight: 1.5 }}>{message}</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={onCancel} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: 'var(--font-code)' }}>Cancel</button>
            <button onClick={onConfirm} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: danger ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'var(--font-code)' }}>{danger ? 'Delete' : 'Confirm'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Sidebar({ open, onToggle }) {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [expandedGroups, setExpandedGroups] = useState({})

  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }))
  }

  const isGroupActive = (children) => children?.some(c => location.pathname === c.path)

  useEffect(() => {
    sidebarLinks.forEach(item => {
      if (item.children && isGroupActive(item.children)) {
        setExpandedGroups(prev => ({ ...prev, [item.group]: true }))
      }
    })
  }, [location.pathname])

  return (
    <aside style={{ width: open ? '240px' : '60px', minWidth: open ? '240px' : '60px', background: 'var(--bg-2)', borderRight: '1px solid var(--glass-border)', height: '100vh', position: 'sticky', top: 0, overflow: 'hidden', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', zIndex: 50, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: open ? '16px' : '16px 0', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: open ? 'space-between' : 'center', transition: 'all 0.3s' }}>
        {open && <div>
          <div style={{ fontSize: '15px', fontWeight: '700', fontFamily: 'var(--font-h)' }}>Dashboard</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>{user?.name || 'Admin'}</div>
        </div>}
        <button onClick={onToggle} style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
          {open ? <ArrowBackIcon sx={{ fontSize: 16 }} /> : <ArrowForwardIcon sx={{ fontSize: 16 }} />}
        </button>
      </div>

      {/* User Avatar */}
      {open && (
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--glass-border)' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: '#fff', flexShrink: 0 }}>
            {(user?.name || 'A')[0].toUpperCase()}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || 'Admin'}</div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email || ''}</div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: open ? '8px' : '8px 4px', overflowY: 'auto' }}>
        {sidebarLinks.map((item, idx) => {
          if (item.divider && open) {
            return (
              <div key={idx} style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)", textTransform: 'uppercase', letterSpacing: '0.1em', padding: '12px 10px 4px', marginTop: '8px', borderTop: '1px solid var(--glass-border)' }}>
                {item.label}
              </div>
            )
          }
          if (item.group) {
            const isActive = isGroupActive(item.children)
            const isExpanded = expandedGroups[item.group]
            return (
              <div key={idx}>
                <button
                  title={item.group}
                  onClick={(e) => { e.stopPropagation(); if (open) toggleGroup(item.group) }}
                  style={{ display: 'flex', alignItems: 'center', gap: open ? '8px' : '0', justifyContent: open ? 'flex-start' : 'center', padding: open ? '8px 10px' : '8px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: isActive ? '#22c55e' : 'var(--text-muted)', width: '100%', cursor: 'pointer', border: 'none', background: isActive ? 'rgba(34,197,94,0.08)' : 'transparent', transition: 'all 0.15s', textAlign: 'left' }}>
                  <span style={{ transition: 'transform 0.2s', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', display: 'flex' }}>{item.icon}</span>
                  {open && <>
                    <span style={{ flex: 1 }}>{item.group}</span>
                    <span style={{ fontSize: '10px', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>▶</span>
                  </>}
                </button>
                {open && isExpanded && (
                  <div style={{ paddingLeft: '12px', marginTop: '2px', marginBottom: '4px' }}>
                    {item.children.map(child => {
                      const isActive = location.pathname === child.path
                      return (
                        <Link key={child.path} to={child.path}
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', color: isActive ? '#22c55e' : 'var(--text)', textDecoration: 'none', marginBottom: '1px', background: isActive ? 'rgba(34,197,94,0.08)' : 'transparent', fontWeight: isActive ? '600' : '400', transition: 'all 0.15s' }}>
                          <span style={{ color: isActive ? '#22c55e' : 'var(--text-muted)' }}>{child.icon}</span>
                          <span>{child.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }
          if (item.path) {
            const isActive = location.pathname === item.path
            return (
              <a key={idx} href={item.path} title={item.label}
                style={{ display: 'flex', alignItems: 'center', gap: open ? '8px' : '0', justifyContent: open ? 'flex-start' : 'center', padding: open ? '8px 10px' : '8px', borderRadius: '8px', fontSize: '12px', color: isActive ? '#22c55e' : 'var(--text)', textDecoration: 'none', marginBottom: '1px', background: isActive ? 'rgba(34,197,94,0.08)' : 'transparent', fontWeight: isActive ? '600' : '400', transition: 'all 0.15s' }}>
                <span>{typeof item.icon === 'string' ? item.icon : item.icon}</span>
                {open && <span>{item.label}</span>}
              </a>
            )
          }
          return null
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: open ? '8px' : '8px 4px', borderTop: '1px solid var(--glass-border)' }}>
        <button onClick={() => { logout(); navigate('/') }} title="Logout"
          style={{ display: 'flex', alignItems: 'center', gap: open ? '10px' : '0', justifyContent: open ? 'flex-start' : 'center', padding: open ? '10px 12px' : '10px', borderRadius: '8px', fontSize: '12px', color: '#ef4444', width: '100%', cursor: 'pointer', border: 'none', background: 'transparent', fontFamily: "var(--font-code)", transition: 'all 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          {open && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}

export function DashboardLayout() {
  const { user } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const nav = useNavigate()

  useEffect(() => {
    if (!user) nav('/login')
  }, [user, nav])

  if (!user) return null

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <main style={{ flex: 1, paddingTop: '20px', paddingBottom: '40px', overflow: 'auto' }}>
        <div style={{ padding: '0 clamp(16px, 4vw, 32px)' }}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export function Dashboard() {
  const { user } = useApp()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const nav = useNavigate()

  useEffect(() => {
    if (!user) { nav('/login'); return }
    api.getDashboardStats().then(setStats).catch(console.error).finally(() => setLoading(false))
  }, [user, nav])

  if (!user) return null
  if (loading) return <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Loading dashboard...</div>
  if (!stats) return <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Failed to load stats.</div>

  const COLORS = ['#4f8eff', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#06d6a0', '#f472b6', '#3b82f6']
  const genderColors = { male: '#3b82f6', female: '#f472b6', other: '#a855f7' }
  const statusColors = { new: '#f59e0b', replied: '#22c55e', archived: '#94a3b8', published: '#22c55e', drafts: '#f59e0b' }

  const SectionTitle = ({ children }) => (
    <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: 'var(--font-code)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '6px' }}>{children}</div>
  )

  const StatCard = ({ label, value, color, sub }) => (
    <div className="liquid-glass" style={{ padding: '14px 16px', borderRadius: '10px', borderLeft: `3px solid ${color}` }}>
      <div style={{ fontSize: '22px', fontWeight: '700', color, fontFamily: 'var(--font-h)' }}>{value}</div>
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{label}</div>
      {sub && <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)', opacity: 0.6, marginTop: '2px' }}>{sub}</div>}
    </div>
  )

  const ChartCard = ({ title, children, w }) => (
    <div className="liquid-glass" style={{ padding: '16px', borderRadius: '12px', width: w || '100%' }}>
      <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '12px', fontFamily: 'var(--font-code)' }}>{title}</div>
      {children}
    </div>
  )

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px 12px', fontSize: '11px', fontFamily: 'var(--font-code)' }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</div>
        {payload.map((p, i) => <div key={i} style={{ color: p.color }}>{p.name}: {p.value}</div>)}
      </div>
    )
  }

  const teamGenderData = [
    { name: 'Male', value: stats.team.male, color: genderColors.male },
    { name: 'Female', value: stats.team.female, color: genderColors.female },
    { name: 'Other', value: stats.team.other, color: genderColors.other },
  ].filter(d => d.value > 0)

  const inquiryStatusData = [
    { name: 'New', value: stats.inquiries.new, color: '#f59e0b' },
    { name: 'Replied', value: stats.inquiries.replied, color: '#22c55e' },
    { name: 'Archived', value: stats.inquiries.archived, color: '#94a3b8' },
  ].filter(d => d.value > 0)

  const inquiryGenderData = [
    { name: 'Male', value: stats.inquiries.male, color: genderColors.male },
    { name: 'Female', value: stats.inquiries.female, color: genderColors.female },
    { name: 'Other', value: stats.inquiries.other, color: genderColors.other },
  ].filter(d => d.value > 0)

  const blogStatusData = [
    { name: 'Published', value: stats.blogs.published, color: '#22c55e' },
    { name: 'Drafts', value: stats.blogs.drafts, color: '#f59e0b' },
  ].filter(d => d.value > 0)

  const monthlyInquiriesChart = (stats.inquiries.monthly || []).map(m => ({ month: m.month, inquiries: parseInt(m.count) }))
  const monthlyBlogsChart = (stats.blogs.monthly || []).map(m => ({ month: m.month, blogs: parseInt(m.count) }))
  const serviceChartData = (stats.inquiries.byService || []).map(s => ({ name: s.service, count: parseInt(s.count) }))
  const countryChartData = (stats.inquiries.byCountry || []).map(c => ({ name: c.country, count: parseInt(c.count) }))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px', fontFamily: 'var(--font-code)' }}>overview</div>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: '700' }}>Welcome, {user.name}</h1>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link to="/dashboard/editor" style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '11px', fontWeight: '600', color: '#fff', cursor: 'pointer', background: 'linear-gradient(135deg, #22c55e, #16a34a)', textDecoration: 'none', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '4px' }}><AddIcon sx={{ fontSize: 14 }} /> New Blog</Link>
          <Link to="/dashboard/inquiries" style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)', fontSize: '11px', fontWeight: '600', color: 'var(--text)', cursor: 'pointer', background: 'transparent', textDecoration: 'none', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '4px' }}><MailIcon sx={{ fontSize: 14 }} /> Inquiries</Link>
        </div>
      </div>

      {/* Top-Level Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '24px' }}>
        <StatCard label="Team Members" value={stats.team.total} color="#a855f7" sub={`${stats.team.male}M / ${stats.team.female}F`} />
        <StatCard label="Total Inquiries" value={stats.inquiries.total} color="#4f8eff" sub={`${stats.inquiries.new} new`} />
        <StatCard label="Total Blogs" value={stats.blogs.total} color="#22c55e" sub={`${stats.blogs.published} live`} />
        <StatCard label="Testimonials" value={stats.testimonials.total} color="#f59e0b" sub={`${stats.testimonials.approved} approved`} />
        <StatCard label="Feedback" value={stats.feedback.total} color="#06d6a0" sub={`${stats.feedback.pending} pending`} />
        <StatCard label="Services" value={stats.content.services} color="#3b82f6" />
        <StatCard label="Projects" value={stats.content.projects} color="#ef4444" />
        <StatCard label="Work Items" value={stats.content.workItems} color="#f472b6" />
      </div>

      {/* Section 1: Team Members */}
      <div style={{ marginBottom: '28px' }}>
        <SectionTitle>Team Members</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
          <ChartCard title="Team Overview">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ textAlign: 'center', padding: '12px', borderRadius: '8px', background: 'rgba(168,85,247,0.08)' }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#a855f7' }}>{stats.team.total}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Total Members</div>
              </div>
              <div style={{ textAlign: 'center', padding: '12px', borderRadius: '8px', background: 'rgba(59,130,246,0.08)' }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#3b82f6' }}>{stats.team.male}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Male</div>
              </div>
              <div style={{ textAlign: 'center', padding: '12px', borderRadius: '8px', background: 'rgba(244,114,182,0.08)' }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#f472b6' }}>{stats.team.female}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Female</div>
              </div>
              <div style={{ textAlign: 'center', padding: '12px', borderRadius: '8px', background: 'rgba(168,85,247,0.08)' }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#a855f7' }}>{stats.team.other}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Other</div>
              </div>
            </div>
          </ChartCard>
          <ChartCard title="Gender Distribution">
            {teamGenderData.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={teamGenderData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                    {teamGenderData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontFamily: 'var(--font-code)' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'var(--font-code)' }}>No data yet</div>}
          </ChartCard>
          <div className="liquid-glass" style={{ padding: '16px', borderRadius: '12px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', fontFamily: 'var(--font-code)' }}>Other Content</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { label: 'Tech Stack', value: stats.content.techStack, color: '#4f8eff' },
                { label: 'Awards', value: stats.content.awards, color: '#f59e0b' },
                { label: 'Industries', value: stats.content.industries, color: '#06d6a0' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', borderRadius: '6px', background: `${item.color}08` }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{item.label}</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Contact Inquiries */}
      <div style={{ marginBottom: '28px' }}>
        <SectionTitle>Contact Inquiries</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '12px' }}>
          <StatCard label="Total Messages" value={stats.inquiries.total} color="#4f8eff" />
          <StatCard label="New (Unread)" value={stats.inquiries.new} color="#f59e0b" />
          <StatCard label="Replied" value={stats.inquiries.replied} color="#22c55e" />
          <StatCard label="Archived" value={stats.inquiries.archived} color="#94a3b8" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
          <ChartCard title="Inquiry Status">
            {inquiryStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={inquiryStatusData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                    {inquiryStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontFamily: 'var(--font-code)' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'var(--font-code)' }}>No inquiries yet</div>}
          </ChartCard>
          <ChartCard title="Gender Breakdown (Inquiries)">
            {inquiryGenderData.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={inquiryGenderData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                    {inquiryGenderData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontFamily: 'var(--font-code)' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'var(--font-code)' }}>No data yet</div>}
          </ChartCard>
          <ChartCard title="Monthly Inquiries">
            {monthlyInquiriesChart.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={monthlyInquiriesChart}>
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="inquiries" fill="#4f8eff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'var(--font-code)' }}>No data yet</div>}
          </ChartCard>
        </div>
        {(serviceChartData.length > 0 || countryChartData.length > 0) && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px', marginTop: '10px' }}>
            {serviceChartData.length > 0 && (
              <ChartCard title="By Service">
                <ResponsiveContainer width="100%" height={Math.max(120, serviceChartData.length * 32)}>
                  <BarChart data={serviceChartData} layout="vertical">
                    <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} allowDecimals={false} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} width={90} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill="#06d6a0" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            )}
            {countryChartData.length > 0 && (
              <ChartCard title="Top Countries">
                <ResponsiveContainer width="100%" height={Math.max(120, countryChartData.length * 32)}>
                  <BarChart data={countryChartData} layout="vertical">
                    <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} allowDecimals={false} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} width={90} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill="#a855f7" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            )}
          </div>
        )}
      </div>

      {/* Section 3: Blog Management */}
      <div style={{ marginBottom: '28px' }}>
        <SectionTitle>Blog Management</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
          <ChartCard title="Blog Overview">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
              <div style={{ textAlign: 'center', padding: '10px', borderRadius: '8px', background: 'rgba(79,142,255,0.08)' }}>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#4f8eff' }}>{stats.blogs.total}</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Total</div>
              </div>
              <div style={{ textAlign: 'center', padding: '10px', borderRadius: '8px', background: 'rgba(34,197,94,0.08)' }}>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#22c55e' }}>{stats.blogs.published}</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Live</div>
              </div>
              <div style={{ textAlign: 'center', padding: '10px', borderRadius: '8px', background: 'rgba(245,158,11,0.08)' }}>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#f59e0b' }}>{stats.blogs.drafts}</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Drafts</div>
              </div>
            </div>
            {blogStatusData.length > 0 && (
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={blogStatusData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={4} dataKey="value">
                    {blogStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontFamily: 'var(--font-code)' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
          <ChartCard title="Monthly Blog Posts">
            {monthlyBlogsChart.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={monthlyBlogsChart}>
                  <defs>
                    <linearGradient id="blogGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="blogs" stroke="#22c55e" fill="url(#blogGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            ) : <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'var(--font-code)' }}>No blogs yet</div>}
          </ChartCard>
        </div>
      </div>

      {/* Section 4: Testimonials & Feedback */}
      <div style={{ marginBottom: '28px' }}>
        <SectionTitle>Testimonials & Feedback</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <ChartCard title="Testimonials">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ textAlign: 'center', padding: '12px', borderRadius: '8px', background: 'rgba(245,158,11,0.08)' }}>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#f59e0b' }}>{stats.testimonials.total}</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Total</div>
              </div>
              <div style={{ textAlign: 'center', padding: '12px', borderRadius: '8px', background: 'rgba(34,197,94,0.08)' }}>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#22c55e' }}>{stats.testimonials.approved}</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Approved</div>
              </div>
              <div style={{ textAlign: 'center', padding: '12px', borderRadius: '8px', background: 'rgba(245,158,11,0.08)' }}>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#f59e0b' }}>{stats.testimonials.pending}</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Pending</div>
              </div>
              <div style={{ textAlign: 'center', padding: '12px', borderRadius: '8px', background: 'rgba(79,142,255,0.08)' }}>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#4f8eff' }}>{stats.testimonials.total > 0 ? Math.round((stats.testimonials.approved / stats.testimonials.total) * 100) : 0}%</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Approval Rate</div>
              </div>
            </div>
          </ChartCard>
          <ChartCard title="Feedback Submissions">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ textAlign: 'center', padding: '12px', borderRadius: '8px', background: 'rgba(6,214,160,0.08)' }}>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#06d6a0' }}>{stats.feedback.total}</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Total</div>
              </div>
              <div style={{ textAlign: 'center', padding: '12px', borderRadius: '8px', background: 'rgba(34,197,94,0.08)' }}>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#22c55e' }}>{stats.feedback.approved}</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Approved</div>
              </div>
              <div style={{ textAlign: 'center', padding: '12px', borderRadius: '8px', background: 'rgba(245,158,11,0.08)' }}>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#f59e0b' }}>{stats.feedback.pending}</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Pending</div>
              </div>
              <div style={{ textAlign: 'center', padding: '12px', borderRadius: '8px', background: 'rgba(168,85,247,0.08)' }}>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#a855f7' }}>{stats.feedback.total > 0 ? Math.round((stats.feedback.approved / stats.feedback.total) * 100) : 0}%</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>Approval Rate</div>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Section 5: Quick Actions */}
      <div style={{ marginBottom: '28px' }}>
        <SectionTitle>Quick Actions</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px' }}>
          {[
            { label: 'New Blog', path: '/dashboard/editor', color: '#22c55e', icon: <AddIcon sx={{ fontSize: 16 }} /> },
            { label: 'Team Members', path: '/dashboard/cms/team_members', color: '#a855f7', icon: <GroupsIcon sx={{ fontSize: 16 }} /> },
            { label: 'Inquiries', path: '/dashboard/inquiries', color: '#4f8eff', icon: <MailIcon sx={{ fontSize: 16 }} /> },
            { label: 'Services', path: '/dashboard/cms/services', color: '#06d6a0', icon: <ConstructionIcon sx={{ fontSize: 16 }} /> },
            { label: 'Projects', path: '/dashboard/featured-projects', color: '#f59e0b', icon: <WorkIcon sx={{ fontSize: 16 }} /> },
            { label: 'Settings', path: '/dashboard/settings', color: '#94a3b8', icon: <SettingsIcon sx={{ fontSize: 16 }} /> },
          ].map((action, i) => (
            <Link key={i} to={action.path} className="liquid-glass" style={{ padding: '14px', borderRadius: '10px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', borderLeft: `3px solid ${action.color}`, transition: 'transform 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <span style={{ color: action.color }}>{action.icon}</span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text)', fontFamily: 'var(--font-code)' }}>{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
