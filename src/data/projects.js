import sumanImg from '../assets/images/Suman.jpeg'
import sahilImg from '../assets/images/Shahil.jpeg'

export const projects = [
  { id: 1, title: 'Nebula Analytics', subtitle: 'SaaS Dashboard', description: 'AI-powered analytics platform with real-time data visualization and predictive insights for enterprise clients.', year: '2024', color: '#4f8eff', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', tags: ['React', 'D3.js', 'ML'], category: 'web', client: 'DataCorp' },
  { id: 2, title: 'Quantum Finance', subtitle: 'Fintech App', description: 'Next-gen banking experience with biometric auth and instant transfers across 180+ countries.', year: '2024', color: '#a855f7', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80', tags: ['React Native', 'Node.js', 'Blockchain'], category: 'mobile', client: 'FinSecure' },
  { id: 3, title: 'Echo Social', subtitle: 'Social Platform', description: 'Community-driven platform with real-time collaboration and AR experiences for 2M+ users.', year: '2024', color: '#06d6a0', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80', tags: ['Next.js', 'WebRTC', 'Three.js'], category: 'web', client: 'Echo Inc' },
  { id: 4, title: 'Prism Studio', subtitle: 'Creative Tool', description: 'Browser-based 3D modeling tool with collaborative editing capabilities and GPU rendering.', year: '2023', color: '#f472b6', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80', tags: ['WebGL', 'Web Workers', 'WASM'], category: 'web', client: 'Prism Labs' },
  { id: 5, title: 'Atlas Navigation', subtitle: 'Navigation App', description: 'Offline-first navigation with terrain mapping and weather integration for adventure seekers.', year: '2023', color: '#fbbf24', image: 'https://images.unsplash.com/photo-1519066629768-8ffcb8f06079?w=800&q=80', tags: ['Flutter', 'Maps API', 'Offline'], category: 'mobile', client: 'Atlas Co' },
  { id: 6, title: 'Vortex Gaming', subtitle: 'Gaming Platform', description: 'Cloud gaming platform with low-latency streaming and social features for 500K+ gamers.', year: '2023', color: '#ef4444', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80', tags: ['WebRTC', 'WebGPU', 'WebSocket'], category: 'web', client: 'Vortex Games' },
  { id: 7, title: 'Pulse Health', subtitle: 'Healthcare Platform', description: 'HIPAA-compliant telemedicine platform connecting patients with 10K+ doctors worldwide.', year: '2024', color: '#22d3ee', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80', tags: ['React', 'WebRTC', 'HIPAA'], category: 'web', client: 'PulseMed' },
  { id: 8, title: 'Bloom E-Commerce', subtitle: 'Online Store', description: 'Multi-vendor marketplace with AI recommendations processing high-volume annual transactions.', year: '2024', color: '#10b981', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80', tags: ['Next.js', 'Stripe', 'PostgreSQL'], category: 'web', client: 'Bloom Corp' },
]

export const services = [
  { id: 1, title: 'Web Development', description: 'Custom websites and web applications built with cutting-edge technology for optimal performance.', icon: 'web', color: '#4f8eff', features: ['React/Next.js', 'Node.js', 'TypeScript', 'GraphQL'] },
  { id: 2, title: 'Mobile Apps', description: 'Native and cross-platform mobile applications for iOS and Android with seamless UX.', icon: 'mobile', color: '#a855f7', features: ['React Native', 'Flutter', 'Swift', 'Kotlin'] },
  { id: 3, title: 'Brand & Identity', description: 'Visual identity systems that communicate your brand story and resonate with your audience.', icon: 'brand', color: '#f472b6', features: ['Logo Design', 'Brand Guidelines', 'Motion Design', 'Typography'] },
  { id: 4, title: 'UI/UX Design', description: 'User-centered design that creates intuitive and delightful digital experiences.', icon: 'design', color: '#06d6a0', features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'] },
  { id: 5, title: 'Cloud & DevOps', description: 'Scalable cloud infrastructure and CI/CD pipelines for reliable deployments.', icon: 'cloud', color: '#22d3ee', features: ['AWS/GCP', 'Docker', 'Kubernetes', 'Terraform'] },
  { id: 6, title: 'AI & Machine Learning', description: 'Intelligent solutions powered by cutting-edge AI and ML technologies.', icon: 'ai', color: '#fbbf24', features: ['NLP', 'Computer Vision', 'Predictive Analytics', 'LLM Integration'] },
]

export const solutions = [
  { id: 1, title: 'E-Commerce Platform', description: 'Full-stack e-commerce solution with payment integration, inventory management, and analytics.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80', technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'], features: ['Multi-vendor support', 'Real-time inventory', 'AI recommendations', 'Global payments'] },
  { id: 2, title: 'Healthcare Portal', description: 'HIPAA-compliant healthcare platform with telemedicine and patient management.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', technologies: ['React', 'Node.js', 'MongoDB', 'WebRTC'], features: ['Video consultations', 'EHR integration', 'Appointment scheduling', 'Prescription management'] },
  { id: 3, title: 'Real Estate Platform', description: 'Immersive property listing platform with virtual tours and mortgage calculator.', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80', technologies: ['Vue.js', 'Three.js', 'Firebase', 'Maps API'], features: ['3D virtual tours', 'Neighborhood insights', 'Mortgage tools', 'Agent matching'] },
  { id: 4, title: 'Learning Management', description: 'Interactive LMS with live classes, progress tracking, and certification engine.', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80', technologies: ['React', 'Django', 'PostgreSQL', 'WebRTC'], features: ['Live streaming', 'Interactive quizzes', 'Progress analytics', 'Certification engine'] },
  { id: 5, title: 'Logistics Tracker', description: 'Real-time fleet management and delivery tracking system for logistics companies.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80', technologies: ['React', 'Go', 'TimescaleDB', 'MQTT'], features: ['Live GPS tracking', 'Route optimization', 'Driver management', 'Analytics dashboard'] },
]

export const team = [
  { id: 1, name: 'Suman Kumar Sah', role: 'Founder', image: sumanImg, bio: 'Visionary founder leading Technoziant with a mission to deliver world-class technology solutions.' },
  { id: 2, name: 'Shahil Kumar Sharma', role: 'Co-founder & CEO', image: sahilImg, bio: 'Chief Executive Officer driving the company\'s vision and growth strategy.' },
  { id: 3, name: 'Ronny', role: 'CTO', image: 'https://ui-avatars.com/api/?name=Ronny&background=06d6a0&color=fff&size=400&bold=true', bio: 'Chief Technology Officer overseeing all technical operations and system architecture.' },
  { id: 4, name: 'Avnish', role: 'CMO', image: 'https://ui-avatars.com/api/?name=Avnish&background=f472b6&color=fff&size=400&bold=true', bio: 'Chief Marketing Officer driving brand strategy and digital marketing initiatives.' },
]

export const awards = [
  { year: '2024-2026', name: 'FWA Site of the Day', count: 12, icon: '🏆', description: 'Recognized for exceptional web design and innovation' },
  { year: '2024-2026', name: 'Awwwards SOTD', count: 18, icon: '🥇', description: 'Awarded for outstanding digital experiences' },
  { year: '2024-2026', name: 'Webby Awards', count: 8, icon: '⭐', description: 'International awards for web excellence' },
  { year: '2023-2026', name: 'CSS Design Awards', count: 24, icon: '🎨', description: 'Best CSS design and creative development' },
  { year: '2023-2026', name: 'Red Dot Design', count: 5, icon: '🔴', description: 'Product design and communication design' },
  { year: '2023-2026', name: 'IF Design Award', count: 9, icon: '💎', description: 'International forum for design excellence' },
  { year: '2024-2026', name: 'Good Design Award', count: 6, icon: '🏅', description: 'Innovation and design quality recognition' },
  { year: '2024-2026', name: 'German Design Award', count: 4, icon: '🎯', description: 'International design competition winner' },
]

export const testimonials = [
  { id: 1, quote: 'They transformed our digital presence completely. The attention to detail and innovative approach exceeded all expectations.', author: 'David Park', company: 'TechVision CEO', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80' },
  { id: 2, quote: 'Working with this team was an absolute pleasure. They delivered a product that truly represents our brand.', author: 'Emma Roberts', company: 'StyleHub Founder', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80' },
  { id: 3, quote: 'The performance and design quality is unmatched. Our users love the new experience.', author: 'James Liu', company: 'FinanceApp CTO', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80' },
]

export const processSteps = [
  { step: '01', title: 'Discovery', description: 'We dive deep into your business goals, target audience, and competitive landscape to define the project strategy.', icon: '🔍' },
  { step: '02', title: 'Strategy', description: 'Creating a comprehensive roadmap with clear milestones, timelines, and technical architecture decisions.', icon: '📋' },
  { step: '03', title: 'Design', description: 'Crafting beautiful, intuitive interfaces through iterative prototyping and user testing.', icon: '🎨' },
  { step: '04', title: 'Development', description: 'Building robust, scalable solutions with clean code and modern best practices.', icon: '⚡' },
  { step: '05', title: 'Launch', description: 'Deploying your project with optimized performance, security, and monitoring in place.', icon: '🚀' },
  { step: '06', title: 'Support', description: 'Ongoing maintenance, updates, and optimization to ensure continued success.', icon: '🛡️' },
]

export const faqData = [
  { question: 'How long does a typical project take?', answer: 'Project timelines vary based on scope and complexity. A standard website takes 6-10 weeks, while complex web applications can take 3-6 months. We provide detailed timelines during our discovery phase.' },
  { question: 'Do you work with startups?', answer: 'Absolutely! We work with companies of all sizes, from early-stage startups to Fortune 500 enterprises. We have experience adapting our process to different requirements and timelines.' },
  { question: 'What technologies do you specialize in?', answer: 'We specialize in React, Next.js, React Native, Flutter, Node.js, and cloud technologies. Our team stays current with the latest frameworks and tools to deliver optimal solutions.' },
  { question: 'Do you provide ongoing support?', answer: 'Yes, we offer comprehensive support and maintenance packages. This includes bug fixes, performance monitoring, security updates, and feature enhancements as needed.' },
]
