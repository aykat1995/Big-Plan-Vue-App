import type { Note } from '@/types'

export function createNewNote(categoryId = -1): Note {
    return {
        id: Date.now(),
        title: '',
        body: {
            content: '',
            plainText: '',
        },
        categoryId: categoryId,
        createdAt: Date.now(),
    }
}
