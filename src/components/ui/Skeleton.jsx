export function Skeleton({ width = '100%', height = 14, style, className = '' }) {
  return <div className={`skeleton ${className}`} style={{ width, height, ...style }} />
}

export function SkeletonText({ lines = 3, gap = 8, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap, ...style }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} height={12} width={i === lines - 1 ? '60%' : '100%'} />
      ))}
    </div>
  )
}

export function SkeletonCard({ style }) {
  return (
    <div className="liquid-glass" style={{ padding: 16, borderRadius: 12, ...style }}>
      <Skeleton height={120} style={{ borderRadius: 8, marginBottom: 12 }} />
      <Skeleton height={16} width="70%" style={{ marginBottom: 8 }} />
      <SkeletonText lines={2} gap={6} />
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Skeleton height={10} width={120} style={{ marginBottom: 8 }} />
        <Skeleton height={28} width={240} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8, marginBottom: 24 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="liquid-glass" style={{ padding: 14, borderRadius: 10 }}>
            <Skeleton height={22} width={50} style={{ marginBottom: 6 }} />
            <Skeleton height={10} width={80} />
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 10, marginBottom: 28 }}>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10, marginBottom: 28 }}>
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  )
}

export function CMSSkeleton() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Skeleton height={10} width={160} style={{ marginBottom: 8 }} />
        <Skeleton height={24} width={200} />
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Skeleton height={36} style={{ flex: 1, maxWidth: 300 }} />
        <Skeleton height={36} width={80} />
        <Skeleton height={36} width={80} />
        <Skeleton height={36} width={80} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="liquid-glass" style={{ padding: 12, borderRadius: 8 }}>
            <Skeleton height={14} width="70%" style={{ marginBottom: 6 }} />
            <Skeleton height={10} width="50%" style={{ marginBottom: 10 }} />
            <div style={{ display: 'flex', gap: 3, justifyContent: 'flex-end' }}>
              <Skeleton height={24} width={24} style={{ borderRadius: 4 }} />
              <Skeleton height={24} width={24} style={{ borderRadius: 4 }} />
              <Skeleton height={24} width={24} style={{ borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SiteSkeleton() {
  return (
    <main style={{ paddingTop: 110, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 40 }}>
          <Skeleton height={10} width={100} style={{ marginBottom: 12 }} />
          <Skeleton height={40} width="50%" style={{ marginBottom: 12 }} />
          <SkeletonText lines={3} gap={8} style={{ maxWidth: 600 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    </main>
  )
}
