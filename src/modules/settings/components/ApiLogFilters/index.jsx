import { memo, useReducer } from 'react'

import { Input, Button, CustomSelector } from '@components'

import { JOB_SOURCE_OPTIONS_UNDERSCORE } from '@constants/scrapper'

const ApiLogFilters = ({ filtered, dispatch }) => {
    const [vals, update] = useReducer((prev, next) => ({ ...prev, ...next }), {
        from: filtered.from,
        to: filtered.to,
        sources: filtered.sources,
    })
    const applyFilters = () => dispatch({ from: vals.from, to: vals.to, sources: vals.sources })

    return (
        <div className='flex items-end gap-x-4 gap-y-1 p-3 mt-3 text-[#338d8c] bg-slate-100 border rounded-lg'>
            <div>
                <span className='text-xs font-semibold'>From Date</span>
                <Input
                    type='date'
                    onChange={({ target: { value } }) =>
                        update({ from: value, to: vals.to && value > vals.to ? value : vals.to })
                    }
                    value={vals.from}
                />
            </div>
            <div>
                <span className='text-xs font-semibold'>To Date</span>
                <Input type='date' onChange={e => update({ to: e.target.value })} value={vals.to} min={vals.from} />
            </div>
            <div>
                <span className='text-xs font-semibold'>Job Sources</span>
                <CustomSelector
                    options={JOB_SOURCE_OPTIONS_UNDERSCORE}
                    handleChange={obj => update({ sources: obj })}
                    selectorValue={vals.sources}
                    isMulti
                    placeholder='Select Job Sources'
                />
            </div>
            <Button label='Apply' classes='!px-4 !py-2' fit onClick={applyFilters} />
        </div>
    )
}

export default memo(ApiLogFilters)