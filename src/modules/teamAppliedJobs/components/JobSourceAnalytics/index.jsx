import { useState } from 'react'
import AnimatedNumber from 'react-animated-number'

import { Button } from '@components'

import { formatNum } from '@utils/helpers'

import { AppliedJobs as Jobs } from '@icons'

const JobSourceAnalytics = ({ job_sources, total, job_types }) => {
    const [jobType, setJobTypes] = useState(true)
    return (
        <div className='flex flex-row justify-center mt-8'>
            <div className='border border-1 p-4 m-2 -mr-6 text-center bg-[#EDFDFB] text-[#1E6570] flex justify-center rounded-xl shadow-lg hover:bg-[#e0fcf8] hover:transform hover:scale-[110%] w-48 z-10'>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-2xl mb-1'>{Jobs}</p>
                    <h1 className='text-md font-bold'>
                        <AnimatedNumber
                            component='p'
                            initialValue={0}
                            value={total}
                            stepPrecision={0}
                            style={{
                                transition: '0.8s ease-out',
                                fontSize: 44,
                                transitionProperty: 'background-color, color, opacity',
                            }}
                            duration={1000}
                            formatValue={n => formatNum(n)}
                        />
                    </h1>
                    <p className='text-lg'>Total Applied Jobs</p>
                </div>
            </div>
            <div className='flex flex-col bg-slate-100 py-4 rounded-3xl'>
                <div className='flex mx-2 px-2 ml-16 -mt-8 z-10'>
                    <Button
                        label='Job Sources'
                        fit
                        fill={!jobType}
                        classes={`md:pr-8 md:pl-6 shadow-xl rounded mx-4 ${jobType && 'border-gray-200 bg-[#EDFDFB]'}`}
                        onClick={() => setJobTypes(false)}
                    />
                    <Button
                        label='Job Types'
                        fit
                        fill={jobType}
                        classes={`md:pr-8 md:pl-6 shadow-xl rounded ${!jobType && 'border-gray-200 bg-[#EDFDFB]'}`}
                        onClick={() => setJobTypes(true)}
                    />
                </div>
                <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 items-center px-10  mt-4'>
                    {job_sources &&
                        !jobType &&
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
                                            value={item.total_job_source}
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
                                    <p className='text-sm'>{item.job__job_source.toUpperCase()}</p>
                                </div>
                            </div>
                        ))}
                    {job_types &&
                        jobType &&
                        job_types.map((item, index) => (
                            <div
                                className='border border-1 p-6 mx-4 my-2 text-center bg-[#EDFDFB] text-[#1E6570] flex justify-center rounded-xl shadow-lg hover:bg-[#e0fcf8] hover:transform hover:scale-[110%]'
                                key={index}
                            >
                                <div>
                                    <h1 className='text-md font-bold'>
                                        <AnimatedNumber
                                            component='p'
                                            initialValue={0}
                                            value={item.total_job_type}
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
                                    <p className='text-sm'>{item.job__job_type.toUpperCase()}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
export default JobSourceAnalytics
