import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { NodeViewWrapper } from '@tiptap/react'
import { useState, useRef, useCallback, useEffect } from 'react'

function CardBlockComponent({ node, updateAttributes, deleteNode }) {
  const [editing, setEditing] = useState(false)

  return (
    <NodeViewWrapper>
      <div style={{ margin: '1.5em 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)', background: node.attrs.bgColor || 'rgba(255,255,255,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>CARD BLOCK</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={() => setEditing(!editing)} style={{ padding: '3px 8px', fontSize: '9px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: editing ? 'rgba(34,197,94,0.2)' : 'transparent', color: editing ? '#22c55e' : 'var(--text-muted)', cursor: 'pointer', fontFamily: "var(--font-code)" }}>Style</button>
            <button onClick={() => deleteNode()} style={{ padding: '3px 8px', fontSize: '9px', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontFamily: "var(--font-code)" }}>✕</button>
          </div>
        </div>
        {editing && (
          <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <label style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>BG:
              <input type="color" value={node.attrs.bgColor || '#0f1424'} onChange={e => updateAttributes({ bgColor: e.target.value })} style={{ width: '24px', height: '20px', border: 'none', marginLeft: '4px', cursor: 'pointer' }} />
            </label>
            <label style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Padding:
              <select value={node.attrs.padding || '24px'} onChange={e => updateAttributes({ padding: e.target.value })} style={{ marginLeft: '4px', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '10px' }}>
                <option value="12px">Small</option>
                <option value="24px">Medium</option>
                <option value="40px">Large</option>
              </select>
            </label>
            <label style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>Radius:
              <select value={node.attrs.radius || '12px'} onChange={e => updateAttributes({ radius: e.target.value })} style={{ marginLeft: '4px', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '10px' }}>
                <option value="0px">None</option>
                <option value="8px">Small</option>
                <option value="12px">Medium</option>
                <option value="20px">Large</option>
                <option value="50%">Full Round</option>
              </select>
            </label>
          </div>
        )}
        <div data-card-content style={{ padding: node.attrs.padding || '24px', borderRadius: node.attrs.radius || '12px' }} />
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
      padding: { default: '24px' },
      radius: { default: '12px' }
    }
  },

  parseHTML() { return [{ tag: 'div[data-card-block]' }] },
  renderHTML({ HTMLAttributes }) { return ['div', mergeAttributes(HTMLAttributes, { 'data-card-block': '' }), 0] },

  addNodeView() { return ReactNodeViewRenderer(CardBlockComponent) }
})

function ColumnsBlockComponent({ node, updateAttributes, deleteNode }) {
  const cols = node.attrs.cols || 2
  return (
    <NodeViewWrapper>
      <div style={{ margin: '1.5em 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>COLUMNS</span>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {[2, 3, 4].map(n => (
              <button key={n} onClick={() => updateAttributes({ cols: n })} style={{ padding: '3px 8px', fontSize: '9px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: cols === n ? 'rgba(34,197,94,0.2)' : 'transparent', color: cols === n ? '#22c55e' : 'var(--text-muted)', cursor: 'pointer', fontFamily: "var(--font-code)" }}>{n}Col</button>
            ))}
            <button onClick={() => deleteNode()} style={{ padding: '3px 8px', fontSize: '9px', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontFamily: "var(--font-code)" }}>✕</button>
          </div>
        </div>
        <div data-cols-content style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '1px', background: 'var(--glass-border)' }}>
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} style={{ background: 'var(--bg)', minHeight: '60px' }} />
          ))}
        </div>
      </div>
    </NodeViewWrapper>
  )
}

export const ColumnsBlock = Node.create({
  name: 'columnsBlock',
  group: 'block',
  content: 'block+',
  defining: true,

  addAttributes() { return { cols: { default: 2 } } },

  parseHTML() { return [{ tag: 'div[data-columns-block]' }] },
  renderHTML({ HTMLAttributes }) { return ['div', mergeAttributes(HTMLAttributes, { 'data-columns-block': '' }), 0] },

  addNodeView() { return ReactNodeViewRenderer(ColumnsBlockComponent) }
})

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
    const onMouseMove = (e) => {
      const diff = e.clientX - startX.current
      const newW = Math.max(100, startW.current + diff)
      setWidth(newW + 'px')
    }
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [])

  return (
    <NodeViewWrapper>
      <div style={{ margin: '1.5em 0', textAlign: align, position: 'relative' }} contentEditable={false}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
          {['left', 'center', 'right'].map(a => (
            <button key={a} onClick={() => { setAlign(a); updateAttributes({ align: a }) }} style={{ padding: '2px 8px', fontSize: '9px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: align === a ? 'rgba(34,197,94,0.2)' : 'transparent', color: align === a ? '#22c55e' : 'var(--text-muted)', cursor: 'pointer', fontFamily: "var(--font-code)" }}>{a[0].toUpperCase()}</button>
          ))}
          <button onClick={() => setResizable(!resizable)} style={{ padding: '2px 8px', fontSize: '9px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: resizable ? 'rgba(59,130,246,0.2)' : 'transparent', color: resizable ? '#3b82f6' : 'var(--text-muted)', cursor: 'pointer', fontFamily: "var(--font-code)" }}>Resize</button>
          <button onClick={() => deleteNode()} style={{ padding: '2px 8px', fontSize: '9px', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontFamily: "var(--font-code)" }}>✕</button>
        </div>
        <div style={{ position: 'relative', display: 'inline-block', width }}>
          <img ref={imgRef} src={node.attrs.src} alt={node.attrs.alt || ''} style={{ width: '100%', borderRadius: '12px', cursor: resizable ? 'ew-resize' : 'default', userSelect: 'none', display: 'block' }} onMouseDown={resizable ? onMouseDown : undefined} />
          {resizable && (
            <>
              <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '8px', cursor: 'ew-resize', background: 'rgba(59,130,246,0.5)', borderRadius: '0 12px 12px 0', opacity: 0 }} onMouseDown={onMouseDown} />
              <div style={{ position: 'absolute', top: '50%', right: '-12px', transform: 'translateY(-50%)', width: '8px', height: '32px', background: '#3b82f6', borderRadius: '4px', cursor: 'ew-resize', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseDown={onMouseDown}>
                <div style={{ width: '2px', height: '16px', background: '#fff', borderRadius: '1px' }} />
              </div>
            </>
          )}
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

  addAttributes() {
    return {
      src: { default: '' },
      alt: { default: '' },
      width: { default: '100%' },
      align: { default: 'center' },
      caption: { default: true }
    }
  },

  parseHTML() { return [{ tag: 'img[data-resizable]' }] },
  renderHTML({ HTMLAttributes }) { return ['img', mergeAttributes(HTMLAttributes, { 'data-resizable': '' })] },

  addNodeView() { return ReactNodeViewRenderer(ResizableImageComponent) }
})

function ResizableVideoComponent({ node, updateAttributes, deleteNode }) {
  const [resizable, setResizable] = useState(false)
  const [width, setWidth] = useState(node.attrs.width || '100%')
  const [align, setAlign] = useState(node.attrs.align || 'center')
  const containerRef = useRef(null)
  const startX = useRef(0)
  const startW = useRef(0)

  useEffect(() => { updateAttributes({ width }) }, [width])

  const onMouseDown = useCallback((e) => {
    e.preventDefault()
    startX.current = e.clientX
    startW.current = containerRef.current?.offsetWidth || 640
    const onMouseMove = (e) => {
      const diff = e.clientX - startX.current
      const newW = Math.max(200, startW.current + diff)
      setWidth(newW + 'px')
    }
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [])

  const isYoutube = node.attrs.src?.includes('youtube') || node.attrs.src?.includes('youtu.be')

  return (
    <NodeViewWrapper>
      <div style={{ margin: '1.5em 0', textAlign: align, position: 'relative' }} contentEditable={false}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
          {['left', 'center', 'right'].map(a => (
            <button key={a} onClick={() => { setAlign(a); updateAttributes({ align: a }) }} style={{ padding: '2px 8px', fontSize: '9px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: align === a ? 'rgba(34,197,94,0.2)' : 'transparent', color: align === a ? '#22c55e' : 'var(--text-muted)', cursor: 'pointer', fontFamily: "var(--font-code)" }}>{a[0].toUpperCase()}</button>
          ))}
          <button onClick={() => setResizable(!resizable)} style={{ padding: '2px 8px', fontSize: '9px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: resizable ? 'rgba(59,130,246,0.2)' : 'transparent', color: resizable ? '#3b82f6' : 'var(--text-muted)', cursor: 'pointer', fontFamily: "var(--font-code)" }}>Resize</button>
          <button onClick={() => deleteNode()} style={{ padding: '2px 8px', fontSize: '9px', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontFamily: "var(--font-code)" }}>✕</button>
        </div>
        <div ref={containerRef} style={{ position: 'relative', display: 'inline-block', width, maxWidth: '100%' }}>
          {isYoutube ? (
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px' }}>
              <iframe src={node.attrs.src} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', borderRadius: '12px' }} allowFullScreen />
            </div>
          ) : (
            <video src={node.attrs.src} controls style={{ width: '100%', borderRadius: '12px', display: 'block' }} />
          )}
          {resizable && (
            <div style={{ position: 'absolute', top: '50%', right: '-12px', transform: 'translateY(-50%)', width: '8px', height: '32px', background: '#3b82f6', borderRadius: '4px', cursor: 'ew-resize', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseDown={onMouseDown}>
              <div style={{ width: '2px', height: '16px', background: '#fff', borderRadius: '1px' }} />
            </div>
          )}
        </div>
      </div>
    </NodeViewWrapper>
  )
}

export const ResizableVideo = Node.create({
  name: 'resizableVideo',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: { default: '' },
      width: { default: '100%' },
      align: { default: 'center' }
    }
  },

  parseHTML() { return [{ tag: 'div[data-resizable-video]' }] },
  renderHTML({ HTMLAttributes }) { return ['div', mergeAttributes(HTMLAttributes, { 'data-resizable-video': '' })] },

  addNodeView() { return ReactNodeViewRenderer(ResizableVideoComponent) }
})

function CalloutComponent({ node, updateAttributes, deleteNode }) {
  const styles = {
    info: { bg: 'rgba(59,130,246,0.08)', border: '#3b82f6', icon: '💡' },
    warning: { bg: 'rgba(245,158,11,0.08)', border: '#f59e0b', icon: '⚠️' },
    success: { bg: 'rgba(34,197,94,0.08)', border: '#22c55e', icon: '✅' },
    danger: { bg: 'rgba(239,68,68,0.08)', border: '#ef4444', icon: '🚨' },
    tip: { bg: 'rgba(168,85,247,0.08)', border: '#a855f7', icon: '🎯' }
  }
  const s = styles[node.attrs.type || 'info']

  return (
    <NodeViewWrapper>
      <div style={{ margin: '1.5em 0', padding: '16px 20px', borderRadius: '12px', background: s.bg, borderLeft: `3px solid ${s.border}`, position: 'relative' }}>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
          {Object.entries(styles).map(([key, val]) => (
            <button key={key} onClick={() => updateAttributes({ type: key })} style={{ padding: '2px 8px', fontSize: '9px', borderRadius: '4px', border: `1px solid ${node.attrs.type === key ? val.border : 'var(--glass-border)'}`, background: node.attrs.type === key ? `${val.border}22` : 'transparent', color: node.attrs.type === key ? val.border : 'var(--text-muted)', cursor: 'pointer', fontFamily: "var(--font-code)" }}>{val.icon}</button>
          ))}
          <button onClick={() => deleteNode()} style={{ marginLeft: 'auto', padding: '2px 8px', fontSize: '9px', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontFamily: "var(--font-code)" }}>✕</button>
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

function SpacerComponent({ deleteNode }) {
  return (
    <NodeViewWrapper>
      <div style={{ margin: '8px 0', padding: '8px', border: '1px dashed var(--glass-border)', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} contentEditable={false}>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)" }}>SPACER</span>
        <button onClick={() => deleteNode()} style={{ padding: '2px 8px', fontSize: '9px', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontFamily: "var(--font-code)" }}>✕</button>
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
