import { memo, useReducer } from 'react'
import { Tooltip } from 'react-tooltip'

import { Button, Input } from '@components'

import { DateRange, ExportAll, FilterOptions, FilterTypes, StacksDropdown } from '@modules/analytics/components'

import { DEFAULT_FILTER_VALS } from '@constants/analytics'

import { DateTimeIcon, CandidateFilterIcon, AllowLeadIcon } from '@icons'

const Filters = ({ values, set, data = null }) => {
    const [vals, update] = useReducer((state, newState) => ({ ...state, ...newState }), {
        from: values?.from,
        to: values?.to,
        year: values?.year,
        month: values?.month,
        week: values?.week,
        quarter: values?.quarter,
        query: values?.query,
        percent: values?.percent,
        excluded: values?.excluded || [],
        tab: values?.tab || 'custom',
    })
    const applyFilters = () =>
        set({
            from: vals.from,
            to: vals.to,
            query: vals.query,
            year: vals.year,
            month: vals.month,
            week: vals.week,
            quarter: vals.quarter,
            tab: vals.tab,
            percent: vals.percent,
            excluded: vals.excluded,
        })
    const clearFilters = () => {
        set({ query: '', percent: '', filter: false, bar: 'total', exluded: [], ...DEFAULT_FILTER_VALS })
        update({ query: '', percent: '', exluded: [], ...DEFAULT_FILTER_VALS })
    }

    return (
        <div className='text-[#1E6570]'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0'>
                <DateRange start={data?.start_date} end={data?.end_date} />
                <div className='flex flex-wrap gap-3'>
                    <StacksDropdown value={vals.excluded} update={update} />
                    <Input
                        ph='Percent'
                        type='number'
                        onChange={e => update({ percent: e.target.value })}
                        value={vals.percent}
                        classes='!w-28'
                    />
                    <Input
                        ph='Enter Keywords'
                        onChange={e => update({ query: e.target.value })}
                        value={vals.query}
                        classes='lg:!w-56'
                    />
                    <Button onClick={applyFilters} icon={AllowLeadIcon} classes='!px-1 apply-btn' fit />
                    <Tooltip anchorSelect='.apply-btn' content='Search or Apply' />
                    <Button
                        icon={CandidateFilterIcon}
                        label='Filters'
                        onClick={() => set({ filter: !values.filter })}
                        fit
                        fill={values.filter}
                    />
                    {(values.from ||
                        values.to ||
                        values.query ||
                        values.year ||
                        values.month ||
                        values.week ||
                        values.quarter) && <Button onClick={clearFilters} label='Clear' />}
                    <ExportAll />
                </div>
            </div>
            {values.filter && (
                <div className='border px-2 pt-9 text-[#1E6570] mt-10 relative'>
                    <FilterTypes vals={vals} update={update} />
                    <div className='flex flex-wrap items-end gap-2 md:gap-4 pb-3 px-2'>
                        <FilterOptions vals={vals} update={update} />
                        <Button onClick={applyFilters} label='Apply' classes='md:!py-2.5 w-max' icon={DateTimeIcon} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default memo(Filters)
