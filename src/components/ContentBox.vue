<script setup lang="ts">
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import TextEditor from './textEditor/TextEditor.vue';
import { createNewNote } from '@/services/noteUtils';

const store = useStore();
const activeNote = computed(() => store.state.activeNote);

const handleCreatingNote = () => {
    const newNote = createNewNote();
    store.dispatch('addNote', newNote);
}

</script>

<template>
    <div class="content-body relative size-full flex justify-center items-center">
        <TextEditor v-if="activeNote" />
        <div v-else class="text-gray-400 text-center">
            <div class="text-6xl mb-4">📝</div>
            <p class="text-lg font-medium">Выберите замeтку для просмотра</p>
            <p class="text-sm mt-2 underline text-green-600 cursor-pointer" @click="handleCreatingNote">или создайте новую</p>
        </div>
    </div>
</template>