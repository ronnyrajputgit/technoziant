import MuiSkeleton from '@mui/material/Skeleton'

const S = ({ width, height, variant = 'text', sx, ...props }) => (
  <MuiSkeleton variant={variant} width={width} height={height} animation="wave"
    sx={{ bgcolor: 'rgba(255,255,255,0.06)', ...sx }} {...props} />
)

export function SkeletonText({ lines = 3, gap = 8, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap, ...style }}>
      {Array.from({ length: lines }).map((_, i) => (
        <S key={i} height={12} width={i === lines - 1 ? '60%' : '100%'} />
      ))}
    </div>
  )
}

export function SkeletonCard({ style }) {
  return (
    <div className="liquid-glass" style={{ padding: 16, borderRadius: 12, ...style }}>
      <S variant="rectangular" height={120} sx={{ borderRadius: 1, mb: 1.5 }} />
      <S height={16} width="70%" sx={{ mb: 1 }} />
      <SkeletonText lines={2} gap={6} />
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <S height={10} width={120} sx={{ mb: 1 }} />
        <S height={28} width={240} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8, marginBottom: 24 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="liquid-glass" style={{ padding: 14, borderRadius: 10 }}>
            <S height={22} width={50} sx={{ mb: 0.75 }} />
            <S height={10} width={80} />
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
        <S height={10} width={160} sx={{ mb: 1 }} />
        <S height={24} width={200} />
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <S height={36} width={300} />
        <S height={36} width={80} />
        <S height={36} width={80} />
        <S height={36} width={80} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="liquid-glass" style={{ padding: 12, borderRadius: 8 }}>
            <S height={14} width="70%" sx={{ mb: 0.75 }} />
            <S height={10} width="50%" sx={{ mb: 1.25 }} />
            <div style={{ display: 'flex', gap: 3, justifyContent: 'flex-end' }}>
              <S variant="circular" width={24} height={24} />
              <S variant="circular" width={24} height={24} />
              <S variant="circular" width={24} height={24} />
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
          <S height={10} width={100} sx={{ mb: 1.5 }} />
          <S height={40} width="50%" sx={{ mb: 1.5 }} />
          <SkeletonText lines={3} gap={8} style={{ maxWidth: 600 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    </main>
  )
}
