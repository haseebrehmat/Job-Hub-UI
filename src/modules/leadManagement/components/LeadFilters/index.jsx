import { memo, useReducer } from 'react'

import { Input, Button } from '@components'

const LeadFilters = ({ filtered = null, dispatch = null }) => {
    const [vals, update] = useReducer((prev, next) => ({ ...prev, ...next }), {
        from: filtered.from,
        to: filtered.to,
    })

    const applyFilters = () => dispatch({ from: vals.from, to: vals.to })

    return (
        <div className='grid grid-cols-5 items-end gap-3 px-5 text-[#338d8c]'>
            <div>
                <span className='text-xs font-semibold'>From Date*</span>
                <Input
                    type='date'
                    onChange={({ target: { value } }) => update({ from: value, to: value > vals.to ? value : vals.to })}
                    value={vals.from}
                />
            </div>
            <div>
                <span className='text-xs font-semibold'>To Date*</span>
                <Input type='date' onChange={e => update({ to: e.target.value })} value={vals.to} min={vals.from} />
            </div>
            <Button label='Get' classes='!px-4 !py-2.5' fit onClick={applyFilters} />
        </div>
    )
}

export default memo(LeadFilters)
