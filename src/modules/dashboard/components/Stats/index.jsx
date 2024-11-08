import { memo } from 'react'
import AnimatedNumber2 from 'react-animated-number'
import useSWR from 'swr'

import {
    JobsComparison,
    ThrivingSources,
    DecliningSources,
    ThrivingTechnologies,
    DecliningTechnologies,
} from '@modules/dashboard/components'
import { fetchJobStats } from '@modules/dashboard/api'
import { data } from '@modules/dashboard/api/data'

import { formatNum, isSuper } from '@utils/helpers'

import { UpIcon } from '@icons'

const Dashboard = () => {
    const { data: resp } = useSWR(`/api/job_portal/trending_jobs_stats/`, fetchJobStats)
    const allowed = isSuper()
    console.log(resp)
    return allowed ? (
        <div className='grid lg:grid-cols-2'>
            <JobsComparison data={resp?.jobs?.month} />
            <ThrivingSources data={resp?.thriving_sources?.month} relative={resp?.thriving_source_status} />
            <DecliningSources data={resp?.declining_sources?.month} relative={resp?.declining_source_status} />
            <ThrivingTechnologies
                data={resp?.thriving_tech_stacks?.month}
                relative={resp?.thriving_tech_stack_status}
            />
            <DecliningTechnologies
                data={resp?.declining_tech_stacks?.month}
                relative={resp?.declining_tech_stack_status}
            />
            <div className='pb-5 pl-2'>
                <div className='border shadow-lg p-4 rounded-xl flex items-start'>
                    <div className='flex flex-col tracking-widest w-full'>
                        <p className='text-lg text-gray-700 border-b font-semibold'>Emerging Job Titles</p>
                        <small className='text-gray-500'>
                            List of Top 5 Emerging Job Titles (from others & others dev) from current month
                        </small>
                        {data?.emerging_titles?.month?.map((item, index) => (
                            <div className='flex items-center justify-between pt-5' key={index}>
                                <p className='text-opacity-50'>{item?.title}</p>
                                <div className='inline-flex items-center gap-2 text-green-600'>
                                    <AnimatedNumber2
                                        className='font-mono'
                                        initialValue={0}
                                        component='span'
                                        value={item?.count}
                                        stepPrecision={0}
                                        style={{ fontSize: 16 }}
                                        duration={1000}
                                        formatValue={n => formatNum(n)}
                                    />
                                    {UpIcon}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='pb-5 pl-2'>
                <div className='border shadow-lg p-4 rounded-xl flex items-start h-full'>
                    <div className='flex flex-col tracking-widest w-full'>
                        <p className='text-lg text-gray-700 border-b font-semibold'>Thriving Job Titles</p>
                        <small className='text-gray-500'>
                            List of Top 5 Thrived Job Titles Which Have Jobs Currently More Than Previous Month
                        </small>
                        {data?.thriving_titles?.month?.map((item, index) => (
                            <div className='flex items-center justify-between pt-3' key={index}>
                                <p className='text-opacity-50'>{item?.title}</p>
                                <div className='inline-flex items-center gap-2 text-[#4f9d9b]'>
                                    <AnimatedNumber2
                                        className='font-mono'
                                        initialValue={0}
                                        component='span'
                                        value={item?.count}
                                        stepPrecision={0}
                                        style={{ fontSize: 20 }}
                                        duration={1000}
                                        formatValue={n => formatNum(n)}
                                    />
                                    Jobs {UpIcon}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ) : null
}

export default memo(Dashboard)
