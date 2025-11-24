<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const allNotes = computed(() => store.state.notes)
const selectedNotes = ref([])
const newCategory = ref({
    name: 'Новая категория',
    id: +Date.now(),
})

const props = defineProps({
    isActive: {
        require: true,
        type: Boolean,
    },
})
const emits = defineEmits(['close'])

const toggleNoteSelection = (note) => {
    const index = selectedNotes.value.findIndex((n) => n.id === note.id)
    if (index > -1) {
        selectedNotes.value.splice(index, 1)
    } else {
        selectedNotes.value.push(note)
    }
}

const isNoteSelected = (note) => {
    return selectedNotes.value.some((n) => n.id === note.id)
}

const handleAddButtonClick = () => {
    if (selectedNotes.value.length === 0) {
        alert('Добавьте хотя бы одну заметку!')
        return
    }

    store.dispatch('addCategory', newCategory.value)

    selectedNotes.value.forEach((note) => {
        note.categoryId = newCategory.value.id
    })

    console.log(selectedNotes.value)

    newCategory.value = ref({})
    emits('close')
}
</script>

<template>
    <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        v-if="props.isActive"
        @click="emits('close')"
    >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4" @click.stop>
            <div class="p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-semibold text-gray-800">Добавление категории</h3>
                    <button
                        class="text-gray-400 hover:text-gray-600 text-xl font-bold transition-colors duration-200"
                        @click="emits('close')"
                    >
                        ×
                    </button>
                </div>

                <div class="space-y-4">
                    <div class="space-y-2">
                        <label for="name" class="block text-sm font-medium text-gray-700">
                            Название
                        </label>
                        <input
                            type="text"
                            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                            name="name"
                            v-model="newCategory.name"
                        />
                    </div>

                    <div class="space-y-2">
                        <div
                            class="w-full border border-gray-300 rounded-lg p-2 text-sm h-32 overflow-y-auto"
                        >
                            <div
                                v-for="note in allNotes"
                                :key="note.id"
                                class="flex items-center py-2 px-3 hover:bg-gray-50 rounded cursor-pointer transition-colors duration-200 overflow-hidden"
                                @click="toggleNoteSelection(note)"
                            >
                                <input
                                    type="checkbox"
                                    :checked="isNoteSelected(note)"
                                    class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    @click.stop
                                />
                                <span class="ml-3 text-sm text-gray-700 line-clamp-1">{{
                                    note.body.plainText
                                }}</span>
                            </div>
                            <p v-if="allNotes.length === 0" class="text-center text-gray-500 py-4">
                                Нет доступных заметок
                            </p>
                        </div>
                        <p class="text-xs text-gray-500">
                            Выберите заметки, которые хотите добавить в категорию
                        </p>
                    </div>
                </div>

                <div class="flex justify-end space-x-3 mt-6">
                    <button
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                        @click="emits('close')"
                    >
                        Отмена
                    </button>
                    <button
                        class="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                        @click="handleAddButtonClick"
                    >
                        Добавить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
