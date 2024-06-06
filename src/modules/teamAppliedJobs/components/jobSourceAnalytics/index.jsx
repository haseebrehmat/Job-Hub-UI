import AnimatedNumber from 'react-animated-number'

import './style.css'

const JobSourceAnalytics = ({ job_sources, total }) => (
    <div className='flex flex-row justify-center'>
        <div className='border border-1 p-4 m-2 text-center bg-[#EDFDFB] text-[#1E6570] flex justify-center rounded-xl shadow-lg hover:bg-[#e0fcf8] hover:transform hover:scale-[110%] w-48 z-10 '>
            <div className='flex flex-col justify-center'>
                <h1 className='text-md font-bold'>
                    <AnimatedNumber
                        component='text'
                        initialValue={0}
                        value={total}
                        stepPrecision={0}
                        style={{
                            transition: '0.8s ease-out',
                            fontSize: 44,
                            transitionProperty: 'background-color, color, opacity',
                        }}
                        duration={1000}
                        formatValue={n => Intl.NumberFormat('en-US').format(n)}
                    />
                </h1>
                <p className='text-lg'>Total Applied Jobs</p>
            </div>
        </div>
        <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 items-center px-10 bg-slate-100 py-4 rounded-3xl -ml-8'>
            {job_sources &&
                job_sources.map(item => (
                    <div className='border border-1 p-6 mx-4 my-2 text-center bg-[#EDFDFB] text-[#1E6570] flex justify-center rounded-xl shadow-lg hover:bg-[#e0fcf8] hover:transform hover:scale-[110%]'>
                        <div className=''>
                            <h1 className='text-md font-bold '>
                                <AnimatedNumber
                                    component='text'
                                    initialValue={0}
                                    value={item.total_applied_jobs}
                                    stepPrecision={0}
                                    style={{
                                        transition: '0.8s ease-out',
                                        fontSize: 28,
                                        transitionProperty: 'background-color, color, opacity',
                                    }}
                                    duration={1000}
                                    formatValue={n => Intl.NumberFormat('en-US').format(n)}
                                />
                            </h1>
                            <p className='text-sm'>{item.job__job_source.toUpperCase()}</p>
                        </div>
                    </div>
                ))}
        </div>
    </div>
)
export default JobSourceAnalytics
