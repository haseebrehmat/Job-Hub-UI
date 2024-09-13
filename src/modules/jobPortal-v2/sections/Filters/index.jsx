import { memo } from 'react'
import useSWR from 'swr'

import { useJobPortalV2Store } from '@/stores'

import { CustomSelector, Filters, Input } from '@components'

import { fetchJobFilters } from '@modules/jobPortal-v2/api'
import { PortalLayout, OrderBy, Visibility } from '@modules/jobPortal-v2/components'

import { SWR_REVALIDATE } from '@constants/global'

import { SearchIcon } from '@icons'

const JobPortalV2 = () => {
    const [url, filters, expand, query, setQuery, update, toggle, apply, reset] = useJobPortalV2Store(state => [
        state?.url?.filters,
        state?.filters,
        state?.expand,
        state?.query,
        state?.setQuery,
        state?.setFilters,
        state?.toggleExpand,
        state?.applyFilters,
        state?.resetFilters,
    ])

    const { data, error, isLoading } = useSWR(url, fetchJobFilters, SWR_REVALIDATE)

    const sources = !expand?.sources ? data?.jobSources?.slice(0, 5) : data?.jobSources
    const types = !expand?.types ? data?.jobTypes?.slice(0, 5) : data?.jobTypes

    return (
        <div className='w-1/5 bg-slate-100 border border-slate-300 rounded-xl min-h-screen'>
            <PortalLayout loading={isLoading} error={error} module='Filters'>
                <div className='flex flex-col items-center justify-center px-3 py-5 gap-4 text-[#338d8c]'>
                    <div className='relative bg-white w-full'>
                        <Input
                            ph='Search by typing keywords...'
                            value={query}
                            onChange={e => setQuery(e?.target?.value)}
                            onKeyDown={e => (e.key === 'Enter' ? apply() : null)}
                        />
                        <div className='absolute inset-y-0 right-0 flex items-center pr-2 text-xl'>{SearchIcon}</div>
                    </div>
                    <div className='w-full flex items-center gap-2 justify-evenly'>
                        <OrderBy />
                        <Visibility />
                    </div>
                    <div className='w-full'>
                        From - To
                        <hr className='mb-3 bg-slate-300 h-0.5' />
                        <div className='flex items-center gap-1'>
                            <input
                                className='w-full p-2 text-sm text-gray-500 bg-transparent rounded-lg appearance-none focus:outline-none focus:ring-0 peer !bg-gray-50'
                                type='date'
                                max={new Date().toISOString().slice(0, 10)}
                                value={filters?.from}
                                onChange={event => update?.from(event.target.value)}
                            />
                            <input
                                className='p-2 w-full text-sm text-gray-500 bg-transparent rounded-lg appearance-none focus:outline-none focus:ring-0 peer !bg-gray-50'
                                type='date'
                                max={new Date().toISOString().slice(0, 10)}
                                value={filters?.to}
                                onChange={event => update?.to(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className='w-full'>
                        Tech Stack
                        <hr className='mb-3 bg-slate-300 h-0.5' />
                        <CustomSelector
                            options={data?.techStacks?.map(({ name, value }) => ({ label: name, value }))}
                            handleChange={value => update?.techs(value)}
                            selectorValue={filters?.techs}
                            isMulti
                            placeholder='Select Tech Stacks'
                        />
                    </div>
                    <div className='w-full'>
                        Job Listing Types
                        <hr className='mb-3 bg-slate-300 h-0.5' />
                        {data?.jobTypes?.length > 0 && (
                            <div className='grid pl-2 space-y-3'>
                                {types?.map((type, index) => (
                                    <div className='flex items-center justify-between' key={index}>
                                        <div className='inline-flex items-center gap-2 capitalize text-sm tracking-wide'>
                                            <input
                                                type='checkbox'
                                                value={type?.name}
                                                checked={filters?.types?.includes(type?.name)}
                                                onChange={e => update?.types(e.target.value, e.target.checked)}
                                                className='w-[1.1rem] h-[1.1rem] rounded accent-cyan-600 outline-none'
                                            />
                                            {type?.name}
                                        </div>
                                        <small className='bg-[#edfffb] font-mono'>{type?.value}</small>
                                    </div>
                                ))}
                            </div>
                        )}
                        {data?.jobTypes?.length > 5 && (
                            <button
                                onClick={() => toggle?.types()}
                                className='text-gray-600 underline underline-offset-4 mt-2 text-xs float-right'
                            >
                                {!expand?.types ? 'Expand' : 'Collapse'}
                            </button>
                        )}
                    </div>
                    <div className='w-full'>
                        Job Sources
                        <hr className='mb-3 bg-slate-300 h-0.5' />
                        {data?.jobSources?.length > 0 && (
                            <div className='grid pl-2 space-y-3'>
                                {sources?.map((type, index) => (
                                    <div className='flex items-center justify-between' key={index}>
                                        <div className='inline-flex items-center gap-2 capitalize text-sm tracking-wide'>
                                            <input
                                                type='checkbox'
                                                value={type?.name}
                                                checked={filters?.sources?.includes(type?.name)}
                                                onChange={e => update?.sources(e.target.value, e.target.checked)}
                                                className='w-[1.1rem] h-[1.1rem] rounded accent-cyan-600 outline-none cursor-pointer'
                                            />
                                            {type?.name}
                                        </div>
                                        <small className='bg-[#edfffb] font-mono'>{type?.value}</small>
                                    </div>
                                ))}
                            </div>
                        )}
                        {data?.jobSources?.length > 5 && (
                            <button
                                onClick={() => toggle?.sources()}
                                className='text-gray-600 underline underline-offset-4 mt-2 text-xs float-right'
                            >
                                {!expand?.sources ? 'Expand' : 'Collapse'}
                            </button>
                        )}
                    </div>
                    <div className='inline-flex items-center gap-2 bg-gray-50 p-2 rounded-lg text-sm w-full border-2'>
                        <input
                            type='checkbox'
                            checked={filters?.blocked}
                            onChange={e => update?.blocked(e.target.checked)}
                            className='!w-5 !h-5 rounded accent-cyan-600 cursor-pointer outline-none'
                        />
                        Show Only Blocked Companies Jobs
                    </div>
                    <div className='w-full'>
                        <Filters apply={() => apply()} clear={() => reset()} />
                    </div>
                </div>
            </PortalLayout>
        </div>
    )
}

export default memo(JobPortalV2)
