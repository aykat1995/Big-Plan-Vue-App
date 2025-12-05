<script setup lang="ts">
import { computed, watch, ref, defineProps } from 'vue'
import { useStore } from 'vuex'
import NoteItem from './NoteItem.vue'
import type { Note } from '@/types'
import { createNewNote } from '@/services/noteUtils'

const store = useStore()
const notes = computed(() => store.state.notes)
const activeCategoryId = computed(() => store.state.activeCategoryId)
const categories = computed(() => store.state.categories)
const activeNote = computed(() => store.state.activeNote)
const activeNodeId = computed(() => activeNote.value?.id ?? null)
const isEditing = ref(false)
const dropdownPosition = ref({ x: 0, y: 0 })
const showCategoriesList = ref(false)

const props = defineProps(['handleParentClick'])

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
    const newNote = createNewNote(activeCategoryId.value)
    store.dispatch('addNote', newNote)
}

const handleRightClick = (e: MouseEvent, id: number) => {
    e.preventDefault()
    noteClickHandle(id)

    dropdownPosition.value = {
        x: e.clientX,
        y: e.clientY,
    }

    if (e.which === 3) {
        isEditing.value = true
    }
}

const pinNote = () => {
    if (activeNote.value) {
        store.dispatch('updateNote', {
            ...activeNote.value,
            pined: true,
        })
    }
}

const deleteNote = () => {
    const isConfirm = confirm('Вы действительно хотите удалить заметку?')
    if (isConfirm) {
        if (activeNote.value) {
            store.dispatch('deleteNote', activeNote.value)
        }
    }
}

const addToCategory = (categoryId: number) => {
    if (activeNote.value) {
        store.dispatch('updateNote', {
            ...activeNote.value,
            categoryId: categoryId,
        })
        showCategoriesList.value = false
    }
}

const closeDropdown = () => {
    isEditing.value = false
    showCategoriesList.value = false
}

const toggleShowCategoriesList = () => {
    showCategoriesList.value = !showCategoriesList.value
}

watch(
    () => props.handleParentClick,
    () => closeDropdown(),
)
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
                @contextmenu="handleRightClick($event, note.id)"
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

        <!-- Действия с заметкой -->
        <div
            v-show="isEditing"
            class="fixed bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[180px]"
            :style="{
                left: dropdownPosition.x + 'px',
                top: dropdownPosition.y + 'px',
            }"
            @click.stop
        >
            <ul class="text-sm text-gray-700">
                <li
                    class="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150 flex items-center"
                    @click="pinNote"
                >
                    <span class="mr-2">📌</span>
                    Закрепить
                </li>
                <li
                    class="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150 flex items-center justify-between relative group"
                    @mouseenter="showCategoriesList = true"
                    @mouseleave="showCategoriesList = false"
                >
                    <div class="flex items-center">
                        <span class="mr-2">📁</span>
                        <span>В категорию</span>
                    </div>
                    <span class="text-gray-400">›</span>

                    <!-- Выпадающий список категорий -->
                    <div
                        v-if="showCategoriesList"
                        class="absolute left-full top-0 min-w-[180px] bg-white shadow-xl border border-gray-200 py-2 z-50 categories-dropdown"
                        @mouseenter="showCategoriesList = true"
                        @mouseleave="showCategoriesList = false"
                    >
                        <div class="max-h-60 overflow-y-auto">
                            <div
                                v-for="category in categories"
                                :key="category.id"
                                class="px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors duration-150 flex items-center"
                                @click="addToCategory(category.id)"
                            >
                                <div
                                    class="w-4 h-4 rounded-full mr-3 flex-shrink-0"
                                    :style="{ backgroundColor: category.color || 'transparent' }"
                                ></div>
                                <span class="text-gray-700 truncate">{{ category.name }}</span>
                                <span
                                    v-if="category.id === activeNote?.categoryId"
                                    class="ml-auto text-blue-500 text-xs font-medium"
                                >
                                    ✓
                                </span>
                            </div>
                        </div>
                    </div>
                </li>
                <li
                    class="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer transition-colors duration-150 flex items-center border-t border-gray-100"
                    @click="deleteNote"
                >
                    <span class="mr-2">🗑️</span>
                    Удалить
                </li>
            </ul>
        </div>
    </div>
</template>
