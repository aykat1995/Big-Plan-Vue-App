<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
    title: {
        required: true,
        type: String,
    },
    body: {
        type: Object,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
})

const formatter = new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
})
</script>

<template>
    <div
        class="notes__item w-full p-4 cursor-pointer transition-colors duration-200 border-l-4 cursor:pointer"
        :class="{
            'bg-blue-50 border-blue-500': props.isActive,
            'border-transparent hover:bg-blue-50 hover:border-blue-500': !props.isActive,
        }"
    >
        <div class="flex justify-between items-start mb-2">
            <span class="notes__name font-semibold text-gray-800 text-sm line-clamp-1">{{
                props.title
            }}</span>
        </div>
        <p class="notes__text text-gray-600 text-xs line-clamp-3 leading-relaxed">
            {{ props.body.plainText }}
        </p>

        <span class="create-date text-xs italic text-black/40 block text-right mt-2">{{
            formatter.format(props.date)
        }}</span>
    </div>
</template>
