import { useState } from 'react'
import AnimatedNumber from 'react-animated-number'

import { Button } from '@components'

import { formatNum } from '@utils/helpers'

import { JobsUploaderIcon } from '@icons'

const ApiLogsAnalytics = ({ stats }) => {
    const [s2P, setS2P] = useState(true)
    return (
        <div className='flex flex-row justify-center mt-8'>
            <div className='border border-1 p-4 m-2 -mr-6 text-center bg-[#EDFDFB] text-[#1E6570] flex justify-center rounded-xl shadow-lg hover:bg-[#e0fcf8] hover:transform hover:scale-[110%] w-48 z-10'>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-2xl mb-1 scraper_logs_icon'>{JobsUploaderIcon}</p>
                    <h1 className='text-md font-bold'>
                        <AnimatedNumber
                            component='p'
                            initialValue={0}
                            value={
                                s2P
                                    ? stats?.total_hits_stagging_to_production
                                    : stats?.total_hits_production_to_sales_engine
                            }
                            stepPrecision={0}
                            style={{
                                transition: '0.8s ease-out',
                                fontSize: 40,
                                transitionProperty: 'background-color, color, opacity',
                            }}
                            duration={1000}
                            formatValue={n => formatNum(n)}
                        />
                    </h1>
                    <p>{s2P ? 'Stage --> Prod' : 'Prod --> SE'}</p>
                </div>
            </div>
            <div className='flex flex-col bg-slate-100 py-4 rounded-3xl'>
                <div className='flex mx-2 px-2 ml-16 -mt-8 z-10'>
                    <Button
                        label='Staging --> Production'
                        fit
                        fill={!s2P}
                        classes={`md:pr-8 md:pl-6 text-lg shadow-xl rounded mx-4 ${
                            s2P && 'border-gray-200 bg-[#EDFDFB]'
                        }`}
                        onClick={() => setS2P(false)}
                    />
                    <Button
                        label='Production --> Sales Engine'
                        fit
                        fill={s2P}
                        classes={`md:pr-8 md:pl-6 text-lg shadow-xl rounded ${!s2P && 'border-gray-200 bg-[#EDFDFB]'}`}
                        onClick={() => setS2P(true)}
                    />
                </div>
                <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 items-center px-10  mt-4'>
                    {/* {job_sources &&
                        job_sources.map((item, index) => (
                            <div
                                className='border border-1 p-6 mx-4 my-2 text-center bg-[#EDFDFB] text-[#1E6570] flex justify-center rounded-xl shadow-lg hover:bg-[#e0fcf8] hover:transform hover:scale-[110%]'
                                key={index}
                            >
                                <div>
                                    <h1 className='text-md font-bold'>
                                        <AnimatedNumber
                                            component='p' 
                                            initialValue={0}
                                            value={s2P ? item?.total_uploaded_jobs : item?.total_scraper_jobs}
                                            stepPrecision={0}
                                            style={{
                                                transition: '0.8s ease-out',
                                                fontSize: 28,
                                                transitionProperty: 'background-color, color, opacity',
                                            }}
                                            duration={1000}
                                            formatValue={n => formatNum(n)}
                                        />
                                    </h1>
                                    <p className='text-sm'>{item.job_source.toUpperCase()}</p>
                                </div>
                            </div>
                        ))} */}
                </div>
            </div>
        </div>
    )
}
export default ApiLogsAnalytics
