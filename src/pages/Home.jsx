import { Hero } from '../components/sections/Hero'
import { FeaturedProjects } from '../components/sections/FeaturedProjects'
import { ServicesGrid } from '../components/sections/ServicesGrid'
import { TechStack } from '../components/sections/TechStack'
import { Testimonials } from '../components/sections/Testimonials'
import { CTA } from '../components/sections/CTA'
import { Footer } from '../components/layout/Footer'

export function Home() {
  return (<main><Hero /><FeaturedProjects /><ServicesGrid /><TechStack /><Testimonials /><CTA /><Footer /></main>)
}
