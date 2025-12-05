<script setup lang="ts">
import Header from '../components/Header.vue'
import CategoriesList from '@/components/categories/CategoriesList.vue'
import NotesList from '@/components/notes/NotesList.vue'
import ContentBox from '@/components/ContentBox.vue'
import { ref } from 'vue'

const handleClick = ref(null)

const handleMainClick = (e) => {
    handleClick.value = e.target
}
</script>

<template>
    <div class="main max-w-[1100px] mx-auto min-h-screen bg-gray-50" @click="handleMainClick">
        <Header />

        <div class="content-body flex h-[90vh] overflow-hidden shadow-lg">
            <div class="content-body__categories w-1.5/10 h-full bg-[#35445c]">
                <CategoriesList :handleParentClick="handleClick" />
            </div>
            <div class="content-body__notes w-3/10 h-full bg-white border-r border-gray-200">
                <NotesList :handleParentClick="handleClick" />
            </div>
            <div
                class="content-body__body flex-1 h-full bg-gray-100 flex items-center justify-center"
            >
                <ContentBox />
            </div>
        </div>
    </div>
</template>
