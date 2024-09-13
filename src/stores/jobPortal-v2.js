import { create } from 'zustand'

import { FILTERS_DEFAULT_VALUES } from '@constants/jobPortalV2'

const JOB_PORTAL_INITIAL_URLS = { jobs: 'api/job_portal/jobs/', filters: 'api/job_portal/job_filters/' }

const getFilterAppliedURL = (query, filters) =>
    `?search=${query}&tech_keywords=${filters?.techs
        ?.map(tech => tech.label)
        ?.join(',')}&job_source=${filters?.sources?.join(',')}&ordering=${
        filters?.order ?? '-job_posted_date'
    }&job_visibility=${filters?.visible ?? 'all'}&from_date=${filters?.from}&to_date=${
        filters?.to
    }&job_type=${filters?.types?.join(',')}&blocked=${filters?.blocked}`

export const useJobPortalV2Store = create(set => ({
    url: JOB_PORTAL_INITIAL_URLS,
    query: '',
    filters: FILTERS_DEFAULT_VALUES,
    focused: null,
    job: null,
    mutator: null,
    expand: { sources: false, types: false },
    view: 'list',
    pagination: { next: null, previous: null },

    applyFilters: () =>
        set(state => ({
            ...state,
            url: {
                filters: `${JOB_PORTAL_INITIAL_URLS?.filters}${getFilterAppliedURL(state?.query, state?.filters)}`,
                jobs: `${JOB_PORTAL_INITIAL_URLS?.jobs}${getFilterAppliedURL(state?.query, state?.filters)}`,
            },
        })),
    setQuery: value => set(state => ({ ...state, query: value })),
    setFilters: {
        from: value => set(state => ({ ...state, filters: { ...state.filters, from: value } })),
        to: value => set(state => ({ ...state, filters: { ...state.filters, to: value } })),
        order: value => set(state => ({ ...state, filters: { ...state.filters, order: value } })),
        visible: value => set(state => ({ ...state, filters: { ...state.filters, visible: value } })),
        techs: value => set(state => ({ ...state, filters: { ...state.filters, techs: value } })),
        sources: (value, add) =>
            set(state => ({
                ...state,
                filters: {
                    ...state.filters,
                    sources: add
                        ? [...state.filters.sources, value]
                        : state.filters.sources.filter(val => val !== value),
                },
            })),
        types: (value, add) =>
            set(state => ({
                ...state,
                filters: {
                    ...state.filters,
                    types: add ? [...state.filters.types, value] : state.filters.types.filter(val => val !== value),
                },
            })),
        blocked: value => set(state => ({ ...state, filters: { ...state.filters, blocked: value } })),
    },
    resetFilters: () =>
        set(state => ({
            ...state,
            filters: FILTERS_DEFAULT_VALUES,
            query: '',
            url: JOB_PORTAL_INITIAL_URLS,
        })),
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
    setJob: job => set(state => ({ ...state, job })),
    setMutator: func => set(state => ({ ...state, mutator: func })),
    toggleExpand: {
        sources: () => set(state => ({ ...state, expand: { ...state.expand, sources: !state.expand.sources } })),
        types: () => set(state => ({ ...state, expand: { ...state.expand, types: !state.expand.types } })),
    },
    toggleView: () => set(state => ({ ...state, view: state.view === 'list' ? 'grid' : 'list' })),
    setPagination: (next, previous) => set(state => ({ ...state, pagination: { next, previous } })),
    next: () => set(state => ({ ...state, url: { ...state?.url, jobs: state?.pagination?.next } })),
    previous: () => set(state => ({ ...state, url: { ...state?.url, jobs: state?.pagination?.previous } })),
}))
