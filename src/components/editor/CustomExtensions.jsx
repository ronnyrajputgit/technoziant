import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import { useState, useRef, useCallback, useEffect } from 'react'

const btn = (active, color) => ({ padding: '3px 8px', fontSize: '9px', borderRadius: '4px', border: `1px solid ${active ? (color || '#22c55e') : 'var(--glass-border)'}`, background: active ? `${color || '#22c55e'}22` : 'transparent', color: active ? (color || '#22c55e') : 'var(--text-muted)', cursor: 'pointer', fontFamily: "var(--font-code)", transition: 'all 0.15s' })
const delBtn = () => ({ padding: '3px 8px', fontSize: '9px', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontFamily: "var(--font-code)" })

function useResizable(initialWidth, containerRef, updateAttributes, min = 200) {
  const [width, setWidth] = useState(initialWidth || '100%')
  useEffect(() => { updateAttributes({ width }) }, [width])
  const onMouseDown = useCallback((e) => {
    e.preventDefault()
    const sx = e.clientX, sw = containerRef.current?.offsetWidth || 600
    const onMove = (e) => setWidth(Math.max(min, sw + (e.clientX - sx)) + 'px')
    const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp) }
    document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp)
  }, [])
  return { width, onMouseDown }
}

const DragHandle = ({ onMouseDown }) => (
  <div onMouseDown={onMouseDown} style={{ position: 'absolute', left: '-14px', top: '50%', transform: 'translateY(-50%)', width: '10px', height: '32px', background: '#64748b', borderRadius: '4px', cursor: 'grab', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5, zIndex: 5 }}
    onMouseOver={e => e.currentTarget.style.opacity = 1} onMouseOut={e => e.currentTarget.style.opacity = 0.5}>
    <div style={{ width: '2px', height: '16px', background: '#fff', borderRadius: '1px' }} />
  </div>
)

const ResizeHandle = ({ onMouseDown }) => (
  <div onMouseDown={onMouseDown} style={{ position: 'absolute', top: '50%', right: '-14px', transform: 'translateY(-50%)', width: '10px', height: '32px', background: '#3b82f6', borderRadius: '4px', cursor: 'ew-resize', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
    <div style={{ width: '2px', height: '16px', background: '#fff', borderRadius: '1px' }} />
  </div>
)

const COLORS = ['rgba(255,255,255,0.03)', 'rgba(34,197,94,0.08)', 'rgba(59,130,246,0.08)', 'rgba(168,85,247,0.08)', 'rgba(245,158,11,0.08)', 'rgba(239,68,68,0.08)', 'rgba(6,182,212,0.08)', 'rgba(236,72,153,0.08)']
const BORDERS = ['#ffffff14', '#22c55e4d', '#3b82f64d', '#a855f74d', '#f59e0b4d', '#ef44444d', '#06b6d44d', '#ec48994d']
const RADII = ['0px', '4px', '8px', '12px', '16px', '20px']
const PADS = ['8px', '12px', '16px', '24px', '32px', '48px']

function ColorPicker({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
      {COLORS.map((c, i) => (
        <button key={i} onClick={() => onChange(c, BORDERS[i])} style={{ width: '14px', height: '14px', borderRadius: '3px', border: `2px solid ${value === c ? '#22c55e' : 'var(--glass-border)'}`, background: c, cursor: 'pointer' }} />
      ))}
      <input type="color" value="#0f1424" onChange={e => { const v = e.target.value; onChange(v + '18', v + '55') }} style={{ width: '18px', height: '14px', border: '1px solid var(--glass-border)', borderRadius: '3px', cursor: 'pointer', padding: 0 }} />
    </div>
  )
}

function RadiusPicker({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
      {RADII.map(r => <button key={r} onClick={() => onChange(r)} style={btn(value === r)}>{r}</button>)}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════ */
/*  GRID BLOCK                                           */
/* ═══════════════════════════════════════════════════════ */
function GridBlockComponent({ node, updateAttributes, deleteNode }) {
  const [editing, setEditing] = useState(false)
  const [activeCell, setActiveCell] = useState(null)
  const containerRef = useRef(null)
  const { width, onMouseDown } = useResizable(node.attrs.width, containerRef, updateAttributes, 300)
  const cells = node.attrs.cells || []
  const gap = node.attrs.gap || '12px'

  const layouts = [
    { label: '2', cols: 2, widths: null }, { label: '3', cols: 3, widths: null }, { label: '4', cols: 4, widths: null },
    { label: '1:2', cols: 2, widths: ['1fr', '2fr'] }, { label: '2:1', cols: 2, widths: ['2fr', '1fr'] },
    { label: '1:2:1', cols: 3, widths: ['1fr', '2fr', '1fr'] }, { label: '2:1:1', cols: 3, widths: ['2fr', '1fr', '1fr'] },
    { label: '1:1:2', cols: 3, widths: ['1fr', '1fr', '2fr'] }, { label: '3:1', cols: 2, widths: ['3fr', '1fr'] },
  ]

  const setLayout = (l) => {
    const newCells = Array.from({ length: l.cols }, (_, i) => cells[i] || { type: 'text', content: '', src: '', alt: '', align: 'center', bgColor: COLORS[0], borderColor: BORDERS[0], radius: '8px', padding: '16px' })
    updateAttributes({ cols: l.cols, colWidths: l.widths, cells: newCells })
  }
  const updateCell = (i, updates) => {
    const currentCells = node.attrs.cells || []
    const c = [...currentCells]
    c[i] = { ...c[i], ...updates }
    updateAttributes({ cells: c })
  }
  const addCell = () => {
    const currentCells = node.attrs.cells || []
    updateAttributes({ cells: [...currentCells, { type: 'text', content: '', src: '', alt: '', align: 'center', bgColor: COLORS[0], borderColor: BORDERS[0], radius: '8px', padding: '16px' }], cols: currentCells.length + 1 })
  }
  const removeCell = (i) => {
    const currentCells = node.attrs.cells || []
    if (currentCells.length <= 1) return
    const c = currentCells.filter((_, j) => j !== i)
    updateAttributes({ cells: c, cols: c.length })
  }
  const moveCell = (from, to) => {
    const currentCells = node.attrs.cells || []
    if (to < 0 || to >= currentCells.length) return
    const c = [...currentCells]
    const [m] = c.splice(from, 1)
    c.splice(to, 0, m)
    updateAttributes({ cells: c })
  }
  const gridCols = node.attrs.colWidths ? node.attrs.colWidths.join(' ') : `repeat(${node.attrs.cols || 2}, 1fr)`

  return (
    <NodeViewWrapper as="div" style={{ margin: '1.5em 0', position: 'relative', width }}>
      <DragHandle onMouseDown={onMouseDown} />
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 12px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>GRID</span>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <button onMouseDown={e => e.stopPropagation()} onClick={e => { e.stopPropagation(); setEditing(!editing) }} style={btn(editing)}>Layout</button>
            <button onMouseDown={e => e.stopPropagation()} onClick={e => { e.stopPropagation(); addCell() }} style={btn(false, '#3b82f6')}>+ Cell</button>
            <button onMouseDown={e => e.stopPropagation()} onClick={e => { e.stopPropagation(); deleteNode() }} style={delBtn()}>✕</button>
          </div>
        </div>
        {editing && (
          <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Layout:</span>
            {layouts.map((l, i) => (
              <button key={i} onClick={() => setLayout(l)} style={btn(node.attrs.cols === l.cols && JSON.stringify(node.attrs.colWidths) === JSON.stringify(l.widths))}>{l.label}</button>
            ))}
            <div style={{ width: '1px', height: '18px', background: 'var(--glass-border)', margin: '0 4px' }} />
            <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Gap:</span>
            {['4px', '8px', '12px', '16px', '24px'].map(g => <button key={g} onClick={() => updateAttributes({ gap: g })} style={btn(gap === g)}>{g}</button>)}
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap, padding: '12px', background: 'rgba(0,0,0,0.1)' }}>
          {cells.map((cell, i) => (
            <GridCell key={i} cell={cell} index={i} isActive={activeCell === i}
              onSelect={() => setActiveCell(activeCell === i ? null : i)}
              onUpdate={(u) => updateCell(i, u)} onRemove={() => removeCell(i)}
              onMoveLeft={() => moveCell(i, i - 1)} onMoveRight={() => moveCell(i, i + 1)} totalCells={cells.length} />
          ))}
        </div>
      </div>
      <ResizeHandle onMouseDown={onMouseDown} />
    </NodeViewWrapper>
  )
}

function getYouTubeEmbed(url) {
  if (!url) return ''
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/)
  return m ? `https://www.youtube.com/embed/${m[1]}` : url
}

function VideoCell({ cell, onUpdate }) {
  const fileRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [urlInput, setUrlInput] = useState('')

  const handleFile = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => { onUpdate({ src: reader.result }) }
    reader.readAsDataURL(file)
  }

  const isBase64 = cell.src?.startsWith('data:video')
  const isYouTube = cell.src?.includes('youtube') || cell.src?.includes('youtu.be')
  const embedSrc = isYouTube ? getYouTubeEmbed(cell.src) : ''

  if (cell.src) {
    return (
      <div style={{ width: '100%' }}>
        {isBase64 ? (
          <div style={{ position: 'relative', borderRadius: cell.radius || '8px', overflow: 'hidden' }}>
            <video src={cell.src} controls style={{ width: '100%', display: 'block', borderRadius: cell.radius || '8px' }} />
          </div>
        ) : embedSrc ? (
          <div style={{ position: 'relative', paddingBottom: '56.25%', borderRadius: cell.radius || '8px', overflow: 'hidden' }}>
            <iframe src={embedSrc} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} allowFullScreen />
          </div>
        ) : (
          <div style={{ position: 'relative', borderRadius: cell.radius || '8px', overflow: 'hidden' }}>
            <video src={cell.src} controls style={{ width: '100%', display: 'block', borderRadius: cell.radius || '8px' }} />
          </div>
        )}
        <div style={{ display: 'flex', gap: '4px', marginTop: '6px', justifyContent: 'center' }}>
          <button onClick={() => onUpdate({ src: '' })} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', color: '#ef4444', fontSize: '9px', cursor: 'pointer', fontFamily: "var(--font-code)" }}>✕ Remove</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <input ref={fileRef} type="file" accept="video/*" onChange={e => handleFile(e.target.files?.[0])} style={{ display: 'none' }} />
      <div onDragOver={e => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]) }}
        onClick={() => fileRef.current?.click()}
        style={{ padding: '20px', border: `2px dashed ${dragging ? '#22c55e' : 'var(--glass-border)'}`, borderRadius: '8px', textAlign: 'center', cursor: 'pointer', background: dragging ? 'rgba(34,197,94,0.05)' : 'transparent', transition: 'all 0.2s' }}>
        <div style={{ fontSize: '24px', marginBottom: '4px' }}>🎬</div>
        <div style={{ fontSize: '11px', color: 'var(--text)', fontWeight: '500', marginBottom: '4px' }}>Click or drag to upload video</div>
        <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>or paste YouTube URL below</div>
      </div>
      <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
        <input type="text" value={urlInput} onChange={e => setUrlInput(e.target.value)} placeholder="https://youtube.com/watch?v=..."
          onKeyDown={e => { if (e.key === 'Enter' && urlInput.trim()) { e.preventDefault(); onUpdate({ src: urlInput.trim() }); setUrlInput('') } }}
          style={{ flex: 1, padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'var(--text)', fontSize: '11px', outline: 'none', boxSizing: 'border-box' }} />
        <button onClick={() => { if (urlInput.trim()) { onUpdate({ src: urlInput.trim() }); setUrlInput('') } }} disabled={!urlInput.trim()}
          style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: urlInput.trim() ? '#22c55e' : 'var(--glass)', color: urlInput.trim() ? '#fff' : 'var(--text-muted)', fontSize: '11px', fontWeight: '600', cursor: urlInput.trim() ? 'pointer' : 'not-allowed', fontFamily: "var(--font-code)" }}>Add</button>
      </div>
    </div>
  )
}

function ImageCell({ cell, onUpdate }) {
  const fileRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => { onUpdate({ src: reader.result }) }
    reader.readAsDataURL(file)
  }

  if (cell.src) {
    return (
      <div style={{ width: '100%' }}>
        <img src={cell.src} alt={cell.alt || ''} style={{ width: '100%', borderRadius: cell.radius || '8px', display: 'block' }} onError={e => { e.target.style.display = 'none' }} />
        <div style={{ display: 'flex', gap: '4px', marginTop: '6px', alignItems: 'center' }}>
          <input type="text" value={cell.alt || ''} onChange={e => onUpdate({ alt: e.target.value })} placeholder="Caption..." style={{ flex: 1, textAlign: 'center', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)', fontSize: '11px', fontStyle: 'italic', outline: 'none', borderRadius: '4px', padding: '4px 8px', boxSizing: 'border-box' }} />
          <button onClick={() => onUpdate({ src: '', alt: '' })} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', color: '#ef4444', fontSize: '9px', cursor: 'pointer', fontFamily: "var(--font-code)" }}>✕</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <input ref={fileRef} type="file" accept="image/*" onChange={e => handleFile(e.target.files?.[0])} style={{ display: 'none' }} />
      <div onDragOver={e => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]) }}
        onClick={() => fileRef.current?.click()}
        style={{ padding: '20px', border: `2px dashed ${dragging ? '#22c55e' : 'var(--glass-border)'}`, borderRadius: '8px', textAlign: 'center', cursor: 'pointer', background: dragging ? 'rgba(34,197,94,0.05)' : 'transparent', transition: 'all 0.2s' }}>
        <div style={{ fontSize: '24px', marginBottom: '4px' }}>📤</div>
        <div style={{ fontSize: '11px', color: 'var(--text)', fontWeight: '500', marginBottom: '4px' }}>Click or drag to upload</div>
        <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>or paste URL below</div>
      </div>
      <input type="text" value={cell.src || ''} onChange={e => onUpdate({ src: e.target.value })} placeholder="Paste image URL..."
        onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
        style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'var(--text)', fontSize: '11px', outline: 'none', boxSizing: 'border-box', marginTop: '8px' }} />
    </div>
  )
}

function GridCell({ cell, index, isActive, onSelect, onUpdate, onRemove, onMoveLeft, onMoveRight, totalCells }) {
  const cellTypeBtns = [
    { type: 'text', icon: '📝', label: 'Text' },
    { type: 'image', icon: '🖼️', label: 'Image' },
    { type: 'video', icon: '🎬', label: 'Video' },
    { type: 'card', icon: '🃏', label: 'Card' },
  ]

  return (
    <div onClick={onSelect} style={{ borderRadius: cell.radius || '8px', overflow: 'hidden', border: `1px solid ${isActive ? '#22c55e' : 'var(--glass-border)'}`, background: cell.bgColor || 'var(--bg)', minHeight: '80px', cursor: 'pointer', transition: 'all 0.15s', position: 'relative' }}>
      <div style={{ display: 'flex', gap: '3px', padding: '4px 6px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', flexWrap: 'wrap', alignItems: 'center' }}>
        {cellTypeBtns.map(t => (
          <button key={t.type} onMouseDown={e => e.stopPropagation()} onClick={e => { e.stopPropagation(); onUpdate({ type: t.type, src: '', alt: '', content: '' }) }} style={btn(cell.type === t.type)}>{t.icon} {t.label}</button>
        ))}
        <div style={{ width: '1px', height: '16px', background: 'var(--glass-border)', margin: '0 3px' }} />
        {['left', 'center', 'right'].map(a => (
          <button key={a} onMouseDown={e => e.stopPropagation()} onClick={e => { e.stopPropagation(); onUpdate({ align: a }) }} style={btn(cell.align === a)}>{a[0].toUpperCase()}</button>
        ))}
        <div style={{ width: '1px', height: '16px', background: 'var(--glass-border)', margin: '0 3px' }} />
        <ColorPicker value={cell.bgColor} onChange={(bg, border) => onUpdate({ bgColor: bg, borderColor: border })} />
        <div style={{ width: '1px', height: '16px', background: 'var(--glass-border)', margin: '0 3px' }} />
        <RadiusPicker value={cell.radius} onChange={r => onUpdate({ radius: r })} />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '3px' }}>
          <button onMouseDown={e => e.stopPropagation()} onClick={e => { e.stopPropagation(); onMoveLeft() }} disabled={index === 0} style={btn(false, '#f59e0b')}>◀</button>
          <button onMouseDown={e => e.stopPropagation()} onClick={e => { e.stopPropagation(); onMoveRight() }} disabled={index === totalCells - 1} style={btn(false, '#f59e0b')}>▶</button>
          <button onMouseDown={e => e.stopPropagation()} onClick={e => { e.stopPropagation(); onRemove() }} style={delBtn()}>✕</button>
        </div>
      </div>
      <div style={{ padding: cell.padding || '16px', textAlign: cell.align || 'center', minHeight: '60px' }}>
        {cell.type === 'text' && (
          <textarea value={cell.content || ''} onChange={e => onUpdate({ content: e.target.value })}
            onMouseDown={e => e.stopPropagation()} onClick={e => e.stopPropagation()}
            placeholder="Type here..."
            rows={3}
            style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '14px', lineHeight: 1.6, resize: 'vertical', fontFamily: 'inherit', textAlign: cell.align || 'center', boxSizing: 'border-box' }} />
        )}
        {cell.type === 'image' && (
          <ImageCell cell={cell} onUpdate={onUpdate} />
        )}
        {cell.type === 'video' && (
          <VideoCell cell={cell} onUpdate={onUpdate} />
        )}
        {cell.type === 'card' && (
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: cell.radius || '12px', padding: '16px', border: '1px solid var(--glass-border)' }}>
            {cell.src && (
              <div style={{ marginBottom: '8px', position: 'relative' }}>
                <img src={cell.src} alt="" style={{ width: '100%', borderRadius: '8px', display: 'block' }} onError={e => { e.target.style.display = 'none' }} />
                <button onClick={() => onUpdate({ src: '' })} style={{ position: 'absolute', top: '4px', right: '4px', padding: '2px 6px', borderRadius: '4px', border: 'none', background: 'rgba(239,68,68,0.8)', color: '#fff', fontSize: '9px', cursor: 'pointer' }}>✕</button>
              </div>
            )}
            {!cell.src && (
              <div style={{ padding: '12px', border: '1px dashed var(--glass-border)', borderRadius: '6px', marginBottom: '8px', textAlign: 'center' }}>
                <input type="text" value={cell.src || ''} onChange={e => onUpdate({ src: e.target.value })} placeholder="Paste image URL..."
                  onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'var(--text)', fontSize: '11px', outline: 'none', boxSizing: 'border-box', textAlign: 'center' }} />
              </div>
            )}
            <textarea value={cell.content || ''} onChange={e => onUpdate({ content: e.target.value })}
              placeholder="Card content..."
              rows={2}
              style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '13px', lineHeight: 1.5, resize: 'vertical', fontFamily: 'inherit', textAlign: 'center', boxSizing: 'border-box' }} />
          </div>
        )}
      </div>
    </div>
  )
}

export const GridBlock = Node.create({
  name: 'gridBlock', group: 'block', atom: true,
  addAttributes() { return { cols: { default: 2 }, colWidths: { default: null }, gap: { default: '12px' }, width: { default: '100%' }, cells: { default: [{ type: 'text', content: '', src: '', alt: '', align: 'center', bgColor: COLORS[0], borderColor: BORDERS[0], radius: '8px', padding: '16px' }, { type: 'text', content: '', src: '', alt: '', align: 'center', bgColor: COLORS[0], borderColor: BORDERS[0], radius: '8px', padding: '16px' }] } } },
  parseHTML() { return [{ tag: 'div[data-grid-block]' }] },
  renderHTML({ HTMLAttributes }) { return ['div', mergeAttributes(HTMLAttributes, { 'data-grid-block': '' })] },
  addNodeView() { return ReactNodeViewRenderer(GridBlockComponent) }
})

/* ═══════════════════════════════════════════════════════ */
/*  CARD BLOCK                                           */
/* ═══════════════════════════════════════════════════════ */
function CardBlockComponent({ node, updateAttributes, deleteNode }) {
  const [editing, setEditing] = useState(false)
  const containerRef = useRef(null)
  const { width, onMouseDown } = useResizable(node.attrs.width, containerRef, updateAttributes, 200)

  const presets = [
    { label: 'Default', bg: 'rgba(255,255,255,0.03)', border: '#ffffff14' },
    { label: 'Green', bg: 'rgba(34,197,94,0.08)', border: '#22c55e4d' },
    { label: 'Blue', bg: 'rgba(59,130,246,0.08)', border: '#3b82f64d' },
    { label: 'Purple', bg: 'rgba(168,85,247,0.08)', border: '#a855f74d' },
    { label: 'Amber', bg: 'rgba(245,158,11,0.08)', border: '#f59e0b4d' },
    { label: 'Red', bg: 'rgba(239,68,68,0.08)', border: '#ef44444d' },
    { label: 'Cyan', bg: 'rgba(6,182,212,0.08)', border: '#06b6d44d' },
    { label: 'Pink', bg: 'rgba(236,72,153,0.08)', border: '#ec48994d' },
  ]

  return (
    <NodeViewWrapper>
      <div ref={containerRef} style={{ margin: '1.5em 0', position: 'relative', width }}>
        <DragHandle onMouseDown={onMouseDown} />
        <div style={{ borderRadius: node.attrs.radius || '12px', overflow: 'hidden', border: `1px solid ${node.attrs.borderColor || 'var(--glass-border)'}`, background: node.attrs.bgColor || 'rgba(255,255,255,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 12px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>CARD</span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <button onMouseDown={e => e.stopPropagation()} onClick={e => { e.stopPropagation(); setEditing(!editing) }} style={btn(editing)}>Style</button>
              <button onMouseDown={e => e.stopPropagation()} onClick={e => { e.stopPropagation(); deleteNode() }} style={delBtn()}>✕</button>
            </div>
          </div>
          {editing && (
            <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Color:</span>
              {presets.map((c, i) => (
                <button key={i} onClick={() => updateAttributes({ bgColor: c.bg, borderColor: c.border })} style={{ width: '16px', height: '16px', borderRadius: '3px', border: `2px solid ${node.attrs.bgColor === c.bg ? '#22c55e' : 'var(--glass-border)'}`, background: c.bg, cursor: 'pointer' }} />
              ))}
              <input type="color" value={node.attrs.customColor || '#0f1424'} onChange={e => { const v = e.target.value; updateAttributes({ bgColor: v + '18', borderColor: v + '55', customColor: v }) }} style={{ width: '18px', height: '16px', border: '1px solid var(--glass-border)', borderRadius: '3px', cursor: 'pointer', padding: 0 }} />
              <div style={{ width: '1px', height: '18px', background: 'var(--glass-border)', margin: '0 4px' }} />
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Radius:</span>
              {RADII.map(r => <button key={r} onClick={() => updateAttributes({ radius: r })} style={btn(node.attrs.radius === r)}>{r}</button>)}
              <div style={{ width: '1px', height: '18px', background: 'var(--glass-border)', margin: '0 4px' }} />
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Pad:</span>
              {PADS.map(p => <button key={p} onClick={() => updateAttributes({ padding: p })} style={btn(node.attrs.padding === p)}>{p}</button>)}
            </div>
          )}
          <div data-card-content style={{ padding: node.attrs.padding || '24px' }} />
        </div>
        <ResizeHandle onMouseDown={onMouseDown} />
      </div>
    </NodeViewWrapper>
  )
}

export const CardBlock = Node.create({
  name: 'cardBlock', group: 'block', content: 'block+', defining: true,
  addAttributes() { return { bgColor: { default: 'rgba(255,255,255,0.03)' }, borderColor: { default: 'var(--glass-border)' }, customColor: { default: '#0f1424' }, padding: { default: '24px' }, radius: { default: '12px' }, width: { default: '100%' } } },
  parseHTML() { return [{ tag: 'div[data-card-block]' }] },
  renderHTML({ HTMLAttributes }) { return ['div', mergeAttributes(HTMLAttributes, { 'data-card-block': '' }), 0] },
  addNodeView() { return ReactNodeViewRenderer(CardBlockComponent) }
})

/* ═══════════════════════════════════════════════════════ */
/*  COLUMNS BLOCK                                        */
/* ═══════════════════════════════════════════════════════ */
function ColumnsBlockComponent({ node, updateAttributes, deleteNode }) {
  const [editing, setEditing] = useState(false)
  const containerRef = useRef(null)
  const { width, onMouseDown } = useResizable(node.attrs.width, containerRef, updateAttributes, 300)
  const cols = node.attrs.cols || 2

  const presets = [
    { label: '1:2', widths: ['1fr', '2fr'] }, { label: '2:1', widths: ['2fr', '1fr'] },
    { label: '1:1:1', widths: null }, { label: '1:2:1', widths: ['1fr', '2fr', '1fr'] },
    { label: '2:1:1', widths: ['2fr', '1fr', '1fr'] }, { label: '1:1:2', widths: ['1fr', '1fr', '2fr'] },
  ]
  const gridTemplate = node.attrs.colWidths ? node.attrs.colWidths.join(' ') : `repeat(${cols}, 1fr)`

  return (
    <NodeViewWrapper>
      <div ref={containerRef} style={{ margin: '1.5em 0', position: 'relative', width }}>
        <DragHandle onMouseDown={onMouseDown} />
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 12px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>COLUMNS</span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              {[2, 3, 4].map(n => <button key={n} onClick={() => updateAttributes({ cols: n, colWidths: null })} style={btn(cols === n)}>{n}Col</button>)}
              <div style={{ width: '1px', height: '16px', background: 'var(--glass-border)', margin: '0 4px' }} />
              <button onClick={() => setEditing(!editing)} style={btn(editing)}>Layout</button>
              <button onClick={() => deleteNode()} style={delBtn()}>✕</button>
            </div>
          </div>
          {editing && (
            <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Width:</span>
              {presets.filter(p => (p.widths?.length || 3) === cols || (!p.widths && cols === 3)).map((p, i) => (
                <button key={i} onClick={() => updateAttributes({ colWidths: p.widths })} style={btn(!p.widths ? !node.attrs.colWidths : JSON.stringify(node.attrs.colWidths) === JSON.stringify(p.widths))}>{p.label}</button>
              ))}
            </div>
          )}
          <div data-cols-content style={{ display: 'grid', gridTemplateColumns: gridTemplate, gap: '1px', background: 'var(--glass-border)' }}>
            {Array.from({ length: cols }).map((_, i) => (
              <div key={i} style={{ background: 'var(--bg)', minHeight: '80px', padding: '12px' }} />
            ))}
          </div>
        </div>
        <ResizeHandle onMouseDown={onMouseDown} />
      </div>
    </NodeViewWrapper>
  )
}

export const ColumnsBlock = Node.create({
  name: 'columnsBlock', group: 'block', content: 'block+', defining: true,
  addAttributes() { return { cols: { default: 2 }, colWidths: { default: null }, width: { default: '100%' } } },
  parseHTML() { return [{ tag: 'div[data-columns-block]' }] },
  renderHTML({ HTMLAttributes }) { return ['div', mergeAttributes(HTMLAttributes, { 'data-columns-block': '' }), 0] },
  addNodeView() { return ReactNodeViewRenderer(ColumnsBlockComponent) }
})

/* ═══════════════════════════════════════════════════════ */
/*  RESIZABLE IMAGE                                      */
/* ═══════════════════════════════════════════════════════ */
function ResizableImageComponent({ node, updateAttributes, deleteNode }) {
  const [resizable, setResizable] = useState(false)
  const [width, setWidth] = useState(node.attrs.width || '100%')
  const [align, setAlign] = useState(node.attrs.align || 'center')
  const imgRef = useRef(null)
  useEffect(() => { updateAttributes({ width }) }, [width])
  const onMouseDown = useCallback((e) => {
    e.preventDefault()
    const sx = e.clientX, sw = imgRef.current?.offsetWidth || 400
    const onMove = (e) => setWidth(Math.max(100, sw + (e.clientX - sx)) + 'px')
    const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp) }
    document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp)
  }, [])

  return (
    <NodeViewWrapper>
      <div style={{ margin: '1.5em 0', textAlign: align, position: 'relative' }} contentEditable={false}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
          {['left', 'center', 'right'].map(a => <button key={a} onClick={() => { setAlign(a); updateAttributes({ align: a }) }} style={btn(align === a)}>{a[0].toUpperCase()}</button>)}
          <button onClick={() => setResizable(!resizable)} style={btn(resizable, '#3b82f6')}>Resize</button>
          <button onClick={() => deleteNode()} style={delBtn()}>✕</button>
        </div>
        <div style={{ position: 'relative', display: 'inline-block', width }}>
          <img ref={imgRef} src={node.attrs.src} alt={node.attrs.alt || ''} style={{ width: '100%', borderRadius: '12px', cursor: resizable ? 'ew-resize' : 'default', userSelect: 'none', display: 'block' }} onMouseDown={resizable ? onMouseDown : undefined} />
          {resizable && <ResizeHandle onMouseDown={onMouseDown} />}
        </div>
        {node.attrs.caption !== false && <input type="text" value={node.attrs.alt || ''} onChange={e => updateAttributes({ alt: e.target.value })} placeholder="Image caption..." style={{ width: '100%', textAlign: 'center', border: 'none', background: 'transparent', color: 'var(--text-muted)', fontSize: '12px', fontStyle: 'italic', marginTop: '8px', outline: 'none' }} />}
      </div>
    </NodeViewWrapper>
  )
}

export const ResizableImage = Node.create({
  name: 'resizableImage', group: 'block', atom: true,
  addAttributes() { return { src: { default: '' }, alt: { default: '' }, width: { default: '100%' }, align: { default: 'center' }, caption: { default: true } } },
  parseHTML() { return [{ tag: 'img[data-resizable]' }] },
  renderHTML({ HTMLAttributes }) { return ['img', mergeAttributes(HTMLAttributes, { 'data-resizable': '' })] },
  addNodeView() { return ReactNodeViewRenderer(ResizableImageComponent) }
})

/* ═══════════════════════════════════════════════════════ */
/*  RESIZABLE VIDEO                                      */
/* ═══════════════════════════════════════════════════════ */
function ResizableVideoComponent({ node, updateAttributes, deleteNode }) {
  const [resizable, setResizable] = useState(false)
  const [width, setWidth] = useState(node.attrs.width || '100%')
  const [align, setAlign] = useState(node.attrs.align || 'center')
  const containerRef = useRef(null)
  useEffect(() => { updateAttributes({ width }) }, [width])
  const onMouseDown = useCallback((e) => {
    e.preventDefault()
    const sx = e.clientX, sw = containerRef.current?.offsetWidth || 640
    const onMove = (e) => setWidth(Math.max(200, sw + (e.clientX - sx)) + 'px')
    const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp) }
    document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp)
  }, [])
  const isYoutube = node.attrs.src?.includes('youtube') || node.attrs.src?.includes('youtu.be')

  return (
    <NodeViewWrapper>
      <div style={{ margin: '1.5em 0', textAlign: align, position: 'relative' }} contentEditable={false}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
          {['left', 'center', 'right'].map(a => <button key={a} onClick={() => { setAlign(a); updateAttributes({ align: a }) }} style={btn(align === a)}>{a[0].toUpperCase()}</button>)}
          <button onClick={() => setResizable(!resizable)} style={btn(resizable, '#3b82f6')}>Resize</button>
          <button onClick={() => deleteNode()} style={delBtn()}>✕</button>
        </div>
        <div ref={containerRef} style={{ position: 'relative', display: 'inline-block', width, maxWidth: '100%' }}>
          {isYoutube ? (
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px' }}>
              <iframe src={node.attrs.src} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', borderRadius: '12px' }} allowFullScreen />
            </div>
          ) : <video src={node.attrs.src} controls style={{ width: '100%', borderRadius: '12px', display: 'block' }} />}
          {resizable && <ResizeHandle onMouseDown={onMouseDown} />}
        </div>
      </div>
    </NodeViewWrapper>
  )
}

export const ResizableVideo = Node.create({
  name: 'resizableVideo', group: 'block', atom: true,
  addAttributes() { return { src: { default: '' }, width: { default: '100%' }, align: { default: 'center' } } },
  parseHTML() { return [{ tag: 'div[data-resizable-video]' }] },
  renderHTML({ HTMLAttributes }) { return ['div', mergeAttributes(HTMLAttributes, { 'data-resizable-video': '' })] },
  addNodeView() { return ReactNodeViewRenderer(ResizableVideoComponent) }
})

/* ═══════════════════════════════════════════════════════ */
/*  CALLOUT                                              */
/* ═══════════════════════════════════════════════════════ */
function CalloutComponent({ node, updateAttributes, deleteNode }) {
  const templates = {
    info:     { bg: 'rgba(59,130,246,0.08)', border: '#3b82f6', icon: '💡', label: 'Info' },
    thinking: { bg: 'rgba(168,85,247,0.08)', border: '#a855f7', icon: '🤔', label: 'Thinking' },
    note:     { bg: 'rgba(34,197,94,0.08)', border: '#22c55e', icon: '📝', label: 'Note' },
    warning:  { bg: 'rgba(245,158,11,0.08)', border: '#f59e0b', icon: '⚠️', label: 'Warning' },
    danger:   { bg: 'rgba(239,68,68,0.08)', border: '#ef4444', icon: '🚨', label: 'Danger' },
    tip:      { bg: 'rgba(168,85,247,0.08)', border: '#a855f7', icon: '🎯', label: 'Tip' },
    question: { bg: 'rgba(6,182,212,0.08)', border: '#06b6d4', icon: '❓', label: 'Question' },
    success:  { bg: 'rgba(34,197,94,0.08)', border: '#22c55e', icon: '✅', label: 'Success' },
    quote:    { bg: 'rgba(245,158,11,0.08)', border: '#f59e0b', icon: '💬', label: 'Quote' },
    code:     { bg: 'rgba(236,72,153,0.08)', border: '#ec4899', icon: '💻', label: 'Code' },
  }
  const shapes = { square: '0px', rounded: '12px', pill: '50%', circle: '50%' }
  const s = templates[node.attrs.type || 'info']
  const shape = node.attrs.shape || 'rounded'

  return (
    <NodeViewWrapper>
      <div style={{ margin: '1.5em 0', borderRadius: shapes[shape], overflow: 'hidden', border: `1px solid ${s.border}33`, transition: 'all 0.2s' }}>
        <div style={{ padding: '6px 12px', borderBottom: `1px solid ${s.border}22`, background: s.bg, display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', marginRight: '4px' }}>{s.icon}</span>
          {Object.entries(templates).map(([key, val]) => (
            <button key={key} onMouseDown={e => e.stopPropagation()} onClick={e => { e.stopPropagation(); updateAttributes({ type: key }) }} style={btn(node.attrs.type === key, val.border)}>{val.icon}</button>
          ))}
          <div style={{ width: '1px', height: '16px', background: 'var(--glass-border)', margin: '0 4px' }} />
          <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Shape:</span>
          {Object.keys(shapes).map(sh => (
            <button key={sh} onClick={() => updateAttributes({ shape: sh })} style={btn(shape === sh)}>{sh === 'circle' ? '⭕' : sh === 'pill' ? '💊' : sh}</button>
          ))}
          <button onMouseDown={e => e.stopPropagation()} onClick={e => { e.stopPropagation(); deleteNode() }} style={{ ...delBtn(), marginLeft: 'auto' }}>✕</button>
        </div>
        <div style={{ padding: '16px 20px', background: s.bg, borderLeft: shape === 'circle' ? 'none' : `3px solid ${s.border}`, borderRadius: shape === 'circle' ? '50%' : '0', aspectRatio: shape === 'circle' ? '1' : 'auto', display: 'flex', alignItems: shape === 'circle' ? 'center' : 'flex-start', justifyContent: shape === 'circle' ? 'center' : 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', width: shape === 'circle' ? '80%' : '100%', textAlign: shape === 'circle' ? 'center' : 'left', flexDirection: shape === 'circle' ? 'column' : 'row' }}>
            <span style={{ fontSize: '20px', lineHeight: 1, flexShrink: 0 }}>{s.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: s.border, fontFamily: "var(--font-code)", marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
              <div data-callout-content />
            </div>
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  )
}

export const Callout = Node.create({
  name: 'callout', group: 'block', content: 'block+', defining: true,
  addAttributes() { return { type: { default: 'info' }, shape: { default: 'rounded' } } },
  parseHTML() { return [{ tag: 'div[data-callout]' }] },
  renderHTML({ HTMLAttributes }) { return ['div', mergeAttributes(HTMLAttributes, { 'data-callout': '' }), 0] },
  addNodeView() { return ReactNodeViewRenderer(CalloutComponent) }
})

/* ═══════════════════════════════════════════════════════ */
/*  SPACER                                               */
/* ═══════════════════════════════════════════════════════ */
function SpacerComponent({ deleteNode }) {
  return (
    <NodeViewWrapper>
      <div style={{ margin: '8px 0', padding: '8px', border: '1px dashed var(--glass-border)', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} contentEditable={false}>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>SPACER</span>
        <button onClick={() => deleteNode()} style={delBtn()}>✕</button>
      </div>
    </NodeViewWrapper>
  )
}

export const Spacer = Node.create({
  name: 'spacer', group: 'block', atom: true,
  parseHTML() { return [{ tag: 'div[data-spacer]' }] },
  renderHTML() { return ['div', { 'data-spacer': '' }] },
  addNodeView() { return ReactNodeViewRenderer(SpacerComponent) }
})
