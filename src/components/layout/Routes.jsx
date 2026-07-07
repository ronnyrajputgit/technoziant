import { useLocation, Route, Routes as RouterRoutes } from 'react-router-dom'
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
import { ServiceDetail } from '../../pages/ServiceDetail'
import { SolutionDetail } from '../../pages/SolutionDetail'
import { ProcessDetail } from '../../pages/ProcessDetail'

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
    </RouterRoutes>
  )
}
