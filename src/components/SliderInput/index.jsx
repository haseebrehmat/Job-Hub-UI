import { memo } from 'react'

const SliderInput = ({ name, min = 0, max, step = 1, value, onChange = null }) => (
    <div className='flex items-center'>
        <input
            name={name}
            type='range'
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className='w-full appearance-none bg-gray-200 h-2 rounded-md'
        />
        <output className='ml-2 text-lg font-medium text-[#359393]'>{value}</output>
    </div>
)

export default memo(SliderInput)