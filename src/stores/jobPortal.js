import { create } from 'zustand'

import { removeFilterCounts } from '@utils/helpers'
import { FILTERS_DEFAULT_VALUES } from '@constants/jobPortal'

export const useJobPortalFiltersStore = create(set => ({
    // ------------------- Getters ------------------- //
    ...FILTERS_DEFAULT_VALUES,

    // ------------------- Setters ------------------- //
    setDates: (value, type) => set(state => ({ ...state, dates: { ...state.dates, [type]: value } })),
    setJobType: value => set(state => ({ ...state, jobTypeSelector: value })),
    setJobSources: value => set(state => ({ ...state, jobSourceSelector: removeFilterCounts(value) })),
    setOrdering: value => set(state => ({ ...state, ordering: value })),
    setJobVisibility: value => set(state => ({ ...state, jobVisibilitySelector: value })),
    setTechs: value => set(state => ({ ...state, techStackSelector: removeFilterCounts(value) })),
    toggleBlocked: () => set(state => ({ ...state, blocked: !state.blocked })),
    setJobTitle: value => set(state => ({ ...state, jobTitle: value })),
    setPage: value => set(state => ({ ...state, page: value })),
    reset: () => set(FILTERS_DEFAULT_VALUES),
}))