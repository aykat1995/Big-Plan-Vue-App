export interface Note {
    id: number
    title: string
    body: {
        content: string
        plainText: string
        title?: string
    }
    pined?: boolean
    categoryId: number
    createdAt: number
    updatedAt?: number
}

export interface Category {
    id: number
    name: string
}

export interface State {
    notes: Note[]
    categories: Category[]
    activeNote: Note | null
    activeCategoryId: number
    creatingCategory: boolean
}
