import { memo, useReducer } from 'react'

import { Button, Input } from '@components'

import { formatDate2 } from '@utils/helpers'
import { today } from '@constants/dashboard'

import { DateTimeIcon } from '@icons'

const Filters = ({ values, set }) => {
    const [vals, update] = useReducer((state, newState) => ({ ...state, ...newState }), {
        from: values?.from,
        to: values?.to,
        query: values?.query,
    })

    const applyFilters = () => set({ from: vals.from, to: vals.to, query: vals.query })
    const clearFilters = () => {
        set({ from: '', to: '', query: '' })
        update({ from: '', to: '', query: '' })
    }

    return (
        <div className='border px-2 pt-6 pb-4 text-[#1E6570] mt-10 relative'>
            <p className='-mt-12 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>Filteration</p>
            <div className='flex flex-col lg:flex-row items-center justify-between px-3'>
                <div className='flex items-end gap-x-4 text-lg tracking-wider'>
                    <div>
                        <small className='text-sm'>From:</small> {formatDate2(values?.from || today)}
                    </div>
                    <div>
                        <small className='text-sm'>To:</small> {formatDate2(values?.to || today)}
                    </div>
                </div>
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
                                update({ from: value, to: vals.to.length === 0 || value > vals.to ? value : vals.to })
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
                    <Button onClick={applyFilters} label='Apply' classes='!py-2.5 w-max' icon={DateTimeIcon} />
                    {(values.from || values.to || values.query) && (
                        <Button onClick={clearFilters} label='Clear' classes='!py-[11px] w-max' />
                    )}
                </div>
            </div>
        </div>
    )
}

export default memo(Filters)
