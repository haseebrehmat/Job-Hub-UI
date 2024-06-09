import { memo } from 'react'
import AnimatedNumber2 from 'react-animated-number'

import { formatNum } from '@utils/helpers'

import { stacksData, jobstypeData } from './data'

const Analytics = () => (
    <div className='max-w-full mb-14 px-3 mt-6'>
        <div className='border px-2 pt-10 pb-4 text-[#1E6570] relative'>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg'>Job Types Analytics</p>
            <div className='grid grid-cols-6 gap-4'>
                {jobstypeData?.map((d, index) => (
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
                                    style={{
                                        transition: '0.8s ease-out',
                                        fontSize: 26,
                                        transitionProperty: 'background-color, color, opacity',
                                    }}
                                    duration={1000}
                                    formatValue={n => formatNum(n)}
                                />
                                <p className='uppercase text-xs'>{d.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className='border px-2 pt-10 pb-4 text-[#1E6570] mt-10 relative'>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg'>Tech Stacks Analytics</p>
            <div className='grid grid-cols-5 gap-4'>
                {stacksData?.map((d, index) => (
                    <div className='border shadow-md pl-2 pr-3 py-2 bg-[#EDFDFB] w-full' key={index}>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col'>
                                <AnimatedNumber2
                                    initialValue={0}
                                    component='p'
                                    value={d.value}
                                    stepPrecision={0}
                                    style={{
                                        transition: '0.8s ease-out',
                                        fontSize: 22,
                                        transitionProperty: 'background-color, color, opacity',
                                    }}
                                    duration={1000}
                                    formatValue={n => formatNum(n)}
                                />
                                <p className='uppercase text-xs'>{d.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)

export default memo(Analytics)

// eslint-disable-next-line no-lone-blocks
{
    /* <div className='flex flex-wrap gap-2'>
            {data?.map((d, index) => (
                <div
                    className='border p-4 m-2 text-center bg-[#EDFDFB] text-[#1E6570] flex items-center justify-center rounded-xl shadow-lg w-40 h-40 bg-contain bg-no-repeat bg-center backdrop-filter backdrop-blur-lg'
                    key={index}
                    style={{
                        backgroundImage: `linear-gradient(rgba(237, 253, 251, 0.9), rgba(237, 253, 251, 0.9)), url(${d.icon})`,
                    }}
                >
                    <div className='flex flex-col space-y-2 items-center'>
                        <h1 className='font-bold'>
                            <AnimatedNumber2
                                initialValue={0}
                                component='p'
                                value={d.value}
                                stepPrecision={0}
                                style={{
                                    transition: '0.8s ease-out',
                                    fontSize: 32,
                                    transitionProperty: 'background-color, color, opacity',
                                }}
                                duration={1000}
                                formatValue={n => formatNum(n)}
                            />
                        </h1>
                        <p className='uppercase text-sm font-semibold'>{d.name}</p>
                    </div>
                </div>
            ))}
        </div> */
}
