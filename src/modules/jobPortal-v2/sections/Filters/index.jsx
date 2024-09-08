import { memo } from 'react'
import useSWR from 'swr'

import { useJobPortalV2Store } from '@/stores'

import { CustomSelector, Checkbox, Filters } from '@components'

import { fetchJobFilters } from '@modules/jobPortal-v2/api'
import { PortalLayout } from '@modules/jobPortal-v2/components'

import { formatOptions } from '@utils/helpers'
import { JOB_SOURCE_OPTIONS } from '@constants/scrapper'

const JobPortalV2 = () => {
    const [query, filters, appliedFilters, update, apply, reset] = useJobPortalV2Store(state => [
        state?.query,
        state?.filters,
        state?.params,
        state?.setFilters,
        state?.setParams,
        state?.resetFilters,
    ])

    const { data, error, isLoading } = useSWR([query, appliedFilters], () => fetchJobFilters(query, appliedFilters), {
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        revalidateOnFocus: false,
    })

    return (
        <div className='w-1/5 bg-slate-200 rounded-xl'>
            <PortalLayout loading={isLoading} error={error} module='Filters'>
                <div className='flex flex-col items-center justify-center p-3 gap-4'>
                    <div className='w-full text-[#4f9d9b]'>
                        From
                        <input
                            className='w-full p-2 text-sm text-gray-500 bg-transparent rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer !bg-gray-50'
                            type='date'
                            max={new Date().toISOString().slice(0, 10)}
                            value={filters?.from}
                            onChange={event => update?.from(event.target.value)}
                        />
                    </div>
                    <div className='w-full text-[#4f9d9b]'>
                        To
                        <input
                            className='p-2 w-full text-sm text-gray-500 bg-transparent rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer !bg-gray-50'
                            type='date'
                            max={new Date().toISOString().slice(0, 10)}
                            value={filters?.to}
                            onChange={event => update?.to(event.target.value)}
                        />
                    </div>
                    {/* <div className='w-full text-[#4f9d9b]'>
                        Listings
                        <Selector
                            data={data?.jobTypes}
                            selectorValue={filters?.types}
                            handleSelectChange={e => update?.types(e.target.value)}
                        />
                    </div> */}
                    <div className='w-full text-[#4f9d9b]'>
                        Job Source
                        <CustomSelector
                            className='mx-auto'
                            options={JOB_SOURCE_OPTIONS}
                            handleChange={value => update?.sources(value)}
                            selectorValue={filters?.sources}
                            isMulti
                            placeholder='Select Job Source'
                        />
                    </div>
                    <div className='w-full text-[#4f9d9b]'>
                        Order By
                        <select
                            value={filters?.order}
                            onChange={e => update?.order(e.target.value)}
                            className='bg-gray-50 text-gray-900 text-sm focus:[#048C8C]-500 focus:border-[#048C8C]-500 block w-full p-2.5 rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer'
                        >
                            <option value='-job_posted_date'>Posted Date</option>
                            <option value='job_title'>Job Title</option>
                            <option value='job_type'>Job Type</option>
                            <option value='company_name'>Company</option>
                        </select>
                    </div>
                    <div className='w-full text-[#4f9d9b]'>
                        Job Visibility
                        <select
                            value={filters?.visible}
                            onChange={e => update?.visible(e.target.value)}
                            className='bg-gray-50 text-gray-900 text-sm focus:[#048C8C]-500 focus:border-[#048C8C]-500 block w-full p-2.5 rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer'
                        >
                            <option value='all'>All</option>
                            <option value='recruiter'>Recruiter</option>
                            <option value='non-recruiter'>Non-Recruiter</option>
                        </select>
                    </div>
                    <div className='w-full text-[#4f9d9b]'>
                        Tech Stack
                        <CustomSelector
                            className='mx-auto'
                            options={formatOptions(data?.techStacks)}
                            handleChange={value => update?.techs(value)}
                            selectorValue={filters?.techs}
                            isMulti
                            placeholder='Select Tech Stacks'
                        />
                    </div>
                    <div className='pt-2 bg-gray-50 px-1 rounded'>
                        <div className='w-full text-[#4f9d9b]'>
                            <Checkbox
                                label='Show Only Blocked Companies Jobs'
                                checked={filters?.blocked}
                                onChange={e => update?.blocked(e.target.checked)}
                            />
                        </div>
                    </div>
                    <div className='w-full text-[#4f9d9b]'>
                        <Filters apply={() => apply()} clear={() => reset()} />
                    </div>
                </div>
            </PortalLayout>
        </div>
    )
}

export default memo(JobPortalV2)
