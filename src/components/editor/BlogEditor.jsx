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
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import { useState, useCallback, useEffect } from 'react'

const MenuBar = ({ editor }) => {
  if (!editor) return null

  const addImage = () => {
    const url = prompt('Enter image URL:')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }

  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL:')
    if (url) editor.commands.setYoutubeVideo({ src: url })
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = prompt('URL', previousUrl)
    if (url === null) return
    if (url === '') { editor.chain().focus().extendMarkRange('link').unsetLink().run(); return }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const btn = (active, onClick, label, disabled) => (
    <button key={label} onClick={onClick} disabled={disabled}
      style={{ padding: '6px 10px', borderRadius: '4px', border: 'none', fontSize: '12px', fontWeight: active ? '700' : '500', cursor: disabled ? 'not-allowed' : 'pointer', background: active ? 'rgba(34,197,94,0.2)' : 'transparent', color: active ? '#22c55e' : 'var(--text-muted)', fontFamily: "var(--font-code)", opacity: disabled ? 0.4 : 1, whiteSpace: 'nowrap' }}
      title={label}>
      {label}
    </button>
  )

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', padding: '8px 12px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)', position: 'sticky', top: 0, zIndex: 10 }}>
      <select onChange={e => {
        const v = e.target.value
        if (v === 'p') editor.chain().focus().setParagraph().run()
        else editor.chain().focus().toggleHeading({ level: parseInt(v) }).run()
      }} style={{ padding: '5px 8px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '11px', fontFamily: "var(--font-code)", cursor: 'pointer' }}>
        <option value="p">Paragraph</option>
        <option value="1">H1</option>
        <option value="2">H2</option>
        <option value="3">H3</option>
        <option value="4">H4</option>
      </select>
      <select onChange={e => editor.chain().focus().setFontFamily(e.target.value).run()} style={{ padding: '5px 8px', borderRadius: '4px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', fontSize: '11px', fontFamily: "var(--font-code)", cursor: 'pointer' }}>
        <option value="">Default Font</option>
        <option value="Inter">Inter</option>
        <option value="Georgia">Georgia (Serif)</option>
        <option value="Courier New">Courier New</option>
        <option value="Arial">Arial</option>
      </select>
      <div style={{ width: '1px', background: 'var(--glass-border)', margin: '0 4px' }} />
      {btn(editor.isActive('bold'), () => editor.chain().focus().toggleBold().run(), 'B')}
      {btn(editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run(), 'I')}
      {btn(editor.isActive('underline'), () => editor.chain().focus().toggleUnderline().run(), 'U')}
      {btn(editor.isActive('strike'), () => editor.chain().focus().toggleStrike().run(), 'S')}
      <div style={{ width: '1px', background: 'var(--glass-border)', margin: '0 4px' }} />
      {btn(editor.isActive({ textAlign: 'left' }), () => editor.chain().focus().setTextAlign('left').run(), 'L')}
      {btn(editor.isActive({ textAlign: 'center' }), () => editor.chain().focus().setTextAlign('center').run(), 'C')}
      {btn(editor.isActive({ textAlign: 'right' }), () => editor.chain().focus().setTextAlign('right').run(), 'R')}
      {btn(editor.isActive({ textAlign: 'justify' }), () => editor.chain().focus().setTextAlign('justify').run(), 'J')}
      <div style={{ width: '1px', background: 'var(--glass-border)', margin: '0 4px' }} />
      {btn(editor.isActive('bulletList'), () => editor.chain().focus().toggleBulletList().run(), '• List')}
      {btn(editor.isActive('orderedList'), () => editor.chain().focus().toggleOrderedList().run(), '1. List')}
      {btn(editor.isActive('blockquote'), () => editor.chain().focus().toggleBlockquote().run(), '"" Quote')}
      {btn(editor.isActive('codeBlock'), () => editor.chain().focus().toggleCodeBlock().run(), '< > Code')}
      <div style={{ width: '1px', background: 'var(--glass-border)', margin: '0 4px' }} />
      {btn(editor.isActive('highlight'), () => editor.chain().focus().toggleHighlight().run(), 'Highlight')}
      <input type="color" onInput={e => editor.chain().focus().setColor(e.target.value).run()} value={editor.getAttributes('textStyle').color || '#ffffff'} style={{ width: '28px', height: '28px', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: 0 }} title="Text Color" />
      <div style={{ width: '1px', background: 'var(--glass-border)', margin: '0 4px' }} />
      {btn(false, addImage, 'Image')}
      {btn(false, addYoutubeVideo, 'YouTube')}
      {btn(false, setLink, 'Link')}
      <div style={{ width: '1px', background: 'var(--glass-border)', margin: '0 4px' }} />
      {btn(false, () => editor.chain().focus().setHorizontalRule().run(), '— HR')}
      {btn(false, () => editor.chain().focus().undo().run(), 'Undo', !editor.can().undo())}
      {btn(false, () => editor.chain().focus().redo().run(), 'Redo', !editor.can().redo())}
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

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: true }),
      Placeholder.configure({ placeholder: 'Start writing your story...' }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      Highlight,
      Link.configure({ openOnClick: false }),
      Youtube,
      Blockquote,
      TextStyle,
      Color,
      FontFamily,
    ],
    content: initialContent.content || '',
    editorProps: {
      attributes: {
        style: 'min-height: 500px; padding: 32px; outline: none; font-size: 16px; line-height: 1.8;'
      }
    }
  })

  useEffect(() => {
    if (editor && initialContent.title) {
      setTitle(initialContent.title || '')
      setExcerpt(initialContent.excerpt || '')
      setCoverImage(initialContent.cover_image || '')
      setCategory(initialContent.category || '')
      setTags((initialContent.tags || []).join(', '))
      if (initialContent.content) {
        editor.commands.setContent(initialContent.content)
      }
    }
  }, [initialContent.id, initialContent.title, initialContent.excerpt, initialContent.cover_image, initialContent.tags, initialContent.content, initialContent.category, editor])

  const handleSave = useCallback((published) => {
    if (!title.trim()) { alert('Title is required'); return }
    onSave({
      title: title.trim(),
      content: editor.getJSON(),
      excerpt: excerpt.trim(),
      cover_image: coverImage.trim(),
      category: category.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      published
    })
  }, [title, editor, excerpt, coverImage, category, tags, onSave])

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Blog title..."
          style={{ width: '100%', padding: '16px 0', border: 'none', background: 'transparent', color: 'var(--text)', fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: '700', outline: 'none', fontFamily: 'var(--font-h)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        <input type="text" value={coverImage} onChange={e => setCoverImage(e.target.value)} placeholder="Cover image URL..."
          style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '12px', outline: 'none', fontFamily: "var(--font-code)" }} />
        <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category (e.g., Technology)"
          style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '12px', outline: 'none', fontFamily: "var(--font-code)" }} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (comma separated: React, Next.js, TypeScript)"
          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '12px', outline: 'none', fontFamily: "var(--font-code)" }} />
      </div>
      <div style={{ marginBottom: '24px' }}>
        <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Blog excerpt / short description..." rows={3}
          style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '13px', outline: 'none', resize: 'vertical', fontFamily: "var(--font-code)" }} />
      </div>

      {coverImage && (
        <div style={{ marginBottom: '24px', borderRadius: '12px', overflow: 'hidden', maxHeight: '300px' }}>
          <img src={coverImage} alt="Cover" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
        </div>
      )}

      <div className="liquid-glass" style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 12px', borderBottom: '1px solid var(--glass-border)' }}>
          <button onClick={() => setShowPreview(!showPreview)} style={{ padding: '5px 12px', borderRadius: '4px', border: 'none', fontSize: '11px', cursor: 'pointer', background: showPreview ? 'rgba(34,197,94,0.2)' : 'transparent', color: showPreview ? '#22c55e' : 'var(--text-muted)', fontFamily: "var(--font-code)" }}>
            {showPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
        {showPreview ? (
          <div style={{ padding: '32px' }}>
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: editor?.getHTML() || '' }} />
          </div>
        ) : (
          <MenuBar editor={editor} />
        )}
        {!showPreview && <EditorContent editor={editor} />}
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingBottom: '40px' }}>
        <button onClick={() => handleSave(false)} disabled={saving} className="liquid-glass" style={{ padding: '12px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', color: 'var(--text)', cursor: 'pointer', fontFamily: "var(--font-code)" }}>
          {saving ? 'Saving...' : 'Save Draft'}
        </button>
        <button onClick={() => handleSave(true)} disabled={saving} style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '600', color: '#fff', cursor: 'pointer', background: 'linear-gradient(135deg, #22c55e, #16a34a)', fontFamily: "var(--font-code)" }}>
          {saving ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  )
}
