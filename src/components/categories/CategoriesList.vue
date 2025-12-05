<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import CategoriesItem from './CategoriesItem.vue'
import AddCategoryModal from './AddCategoryModal.vue'
import type { Category } from '@/types'

const store = useStore()
const categories = computed(() => store.state.categories)
const activeCategoryId = computed(() => store.state.activeCategoryId)
const showAllCategories = ref(false)
const showModal = ref(false)
const isEditing = ref(false)
const dropdownPosition = ref({ x: 0, y: 0 })

const props = defineProps(['handleParentClick'])

const categoryClickHandle = (id: number) => {
    showAllCategories.value = false
    store.dispatch('setActiveCategory', id)
}

const allNotesClickHandle = () => {
    showAllCategories.value = true
    store.dispatch('setActiveCategory', -1)
}

const toggleCategoryModal = () => {
    showModal.value = !showModal.value
}

const closeDropdown = () => {
    isEditing.value = false
}

const handleRightClick = (e: MouseEvent, id: number) => {
    e.preventDefault()
    categoryClickHandle(id)

    dropdownPosition.value = {
        x: e.clientX,
        y: e.clientY,
    }

    if (e.which === 3) {
        isEditing.value = true
    }
}

const deleteCategory = () => {
    const isConfirm = confirm('Вы действительно хотите удалить категорию?')
    if (isConfirm) {
        console.log('1')
        console.log(activeCategoryId.value)
        store.dispatch('deleteCategory', activeCategoryId.value)
        store.dispatch('setActiveCategory', -1)
    }
}

watch(
    () => props.handleParentClick,
    () => closeDropdown(),
)
</script>

<template>
    <div class="categories w-full py-4">
        <div v-if="categories?.length > 0" class="mb-1">
            <CategoriesItem
                name="Все заметки"
                :isActive="showAllCategories"
                @click="allNotesClickHandle"
            />
        </div>
        <div
            v-for="category in categories"
            :key="category.id"
            @click="categoryClickHandle(category.id)"
            @contextmenu="handleRightClick($event, category.id)"
            class="mb-1"
        >
            <CategoriesItem :name="category.name" :isActive="category.id === activeCategoryId" />
        </div>
        <div class="px-4 mt-6">
            <button
                class="w-full bg-blue-700 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                @click="toggleCategoryModal"
            >
                <span class="mr-2">+</span> Добавить
            </button>
        </div>

        <!-- Действия с категорией -->
        <div
            v-if="isEditing"
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
                >
                    <span class="mr-2">📁</span>
                    Редактировать
                </li>
                <li
                    class="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer transition-colors duration-150 flex items-center border-t border-gray-100"
                    @click="deleteCategory"
                >
                    <span class="mr-2">🗑️</span>
                    Удалить
                </li>
            </ul>
        </div>

        <AddCategoryModal :isActive="showModal" @close="toggleCategoryModal" />
    </div>
</template>
