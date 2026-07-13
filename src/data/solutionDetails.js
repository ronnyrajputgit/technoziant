export const solutionDetails = {
  'e-commerce-platform': {
    title: 'E-Commerce Platform',
    subtitle: 'Multi-Vendor Marketplace',
    color: '#4f8eff',
    heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    tagline: 'Powering high-volume transactions across 500+ vendors',
    problems: [
      { title: 'Fragmented Inventory', description: 'Vendors managing inventory across multiple platforms leading to overselling and stockouts.', icon: '📦', impact: '35% revenue loss' },
      { title: 'Payment Complexity', description: 'Handling multiple payment methods, currencies, and vendor splits was a nightmare.', icon: '💳', impact: '28% cart abandonment' },
      { title: 'Poor Discovery', description: 'Users couldn\'t find products. Search was slow and recommendations were irrelevant.', icon: '🔍', impact: '45% bounce rate' },
      { title: 'Scale Limitations', description: 'Monolithic architecture couldn\'t handle traffic spikes during sales events.', icon: '📈', impact: 'Site crashes during Black Friday' }
    ],
    solutions: [
      { title: 'Unified Inventory System', description: 'Real-time inventory sync across all vendors with automated restocking alerts and multi-warehouse support.', tech: ['Redis', 'WebSocket', 'PostgreSQL'], result: 'Zero overselling incidents' },
      { title: 'Smart Payment Engine', description: 'Multi-currency support with automatic vendor splits, escrow, and instant payouts.', tech: ['Stripe Connect', 'Node.js', 'Redis'], result: '60% faster settlements' },
      { title: 'AI-Powered Search', description: 'Vector-based search with semantic understanding, visual search, and personalized recommendations.', tech: ['Elasticsearch', 'TensorFlow', 'React'], result: '3x conversion rate increase' },
      { title: 'Microservices Architecture', description: 'Event-driven microservices with auto-scaling handles 100K concurrent users effortlessly.', tech: ['Kubernetes', 'Kafka', 'Go'], result: '99.99% uptime achieved' }
    ],
    phases: [
      { week: '1-2', title: 'Discovery', items: ['Vendor interviews', 'User research', 'Competitor analysis', 'Technical audit'], color: '#4f8eff' },
      { week: '3-4', title: 'Architecture', items: ['Microservices design', 'API contracts', 'Database schema', 'Infrastructure plan'], color: '#a855f7' },
      { week: '5-8', title: 'Core Build', items: ['Vendor dashboard', 'Product management', 'Cart & checkout', 'Payment integration'], color: '#06d6a0' },
      { week: '9-10', title: 'AI Features', items: ['Search engine', 'Recommendation engine', 'Fraud detection', 'Price optimization'], color: '#fbbf24' },
      { week: '11-12', title: 'Testing', items: ['Load testing (100K users)', 'Security audit', 'Payment testing', 'UAT with vendors'], color: '#f472b6' },
      { week: '13', title: 'Launch', items: ['Phased rollout', 'Monitoring setup', 'Vendor onboarding', '24/7 support'], color: '#22d3ee' }
    ],
    metrics: [
      { before: '35%', after: '0%', label: 'Overselling Rate', icon: '📦' },
      { before: 'Low', after: 'High', label: 'Annual GMV', icon: '💰' },
      { before: '45%', after: '12%', label: 'Bounce Rate', icon: '📉' },
      { before: '10K', after: '100K+', label: 'Concurrent Users', icon: '👥' }
    ],
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Kubernetes', 'Stripe Connect', 'TensorFlow', 'Kafka', 'Go']
  },
  'healthcare-portal': {
    title: 'Healthcare Portal',
    subtitle: 'HIPAA-Compliant Platform',
    color: '#06d6a0',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    tagline: 'Connecting 10,000+ doctors with patients across 50 states',
    problems: [
      { title: 'Access Barriers', description: 'Patients in rural areas waiting 3+ weeks for specialist appointments.', icon: '🏥', impact: '60% miss early diagnosis' },
      { title: 'Paper Records', description: 'Fragmented medical records across providers leading to medical errors.', icon: '📋', impact: '250K medical errors/year' },
      { title: 'No Telemedicine', description: 'COVID exposed the lack of remote consultation infrastructure.', icon: '💻', impact: '70% patients want remote care' },
      { title: 'Compliance Burden', description: 'HIPAA compliance was manual, expensive, and error-prone.', icon: '🔒', impact: 'High risk exposure' }
    ],
    solutions: [
      { title: 'Telemedicine Engine', description: 'HD video consultations with real-time vitals sharing, screen sharing, and prescription generation.', tech: ['WebRTC', 'React', 'Node.js'], result: '500K consultations/month' },
      { title: 'Unified Health Records', description: 'FHIR-compliant patient records accessible across providers with patient-controlled sharing.', tech: ['FHIR API', 'PostgreSQL', 'Encryption'], result: 'Zero medical record errors' },
      { title: 'AI Triage System', description: 'ML-powered symptom assessment routing patients to appropriate care levels.', tech: ['TensorFlow', 'NLP', 'Python'], result: '40% reduction in ER visits' },
      { title: 'Compliance Automation', description: 'Automated HIPAA compliance monitoring, auditing, and reporting.', tech: ['AWS GovCloud', 'Terraform', 'SIEM'], result: '100% compliance score' }
    ],
    phases: [
      { week: '1-3', title: 'Compliance First', items: ['HIPAA requirements', 'BAA agreements', 'Security architecture', 'Data classification'], color: '#06d6a0' },
      { week: '4-6', title: 'Core Platform', items: ['Patient portal', 'Doctor dashboard', 'Appointment system', 'EHR integration'], color: '#4f8eff' },
      { week: '7-9', title: 'Telemedicine', items: ['Video infrastructure', 'Vitals integration', 'Screen sharing', 'Prescription engine'], color: '#a855f7' },
      { week: '10-11', title: 'AI Features', items: ['Symptom checker', 'Triage algorithm', 'Follow-up reminders', 'Health insights'], color: '#fbbf24' },
      { week: '12', title: 'Security Audit', items: ['Penetration testing', 'HIPAA audit', 'Load testing', 'Compliance certification'], color: '#f472b6' },
      { week: '13-14', title: 'Rollout', items: ['Pilot with 100 doctors', 'Feedback iteration', 'Full deployment', 'Training programs'], color: '#22d3ee' }
    ],
    metrics: [
      { before: '3 weeks', after: '24 hours', label: 'Wait Time', icon: '⏰' },
      { before: '250K', after: '0', label: 'Record Errors', icon: '📋' },
      { before: '0%', after: '85%', label: 'Telemedicine Adoption', icon: '💻' },
      { before: '78%', after: '100%', label: 'HIPAA Compliance', icon: '🔒' }
    ],
    techStack: ['React', 'Node.js', 'WebRTC', 'PostgreSQL', 'FHIR API', 'TensorFlow', 'AWS GovCloud', 'Redis', 'Docker']
  },
  'real-estate-platform': {
    title: 'Real Estate Platform',
    subtitle: 'Immersive Property Discovery',
    color: '#a855f7',
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
    tagline: 'Virtual tours closing deals 3x faster than traditional listings',
    problems: [
      { title: 'Static Listings', description: '2D photos don\'t convey space. Buyers waste time visiting unsuitable properties.', icon: '🏠', impact: '80% mismatch rate' },
      { title: 'Complex Financing', description: 'Mortgage calculations scattered across multiple tools and lenders.', icon: '🏦', impact: '40% abandon financing' },
      { title: 'Neighborhood Blindness', description: 'No way to assess neighborhoods - schools, safety, amenities.', icon: '📍', impact: '35% buyer regret' },
      { title: 'Slow Transactions', description: 'Paper-based process taking 60+ days from offer to close.', icon: '📝', impact: '25% deals fall through' }
    ],
    solutions: [
      { title: '3D Virtual Tours', description: 'WebGL-powered walkthroughs with measurement tools, furniture placement, and day/night views.', tech: ['Three.js', 'WebGL', 'React'], result: '3x faster sales cycles' },
      { title: 'Smart Mortgage Calculator', description: 'Real-time rate comparisons, pre-approval integration, and affordability analysis.', tech: ['React', 'Plaid API', 'PostgreSQL'], result: '60% complete financing online' },
      { title: 'Neighborhood Intelligence', description: 'AI-powered area scoring with crime stats, school ratings, commute times, and amenities.', tech: ['Maps API', 'ML', 'Firebase'], result: '90% satisfaction rate' },
      { title: 'Digital Transaction Hub', description: 'E-signatures, document management, and timeline tracking for seamless closings.', tech: ['DocuSign API', 'Node.js', 'Redis'], result: '30-day average close time' }
    ],
    phases: [
      { week: '1-2', title: 'Market Research', items: ['Buyer personas', 'Agent interviews', 'Competitor teardown', 'Feature prioritization'], color: '#a855f7' },
      { week: '3-4', title: '3D Engine', items: ['Virtual tour framework', 'Measurement tools', 'Furniture placement', 'Lighting engine'], color: '#4f8eff' },
      { week: '5-7', title: 'Platform Core', items: ['Property listings', 'Search & filters', 'Agent dashboard', 'Saved searches'], color: '#06d6a0' },
      { week: '8-9', title: 'Integrations', items: ['MLS data feed', 'Mortgage APIs', 'E-signature workflow', 'Calendar sync'], color: '#fbbf24' },
      { week: '10-11', title: 'AI Features', items: ['Price prediction', 'Neighborhood scoring', 'Match recommendations', 'Market trends'], color: '#f472b6' },
      { week: '12', title: 'Launch', items: ['Agent onboarding', 'Listing migration', 'Performance tuning', 'Marketing campaign'], color: '#22d3ee' }
    ],
    metrics: [
      { before: '80%', after: '20%', label: 'Mismatch Rate', icon: '🏠' },
      { before: '60 days', after: '30 days', label: 'Close Time', icon: '⏱️' },
      { before: '40%', after: '85%', label: 'Online Financing', icon: '🏦' },
      { before: '35%', after: '5%', label: 'Buyer Regret', icon: '😊' }
    ],
    techStack: ['Vue.js', 'Three.js', 'Firebase', 'Node.js', 'PostgreSQL', 'Maps API', 'Plaid API', 'DocuSign API', 'Redis']
  },
  'learning-management': {
    title: 'Learning Management',
    subtitle: 'Interactive Education Platform',
    color: '#fbbf24',
    heroImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&q=80',
    tagline: '500K+ learners across 200+ courses with 94% completion rates',
    problems: [
      { title: 'Low Engagement', description: 'Traditional LMS platforms have 85% dropout rates due to passive content delivery.', icon: '📚', impact: '85% course abandonment' },
      { title: 'No Personalization', description: 'One-size-fits-all curriculum ignoring individual learning paces and styles.', icon: '🎯', impact: '60% feel课程太慢或太快' },
      { title: 'Limited Interaction', description: 'No real-time collaboration, peer learning, or instructor engagement.', icon: '👥', impact: '70% feel isolated' },
      { title: 'Weak Assessment', description: 'Multiple choice quizzes don\'t measure real understanding or skill application.', icon: '📝', impact: '40% can\'t apply skills' }
    ],
    solutions: [
      { title: 'Adaptive Learning Engine', description: 'AI adjusts difficulty, pace, and content type based on learner performance and preferences.', tech: ['TensorFlow', 'Python', 'React'], result: '94% completion rate' },
      { title: 'Live Collaboration', description: 'Real-time video sessions, shared whiteboards, breakout rooms, and peer coding.', tech: ['WebRTC', 'WebSocket', 'Canvas'], result: '3x engagement increase' },
      { title: 'Project-Based Assessments', description: 'Real-world projects, peer reviews, and portfolio building instead of multiple choice.', tech: ['React', 'GitHub API', 'Rubrics Engine'], result: '85% skill application' },
      { title: 'Learning Analytics', description: 'Detailed dashboards for learners, instructors, and administrators with predictive insights.', tech: ['D3.js', 'PostgreSQL', 'ML'], result: 'Data-driven improvements' }
    ],
    phases: [
      { week: '1-2', title: 'Learning Design', items: ['Instructional design', 'Content audit', 'Learner personas', 'Outcome mapping'], color: '#fbbf24' },
      { week: '3-5', title: 'Core Platform', items: ['Course builder', 'Video infrastructure', 'Quiz engine', 'Progress tracking'], color: '#4f8eff' },
      { week: '6-8', title: 'Live Features', items: ['Video conferencing', 'Shared whiteboard', 'Breakout rooms', 'Chat system'], color: '#a855f7' },
      { week: '9-10', title: 'AI Adaptation', items: ['Learning path engine', 'Difficulty adjustment', 'Recommendation system', 'Predictive analytics'], color: '#06d6a0' },
      { week: '11', title: 'Assessment Hub', items: ['Project submissions', 'Peer review system', 'Portfolio builder', 'Certificate engine'], color: '#f472b6' },
      { week: '12', title: 'Launch', items: ['Content migration', 'Instructor training', 'Learner onboarding', 'Feedback loops'], color: '#22d3ee' }
    ],
    metrics: [
      { before: '15%', after: '94%', label: 'Completion Rate', icon: '📚' },
      { before: '1x', after: '3x', label: 'Engagement', icon: '🎯' },
      { before: '40%', after: '85%', label: 'Skill Application', icon: '💼' },
      { before: '100', after: '500K+', label: 'Active Learners', icon: '👥' }
    ],
    techStack: ['React', 'Node.js', 'WebRTC', 'TensorFlow', 'PostgreSQL', 'Redis', 'D3.js', 'GitHub API', 'Canvas']
  },
  'logistics-tracker': {
    title: 'Logistics Tracker',
    subtitle: 'Real-Time Fleet Management',
    color: '#22d3ee',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80',
    tagline: 'Managing 5,000+ vehicles with 40% fuel savings',
    problems: [
      { title: 'Blind Fleet', description: 'No real-time visibility into vehicle locations, routes, or driver behavior.', icon: '🚛', impact: '30% unauthorized use' },
      { title: 'Fuel Waste', description: 'Inefficient routing and idle time burning through fuel budgets.', icon: '⛽', impact: 'Significant annual waste' },
      { title: 'Late Deliveries', description: 'Manual dispatch and poor route planning causing 25% late deliveries.', icon: '📦', impact: '25% SLA violations' },
      { title: 'Reactive Maintenance', description: 'Vehicles breaking down on routes due to lack of preventive maintenance.', icon: '🔧', impact: '15% fleet downtime' }
    ],
    solutions: [
      { title: 'Live Fleet Dashboard', description: 'Real-time GPS tracking with geofencing, speed alerts, and driver scorecards.', tech: ['React', 'MapboxGL', 'WebSocket'], result: '100% fleet visibility' },
      { title: 'Route Optimization', description: 'AI-powered routing considering traffic, weather, delivery windows, and fuel efficiency.', tech: ['Go', 'ML', 'Maps API'], result: '40% fuel savings' },
      { title: 'Predictive Maintenance', description: 'IoT sensors + ML predicting vehicle issues before they cause breakdowns.', tech: ['IoT Hub', 'TensorFlow', 'TimeSeriesDB'], result: '95% fleet availability' },
      { title: 'Customer Portal', description: 'Real-time delivery tracking for customers with ETAs and proof of delivery.', tech: ['React Native', 'Firebase', 'Node.js'], result: '98% on-time delivery' }
    ],
    phases: [
      { week: '1-2', title: 'Fleet Audit', items: ['Current workflow analysis', 'IoT sensor selection', 'API integrations', 'Data architecture'], color: '#22d3ee' },
      { week: '3-5', title: 'Tracking Core', items: ['GPS integration', 'Real-time dashboard', 'Geofencing engine', 'Driver mobile app'], color: '#4f8eff' },
      { week: '6-8', title: 'Optimization', items: ['Route engine', 'Traffic integration', 'Fuel analytics', 'Dispatch automation'], color: '#a855f7' },
      { week: '9-10', title: 'Predictive', items: ['IoT data pipeline', 'Maintenance prediction', 'Anomaly detection', 'Alert system'], color: '#fbbf24' },
      { week: '11', title: 'Customer Portal', items: ['Tracking widget', 'ETA predictions', 'Proof of delivery', 'Notification system'], color: '#f472b6' },
      { week: '12', title: 'Fleet Rollout', items: ['Vehicle installation', 'Driver training', 'System integration', 'Performance monitoring'], color: '#06d6a0' }
    ],
    metrics: [
      { before: '0%', after: '100%', label: 'Fleet Visibility', icon: '🚛' },
      { before: 'High', after: 'Optimized', label: 'Annual Fuel Cost', icon: '⛽' },
      { before: '75%', after: '98%', label: 'On-Time Delivery', icon: '📦' },
      { before: '15%', after: '2%', label: 'Fleet Downtime', icon: '🔧' }
    ],
    techStack: ['React', 'Go', 'MapboxGL', 'TensorFlow', 'TimescaleDB', 'MQTT', 'Redis', 'Kubernetes', 'React Native']
  }
}
