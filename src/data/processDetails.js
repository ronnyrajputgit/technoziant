export const processDetails = {
  discovery: {
    title: 'Discovery',
    subtitle: 'Understanding Your Vision',
    description: 'We dive deep into your business, users, and market to uncover insights that shape the entire project. No detail is too small.',
    color: '#4f8eff',
    icon: '🔍',
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    activities: [
      { title: 'Stakeholder Interviews', description: 'One-on-one sessions with key stakeholders to understand goals, constraints, and vision.', icon: '🗣️', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80' },
      { title: 'User Research', description: 'Interviews, surveys, and observation sessions to understand user needs and pain points.', icon: '👥', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80' },
      { title: 'Competitor Analysis', description: 'Deep dive into competitor products, features, positioning, and market gaps.', icon: '📊', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80' },
      { title: 'Technical Audit', description: 'Assessment of existing systems, tech debt, and integration requirements.', icon: '🔧', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80' },
      { title: 'Market Research', description: 'Industry trends, user demographics, and opportunity sizing.', icon: '📈', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80' },
      { title: 'Insight Synthesis', description: 'Transforming raw data into actionable insights and strategic recommendations.', icon: '💡', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80' }
    ],
    deliverables: ['User Personas', 'Journey Maps', 'Competitor Matrix', 'Technical Specification', 'Project Roadmap'],
    tools: ['Miro', 'Notion', 'UserTesting', 'Hotjar', 'SEMrush']
  },
  strategy: {
    title: 'Strategy',
    subtitle: 'Mapping the Path Forward',
    description: 'Creating a comprehensive roadmap that aligns business goals with user needs and technical possibilities.',
    color: '#a855f7',
    icon: '📋',
    heroImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80',
    activities: [
      { title: 'Goal Setting', description: 'Defining SMART goals, KPIs, and success metrics for the project.', icon: '🎯', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&q=80' },
      { title: 'Feature Prioritization', description: 'MoSCoW analysis, impact vs effort mapping, and MVP definition.', icon: '📝', image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80' },
      { title: 'Architecture Planning', description: 'System architecture, API design, database schema, and infrastructure planning.', icon: '🏗️', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80' },
      { title: 'Timeline Creation', description: 'Sprint planning, milestone definitions, and resource allocation.', icon: '📅', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&q=80' },
      { title: 'Risk Assessment', description: 'Identifying potential risks, mitigation strategies, and contingency plans.', icon: '⚠️', image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=80' },
      { title: 'Resource Planning', description: 'Team allocation, skill mapping, and resource optimization.', icon: '💰', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80' }
    ],
    deliverables: ['Project Roadmap', 'Technical Architecture', 'Sprint Plan', 'Risk Register', 'Resource Plan'],
    tools: ['Jira', 'Confluence', 'Lucidchart', 'Figma', 'GitHub']
  },
  design: {
    title: 'Design',
    subtitle: 'Crafting Beautiful Experiences',
    description: 'From wireframes to high-fidelity prototypes, we create intuitive, beautiful interfaces that users love.',
    color: '#f472b6',
    icon: '🎨',
    heroImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    activities: [
      { title: 'Wireframing', description: 'Low-fidelity wireframes exploring layout, flow, and information hierarchy.', icon: '📐', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=80' },
      { title: 'Visual Design', description: 'High-fidelity mockups with brand integration, typography, and color systems.', icon: '🎨', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80' },
      { title: 'Interaction Design', description: 'Micro-interactions, animations, and transition design for delightful UX.', icon: '✨', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80' },
      { title: 'Prototyping', description: 'Interactive prototypes for testing and stakeholder presentation.', icon: '🖱️', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=80' },
      { title: 'Design System', description: 'Component library, design tokens, and documentation for consistency.', icon: '🧩', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80' },
      { title: 'User Testing', description: 'Usability testing with real users, gathering feedback, and iterating.', icon: '🧪', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80' }
    ],
    deliverables: ['Wireframes', 'UI Mockups', 'Interactive Prototype', 'Design System', 'Style Guide'],
    tools: ['Figma', 'Framer', 'Principle', 'Maze', 'Storybook']
  },
  development: {
    title: 'Development',
    subtitle: 'Building with Precision',
    description: 'Clean, maintainable code using modern frameworks and best practices. We build for scale, performance, and reliability.',
    color: '#06d6a0',
    icon: '⚡',
    heroImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
    activities: [
      { title: 'Frontend Development', description: 'React/Next.js with TypeScript, responsive design, and smooth animations.', icon: '⚛️', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80' },
      { title: 'Backend Development', description: 'Node.js/Go APIs with authentication, validation, and business logic.', icon: '🖥️', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80' },
      { title: 'Database Design', description: 'PostgreSQL/MongoDB schemas, migrations, and optimization.', icon: '🗄️', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&q=80' },
      { title: 'API Integration', description: 'Third-party APIs, webhooks, and real-time data synchronization.', icon: '🔌', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80' },
      { title: 'Code Review', description: 'Peer reviews, static analysis, and quality gates for code excellence.', icon: '👀', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80' },
      { title: 'CI/CD Pipeline', description: 'Automated testing, building, and deployment infrastructure.', icon: '🔄', image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&q=80' }
    ],
    deliverables: ['Source Code', 'API Documentation', 'Database Schemas', 'CI/CD Pipeline', 'Deployment Scripts'],
    tools: ['VS Code', 'Git', 'Docker', 'GitHub Actions', 'Vercel']
  },
  launch: {
    title: 'Launch',
    subtitle: 'Going Live with Confidence',
    description: 'Zero-downtime deployments, thorough testing, and launch-day support ensure a smooth go-live.',
    color: '#fbbf24',
    icon: '🚀',
    heroImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80',
    activities: [
      { title: 'Pre-Launch Audit', description: 'Final security scan, performance audit, and accessibility check.', icon: '🔍', image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=80' },
      { title: 'Load Testing', description: 'Stress testing with 10x expected traffic to ensure reliability.', icon: '📈', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80' },
      { title: 'Migration', description: 'Data migration, DNS setup, and SSL configuration.', icon: '🔄', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80' },
      { title: 'Go-Live', description: 'Phased rollout with monitoring and instant rollback capability.', icon: '🚀', image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=80' },
      { title: 'Monitoring Setup', description: 'APM, error tracking, uptime monitoring, and alert configuration.', icon: '📊', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80' },
      { title: 'Launch Support', description: '24/7 support team monitoring for the first 72 hours post-launch.', icon: '🛡️', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80' }
    ],
    deliverables: ['Launch Checklist', 'Performance Report', 'Security Audit', 'Monitoring Dashboard', 'Runbook'],
    tools: ['Datadog', 'Sentry', 'Cloudflare', 'AWS', 'PagerDuty']
  },
  support: {
    title: 'Support',
    subtitle: 'Always By Your Side',
    description: 'Post-launch support through multiple channels - AI chatbots, human agents, and dedicated account managers.',
    color: '#22d3ee',
    icon: '🛡️',
    heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80',
    channels: [
      { title: 'AI Chatbot', description: '24/7 instant responses powered by GPT-4 with knowledge base integration.', icon: '🤖', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80', availability: '24/7', responseTime: '< 5 seconds' },
      { title: 'AI Assistant', description: 'Context-aware AI that learns from your project history for personalized help.', icon: '🧠', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80', availability: '24/7', responseTime: '< 10 seconds' },
      { title: 'Human Agents', description: 'Expert support agents for complex issues requiring human judgment.', icon: '👨‍💻', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80', availability: '24/7', responseTime: '< 2 hours' },
      { title: 'Call Support', description: 'Phone support for urgent issues and critical system problems.', icon: '📞', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80', availability: '9AM-9PM', responseTime: 'Immediate' },
      { title: 'Email Support', description: 'Detailed email support with ticket tracking and SLA guarantees.', icon: '✉️', image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&q=80', availability: '24/7', responseTime: '< 4 hours' },
      { title: 'Video Consultation', description: 'Screen sharing and video calls for complex troubleshooting and training.', icon: '📹', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80', availability: 'By Appointment', responseTime: 'Scheduled' }
    ],
    plans: [
      { name: 'Starter', price: 'Contact Us', features: ['AI Chatbot', 'Email Support', '8-hour Response SLA', 'Monthly Report'], color: '#4f8eff' },
      { name: 'Professional', price: 'Contact Us', features: ['AI Chatbot + Assistant', 'Human Agents', '4-hour Response SLA', 'Weekly Report', 'Dedicated Manager'], color: '#a855f7' },
      { name: 'Enterprise', price: 'Custom', features: ['All Channels', 'Phone Support', '1-hour Response SLA', 'Real-time Dashboard', 'On-site Support', 'Custom SLA'], color: '#06d6a0' }
    ],
    metrics: [
      { value: '98%', label: 'Resolution Rate', icon: '✅' },
      { value: '< 5s', label: 'AI Response Time', icon: '⚡' },
      { value: '24/7', label: 'Availability', icon: '🕐' },
      { value: '4.9/5', label: 'Satisfaction', icon: '⭐' }
    ]
  }
}
