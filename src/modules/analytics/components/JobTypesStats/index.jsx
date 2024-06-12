import { memo } from 'react'
import AnimatedNumber2 from 'react-animated-number'

import { formatNum } from '@utils/helpers'

const numberStyle = {
    transition: '0.8s ease-out',
    fontSize: 28,
    transitionProperty: 'background-color, color, opacity',
}

const JobTypesStats = ({ data = [] }) => (
    <div className='border px-2 pt-10 pb-4 text-[#1E6570] relative'>
        <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>Job Types Analytics</p>
        <div className='grid grid-cols-6 gap-4'>
            {data?.map((d, index) => (
                <div
                    className='border shadow-md pl-2 pr-3 py-2 bg-[#EDFDFB] w-full h-28 flex items-center justify-center text-center'
                    key={index}
                >
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-col'>
                            <AnimatedNumber2
                                initialValue={0}
                                component='p'
                                value={d.value}
                                stepPrecision={0}
                                style={numberStyle}
                                duration={1000}
                                formatValue={n => formatNum(n)}
                            />
                            <p className='uppercase text-xs tracking-widest'>{d.name}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

export default memo(JobTypesStats)
