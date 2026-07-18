import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import { useState, useRef, useCallback, useEffect } from 'react'

const btn = (active, color) => ({ padding: '3px 8px', fontSize: '9px', borderRadius: '4px', border: `1px solid ${active ? (color || '#22c55e') : 'var(--glass-border)'}`, background: active ? `${color || '#22c55e'}22` : 'transparent', color: active ? (color || '#22c55e') : 'var(--text-muted)', cursor: 'pointer', fontFamily: "var(--font-code)", transition: 'all 0.15s' })
const delBtn = () => ({ padding: '3px 8px', fontSize: '9px', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontFamily: "var(--font-code)" })
const iconBtn = (active, color) => ({ padding: '4px', borderRadius: '4px', border: 'none', background: active ? `${color || '#22c55e'}22` : 'transparent', color: active ? (color || '#22c55e') : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' })

function useResizable(initialWidth, containerRef, updateAttributes, min = 200) {
  const [width, setWidth] = useState(initialWidth || '100%')
  const startX = useRef(0)
  const startW = useRef(0)
  useEffect(() => { updateAttributes({ width }) }, [width])
  const onMouseDown = useCallback((e) => {
    e.preventDefault()
    startX.current = e.clientX
    startW.current = containerRef.current?.offsetWidth || 600
    const onMove = (e) => { setWidth(Math.max(min, startW.current + (e.clientX - startX.current)) + 'px') }
    const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp) }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [])
  return { width, setWidth, onMouseDown }
}

const DragHandle = ({ onMouseDown }) => (
  <div onMouseDown={onMouseDown} style={{ position: 'absolute', left: '-14px', top: '50%', transform: 'translateY(-50%)', width: '10px', height: '32px', background: '#64748b', borderRadius: '4px', cursor: 'grab', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5, transition: 'opacity 0.15s', zIndex: 5 }}
    onMouseOver={e => e.currentTarget.style.opacity = 1} onMouseOut={e => e.currentTarget.style.opacity = 0.5}>
    <div style={{ width: '2px', height: '16px', background: '#fff', borderRadius: '1px' }} />
  </div>
)

const ResizeHandle = ({ onMouseDown }) => (
  <div onMouseDown={onMouseDown} style={{ position: 'absolute', top: '50%', right: '-14px', transform: 'translateY(-50%)', width: '10px', height: '32px', background: '#3b82f6', borderRadius: '4px', cursor: 'ew-resize', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
    <div style={{ width: '2px', height: '16px', background: '#fff', borderRadius: '1px' }} />
  </div>
)

const cellTypes = [
  { type: 'text', icon: '📝', label: 'Text' },
  { type: 'image', icon: '🖼️', label: 'Image' },
  { type: 'video', icon: '🎬', label: 'Video' },
  { type: 'card', icon: '🃏', label: 'Card' },
]

/* ═══════════════════════════════════════════════════════ */
/*  GRID BLOCK — flexible grid with cells                 */
/* ═══════════════════════════════════════════════════════ */
function GridBlockComponent({ node, updateAttributes, deleteNode }) {
  const [editing, setEditing] = useState(false)
  const [activeCell, setActiveCell] = useState(null)
  const containerRef = useRef(null)
  const { width, onMouseDown } = useResizable(node.attrs.width, containerRef, updateAttributes, 300)
  const cells = node.attrs.cells || []
  const gap = node.attrs.gap || '12px'

  const layouts = [
    { label: '2 Equal', cols: 2, widths: null },
    { label: '3 Equal', cols: 3, widths: null },
    { label: '4 Equal', cols: 4, widths: null },
    { label: '1:2', cols: 2, widths: ['1fr', '2fr'] },
    { label: '2:1', cols: 2, widths: ['2fr', '1fr'] },
    { label: '1:2:1', cols: 3, widths: ['1fr', '2fr', '1fr'] },
    { label: '2:1:1', cols: 3, widths: ['2fr', '1fr', '1fr'] },
    { label: '1:1:2', cols: 3, widths: ['1fr', '1fr', '2fr'] },
    { label: '3:1', cols: 2, widths: ['3fr', '1fr'] },
  ]

  const setLayout = (layout) => {
    const newCells = Array.from({ length: layout.cols }, (_, i) => cells[i] || { type: 'text', content: '', src: '', alt: '', align: 'center', bgColor: 'rgba(255,255,255,0.03)', radius: '8px', padding: '16px' })
    updateAttributes({ cols: layout.cols, colWidths: layout.widths, cells: newCells })
  }

  const updateCell = (index, updates) => {
    const newCells = [...cells]
    newCells[index] = { ...newCells[index], ...updates }
    updateAttributes({ cells: newCells })
  }

  const addCell = () => {
    const newCells = [...cells, { type: 'text', content: '', src: '', alt: '', align: 'center', bgColor: 'rgba(255,255,255,0.03)', radius: '8px', padding: '16px' }]
    updateAttributes({ cells: newCells, cols: newCells.length })
  }

  const removeCell = (index) => {
    if (cells.length <= 1) return
    const newCells = cells.filter((_, i) => i !== index)
    updateAttributes({ cells: newCells, cols: newCells.length })
  }

  const moveCell = (from, to) => {
    if (to < 0 || to >= cells.length) return
    const newCells = [...cells]
    const [moved] = newCells.splice(from, 1)
    newCells.splice(to, 0, moved)
    updateAttributes({ cells: newCells })
  }

  const gridCols = node.attrs.colWidths ? node.attrs.colWidths.join(' ') : `repeat(${node.attrs.cols || 2}, 1fr)`

  return (
    <NodeViewWrapper>
      <div ref={containerRef} style={{ margin: '1.5em 0', position: 'relative', width }} contentEditable={false}>
        <DragHandle />
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 12px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>GRID</span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <button onClick={() => setEditing(!editing)} style={btn(editing)}>Layout</button>
              <button onClick={addCell} style={btn(false, '#3b82f6')}>+ Cell</button>
              <button onClick={() => deleteNode()} style={delBtn()}>✕</button>
            </div>
          </div>

          {/* Layout picker */}
          {editing && (
            <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Layout:</span>
              {layouts.map((l, i) => (
                <button key={i} onClick={() => setLayout(l)} style={btn(node.attrs.cols === l.cols && JSON.stringify(node.attrs.colWidths) === JSON.stringify(l.widths))}>
                  <span style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                    {Array.from({ length: l.cols }).map((_, j) => (
                      <span key={j} style={{ width: l.widths ? `${(l.widths[j] === '2fr' ? 16 : l.widths[j] === '3fr' ? 22 : 10)}px` : '10px', height: '10px', background: 'currentColor', borderRadius: '2px', display: 'inline-block' }} />
                    ))}
                  </span>
                  {' '}{l.label}
                </button>
              ))}
              <div style={{ width: '1px', height: '18px', background: 'var(--glass-border)', margin: '0 4px' }} />
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Gap:</span>
              {['4px', '8px', '12px', '16px', '24px'].map(g => (
                <button key={g} onClick={() => updateAttributes({ gap: g })} style={btn(gap === g)}>{g}</button>
              ))}
            </div>
          )}

          {/* Grid cells */}
          <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap, padding: '12px', background: 'rgba(0,0,0,0.1)' }}>
            {cells.map((cell, i) => (
              <GridCell key={i} cell={cell} index={i} isActive={activeCell === i}
                onSelect={() => setActiveCell(activeCell === i ? null : i)}
                onUpdate={(updates) => updateCell(i, updates)}
                onRemove={() => removeCell(i)}
                onMoveLeft={() => moveCell(i, i - 1)}
                onMoveRight={() => moveCell(i, i + 1)}
                totalCells={cells.length} />
            ))}
          </div>
        </div>
        <ResizeHandle onMouseDown={onMouseDown} />
      </div>
    </NodeViewWrapper>
  )
}

function GridCell({ cell, index, isActive, onSelect, onUpdate, onRemove, onMoveLeft, onMoveRight, totalCells }) {
  const [showTypeMenu, setShowTypeMenu] = useState(false)
  const alignOptions = ['left', 'center', 'right']

  const cellStyles = {
    text: { bg: 'var(--bg)', radius: cell.radius || '8px' },
    image: { bg: 'transparent', radius: cell.radius || '8px' },
    video: { bg: 'rgba(0,0,0,0.3)', radius: cell.radius || '8px' },
    card: { bg: cell.bgColor || 'rgba(255,255,255,0.05)', radius: cell.radius || '12px' },
  }
  const cs = cellStyles[cell.type] || cellStyles.text

  return (
    <div onClick={onSelect} style={{ borderRadius: cs.radius, overflow: 'hidden', border: `1px solid ${isActive ? '#22c55e' : 'var(--glass-border)'}`, background: cs.bg, minHeight: '80px', cursor: 'pointer', transition: 'border-color 0.15s', position: 'relative' }}>
      {/* Cell toolbar */}
      {isActive && (
        <div style={{ display: 'flex', gap: '3px', padding: '4px 6px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', flexWrap: 'wrap', alignItems: 'center' }}>
          {cellTypes.map(t => (
            <button key={t.type} onClick={() => { onUpdate({ type: t.type }); setShowTypeMenu(false) }}
              style={btn(cell.type === t.type)}>{t.icon} {t.label}</button>
          ))}
          <div style={{ width: '1px', height: '16px', background: 'var(--glass-border)', margin: '0 3px' }} />
          {alignOptions.map(a => (
            <button key={a} onClick={() => onUpdate({ align: a })} style={btn(cell.align === a)}>{a[0].toUpperCase()}</button>
          ))}
          <div style={{ width: '1px', height: '16px', background: 'var(--glass-border)', margin: '0 3px' }} />
          {['rgba(255,255,255,0.03)', 'rgba(34,197,94,0.08)', 'rgba(59,130,246,0.08)', 'rgba(168,85,247,0.08)', 'rgba(245,158,11,0.08)', 'rgba(239,68,68,0.08)'].map((c, ci) => (
            <button key={ci} onClick={() => onUpdate({ bgColor: c })} style={{ width: '14px', height: '14px', borderRadius: '3px', border: `2px solid ${cell.bgColor === c ? '#22c55e' : 'var(--glass-border)'}`, background: c, cursor: 'pointer' }} />
          ))}
          <div style={{ width: '1px', height: '16px', background: 'var(--glass-border)', margin: '0 3px' }} />
          {['6px', '8px', '12px', '16px', '24px', '50%'].map(r => (
            <button key={r} onClick={() => onUpdate({ radius: r })} style={btn(cell.radius === r)}>{r === '50%' ? '⭕' : r}</button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '3px' }}>
            <button onClick={(e) => { e.stopPropagation(); onMoveLeft() }} disabled={index === 0} style={btn(false, '#f59e0b')}>◀</button>
            <button onClick={(e) => { e.stopPropagation(); onMoveRight() }} disabled={index === totalCells - 1} style={btn(false, '#f59e0b')}>▶</button>
            <button onClick={(e) => { e.stopPropagation(); onRemove() }} style={delBtn()}>✕</button>
          </div>
        </div>
      )}

      {/* Cell content */}
      <div style={{ padding: cell.padding || '16px', textAlign: cell.align || 'center', minHeight: '60px' }}>
        {cell.type === 'text' && (
          <div contentEditable suppressContentEditableWarning
            onBlur={e => onUpdate({ content: e.currentTarget.innerHTML })}
            dangerouslySetInnerHTML={{ __html: cell.content || '<span style="color:var(--text-muted);font-size:12px">Click to edit...</span>' }}
            style={{ outline: 'none', fontSize: '14px', lineHeight: 1.6, color: 'var(--text)', minHeight: '20px', wordBreak: 'break-word' }} />
        )}
        {cell.type === 'image' && (
          <div>
            {cell.src ? (
              <img src={cell.src} alt={cell.alt || ''} style={{ width: '100%', borderRadius: cell.radius || '8px', display: 'block' }} />
            ) : (
              <div style={{ padding: '20px', border: '2px dashed var(--glass-border)', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>🖼️</div>
                <input type="text" value={cell.src || ''} onChange={e => onUpdate({ src: e.target.value })} placeholder="Paste image URL..."
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'var(--text)', fontSize: '11px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            )}
            {cell.src && <input type="text" value={cell.alt || ''} onChange={e => onUpdate({ alt: e.target.value })} placeholder="Caption..." style={{ width: '100%', textAlign: 'center', border: 'none', background: 'transparent', color: 'var(--text-muted)', fontSize: '11px', fontStyle: 'italic', marginTop: '6px', outline: 'none' }} />}
          </div>
        )}
        {cell.type === 'video' && (
          <div>
            {cell.src ? (
              <div style={{ position: 'relative', paddingBottom: '56.25%', borderRadius: cell.radius || '8px', overflow: 'hidden' }}>
                <iframe src={cell.src} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} allowFullScreen />
              </div>
            ) : (
              <div style={{ padding: '20px', border: '2px dashed var(--glass-border)', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>🎬</div>
                <input type="text" value={cell.src || ''} onChange={e => onUpdate({ src: e.target.value })} placeholder="YouTube URL..."
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'var(--text)', fontSize: '11px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            )}
          </div>
        )}
        {cell.type === 'card' && (
          <div style={{ background: cell.bgColor || 'rgba(255,255,255,0.05)', borderRadius: cell.radius || '12px', padding: cell.padding || '16px', border: '1px solid var(--glass-border)', minHeight: '60px', textAlign: cell.align || 'center' }}>
            {cell.src ? (
              <img src={cell.src} alt={cell.alt || ''} style={{ width: '100%', borderRadius: '8px', marginBottom: '8px', display: 'block' }} />
            ) : (
              <div style={{ padding: '10px', border: '1px dashed var(--glass-border)', borderRadius: '6px', marginBottom: '8px', cursor: 'pointer' }} onClick={() => {
                const url = prompt('Image URL for card (leave empty to skip):')
                if (url) onUpdate({ src: url })
              }}>
                <span style={{ fontSize: '18px' }}>➕</span>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Add image</div>
              </div>
            )}
            <div contentEditable suppressContentEditableWarning
              onBlur={e => onUpdate({ content: e.currentTarget.innerHTML })}
              dangerouslySetInnerHTML={{ __html: cell.content || '<span style="color:var(--text-muted);font-size:12px">Card content...</span>' }}
              style={{ outline: 'none', fontSize: '13px', lineHeight: 1.5, color: 'var(--text)', minHeight: '16px', wordBreak: 'break-word' }} />
          </div>
        )}
      </div>
    </div>
  )
}

export const GridBlock = Node.create({
  name: 'gridBlock',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      cols: { default: 2 },
      colWidths: { default: null },
      gap: { default: '12px' },
      width: { default: '100%' },
      cells: {
        default: [
          { type: 'text', content: '', src: '', alt: '', align: 'center', bgColor: 'rgba(255,255,255,0.03)', radius: '8px', padding: '16px' },
          { type: 'text', content: '', src: '', alt: '', align: 'center', bgColor: 'rgba(255,255,255,0.03)', radius: '8px', padding: '16px' }
        ]
      }
    }
  },

  parseHTML() { return [{ tag: 'div[data-grid-block]' }] },
  renderHTML({ HTMLAttributes }) { return ['div', mergeAttributes(HTMLAttributes, { 'data-grid-block': '' })] },
  addNodeView() { return ReactNodeViewRenderer(GridBlockComponent) }
})

/* ═══════════════════════════════════════════════════════ */
/*  CARD BLOCK — enhanced content card                    */
/* ═══════════════════════════════════════════════════════ */
function CardBlockComponent({ node, updateAttributes, deleteNode }) {
  const [editing, setEditing] = useState(false)
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const { width, onMouseDown } = useResizable(node.attrs.width, containerRef, updateAttributes, 200)

  useEffect(() => {
    if (contentRef.current && !contentRef.current.hasChildNodes()) {
      const empty = document.createElement('p')
      empty.textContent = ''
      contentRef.current.appendChild(empty)
    }
  }, [])

  const colorPresets = [
    { label: 'Default', bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.08)' },
    { label: 'Green', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.3)' },
    { label: 'Blue', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.3)' },
    { label: 'Purple', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.3)' },
    { label: 'Amber', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)' },
    { label: 'Red', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.3)' },
    { label: 'Cyan', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.3)' },
    { label: 'Pink', bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.3)' },
  ]

  return (
    <NodeViewWrapper>
      <div ref={containerRef} style={{ margin: '1.5em 0', position: 'relative', width }} contentEditable={false}>
        <DragHandle />
        <div style={{ borderRadius: node.attrs.radius || '12px', overflow: 'hidden', border: `1px solid ${node.attrs.borderColor || 'var(--glass-border)'}`, background: node.attrs.bgColor || 'rgba(255,255,255,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 12px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>CARD</span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <button onClick={() => setEditing(!editing)} style={btn(editing)}>Style</button>
              <button onClick={() => deleteNode()} style={delBtn()}>✕</button>
            </div>
          </div>
          {editing && (
            <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Color:</span>
              {colorPresets.map((c, i) => (
                <button key={i} onClick={() => updateAttributes({ bgColor: c.bg, borderColor: c.border })} title={c.label}
                  style={{ width: '18px', height: '18px', borderRadius: '4px', border: `2px solid ${node.attrs.bgColor === c.bg ? '#22c55e' : 'var(--glass-border)'}`, background: c.bg, cursor: 'pointer' }} />
              ))}
              <input type="color" value={node.attrs.customColor || '#0f1424'} onChange={e => { updateAttributes({ bgColor: e.target.value + '15', borderColor: e.target.value + '55', customColor: e.target.value }) }}
                style={{ width: '20px', height: '18px', border: '1px solid var(--glass-border)', borderRadius: '4px', cursor: 'pointer', padding: 0 }} title="Custom color" />
              <div style={{ width: '1px', height: '18px', background: 'var(--glass-border)', margin: '0 4px' }} />
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Radius:</span>
              {['0px', '8px', '12px', '20px', '50%'].map(r => (
                <button key={r} onClick={() => updateAttributes({ radius: r })} style={btn(node.attrs.radius === r)}>{r === '50%' ? 'Full' : r}</button>
              ))}
              <div style={{ width: '1px', height: '18px', background: 'var(--glass-border)', margin: '0 4px' }} />
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Pad:</span>
              {['12px', '20px', '32px', '48px'].map(p => (
                <button key={p} onClick={() => updateAttributes({ padding: p })} style={btn(node.attrs.padding === p)}>{p}</button>
              ))}
            </div>
          )}
          <div ref={contentRef} data-card-content style={{ padding: node.attrs.padding || '24px' }} />
        </div>
        <ResizeHandle onMouseDown={onMouseDown} />
      </div>
    </NodeViewWrapper>
  )
}

export const CardBlock = Node.create({
  name: 'cardBlock',
  group: 'block',
  content: 'block+',
  defining: true,

  addAttributes() {
    return {
      bgColor: { default: 'rgba(255,255,255,0.03)' },
      borderColor: { default: 'var(--glass-border)' },
      customColor: { default: '#0f1424' },
      padding: { default: '24px' },
      radius: { default: '12px' },
      width: { default: '100%' }
    }
  },

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

  const colPresets = [
    { label: '1:2', widths: ['1fr', '2fr'] },
    { label: '2:1', widths: ['2fr', '1fr'] },
    { label: '1:1:1', widths: null },
    { label: '1:2:1', widths: ['1fr', '2fr', '1fr'] },
    { label: '2:1:1', widths: ['2fr', '1fr', '1fr'] },
    { label: '1:1:2', widths: ['1fr', '1fr', '2fr'] },
  ]

  const gridTemplate = node.attrs.colWidths ? node.attrs.colWidths.join(' ') : `repeat(${cols}, 1fr)`

  return (
    <NodeViewWrapper>
      <div ref={containerRef} style={{ margin: '1.5em 0', position: 'relative', width }} contentEditable={false}>
        <DragHandle />
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 12px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>COLUMNS</span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              {[2, 3, 4].map(n => (
                <button key={n} onClick={() => { updateAttributes({ cols: n, colWidths: null }) }} style={btn(cols === n)}>{n}Col</button>
              ))}
              <div style={{ width: '1px', height: '16px', background: 'var(--glass-border)', margin: '0 4px' }} />
              <button onClick={() => setEditing(!editing)} style={btn(editing)}>Layout</button>
              <button onClick={() => deleteNode()} style={delBtn()}>✕</button>
            </div>
          </div>
          {editing && (
            <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Width:</span>
              {colPresets.filter(p => (p.widths?.length || 3) === cols || (!p.widths && cols === 3)).map((p, i) => (
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
  name: 'columnsBlock',
  group: 'block',
  content: 'block+',
  defining: true,
  addAttributes() {
    return { cols: { default: 2 }, colWidths: { default: null }, width: { default: '100%' } }
  },
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
  const startX = useRef(0)
  const startW = useRef(0)
  useEffect(() => { updateAttributes({ width }) }, [width])

  const onMouseDown = useCallback((e) => {
    e.preventDefault()
    startX.current = e.clientX
    startW.current = imgRef.current?.offsetWidth || 400
    const onMove = (e) => { setWidth(Math.max(100, startW.current + (e.clientX - startX.current)) + 'px') }
    const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp) }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [])

  return (
    <NodeViewWrapper>
      <div style={{ margin: '1.5em 0', textAlign: align, position: 'relative' }} contentEditable={false}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
          {['left', 'center', 'right'].map(a => (
            <button key={a} onClick={() => { setAlign(a); updateAttributes({ align: a }) }} style={btn(align === a)}>{a[0].toUpperCase()}</button>
          ))}
          <button onClick={() => setResizable(!resizable)} style={btn(resizable, '#3b82f6')}>Resize</button>
          <button onClick={() => deleteNode()} style={delBtn()}>✕</button>
        </div>
        <div style={{ position: 'relative', display: 'inline-block', width }}>
          <img ref={imgRef} src={node.attrs.src} alt={node.attrs.alt || ''} style={{ width: '100%', borderRadius: '12px', cursor: resizable ? 'ew-resize' : 'default', userSelect: 'none', display: 'block' }} onMouseDown={resizable ? onMouseDown : undefined} />
          {resizable && <ResizeHandle onMouseDown={onMouseDown} />}
        </div>
        {node.attrs.caption !== false && (
          <input type="text" value={node.attrs.alt || ''} onChange={e => updateAttributes({ alt: e.target.value })} placeholder="Image caption..." style={{ width: '100%', textAlign: 'center', border: 'none', background: 'transparent', color: 'var(--text-muted)', fontSize: '12px', fontStyle: 'italic', marginTop: '8px', outline: 'none' }} />
        )}
      </div>
    </NodeViewWrapper>
  )
}

export const ResizableImage = Node.create({
  name: 'resizableImage',
  group: 'block',
  atom: true,
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
    const startX = e.clientX
    const startW = containerRef.current?.offsetWidth || 640
    const onMove = (e) => { setWidth(Math.max(200, startW + (e.clientX - startX)) + 'px') }
    const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp) }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [])

  const isYoutube = node.attrs.src?.includes('youtube') || node.attrs.src?.includes('youtu.be')

  return (
    <NodeViewWrapper>
      <div style={{ margin: '1.5em 0', textAlign: align, position: 'relative' }} contentEditable={false}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
          {['left', 'center', 'right'].map(a => (
            <button key={a} onClick={() => { setAlign(a); updateAttributes({ align: a }) }} style={btn(align === a)}>{a[0].toUpperCase()}</button>
          ))}
          <button onClick={() => setResizable(!resizable)} style={btn(resizable, '#3b82f6')}>Resize</button>
          <button onClick={() => deleteNode()} style={delBtn()}>✕</button>
        </div>
        <div ref={containerRef} style={{ position: 'relative', display: 'inline-block', width, maxWidth: '100%' }}>
          {isYoutube ? (
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px' }}>
              <iframe src={node.attrs.src} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', borderRadius: '12px' }} allowFullScreen />
            </div>
          ) : (
            <video src={node.attrs.src} controls style={{ width: '100%', borderRadius: '12px', display: 'block' }} />
          )}
          {resizable && <ResizeHandle onMouseDown={onMouseDown} />}
        </div>
      </div>
    </NodeViewWrapper>
  )
}

export const ResizableVideo = Node.create({
  name: 'resizableVideo',
  group: 'block',
  atom: true,
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
  const s = templates[node.attrs.type || 'info']

  return (
    <NodeViewWrapper>
      <div style={{ margin: '1.5em 0', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${s.border}33` }}>
        <div style={{ padding: '6px 12px', borderBottom: `1px solid ${s.border}22`, background: s.bg, display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', marginRight: '4px' }}>{s.icon}</span>
          {Object.entries(templates).map(([key, val]) => (
            <button key={key} onClick={() => updateAttributes({ type: key })} style={btn(node.attrs.type === key, val.border)}>{val.icon} {val.label}</button>
          ))}
          <button onClick={() => deleteNode()} style={{ ...delBtn(), marginLeft: 'auto' }}>✕</button>
        </div>
        <div style={{ padding: '16px 20px', background: s.bg, borderLeft: `3px solid ${s.border}` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ fontSize: '20px', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>{s.icon}</span>
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
  name: 'callout',
  group: 'block',
  content: 'block+',
  defining: true,
  addAttributes() { return { type: { default: 'info' } } },
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
  name: 'spacer',
  group: 'block',
  atom: true,
  parseHTML() { return [{ tag: 'div[data-spacer]' }] },
  renderHTML() { return ['div', { 'data-spacer': '' }] },
  addNodeView() { return ReactNodeViewRenderer(SpacerComponent) }
})
