import { create } from 'zustand'

import { DYNAMIC_JOB_SOURCES_INITIAL_VALUES } from '@constants/settings'

export const useDynamicJobSourcesStore = create(set => ({
    // ------------------- Getters ------------------- //
    ...DYNAMIC_JOB_SOURCES_INITIAL_VALUES,

    // ------------------- Setters ------------------- //
    setSource: source => set(state => ({ ...state, source, show: !state?.show })),
    setPage: page => set(state => ({ ...state, page })),
    setQuery: query => set(state => ({ ...state, query })),
    setShow: show => set(state => ({ ...state, show })),
    setMutator: func => set(state => ({ ...state, mutate: func })),
}))
