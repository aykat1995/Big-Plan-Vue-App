import { createStore } from 'vuex'
import type { Note, Category, State } from '@/types'

export const store = createStore<State>({
    state: {
        notes: [],
        categories: [],
        activeNote: null,
        activeCategoryId: -1,
        creatingCategory: false,
    },

    mutations: {
        ADD_NOTE(state: State, note: Note) {
            state.notes.push(note)
            state.activeNote = note
        },
        ADD_CATEGORY(state: State, category: Category) {
            state.categories.push(category)
        },
        UPDATE_NOTE(state: State, note: Note) {
            const index = state.notes.findIndex((noteItem) => noteItem.id === note.id)

            if (index !== -1) {
                state.notes[index] = note
            }
        },
        DELETE_NOTE(state: State, note: Note) {
            state.notes.filter((n) => n.id !== note.id)
        },
        UPDATE_CATEGORY(state: State, category: Category) {
            const index = state.categories.findIndex((c) => c.id === category.id)

            if (index !== -1) {
                state.categories[index] = category
            }
        },
        SET_ACTIVE_NOTE(state: State, note: Note) {
            state.activeNote = note
        },
        SET_ACTIVE_CATEGORY(state: State, id: number) {
            state.activeCategoryId = id
        },
        SET_CREATING_CATEGORY(state: State, value: boolean) {
            state.creatingCategory = value
        },
    },

    actions: {
        addNote({ commit }, note: Note) {
            commit('ADD_NOTE', note)
        },
        updateNote({ commit }, note: Note) {
            commit('UPDATE_NOTE', note)
        },
        deleteNote({ commit }, note) {
            commit('DELETE_NOTE', note)
        },
        addCategory({ commit }, category: Category) {
            commit('ADD_CATEGORY', category)
        },
        setActiveCategory({ commit }, id: number) {
            commit('SET_ACTIVE_CATEGORY', id)
        },
        setActiveNote({ commit }, note: Note) {
            commit('SET_ACTIVE_NOTE', note)
        },
        setCreatingCategory({ commit }, value: boolean) {
            commit('SET_CREATING_CATEGORY', value)
        },
    },
})
