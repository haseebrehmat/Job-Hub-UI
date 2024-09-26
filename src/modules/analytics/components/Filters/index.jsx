import { memo, useReducer } from 'react'

import { Button, Input } from '@components'

import { ExportAll, FilterOptions, FilterTypes } from '@modules/analytics/components'

import { formatDate2 } from '@utils/helpers'
import { today } from '@constants/dashboard'

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
        })
    const clearFilters = () => {
        set({ from: '', to: '', query: '', week: '', quarter: '', month: '', year: '', filter: false, bar: 'total' })
        update({ from: '', to: '', query: '', week: '', quarter: '', month: '', year: '' })
    }

    return (
        <div className='text-[#1E6570]'>
            <div className='flex flex-col md:flex-row items-center justify-between'>
                <div className='flex gap-x-4 md:gap-x-8 text-lg tracking-wider md:ml-3'>
                    <div>
                        <small className='text-sm'>From:</small> {formatDate2(data?.start_date || today)}
                    </div>
                    <div>
                        <small className='text-sm'>To:</small> {formatDate2(data?.end_date || today)}
                    </div>
                </div>
                <div className='flex flex-wrap gap-3'>
                    <ExportAll />
                    <Input
                        ph='Enter Keywords'
                        onChange={e => update({ query: e.target.value })}
                        value={vals.query}
                        classes='lg:!w-56'
                    />
                    <Button onClick={applyFilters} icon={AllowLeadIcon} classes='!px-1' fit />
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
                </div>
            </div>
            {values.filter && (
                <div className='border px-2 pt-10 text-[#1E6570] mt-10 relative'>
                    <FilterTypes vals={vals} update={update} />
                    <div className='flex items-end gap-4 pb-3 px-2'>
                        <FilterOptions vals={vals} update={update} />
                        <Button onClick={applyFilters} label='Apply' classes='!py-2.5 w-max' icon={DateTimeIcon} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default memo(Filters)
