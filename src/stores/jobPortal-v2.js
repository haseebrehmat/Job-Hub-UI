import { create } from 'zustand'

export const useJobPortalV2Store = create(set => ({
    page: 1,
    query: '',
    filters: {
        from: '',
        to: '',
        order: '-job_posted_date',
        visible: 'all',
        techs: [],
        sources: [],
        types: [],
        blocked: false,
    },

    next: () => set(state => ({ ...state, page: state.page + 1 })),
    prev: () => set(state => ({ ...state, page: state.page - 1 })),
    setQuery: value => set(state => ({ ...state, query: value })),
    setFilters: {
        from: value => set(state => ({ ...state, filters: { ...state.filters, from: value } })),
        to: value => set(state => ({ ...state, filters: { ...state.filters, to: value } })),
        order: value => set(state => ({ ...state, filters: { ...state.filters, order: value } })),
        visible: value => set(state => ({ ...state, filters: { ...state.filters, visible: value } })),
        techs: value => set(state => ({ ...state, filters: { ...state.filters, techs: value } })),
        sources: value => set(state => ({ ...state, filters: { ...state.filters, sources: value } })),
        types: value => set(state => ({ ...state, filters: { ...state.filters, types: value } })),
        blocked: value => set(state => ({ ...state, filters: { ...state.filters, blocked: value } })),
    },
}))
