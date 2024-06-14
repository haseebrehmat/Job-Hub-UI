import { memo, useReducer } from 'react'

import { Button, Input, Radio } from '@components'

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
        quarter: values?.quarter,
        query: values?.query,
        tab: 'custom',
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
        })
    const clearFilters = () => {
        set({ from: '', to: '', query: '', week: '', quarter: '', month: '', year: '', filter: false })
        update({ from: '', to: '', query: '', week: '', quarter: '', month: '', year: '' })
    }

    return (
        <div className='text-[#1E6570]'>
            <div className='flex items-center justify-between'>
                <div className='flex md:gap-x-8 text-lg tracking-wider ml-3'>
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
                <div className='border px-2 pt-10 text-[#1E6570] mt-10 relative'>
                    <div className='-mt-16 absolute px-2 py-1 border bg-[#EDFDFB] text-lg tracking-widest'>
                        <div className='flex flex-row md:gap-8'>
                            <Button
                                label='Quarterly'
                                fit
                                fill={vals.tab === 'quarterly'}
                                classes='border-0 rounded-none'
                                onClick={() => update({ tab: 'quarterly' })}
                            />
                            <Button
                                label='Monthly'
                                fit
                                fill={vals.tab === 'monthly'}
                                classes='border-0 rounded-none'
                                onClick={() => update({ tab: 'monthly' })}
                            />
                            <Button
                                label='Weekly'
                                fit
                                fill={vals.tab === 'weekly'}
                                classes='border-0 rounded-none'
                                onClick={() => update({ tab: 'weekly' })}
                            />
                            <Button
                                label='Custom Dates'
                                fit
                                fill={vals.tab === 'custom'}
                                classes='border-0 rounded-none'
                                onClick={() => update({ tab: 'custom' })}
                            />
                        </div>
                    </div>
                    <div className='flex items-end gap-4 pb-3 px-2'>
                        {vals.tab === 'custom' && (
                            <>
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
                                        classes='lg:!w-56'
                                    />
                                </div>
                                <div>
                                    <span className='text-xs pl-1'>To Date</span>
                                    <Input
                                        type='date'
                                        onChange={e => update({ to: e.target.value })}
                                        value={vals.to}
                                        min={vals.from}
                                        classes='lg:!w-56'
                                    />
                                </div>
                            </>
                        )}
                        {vals.tab === 'weekly' && (
                            <div>
                                <span className='text-xs pl-1'>Week</span>
                                <Input
                                    type='week'
                                    onChange={e => update({ week: e.target.value })}
                                    value={vals.week}
                                    classes='lg:!w-56'
                                />
                            </div>
                        )}
                        {vals.tab === 'monthly' && (
                            <div>
                                <span className='text-xs pl-1'>Month</span>
                                <Input
                                    type='month'
                                    onChange={e => update({ month: e.target.value })}
                                    value={vals.month}
                                    classes='lg:!w-56'
                                />
                            </div>
                        )}
                        {vals.tab === 'quarterly' && (
                            <>
                                <div>
                                    <span className='text-xs pl-1'>Year</span>
                                    <Input
                                        type='number'
                                        onChange={e => update({ year: e.target.value })}
                                        value={vals.year}
                                        min='2000'
                                        max={year}
                                        classes='lg:!w-56'
                                    />
                                </div>
                                <div>
                                    <span className='text-xs pl-1'>Choose quarter</span>
                                    <div className='flex gap-8 my-2'>
                                        {[...Array(4)].map((_, i) => (
                                            <Radio
                                                key={i}
                                                name='quarter'
                                                value={`q${i + 1}`}
                                                label={`Q ${i + 1}`}
                                                onChange={e => set({ quarter: e.target.value })}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
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
