import { create } from 'zustand'

const defaultValues = {
    dates: { from_date: '', to_date: '' },
    techStackSelector: [],
    jobSourceSelector: [],
    jobVisibilitySelector: 'all',
    jobTypeSelector: 'all',
    jobTitle: '',
    ordering: '-job_posted_date',
    blocked: false,
}

export const useJobPortalFiltersStore = create(set => ({
    // ------------------- Getters ------------------- //
    ...defaultValues,

    // ------------------- Setters ------------------- //
    setDates: (value, type) =>
        set(state => ({
            ...state,
            dates: { ...state.dates, [type]: value },

            // Reset these values to default
            jobTypeSelector: defaultValues.jobTypeSelector,
            jobSourceSelector: defaultValues.jobSourceSelector,
            techStackSelector: defaultValues.techStackSelector,
        })),
    setJobType: value => set(state => ({ ...state, jobTypeSelector: value })),
    setJobSources: value => set(state => ({ ...state, jobSourceSelector: value })),
    setOrdering: value => set(state => ({ ...state, ordering: value })),
    setJobVisibility: value => set(state => ({ ...state, jobVisibilitySelector: value })),
    setTechs: value => set(state => ({ ...state, techStackSelector: value })),
    toggleBlocked: () => set(state => ({ ...state, blocked: !state.blocked })),
    setJobTitle: value => set(state => ({ ...state, jobTitle: value })),
    reset: () => set(defaultValues),
}))
