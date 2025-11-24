<script setup lang="ts">
import { computed, onUnmounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Toolbar from './Toolbar.vue'

const store = useStore()
const activeNote = computed(() => store.state.activeNote)

const editor = useEditor({
    extensions: [
        StarterKit.configure({
            bulletList: {
                HTMLAttributes: {
                    class: 'bullet-list',
                },
            },
            orderedList: {
                HTMLAttributes: {
                    class: 'ordered-list',
                },
            },
            listItem: {
                HTMLAttributes: {
                    class: 'list-item',
                },
            },
        }),
        Placeholder.configure({
            placeholder: 'Начните писать свою заметку...📝',
        }),
        TextAlign.configure({
            types: ['heading', 'paragraph', 'listItem'],
            alignments: ['left', 'center', 'right', 'justify'],
        }),
    ],
    content: activeNote.value.body.content || '',

    onUpdate: ({ editor }) => {
        const html = editor.getHTML()
        const text = editor.getText()

        activeNote.value.body.content = html
        activeNote.value.body.plainText = text
    },
})

watch(activeNote, (newNote) => {
    if (newNote && editor.value) {
        setTimeout(() => {
            if (newNote.body.content) {
                editor.value?.commands.setContent(newNote.body.content)
            } else {
                editor.value?.commands.clearContent()
            }
        }, 10)
    }
})

const handleToolbarAction = ({ action, params }) => {
    switch (action) {
        case 'toggleHeading':
            editor.value?.chain().focus().toggleHeading(params).run()
            break

        case 'toggleBold':
            editor.value?.chain().focus().toggleBold().run()
            break

        case 'toggleItalic':
            editor.value?.chain().focus().toggleItalic().run()
            break

        case 'toggleStrike':
            editor.value?.chain().focus().toggleStrike().run()
            break

        case 'setTextAlign':
            editor.value?.chain().focus().setTextAlign(params).run()
            break

        case 'toggleBulletList':
            editor.value?.chain().focus().toggleBulletList().run()
            break

        case 'toggleOrderedList':
            editor.value?.chain().focus().toggleOrderedList().run()
            break
    }
}

onUnmounted(() => {
    if (editor.value) {
        editor.value.destroy()
    }
})
</script>

<template>
    <div class="text-editor size-full">
        <Toolbar :editor="editor" @action="handleToolbarAction" />
        <EditorContent
            class="editor-container h-[calc(100%-72px)] box-border bg-[oklch(98.7%_0.022_95.277)] shadow-xl border border-gray-200 p-5 pb-0 mt-18 overflow-auto"
            :editor="editor"
        />
    </div>
</template>

<style scoped lang="scss">
/* Стили для контента редактора */
:deep(.editor-content) {
    padding: 24px;
    min-height: 400px;
    outline: none;
    font-family:
        'Inter',
        -apple-system,
        BlinkMacSystemFont,
        sans-serif;
    line-height: 1.6;
    color: #1f2937;
}

:deep(.ProseMirror) {
    outline: none;
    min-height: 400px;

    /* Стили для ненумерованного списка */
    ul.bullet-list {
        list-style-type: disc;
        padding-left: 1.5em;
        margin: 0.75em 0;

        li.list-item {
            margin: 0.25em 0;
            position: relative;
        }
    }

    /* Стили для нумерованного списка */
    ol.ordered-list {
        list-style-type: decimal;
        padding-left: 1.5em;
        margin: 0.75em 0;

        li.list-item {
            margin: 0.25em 0;
            position: relative;
        }
    }

    /* Вложенные списки */
    ul ul,
    ol ul {
        list-style-type: circle;
        margin: 0;
    }

    ol ol,
    ul ol {
        list-style-type: lower-latin;
        margin: 0;
    }
}

:deep(.ProseMirror h2) {
    font-size: 1.5em;
    font-weight: 700;
    color: #111827;
    margin: 1.5em 0 0.5em 0;
    border-bottom: 2px solid #3b82f6;
    padding-bottom: 0.3em;
}

:deep(.ProseMirror strong) {
    font-weight: 700;
    color: #111827;
}

:deep(.ProseMirror em) {
    font-style: italic;
    color: #4b5563;
}

:deep(.ProseMirror p) {
    margin: 0.75em 0;
    font-size: 16px;
}

:deep(.ProseMirror p.is-editor-empty:first-child::before) {
    content: attr(data-placeholder);
    color: #9ca3af;
    float: left;
    height: 0;
    pointer-events: none;
}

:deep(.ProseMirror:focus) {
    outline: none;
}
</style>
