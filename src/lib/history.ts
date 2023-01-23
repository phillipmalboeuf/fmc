import { writable } from 'svelte/store'

export const currentPage = writable<string>()
export const currentArticle = writable<string>()