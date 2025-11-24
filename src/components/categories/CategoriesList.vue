<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import CategoriesItem from './CategoriesItem.vue'
import AddCategoryModal from './AddCategoryModal.vue'

const store = useStore()
const categories = computed(() => store.state.categories)
const activeCategoryId = computed(() => store.state.activeCategoryId)
const showAllCategories = ref(false)
const showModal = ref(false)

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

        <AddCategoryModal :isActive="showModal" @close="toggleCategoryModal" />
    </div>
</template>
