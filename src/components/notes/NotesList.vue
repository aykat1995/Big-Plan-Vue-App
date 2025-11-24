<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import NoteItem from './NoteItem.vue'
import type { Note } from '@/types'
import { createNewNote } from '@/services/noteUtils'

const store = useStore()
const notes = computed(() => store.state.notes)
const activeCategoryId = computed(() => store.state.activeCategoryId)
const activeNote = computed(() => store.state.activeNote)
const activeNodeId = computed(() => activeNote.value?.id ?? null)

const currentCategoryNotes = computed(() => {
    if (activeCategoryId.value === -1) {
        return [...notes.value]
    } else {
        return notes.value.filter((note: Note) => note.categoryId === activeCategoryId.value)
    }
})

const noteClickHandle = (id: number) => {
    const currentNote = notes.value.find((note: Note) => note.id === id)
    if (currentNote) {
        store.dispatch('setActiveNote', currentNote)
    }
}

const handleCreatingNote = () => {
    const newNote = createNewNote()
    store.dispatch('addNote', newNote)
}
</script>

<template>
    <div class="notes w-full h-full flex flex-col">
        <div class="p-4 border-b border-gray-200 bg-white">
            <div class="relative">
                <input
                    type="text"
                    placeholder="Поиск заметок..."
                    class="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                />
                <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                </div>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto">
            <div
                v-for="note in currentCategoryNotes"
                :key="note.id"
                class="border-b border-gray-100 last:border-b-0"
                @click="noteClickHandle(note.id)"
            >
                <NoteItem
                    :title="note.title"
                    :body="note.body"
                    :date="note.updatedAt ? note.updatedAt : note.createdAt"
                    :isActive="note.id === activeNodeId"
                />
            </div>
        </div>

        <div class="p-4 border-t border-gray-200 bg-white">
            <button
                class="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center shadow-sm"
                @click="handleCreatingNote"
            >
                <span class="mr-2 text-lg">+</span> Новая заметка
            </button>
        </div>
    </div>
</template>
