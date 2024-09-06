import { create } from 'zustand'

export const useGroupLinksStore = create(set => ({
    link: null,
    links: [],
    show: { form: false, details: false },
    setLink: link => set(state => ({ ...state, link, show: { form: true, details: false } })),
    setLinks: links => set(state => ({ ...state, links })),
    toggle: {
        form: value => set(state => ({ ...state, show: { ...state.show, form: value ?? !state.show.form } })),
        details: value => set(state => ({ ...state, show: { ...state.show, details: value ?? !state.show.details } })),
    },
}))
