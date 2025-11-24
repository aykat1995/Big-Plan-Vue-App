import type { Note } from "@/types";

export function createNewNote(): Note {
    return {
        id: Date.now(),
        title: '',
        body : {
            content: '',
            plainText: ''
        },
        categoryId: -1,
        createdAt: Date.now()
    }
}