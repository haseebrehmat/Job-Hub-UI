import { create } from 'zustand'

import { MONTHS } from '@constants/analytics'

export const useAnalyticsStore = create(set => ({
    // ------------------- Getters ------------------- //
    techStack: {
        months: MONTHS.reduce((acc, month) => ({ ...acc, [month.abr]: true }), {}),
    },
    category: {
        months: MONTHS.reduce((acc, month) => ({ ...acc, [month.abr]: true }), {}),
    },

    // ------------------- Setters ------------------- //
    toggleTechStack: {
        months: key =>
            set(state => ({
                ...state,
                techStack: {
                    ...state.techStack,
                    months: { ...state.techStack.months, [key]: !state.techStack.months[key] },
                },
            })),
    },
    toggleCategory: {
        months: key =>
            set(state => ({
                ...state,
                category: {
                    ...state.category,
                    months: { ...state.category.months, [key]: !state.category.months[key] },
                },
            })),
    },
}))
