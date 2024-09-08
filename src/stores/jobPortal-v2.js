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
    focused: null,

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
    setFoucused: (key, arrayLength) => {
        if (arrayLength > 0) {
            switch (key) {
                case 'ArrowUp':
                    set(state => ({ ...state, focused: state.focused === null ? 0 : state.focused - 1 }))
                    break
                case 'ArrowDown':
                    set(state => ({ ...state, focused: state.focused === arrayLength - 1 ? null : state.focused + 1 }))
                    break
                default:
                    break
            }
        }
    },
}))
