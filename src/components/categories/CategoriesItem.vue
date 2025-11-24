<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    name: {
        required: true,
        type: String
    },
    isActive : {
        type: Boolean,
        required: true
    }
})
</script>

<template>
    <div 
        class="categories__item w-full px-2 py-2 transition-colors duration-200 group border-l-2 cursor:pointer"
        :class="{
            'bg-blue-700 border-white': props.isActive,
            'border-transparent hover:bg-blue-700 hover:border-white': !props.isActive
        }"
    >
        <span 
            class="categories__name text-white text-sm font-medium transition-opacity duration-200"
            :class="{
                'opacity-100': props.isActive,
                'opacity-90 group-hover:opacity-100': !props.isActive
            }"
        >
            {{ props.name }}
        </span>
    </div>
</template>