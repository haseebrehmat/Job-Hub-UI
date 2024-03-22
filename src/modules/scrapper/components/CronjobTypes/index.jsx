import { memo } from 'react'

import { Radio } from '@components'

const CronjobTyes = ({ types, set }) => (
    <div className='flex flex-col md:flex-row justify-between sm:w-1/3'>
        <Radio
            name='type'
            value='time'
            label='Time Based'
            checked={types.time}
            onChange={e => set({ interval: false, time: e.target.checked })}
        />
        <Radio
            name='type'
            value='interval'
            label='Interval Based'
            checked={types.interval}
            onChange={e => set({ time: false, interval: e.target.checked })}
        />
    </div>
)

export default memo(CronjobTyes)
