import { memo } from 'react'

import { Button } from '@components'

const FilterTypes = ({ vals = null, update = null }) =>
    vals && (
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
    )

export default memo(FilterTypes)
