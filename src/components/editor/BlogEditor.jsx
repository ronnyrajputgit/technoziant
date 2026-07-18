import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Youtube from '@tiptap/extension-youtube'
import Blockquote from '@tiptap/extension-blockquote'
import { Table, TableRow, TableCell, TableHeader } from '@tiptap/extension-table'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import { CardBlock, ColumnsBlock, GridBlock, ResizableImage, ResizableVideo, Callout, Spacer } from './CustomExtensions'
import { useState, useCallback, useEffect, useRef } from 'react'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import UndoIcon from '@mui/icons-material/Undo'
import RedoIcon from '@mui/icons-material/Redo'
import ImageIcon from '@mui/icons-material/Image'
import VideocamIcon from '@mui/icons-material/Videocam'
import ViewColumnIcon from '@mui/icons-material/ViewColumn'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing'
import SpaceBarIcon from '@mui/icons-material/SpaceBar'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import TableChartIcon from '@mui/icons-material/TableChart'
import CodeIcon from '@mui/icons-material/Code'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import LinkIcon from '@mui/icons-material/Link'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import PublishIcon from '@mui/icons-material/Publish'
import CloseIcon from '@mui/icons-material/Close'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import FormatSizeIcon from '@mui/icons-material/FormatSize'

function MediaModal({ open, onClose, onInsert, type }) {
  const [tab, setTab] = useState('url')
  const [url, setUrl] = useState('')
  const [alt, setAlt] = useState('')
  const fileRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  useEffect(() => { if (open) { setUrl(''); setAlt(''); setTab('url') } }, [open])
  if (!open) return null

  const handleFile = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => { onInsert({ type: type === 'video' ? 'video' : 'image', src: reader.result, alt: file.name }); onClose() }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files?.[0]; if (f && f.type.startsWith(type === 'video' ? 'video/' : 'image/')) handleFile(f) }

  const handleInsert = () => {
    if (!url.trim()) return
    if (type === 'video') {
      const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/)
      onInsert({ type: 'video', src: yt ? `https://www.youtube.com/embed/${yt[1]}` : url, alt })
    } else { onInsert({ type: 'image', src: url.trim(), alt }) }
    onClose()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="liquid-glass" style={{ width: '100%', maxWidth: '520px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {type === 'video' ? <OndemandVideoIcon sx={{ color: '#22c55e', fontSize: 20 }} /> : <AddPhotoAlternateIcon sx={{ color: '#22c55e', fontSize: 20 }} />}
            <h3 style={{ fontSize: '16px', fontWeight: '600' }}>{type === 'video' ? 'Insert Video' : 'Insert Image'}</h3>
          </div>
          <button onClick={onClose} style={{ padding: '6px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><CloseIcon sx={{ fontSize: 16 }} /></button>
        </div>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)' }}>
          <button onClick={() => setTab('url')} style={{ flex: 1, padding: '12px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', border: 'none', borderBottom: tab === 'url' ? '2px solid #22c55e' : '2px solid transparent', background: 'transparent', color: tab === 'url' ? '#22c55e' : 'var(--text-muted)', fontFamily: "var(--font-code)", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <LinkIcon sx={{ fontSize: 14 }} /> URL
          </button>
          <button onClick={() => setTab('upload')} style={{ flex: 1, padding: '12px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', border: 'none', borderBottom: tab === 'upload' ? '2px solid #22c55e' : '2px solid transparent', background: 'transparent', color: tab === 'upload' ? '#22c55e' : 'var(--text-muted)', fontFamily: "var(--font-code)", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <CloudUploadIcon sx={{ fontSize: 14 }} /> Upload
          </button>
        </div>
        <div style={{ padding: '24px' }}>
          {tab === 'url' ? (
            <div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginBottom: '6px', display: 'block' }}>Media URL</label>
                <input type="text" value={url} onChange={e => setUrl(e.target.value)} autoFocus placeholder={type === 'video' ? 'https://youtube.com/watch?v=...' : 'https://example.com/image.jpg'}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }} onKeyDown={e => e.key === 'Enter' && handleInsert()} />
              </div>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginBottom: '6px', display: 'block' }}>Caption (Optional)</label>
                <input type="text" value={alt} onChange={e => setAlt(e.target.value)} placeholder="Describe this media..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }} />
              </div>
              {url && type === 'image' && <div style={{ marginBottom: '18px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}><img src={url} alt="" style={{ width: '100%', maxHeight: '220px', objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display = 'none'} /></div>}
              {url && type === 'video' && url.includes('youtube') && <div style={{ marginBottom: '18px', borderRadius: '12px', overflow: 'hidden', aspectRatio: '16/9', border: '1px solid var(--glass-border)' }}><iframe src={url.includes('embed') ? url : `https://www.youtube.com/embed/${url.match(/v=([^&]+)/)?.[1] || ''}`} style={{ width: '100%', height: '100%', border: 'none' }} allowFullScreen /></div>}
              <button onClick={handleInsert} disabled={!url.trim()} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', background: url.trim() ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'var(--glass)', color: url.trim() ? '#fff' : 'var(--text-muted)', fontSize: '14px', fontWeight: '600', cursor: url.trim() ? 'pointer' : 'not-allowed', fontFamily: "var(--font-code)", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}>
                <AddCircleOutlineIcon sx={{ fontSize: 18 }} /> Insert
              </button>
            </div>
          ) : (
            <div onDragOver={e => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={handleDrop} onClick={() => fileRef.current?.click()}
              style={{ border: `2px dashed ${dragging ? '#22c55e' : 'var(--glass-border)'}`, borderRadius: '16px', padding: '50px 20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', background: dragging ? 'rgba(34,197,94,0.05)' : 'transparent' }}>
              <input ref={fileRef} type="file" accept={type === 'video' ? 'video/*' : 'image/*'} onChange={e => handleFile(e.target.files?.[0])} style={{ display: 'none' }} />
              <CloudUploadIcon sx={{ fontSize: 48, color: dragging ? '#22c55e' : 'var(--text-muted)', mb: 1 }} />
              <p style={{ fontSize: '14px', color: 'var(--text)', marginBottom: '4px', fontWeight: '500' }}>Click or drag to upload</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Supports {type === 'video' ? 'MP4, WebM, OGG' : 'JPG, PNG, GIF, WebP'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function LinkModal({ open, onClose, onInsert }) {
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')
  useEffect(() => { if (open) { setUrl(''); setText('') } }, [open])
  if (!open) return null
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="liquid-glass" style={{ width: '100%', maxWidth: '440px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <LinkIcon sx={{ color: '#22c55e', fontSize: 20 }} />
            <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Insert Link</h3>
          </div>
          <button onClick={onClose} style={{ padding: '6px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><CloseIcon sx={{ fontSize: 16 }} /></button>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginBottom: '6px', display: 'block' }}>URL</label>
            <input type="text" value={url} onChange={e => setUrl(e.target.value)} autoFocus placeholder="https://example.com"
              style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} onKeyDown={e => e.key === 'Enter' && url.trim() && (onInsert(url.trim(), text), onClose())} />
          </div>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginBottom: '6px', display: 'block' }}>Link Text (Optional)</label>
            <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Display text..."
              style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <button onClick={() => { if (url.trim()) { onInsert(url.trim(), text); onClose() } }} disabled={!url.trim()}
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', background: url.trim() ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'var(--glass)', color: url.trim() ? '#fff' : 'var(--text-muted)', fontSize: '14px', fontWeight: '600', cursor: url.trim() ? 'pointer' : 'not-allowed', fontFamily: "var(--font-code)", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <LinkIcon sx={{ fontSize: 18 }} /> Insert Link
          </button>
        </div>
      </div>
    </div>
  )
}

function TableToolbar({ editor }) {
  if (!editor || !editor.isActive('table')) return null
  const addCol = () => editor.chain().focus().addColumnAfter().run()
  const addRow = () => editor.chain().focus().addRowAfter().run()
  const delCol = () => editor.chain().focus().deleteColumn().run()
  const delRow = () => editor.chain().focus().deleteRow().run()
  const delTable = () => editor.chain().focus().deleteTable().run()
  const mergeCells = () => editor.chain().focus().mergeCells().run()
  const splitCell = () => editor.chain().focus().splitCell().run()

  const TBtn = ({ onClick, children, color }) => (
    <button onClick={onClick} style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'transparent', color: color || 'var(--text)', fontSize: '11px', cursor: 'pointer', fontFamily: "var(--font-code)", display: 'flex', alignItems: 'center', gap: '4px', transition: 'all 0.15s' }}
      onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
      onMouseOut={e => { e.currentTarget.style.background = 'transparent' }}>
      {children}
    </button>
  )

  return (
    <div style={{ position: 'sticky', top: '90px', zIndex: 50, display: 'flex', gap: '4px', padding: '6px 12px', marginBottom: '8px', borderRadius: '10px', background: 'var(--bg)', border: '1px solid var(--glass-border)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginRight: '4px' }}>TABLE</span>
      <TBtn onClick={addRow}><AddCircleOutlineIcon sx={{ fontSize: 14, color: '#22c55e' }} /> Row</TBtn>
      <TBtn onClick={addCol}><AddCircleOutlineIcon sx={{ fontSize: 14, color: '#3b82f6' }} /> Col</TBtn>
      <div style={{ width: '1px', height: '20px', background: 'var(--glass-border)', margin: '0 4px' }} />
      <TBtn onClick={delRow}><RemoveCircleOutlineIcon sx={{ fontSize: 14, color: '#f59e0b' }} /> Row</TBtn>
      <TBtn onClick={delCol}><RemoveCircleOutlineIcon sx={{ fontSize: 14, color: '#f59e0b' }} /> Col</TBtn>
      <div style={{ width: '1px', height: '20px', background: 'var(--glass-border)', margin: '0 4px' }} />
      <TBtn onClick={mergeCells}>Merge</TBtn>
      <TBtn onClick={splitCell}>Split</TBtn>
      <div style={{ width: '1px', height: '20px', background: 'var(--glass-border)', margin: '0 4px' }} />
      <TBtn onClick={delTable} color="#ef4444">Delete Table</TBtn>
    </div>
  )
}

export function BlogEditor({ initialContent = {}, onSave, saving }) {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [coverModal, setCoverModal] = useState(false)
  const [showInsert, setShowInsert] = useState(true)
  const [showColor, setShowColor] = useState(false)
  const [mediaModal, setMediaModal] = useState({ open: false, type: 'image' })
  const [linkModal, setLinkModal] = useState(false)
  const [showHeadings, setShowHeadings] = useState(false)
  const toolbarRef = useRef(null)

  const [, forceUpdate] = useState(0)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
      Image.configure({ inline: false, allowBase64: true }),
      Placeholder.configure({ placeholder: 'Start writing your story...' }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline, Highlight, Link.configure({ openOnClick: false }),
      Youtube, Blockquote, TextStyle, Color, FontFamily,
      Dropcursor.configure({ color: '#22c55e', width: 2 }), Gapcursor,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      CardBlock, ColumnsBlock, GridBlock, ResizableImage, ResizableVideo, Callout, Spacer
    ],
    content: initialContent.content || '',
    editorProps: { attributes: { style: 'min-height: 600px; padding: 32px; outline: none; font-size: 16px; line-height: 1.8;' } },
    onTransaction: () => forceUpdate(n => n + 1)
  })

  useEffect(() => {
    if (editor && initialContent.id) {
      setTitle(initialContent.title || '')
      setExcerpt(initialContent.excerpt || '')
      setCoverImage(initialContent.cover_image || '')
      setCategory(initialContent.category || '')
      setTags((initialContent.tags || []).join(', '))
      if (initialContent.content) editor.commands.setContent(initialContent.content)
    }
  }, [initialContent.id, initialContent.title, initialContent.excerpt, initialContent.cover_image, initialContent.tags, initialContent.content, initialContent.category, editor])

  useEffect(() => {
    const handler = (e) => { if (toolbarRef.current && !toolbarRef.current.contains(e.target)) { setShowColor(false); setShowHeadings(false) } }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const insertBlock = (type) => {
    if (!editor) return
    const emptyCell = { type: 'text', content: '', src: '', alt: '', align: 'center', bgColor: 'rgba(255,255,255,0.03)', radius: '8px', padding: '16px' }
    switch (type) {
      case 'grid': editor.chain().focus().insertContent({ type: 'gridBlock', attrs: { cols: 2, cells: [emptyCell, emptyCell] } }).run(); break
      case 'card': editor.chain().focus().insertContent({ type: 'cardBlock', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Card content...' }] }] }).run(); break
      case 'columns2': editor.chain().focus().insertContent({ type: 'columnsBlock', attrs: { cols: 2 }, content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Column 1' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'Column 2' }] }] }).run(); break
      case 'columns3': editor.chain().focus().insertContent({ type: 'columnsBlock', attrs: { cols: 3 }, content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Col 1' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'Col 2' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'Col 3' }] }] }).run(); break
      case 'callout': editor.chain().focus().insertContent({ type: 'callout', attrs: { type: 'info' }, content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Important information...' }] }] }).run(); break
      case 'spacer': editor.chain().focus().insertContent({ type: 'spacer' }).run(); break
      case 'image': setMediaModal({ open: true, type: 'image' }); break
      case 'youtube': setMediaModal({ open: true, type: 'video' }); break
      case 'hr': editor.chain().focus().setHorizontalRule().run(); break
      case 'table': editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run(); break
      case 'codeblock': editor.chain().focus().toggleCodeBlock().run(); break
    }
  }

  const handleSave = useCallback((published) => {
    if (!title.trim()) { alert('Title is required'); return }
    onSave({ title: title.trim(), content: editor.getJSON(), excerpt: excerpt.trim(), cover_image: coverImage.trim(), category: category.trim(), tags: tags.split(',').map(t => t.trim()).filter(Boolean), published })
    setLastSaved(new Date())
  }, [title, editor, excerpt, coverImage, category, tags, onSave])

  if (!editor) return null

  const ToolButton = ({ active, onClick, children, tooltip }) => (
    <button onClick={onClick} title={tooltip} style={{ padding: '6px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: active ? 'rgba(34,197,94,0.15)' : 'transparent', color: active ? '#22c55e' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
      {children}
    </button>
  )

  const Sep = () => <div style={{ width: '1px', background: 'var(--glass-border)', margin: '0 4px', alignSelf: 'stretch' }} />

  return (
    <div style={{ position: 'relative' }}>
      <MediaModal open={coverModal} onClose={() => setCoverModal(false)} onInsert={(d) => { setCoverImage(d.src); setCoverModal(false) }} type="image" />
      <MediaModal open={mediaModal.open} onClose={() => setMediaModal({ ...mediaModal, open: false })} onInsert={(d) => {
        if (d.type === 'video') {
          const yt = d.src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/)
          const src = yt ? `https://www.youtube.com/embed/${yt[1]}` : d.src
          editor.chain().focus().insertContent({ type: 'resizableVideo', attrs: { src } }).run()
        } else {
          editor.chain().focus().insertContent({ type: 'resizableImage', attrs: { src: d.src, alt: d.alt } }).run()
        }
      }} type={mediaModal.type} />
      <LinkModal open={linkModal} onClose={() => setLinkModal(false)} onInsert={(url, text) => { text ? editor.chain().focus().insertContent(text).setLink({ href: url }).run() : editor.chain().focus().setLink({ href: url }).run() }} />

      {/* TOOLBAR */}
      <div ref={toolbarRef} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'var(--bg)', borderBottom: '1px solid var(--glass-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
        {/* Row 1: Text formatting */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', padding: '6px 12px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowHeadings(!showHeadings)} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: showHeadings ? 'rgba(34,197,94,0.15)' : 'transparent', color: showHeadings ? '#22c55e' : 'var(--text-muted)', fontSize: '12px', fontFamily: "var(--font-code)", cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FormatSizeIcon sx={{ fontSize: 16 }} /> Headings
            </button>
            {showHeadings && (
              <div style={{ position: 'absolute', top: '100%', left: 0, background: 'var(--bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '6px', zIndex: 200, boxShadow: '0 12px 40px rgba(0,0,0,0.4)', minWidth: '140px' }}>
                {[['Paragraph', 'p'], ['Heading 1', '1'], ['Heading 2', '2'], ['Heading 3', '3'], ['Heading 4', '4']].map(([label, v]) => (
                  <button key={v} onClick={() => { v === 'p' ? editor.chain().focus().setParagraph().run() : editor.chain().focus().toggleHeading({ level: parseInt(v) }).run(); setShowHeadings(false) }}
                    style={{ display: 'block', width: '100%', padding: '8px 12px', borderRadius: '6px', border: 'none', background: 'transparent', color: 'var(--text)', fontSize: '13px', cursor: 'pointer', textAlign: 'left', fontFamily: "var(--font-code)" }}>{label}</button>
                ))}
              </div>
            )}
          </div>
          <div style={{ position: 'relative' }}>
            <button onClick={() => {}} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text-muted)', fontSize: '12px', fontFamily: "var(--font-code)", cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TextFieldsIcon sx={{ fontSize: 16 }} /> Font
            </button>
          </div>
          <Sep />
          <ToolButton active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} tooltip="Bold (Ctrl+B)">
            <FormatBoldIcon sx={{ fontSize: 18 }} />
          </ToolButton>
          <ToolButton active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} tooltip="Italic (Ctrl+I)">
            <FormatItalicIcon sx={{ fontSize: 18 }} />
          </ToolButton>
          <ToolButton active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} tooltip="Underline (Ctrl+U)">
            <FormatUnderlinedIcon sx={{ fontSize: 18 }} />
          </ToolButton>
          <ToolButton active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} tooltip="Strikethrough">
            <StrikethroughSIcon sx={{ fontSize: 18 }} />
          </ToolButton>
          <div style={{ position: 'relative' }}>
            <ToolButton active={showColor} onClick={() => setShowColor(!showColor)} tooltip="Text Color">
              <FormatColorTextIcon sx={{ fontSize: 18 }} />
            </ToolButton>
            {showColor && (
              <div style={{ position: 'absolute', top: '100%', left: 0, background: 'var(--bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '10px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', zIndex: 200, boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }}>
                {['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#ffffff', '#94a3b8', '#64748b', '#000000'].map(c => (
                  <button key={c} onClick={() => { editor.chain().focus().setColor(c).run(); setShowColor(false) }} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '2px solid var(--glass-border)', background: c, cursor: 'pointer', transition: 'transform 0.15s' }} onMouseOver={e => e.target.style.transform = 'scale(1.15)'} onMouseOut={e => e.target.style.transform = 'scale(1)'} />
                ))}
              </div>
            )}
          </div>
          <Sep />
          <ToolButton active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} tooltip="Align Left">
            <FormatAlignLeftIcon sx={{ fontSize: 18 }} />
          </ToolButton>
          <ToolButton active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} tooltip="Align Center">
            <FormatAlignCenterIcon sx={{ fontSize: 18 }} />
          </ToolButton>
          <ToolButton active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} tooltip="Align Right">
            <FormatAlignRightIcon sx={{ fontSize: 18 }} />
          </ToolButton>
          <ToolButton active={editor.isActive({ textAlign: 'justify' })} onClick={() => editor.chain().focus().setTextAlign('justify').run()} tooltip="Justify">
            <FormatAlignJustifyIcon sx={{ fontSize: 18 }} />
          </ToolButton>
          <Sep />
          <ToolButton active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} tooltip="Bullet List">
            <FormatListBulletedIcon sx={{ fontSize: 18 }} />
          </ToolButton>
          <ToolButton active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} tooltip="Numbered List">
            <FormatListNumberedIcon sx={{ fontSize: 18 }} />
          </ToolButton>
          <ToolButton active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} tooltip="Blockquote">
            <FormatQuoteIcon sx={{ fontSize: 18 }} />
          </ToolButton>
          <Sep />
          <ToolButton active={false} onClick={() => editor.chain().focus().undo().run()} tooltip="Undo (Ctrl+Z)">
            <UndoIcon sx={{ fontSize: 18 }} />
          </ToolButton>
          <ToolButton active={false} onClick={() => editor.chain().focus().redo().run()} tooltip="Redo (Ctrl+Shift+Z)">
            <RedoIcon sx={{ fontSize: 18 }} />
          </ToolButton>
        </div>

        {/* Row 2: Insert blocks + actions */}
        <div style={{ display: 'flex', gap: '4px', padding: '6px 12px', borderTop: '1px solid var(--glass-border)', alignItems: 'center', flexWrap: 'wrap' }}>
          <ToolButton active={false} onClick={() => setLinkModal(true)} tooltip="Insert Link">
            <LinkIcon sx={{ fontSize: 18 }} />
          </ToolButton>
          <Sep />
          {[
            { icon: <AddPhotoAlternateIcon sx={{ fontSize: 16 }} />, label: 'Image', type: 'image', color: '#3b82f6' },
            { icon: <OndemandVideoIcon sx={{ fontSize: 16 }} />, label: 'Video', type: 'youtube', color: '#ef4444' },
            { icon: <ViewModuleIcon sx={{ fontSize: 16 }} />, label: 'Grid', type: 'grid', color: '#06b6d4' },
            { icon: <InsertDriveFileIcon sx={{ fontSize: 16 }} />, label: 'Card', type: 'card', color: '#a855f7' },
            { icon: <ViewColumnIcon sx={{ fontSize: 16 }} />, label: '2 Col', type: 'columns2', color: '#f59e0b' },
            { icon: <DashboardIcon sx={{ fontSize: 16 }} />, label: '3 Col', type: 'columns3', color: '#f59e0b' },
            { icon: <InfoOutlinedIcon sx={{ fontSize: 16 }} />, label: 'Callout', type: 'callout', color: '#22c55e' },
            { icon: <SpaceBarIcon sx={{ fontSize: 16 }} />, label: 'Spacer', type: 'spacer', color: '#94a3b8' },
            { icon: <HorizontalRuleIcon sx={{ fontSize: 16 }} />, label: 'Line', type: 'hr', color: '#64748b' },
            { icon: <TableChartIcon sx={{ fontSize: 16 }} />, label: 'Table', type: 'table', color: '#06b6d4' },
            { icon: <CodeIcon sx={{ fontSize: 16 }} />, label: 'Code', type: 'codeblock', color: '#ec4899' }
          ].map(({ icon, label, type, color }) => (
            <button key={type} onClick={() => insertBlock(type)} style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '11px', cursor: 'pointer', fontFamily: "var(--font-code)", display: 'flex', alignItems: 'center', gap: '4px', transition: 'all 0.15s' }}
              onMouseOver={e => { e.currentTarget.style.background = `${color}15`; e.currentTarget.style.borderColor = color }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--glass-border)' }}>
              <span style={{ color }}>{icon}</span> {label}
            </button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px', alignItems: 'center' }}>
            {lastSaved && <span style={{ fontSize: '10px', color: '#22c55e', fontFamily: "var(--font-code)", marginRight: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}><SaveIcon sx={{ fontSize: 12 }} /> Saved {lastSaved.toLocaleTimeString()}</span>}
            <button onClick={() => setShowPreview(!showPreview)} style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: showPreview ? 'rgba(34,197,94,0.15)' : 'transparent', color: showPreview ? '#22c55e' : 'var(--text-muted)', fontSize: '12px', cursor: 'pointer', fontFamily: "var(--font-code)", display: 'flex', alignItems: 'center', gap: '4px', transition: 'all 0.15s' }}>
              {showPreview ? <EditIcon sx={{ fontSize: 14 }} /> : <VisibilityIcon sx={{ fontSize: 14 }} />} {showPreview ? 'Edit' : 'Preview'}
            </button>
            <Sep />
            <button onClick={() => handleSave(false)} disabled={saving} style={{ padding: '5px 14px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '12px', fontWeight: '500', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: "var(--font-code)", display: 'flex', alignItems: 'center', gap: '4px', transition: 'all 0.15s', opacity: saving ? 0.5 : 1 }}>
              <SaveIcon sx={{ fontSize: 14 }} /> {saving ? 'Saving...' : 'Draft'}
            </button>
            <button onClick={() => handleSave(true)} disabled={saving} style={{ padding: '5px 16px', borderRadius: '6px', border: 'none', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', fontSize: '12px', fontWeight: '600', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: "var(--font-code)", display: 'flex', alignItems: 'center', gap: '4px', transition: 'all 0.15s', boxShadow: '0 2px 8px rgba(34,197,94,0.3)', opacity: saving ? 0.5 : 1 }}>
              <PublishIcon sx={{ fontSize: 14 }} /> {saving ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      {/* EDITOR CONTENT */}
      <div style={{ paddingTop: '100px', maxWidth: '900px', margin: '0 auto', padding: '100px clamp(16px, 4vw, 40px) 100px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Blog Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter your blog title..."
            style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: '700', outline: 'none', fontFamily: 'var(--font-h)', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
            onFocus={e => e.target.style.borderColor = '#22c55e'}
            onBlur={e => e.target.style.borderColor = 'var(--glass-border)'} />
        </div>

        <div className="liquid-glass" style={{ borderRadius: '14px', padding: '20px', marginBottom: '20px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cover Image</label>
              <div style={{ position: 'relative' }}>
                <input type="text" value={coverImage} onChange={e => setCoverImage(e.target.value)} placeholder="Paste image URL..."
                  style={{ width: '100%', padding: '10px 44px 10px 14px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '13px', outline: 'none', fontFamily: "var(--font-code)", boxSizing: 'border-box' }} />
                <button onClick={() => setCoverModal(true)} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', padding: '4px', borderRadius: '6px', border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <CloudUploadIcon sx={{ fontSize: 18 }} />
                </button>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</label>
              <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. Technology, Design..."
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '13px', outline: 'none', fontFamily: "var(--font-code)", boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tags</label>
            <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="react, nextjs, javascript..."
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '13px', outline: 'none', fontFamily: "var(--font-code)", boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', fontFamily: "var(--font-code)", marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Excerpt</label>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Short description for SEO and preview..." rows={2}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '13px', outline: 'none', resize: 'vertical', fontFamily: "var(--font-code)", boxSizing: 'border-box' }} />
          </div>
        </div>

        {coverImage && (
          <div style={{ marginBottom: '20px', borderRadius: '14px', overflow: 'hidden', maxHeight: '260px', position: 'relative', border: '1px solid var(--glass-border)' }}>
            <img src={coverImage} alt="Cover" style={{ width: '100%', height: '260px', objectFit: 'cover' }} />
            <button onClick={() => setCoverImage('')} style={{ position: 'absolute', top: '10px', right: '10px', padding: '6px 12px', borderRadius: '8px', border: 'none', background: 'rgba(239,68,68,0.9)', color: '#fff', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}><CloseIcon sx={{ fontSize: 14 }} /> Remove</button>
          </div>
        )}

        {showPreview ? (
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
        ) : (
          <>
            <TableToolbar editor={editor} />
            <div className="liquid-glass" style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
              <EditorContent editor={editor} />
            </div>
          </>
        )}
      </div>

      <style>{`
        .tiptap table { width: 100%; border-collapse: collapse; margin: 1.5em 0; }
        .tiptap td, .tiptap th { border: 1px solid var(--glass-border); padding: 10px 14px; min-width: 80px; position: relative; }
        .tiptap th { background: rgba(255,255,255,0.05); font-weight: 600; text-align: left; }
        .tiptap td.selectedCell, .tiptap th.selectedCell { background: rgba(34,197,94,0.1); }
        .tiptap .column-resize-handle { position: absolute; right: -2px; top: 0; bottom: 0; width: 4px; background: #22c55e; cursor: col-resize; z-index: 10; }
        .tiptap .resize-cursor { cursor: col-resize !important; }
        .tiptap table .selectedCells { background: rgba(34,197,94,0.08); }
      `}</style>
    </div>
  )
}
