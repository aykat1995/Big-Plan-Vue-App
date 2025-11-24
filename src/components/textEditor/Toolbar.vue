<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    editor: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['action'])
const handleButtonClick = (action, params = null) => {
    emit('action', { action, params })
}
</script>

<template>
    <div class="toolbar absolute bg-white w-full p-4 border border-gray-200 z-10">
        <div class="toolbar__groups flex gap-4 items-center">
            <!-- Заголовок -->
            <div class="toolbar__group">
                <span class="group-label">Заголовок</span>
                <div class="group-buttons flex gap-1">
                    <button
                        @click="handleButtonClick('toggleHeading', { level: 0 })"
                        :class="{
                            active:
                                !props.editor?.isActive('heading') &&
                                !props.editor?.isActive('paragraph'),
                        }"
                        class="toolbar__btn"
                        title="Обычный текст"
                    >
                        <span class="btn-text">Текст</span>
                    </button>
                    <button
                        @click="handleButtonClick('toggleHeading', { level: 2 })"
                        :class="{ active: props.editor?.isActive('heading', { level: 2 }) }"
                        class="toolbar__btn"
                        title="Заголовок H1"
                    >
                        <span class="btn-text">H1</span>
                    </button>
                </div>
            </div>

            <!-- Группа: Шрифт -->
            <div class="toolbar__group">
                <span class="group-label">Шрифт</span>
                <div class="group-buttons flex gap-1">
                    <button
                        @click="handleButtonClick('toggleBold')"
                        :class="{ active: props.editor?.isActive('bold') }"
                        class="toolbar__btn"
                        title="Жирный текст"
                    >
                        <span class="btn-text bold">B</span>
                    </button>
                    <button
                        @click="handleButtonClick('toggleItalic')"
                        :class="{ active: props.editor?.isActive('italic') }"
                        class="toolbar__btn"
                        title="Курсив"
                    >
                        <span class="btn-text italic">I</span>
                    </button>
                    <button
                        @click="handleButtonClick('toggleStrike')"
                        :class="{ active: props.editor?.isActive('strike') }"
                        class="toolbar__btn"
                        title="Зачеркнутый текст"
                    >
                        <span class="btn-text strike">S</span>
                    </button>
                </div>
            </div>

            <!-- Группа: Абзац -->
            <div class="toolbar__group">
                <span class="group-label">Абзац</span>
                <div class="group-buttons flex gap-1">
                    <button
                        @click="handleButtonClick('setTextAlign', 'center')"
                        :class="{ active: props.editor?.isActive({ textAlign: 'center' }) }"
                        class="toolbar__btn"
                        title="По центру"
                    >
                        <img src="/icons/text_align_center.svg" class="icon" alt="по центру" />
                    </button>
                    <button
                        @click="handleButtonClick('setTextAlign', 'justify')"
                        :class="{ active: props.editor?.isActive({ textAlign: 'justify' }) }"
                        class="toolbar__btn"
                        title="По ширине"
                    >
                        <img src="/icons/text_align_justify.svg" class="icon" alt="по ширине" />
                    </button>
                    <button
                        @click="handleButtonClick('setTextAlign', 'left')"
                        :class="{ active: props.editor?.isActive({ textAlign: 'left' }) }"
                        class="toolbar__btn"
                        title="По левому краю"
                    >
                        <img src="/icons/text_align_left.svg" class="icon" alt="по левому краю" />
                    </button>
                    <button
                        @click="handleButtonClick('setTextAlign', 'right')"
                        :class="{ active: props.editor?.isActive({ textAlign: 'right' }) }"
                        class="toolbar__btn"
                        title="По правому краю"
                    >
                        <img src="/icons/text_align_right.svg" class="icon" alt="по правому краю" />
                    </button>
                    <button
                        @click="handleButtonClick('toggleBulletList')"
                        :class="{ active: props.editor?.isActive('bulletList') }"
                        class="toolbar__btn"
                        title="Ненумерованный список"
                    >
                        <img src="/icons/list_icon.svg" class="icon" alt="&#8226;" />
                    </button>
                    <button
                        @click="handleButtonClick('toggleOrderedList')"
                        :class="{ active: props.editor?.isActive('orderedList') }"
                        class="toolbar__btn"
                        title="Нумерованный список"
                    >
                        <img src="/icons/list_numbered_icon.svg" class="icon" alt="&#8226;" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.toolbar {
    &__groups {
        .toolbar__group {
            display: flex;
            flex-direction: column;
            gap: 4px;
            border-right: 1px solid #cfd1d4;
            padding-right: 10px;

            &:last-child {
                border-right: 0;
            }

            .group-label {
                font-size: 11px;
                color: #6b7280;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                text-align: center;
            }

            .group-buttons {
                .toolbar__btn {
                    padding: 6px 10px;
                    border: 1px solid #e5e7eb;
                    border-radius: 6px;
                    background: white;
                    color: #374151;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 13px;
                    font-weight: 500;

                    &:hover {
                        background: #f3f4f6;
                        border-color: #d1d5db;
                        transform: translateY(-1px);
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }

                    &.active {
                        background: #3b82f6;
                        color: white;
                        border-color: #3b82f6;
                    }

                    &:active {
                        transform: translateY(0);
                    }

                    .btn-text {
                        &.bold {
                            font-weight: 700;
                        }
                        &.italic {
                            font-style: italic;
                        }
                        &.strike {
                            text-decoration: line-through;
                        }
                    }

                    .icon {
                        width: 18px;
                        height: 18px;
                    }
                }
            }
        }
    }
}
</style>
