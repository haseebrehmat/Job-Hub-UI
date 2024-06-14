import { memo } from 'react'

import { Input, Radio } from '@components'

import { year } from '@constants/dashboard'

const FilterOptions = ({ vals = null, update = null }) =>
    vals && (
        <>
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
                                    onChange={e => update({ quarter: e.target.value })}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    )

export default memo(FilterOptions)
