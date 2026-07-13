export const serviceDetails = {
  'web-development': {
    title: 'Web Development',
    subtitle: 'Crafting Digital Experiences',
    description: 'We build custom websites and web applications that push the boundaries of what\'s possible on the web. From sleek marketing sites to complex SaaS platforms, our team delivers performant, scalable solutions.',
    color: '#4f8eff',
    heroImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
    phases: [
      {
        id: 'discovery',
        title: 'Discovery & Planning',
        description: 'We dive deep into your business goals, analyze competitors, and map out the technical architecture. Every great project starts with thorough research.',
        icon: '🔍',
        code: `// Project Analysis
const requirements = await gatherRequirements();
const architecture = designSystemArchitecture(requirements);
const roadmap = createDevelopmentPlan(architecture);`,
        duration: '1-2 weeks'
      },
      {
        id: 'design',
        title: 'UI/UX Design',
        description: 'Our designers create intuitive, beautiful interfaces. We prototype interactions, test with users, and iterate until every pixel is perfect.',
        icon: '🎨',
        code: `<div class="hero-section">
  <h1 class="gradient-text">Your Vision</h1>
  <p class="animate-fade-in">Built with precision</p>
</div>`,
        duration: '2-3 weeks'
      },
      {
        id: 'development',
        title: 'Development',
        description: 'Clean, maintainable code using modern frameworks. We follow best practices, write tests, and ensure cross-browser compatibility.',
        icon: '💻',
        code: `import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function App() {
  const [data, setData] = useState(null);
  useEffect(() => { fetchData().then(setData); }, []);
  return <Dashboard data={data} />;
}`,
        duration: '4-8 weeks'
      },
      {
        id: 'testing',
        title: 'Testing & QA',
        description: 'Rigorous testing across devices, browsers, and scenarios. We catch bugs before your users do with automated and manual testing.',
        icon: '🧪',
        code: `describe('User Flow', () => {
  it('should complete signup', async () => {
    await page.goto('/signup');
    await page.fill('#email', 'test@example.com');
    await page.click('#submit');
    expect(page.url()).toContain('/dashboard');
  });
});`,
        duration: '1-2 weeks'
      },
      {
        id: 'deployment',
        title: 'Deployment & Launch',
        description: 'Zero-downtime deployments, CDN configuration, performance optimization, and monitoring setup. Your site goes live smoothly.',
        icon: '🚀',
        code: `$ npm run build
✓ Compiled successfully
✓ Static pages generated: 48
✓ Bundle size: 142kb (gzipped)
✓ Lighthouse score: 100/100

Deploying to production...`,
        duration: '1 week'
      },
      {
        id: 'live',
        title: 'Live & Monitoring',
        description: 'Post-launch monitoring, performance tracking, A/B testing, and continuous improvements based on real user data.',
        icon: '📊',
        code: `// Performance Metrics
const metrics = {
  lcp: '1.2s',    // Largest Contentful Paint
  fid: '12ms',    // First Input Delay
  cls: '0.05',    // Cumulative Layout Shift
  ttfb: '180ms'   // Time to First Byte
};`,
        duration: 'Ongoing'
      }
    ],
    technologies: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'Redis'],
    stats: [
      { value: '200+', label: 'Projects Delivered' },
      { value: '99.9%', label: 'Uptime' },
      { value: '<2s', label: 'Load Time' },
      { value: '100', label: 'Lighthouse Score' }
    ]
  },
  'mobile-apps': {
    title: 'Mobile Apps',
    subtitle: 'Native & Cross-Platform',
    description: 'From concept to App Store, we create mobile experiences that users love. Native iOS and Android, or cross-platform with React Native and Flutter.',
    color: '#a855f7',
    heroImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
    phases: [
      { id: 'discovery', title: 'Strategy & Research', description: 'Platform selection, user research, competitive analysis, and feature prioritization for maximum impact.', icon: '📱', code: `// Platform Decision Matrix
const platforms = {
  ios: { users: 45, revenue: 65 },
  android: { users: 55, revenue: 35 }
};`, duration: '1-2 weeks' },
      { id: 'design', title: 'Mobile Design', description: 'Platform-native design patterns, gesture-based interactions, and adaptive layouts for all screen sizes.', icon: '✏️', code: `<SafeAreaView style={styles.container}>
  <ScrollView>
    <Card elevation={2}>
      <Title>Native Experience</Title>
    </Card>
  </ScrollView>
</SafeAreaView>`, duration: '2-3 weeks' },
      { id: 'development', title: 'App Development', description: 'Cross-platform or native development with offline support, push notifications, and smooth animations.', icon: '⚙️', code: `import React, { useEffect } from 'react';
import { Notifications } from 'expo';

export default function App() {
  useEffect(() => {
    registerForPushNotifications();
  }, []);
  return <Navigation />;
}`, duration: '6-10 weeks' },
      { id: 'testing', title: 'Device Testing', description: 'Testing across 50+ devices, OS versions, and network conditions. Automated CI/CD pipelines for reliability.', icon: '🔧', code: `test.run('Login Flow', async () => {
  await device.launchApp();
  await element(by.id('email')).typeText('user@test.com');
  await element(by.id('password')).typeText('pass123');
  await element(by.id('login')).tap();
  await expect(element(by.id('home'))).toBeVisible();
});`, duration: '2 weeks' },
      { id: 'deployment', title: 'App Store Launch', description: 'App Store optimization, review preparation, phased rollouts, and marketing support for launch day.', icon: '🎉', code: `$ eas build --platform ios
✓ Build submitted to App Store Connect
✓ Metadata updated
✓ Screenshots uploaded
Waiting for review...`, duration: '1-2 weeks' },
      { id: 'live', title: 'Growth & Updates', description: 'Analytics-driven improvements, feature updates, A/B testing, and user engagement optimization.', icon: '📈', code: `// User Engagement
const analytics = {
  dailyActive: '45K',
  retention: '68%',
  crashFree: '99.8%',
  avgSession: '8.5min'
};`, duration: 'Ongoing' }
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Expo', 'GraphQL'],
    stats: [{ value: '50+', label: 'Apps Built' }, { value: '10M+', label: 'Downloads' }, { value: '4.8★', label: 'Avg Rating' }, { value: '99.8%', label: 'Crash Free' }]
  },
  'brand-identity': {
    title: 'Brand & Identity',
    subtitle: 'Visual Storytelling',
    description: 'We create visual identity systems that tell your story. From logo design to comprehensive brand guidelines, we build brands that resonate.',
    color: '#f472b6',
    heroImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    phases: [
      { id: 'discovery', title: 'Brand Discovery', description: 'Understanding your mission, values, target audience, and competitive positioning.', icon: '💡', code: `const brandDNA = {
  mission: "Empower creators worldwide",
  values: ["Innovation", "Quality", "Trust"],
  tone: "Professional yet approachable"
};`, duration: '1 week' },
      { id: 'design', title: 'Logo & Visual System', description: 'Logo concepts, color palettes, typography selection, and visual language development.', icon: '🎯', code: `.brand-primary { color: #4F8EFF; }
.brand-secondary { color: #A855F7; }
.font-heading { font-family: 'Space Grotesk'; }
.font-body { font-family: 'Inter'; }`, duration: '2-3 weeks' },
      { id: 'development', title: 'Brand Guidelines', description: 'Comprehensive documentation ensuring consistent brand application across all touchpoints.', icon: '📖', code: `# Brand Guidelines v2.0
## Logo Usage
- Minimum size: 24px height
- Clear space: 1x logo height
- Backgrounds: Light, Dark, Color`, duration: '1-2 weeks' },
      { id: 'testing', title: 'Brand Validation', description: 'Testing brand perception, A/B testing variations, and stakeholder feedback sessions.', icon: '✅', code: `// Brand Recognition Test
const results = {
  recall: 87,
  sentiment: 92,
  differentiation: 85,
  consistency: 94
};`, duration: '1 week' },
      { id: 'deployment', title: 'Asset Delivery', description: 'Final assets in all formats, templates, and digital tools for your team.', icon: '📦', code: `deliverables/
├── logos/
│   ├── primary/
│   ├── secondary/
│   └── favicon/
├── guidelines.pdf
├── templates/
└── social-kit/`, duration: '3 days' },
      { id: 'live', title: 'Brand Evolution', description: 'Ongoing brand monitoring, seasonal updates, and expansion into new touchpoints.', icon: '🌟', code: `// Brand Health Score
const health = {
  awareness: "+23%",
  engagement: "+45%",
  loyalty: "+31%",
  nps: 72
};`, duration: 'Ongoing' }
    ],
    technologies: ['Figma', 'Illustrator', 'After Effects', 'Principle', 'Brandwatch'],
    stats: [{ value: '100+', label: 'Brands Created' }, { value: '95%', label: 'Client Retention' }, { value: '15+', label: 'Design Awards' }, { value: '100%', label: 'Satisfaction' }]
  },
  'ui-ux-design': {
    title: 'UI/UX Design',
    subtitle: 'User-Centered Design',
    description: 'We create intuitive, delightful experiences through research-driven design. Wireframes, prototypes, and design systems that scale.',
    color: '#06d6a0',
    heroImage: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80',
    phases: [
      { id: 'discovery', title: 'User Research', description: 'Interviews, surveys, analytics review, and persona development to understand your users deeply.', icon: '👥', code: `const persona = {
  name: "Sarah, 32",
  role: "Product Manager",
  goals: ["Save time", "Reduce errors"],
  pain: ["Complex workflows", "Slow load"]
};`, duration: '1-2 weeks' },
      { id: 'design', title: 'Wireframing', description: 'Low-fidelity wireframes exploring layout, information hierarchy, and user flows.', icon: '📐', code: `[Header] [Nav] [Search]
┌─────────────────────┐
│  Content Area       │
│  ┌─────┐ ┌─────┐   │
│  │ Card │ │ Card │   │
│  └─────┘ └─────┘   │
└─────────────────────┘
[Footer]`, duration: '1 week' },
      { id: 'development', title: 'Visual Design', description: 'High-fidelity mockups with attention to typography, color, spacing, and micro-interactions.', icon: '🎨', code: `.card {
  background: var(--glass);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  transition: transform 0.3s;
  &:hover { transform: translateY(-4px); }
}`, duration: '2-3 weeks' },
      { id: 'testing', title: 'Usability Testing', description: 'Interactive prototypes tested with real users. Iterating based on feedback and analytics.', icon: '🧪', code: `// Usability Metrics
const metrics = {
  taskSuccess: "94%",
  timeOnTask: "-35%",
  errorRate: "-62%",
  satisfaction: "4.7/5"
};`, duration: '1 week' },
      { id: 'deployment', title: 'Design Handoff', description: 'Specs, assets, and documentation for seamless developer implementation.', icon: '🤝', code: `// Design Tokens
export const tokens = {
  colors: { primary: '#4f8eff' },
  spacing: { sm: '8px', md: '16px' },
  radius: { card: '16px' }
};`, duration: '3 days' },
      { id: 'live', title: 'Design System', description: 'Living design system with components, patterns, and documentation that evolves with your product.', icon: '🧩', code: `<Button variant="primary" size="lg">
  Get Started
</Button>
<Input placeholder="Email" error={false} />
<Card elevation="medium" padding="lg">
  <CardHeader>Title</CardHeader>
</Card>`, duration: 'Ongoing' }
    ],
    technologies: ['Figma', 'Sketch', 'Principle', 'Framer', 'Maze', 'Hotjar'],
    stats: [{ value: '150+', label: 'Projects' }, { value: '94%', label: 'Task Success' }, { value: '-35%', label: 'Time on Task' }, { value: '4.7/5', label: 'Satisfaction' }]
  },
  'cloud-devops': {
    title: 'Cloud & DevOps',
    subtitle: 'Infrastructure at Scale',
    description: 'Scalable, secure cloud infrastructure with automated deployments. From setup to monitoring, we ensure 99.99% uptime.',
    color: '#22d3ee',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
    phases: [
      { id: 'discovery', title: 'Infrastructure Audit', description: 'Assessing current setup, identifying bottlenecks, security gaps, and cost optimization opportunities.', icon: '🔎', code: `# Infrastructure Assessment
Services: 12
Monthly Cost: Optimized
Uptime: 99.2%
Security Score: 78/100`, duration: '3-5 days' },
      { id: 'design', title: 'Architecture Design', description: 'Cloud-native architecture with auto-scaling, redundancy, and disaster recovery planning.', icon: '🏗️', code: `┌─────────┐     ┌─────────┐
│   CDN   │────▶│  Load   │
└─────────┘     │ Balancer│
                └────┬────┘
         ┌───────────┼───────────┐
    ┌────┴────┐ ┌────┴────┐ ┌────┴────┐
    │ Server1 │ │ Server2 │ │ Server3 │
    └─────────┘ └─────────┘ └─────────┘`, duration: '1 week' },
      { id: 'development', title: 'Infrastructure Setup', description: 'Terraform/IaC setup, container orchestration, CI/CD pipelines, and monitoring.', icon: '⚙️', code: `resource "aws_instance" "app" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.medium"
  
  tags = {
    Environment = "production"
    Service     = "api"
  }
}`, duration: '2-3 weeks' },
      { id: 'testing', title: 'Stress Testing', description: 'Load testing, failover testing, security audits, and performance benchmarking.', icon: '📊', code: `// Load Test Results
const results = {
  concurrent: 10000,
  responseTime: '45ms',
  errorRate: '0.01%',
  throughput: '5000 req/s'
};`, duration: '1 week' },
      { id: 'deployment', title: 'Production Deploy', description: 'Zero-downtime migration, blue-green deployment, and rollback procedures.', icon: '🚀', code: `$ kubectl apply -f production/
deployment.apps/api configured
service/api configured
✓ Rolling update complete
✓ All pods healthy`, duration: '3-5 days' },
      { id: 'live', title: 'Monitoring & Ops', description: '24/7 monitoring, automated alerts, incident response, and continuous optimization.', icon: '🛡️', code: `Alert: All Systems Normal
Uptime: 99.99%
Avg Response: 42ms
Active Users: 15,234
Status: Optimized`, duration: 'Ongoing' }
    ],
    technologies: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Datadog'],
    stats: [{ value: '99.99%', label: 'Uptime' }, { value: '40%', label: 'Cost Reduction' }, { value: '<50ms', label: 'Response Time' }, { value: '0', label: 'Security Incidents' }]
  },
  'ai-machine-learning': {
    title: 'AI & Machine Learning',
    subtitle: 'Intelligent Solutions',
    description: 'From recommendation engines to computer vision, we build AI-powered features that give your product a competitive edge.',
    color: '#fbbf24',
    heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
    phases: [
      { id: 'discovery', title: 'AI Strategy', description: 'Identifying high-impact AI opportunities, data requirements, and success metrics.', icon: '🧠', code: `const aiStrategy = {
  opportunities: [
    "Personalization Engine",
    "Fraud Detection",
    "Content Moderation"
  ],
  roi: "3.2x projected"
};`, duration: '1-2 weeks' },
      { id: 'design', title: 'Data Pipeline', description: 'Data collection, cleaning, feature engineering, and model training infrastructure.', icon: '🔄', code: `Raw Data → Clean → Features → Train → Validate
   │          │        │         │        │
   ▼          ▼        ▼         ▼        ▼
 100GB     85GB    2,400     v2.3     94.2%
                      features  trained  accuracy`, duration: '2-3 weeks' },
      { id: 'development', title: 'Model Development', description: 'Custom model training, fine-tuning, and optimization for your specific use case.', icon: '🔬', code: `import tensorflow as tf
from transformers import AutoModel

model = AutoModel.from_pretrained('bert-base')
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)`, duration: '3-5 weeks' },
      { id: 'testing', title: 'Model Evaluation', description: 'Accuracy testing, bias detection, performance benchmarking, and A/B test setup.', icon: '📏', code: `// Model Metrics
{
  accuracy: 0.942,
  precision: 0.938,
  recall: 0.951,
  f1Score: 0.944,
  latency: 23
}`, duration: '1-2 weeks' },
      { id: 'deployment', title: 'API Deployment', description: 'Model serving infrastructure, auto-scaling, versioning, and monitoring.', icon: '🌐', code: `$ curl -X POST /api/predict \\
  -d '{"text": "Great product!"}' \\
  → {"sentiment": "positive", "score": 0.97}`, duration: '1 week' },
      { id: 'live', title: 'Continuous Learning', description: 'Model monitoring, retraining pipelines, and performance optimization over time.', icon: '📈', code: `// Model Performance Over Time
Week 1: 92.1% → Week 4: 94.2%
Retraining triggered: accuracy dropped 0.5%
New data: 50K samples added`, duration: 'Ongoing' }
    ],
    technologies: ['TensorFlow', 'PyTorch', 'Hugging Face', 'OpenAI', 'AWS SageMaker', 'MLOps'],
    stats: [{ value: '94%', label: 'Accuracy' }, { value: '<25ms', label: 'Inference Time' }, { value: '50M+', label: 'Predictions/Day' }, { value: '50%', label: 'Cost Savings' }]
  }
}
