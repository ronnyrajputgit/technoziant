import { useLocation, Route, Routes as RouterRoutes, useParams } from 'react-router-dom'
import { Home } from '../../pages/Home'
import { About } from '../../pages/About'
import { Services } from '../../pages/Services'
import { Contact } from '../../pages/Contact'
import { Work } from '../../pages/Work'
import { Solutions } from '../../pages/Solutions'
import { Process } from '../../pages/Process'
import { FAQ } from '../../pages/FAQ'
import { Careers } from '../../pages/Careers'
import { Leaders } from '../../pages/Leaders'
import { Blog } from '../../pages/Blog'
import { BlogPost } from '../../pages/BlogPost'
import { ServiceDetail } from '../../pages/ServiceDetail'
import { SolutionDetail } from '../../pages/SolutionDetail'
import { ProcessDetail } from '../../pages/ProcessDetail'
import { Login } from '../../pages/Login'
import { Dashboard, DashboardLayout } from '../../pages/dashboard/Dashboard'
import { EditorPage } from '../../pages/dashboard/EditorPage'
import { CMSPage } from '../../pages/dashboard/CMSPage'
import { FeaturedProjectsPage } from '../../pages/dashboard/FeaturedProjectsPage'
import { TestimonialsPage } from '../../pages/dashboard/TestimonialsPage'
import { FeedbackPage } from '../../pages/dashboard/FeedbackPage'
import { SettingsPage } from '../../pages/dashboard/SettingsPage'
import { HeaderSettingsPage } from '../../pages/dashboard/HeaderSettingsPage'
import { ContactSettingsPage } from '../../pages/dashboard/ContactSettingsPage'
import { FooterSettingsPage } from '../../pages/dashboard/FooterSettingsPage'
import { DatabaseConnectionsPage } from '../../pages/dashboard/DatabaseConnectionsPage'
import { InquiriesPage } from '../../pages/dashboard/InquiriesPage'
import { FeedbackForm } from '../../pages/FeedbackForm'

function CMSRoute() {
  const { table } = useParams()
  return <CMSPage table={table} />
}

export function Routes() {
  const location = useLocation()
  return (
    <RouterRoutes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/work" element={<Work />} />
      <Route path="/about" element={<About />} />
      <Route path="/leaders" element={<Leaders />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/solutions" element={<Solutions />} />
      <Route path="/solutions/:slug" element={<SolutionDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/process" element={<Process />} />
      <Route path="/process/:slug" element={<ProcessDetail />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/feedback" element={<FeedbackForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/editor" element={<EditorPage />} />
      <Route path="/dashboard/editor/:id" element={<EditorPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="cms/:table" element={<CMSRoute />} />
        <Route path="featured-projects" element={<FeaturedProjectsPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="feedback" element={<TestimonialsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="header" element={<HeaderSettingsPage />} />
        <Route path="contact-settings" element={<ContactSettingsPage />} />
        <Route path="footer-links" element={<FooterSettingsPage />} />
        <Route path="db-connections" element={<DatabaseConnectionsPage />} />
        <Route path="inquiries" element={<InquiriesPage />} />
      </Route>
      <Route path="*" element={<Home />} />
    </RouterRoutes>
  )
}
