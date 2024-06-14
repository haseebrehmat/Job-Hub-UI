import { memo, useReducer } from 'react'

import { Button, Input } from '@components'

import { formatDate2 } from '@utils/helpers'
import { year, today } from '@constants/dashboard'

import { DateTimeIcon, CandidateFilterIcon } from '@icons'

const Filters = ({ values, set }) => {
    const [vals, update] = useReducer((state, newState) => ({ ...state, ...newState }), {
        from: values?.from,
        to: values?.to,
        year: values?.year,
        month: values?.month,
        week: values?.week,
        query: values?.query,
    })

    const applyFilters = () => set({ from: vals.from, to: vals.to, query: vals.query })
    const clearFilters = () => {
        set({ from: '', to: '', query: '' })
        update({ from: '', to: '', query: '' })
    }

    return (
        <div className='text-[#1E6570]'>
            <div className='flex items-center justify-between pb-2'>
                <div className='flex md:gap-x-8 text-lg tracking-wider'>
                    <div>
                        <small className='text-sm'>From:</small> {formatDate2(values?.from || today)}
                    </div>
                    <div>
                        <small className='text-sm'>To:</small> {formatDate2(values?.to || today)}
                    </div>
                </div>
                <Button
                    icon={CandidateFilterIcon}
                    label='Filters'
                    onClick={() => set({ filter: !values.filter })}
                    fit
                    fill={values.filter}
                />
            </div>
            {values.filter && (
                <div className='border px-3 py-2 flex flex-col lg:flex-row items-center justify-between'>
                    <div className='flex flex-wrap md:flex-nowrap items-end gap-2'>
                        <div>
                            <span className='text-xs pl-1'>Search</span>
                            <Input
                                onChange={({ target: { value: query } }) => update({ query })}
                                value={vals.query}
                                classes='lg:!w-52'
                                ph='Enter Keywords'
                            />
                        </div>
                        <div>
                            <span className='text-xs pl-1'>From Date</span>
                            <Input
                                type='date'
                                onChange={({ target: { value } }) =>
                                    update({
                                        from: value,
                                        to: vals.to.length === 0 || value > vals.to ? value : vals.to,
                                    })
                                }
                                value={vals.from}
                                classes='lg:!w-52'
                            />
                        </div>
                        <div>
                            <span className='text-xs pl-1'>To Date</span>
                            <Input
                                type='date'
                                onChange={e => update({ to: e.target.value })}
                                value={vals.to}
                                min={vals.from}
                                classes='lg:!w-52'
                            />
                        </div>
                        <div>
                            <span className='text-xs pl-1'>Year</span>
                            <Input
                                type='number'
                                onChange={e => update({ year: e.target.value })}
                                value={vals.year}
                                min='2000'
                                max={year}
                                classes='lg:!w-fit'
                            />
                        </div>
                        <div>
                            <span className='text-xs pl-1'>Month</span>
                            <Input
                                type='month'
                                onChange={e => update({ month: e.target.value })}
                                value={vals.month}
                                classes='lg:!w-fit'
                            />
                        </div>
                        <div>
                            <span className='text-xs pl-1'>Week</span>
                            <Input
                                type='week'
                                onChange={e => update({ week: e.target.value })}
                                value={vals.week}
                                classes='lg:!w-fit'
                            />
                        </div>
                        <Button onClick={applyFilters} label='Apply' classes='!py-2.5 w-max' icon={DateTimeIcon} />
                        {(values.from || values.to || values.query) && (
                            <Button onClick={clearFilters} label='Clear' classes='!py-[11px] w-max' />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default memo(Filters)
