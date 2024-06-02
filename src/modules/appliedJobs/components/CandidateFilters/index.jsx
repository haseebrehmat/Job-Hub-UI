import { memo, useMemo, useReducer } from 'react'

import { CustomSelector, Button } from '@components'

const CandidateFilters = ({ options, selected, dispatch = null }) => {
    const { skills, designations } = selected

    const [filters, setFilters] = useReducer((prev, next) => ({ ...prev, ...next }), {
        skills: options.skills.filter(({ value }) => skills?.split(',').includes(value.toString())),
        designations: options.designations.filter(({ value }) => designations?.split(',').includes(value.toString())),
    })

    const applyFilters = () =>
        dispatch({
            skills: filters.skills.map(s => s.value).join(','),
            designations: filters.designations.map(s => s.value).join(','),
        })

    useMemo(() => {
        if (skills.length < 1 && designations.length < 1) setFilters({ skills: [], designations: [] })
    }, [skills, designations])

    return (
        <div className='grid grid-cols-4 gap-2 pt-1.5'>
            <CustomSelector
                name='skills'
                options={options?.skills}
                handleChange={obj => setFilters({ skills: obj })}
                selectorValue={filters.skills}
                isMulti
                placeholder='Select Skills'
            />
            <CustomSelector
                name='designations'
                options={options?.designations}
                handleChange={obj => setFilters({ designations: obj })}
                selectorValue={filters.designations}
                isMulti
                placeholder='Select Designations'
            />
            <Button label='Get' classes='!px-4' fit onClick={applyFilters} />
        </div>
    )
}

export default memo(CandidateFilters)
