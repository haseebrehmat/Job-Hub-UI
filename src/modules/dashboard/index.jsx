import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading } from '@components'

import { Filters, Statistics, Leads, WarmLeads, TechStacks } from '@modules/dashboard/components'
import { fetchDashboardData } from '@modules/dashboard/api'
import { can, decodeJwt } from '@/utils/helpers'

const Dashboard = () => {
    const user = decodeJwt()
    const [filters, setFilters] = useState({ from_date: '', to_date: '' })
    const { data, error, isLoading } = useSWR([filters], () => fetchDashboardData(filters.from_date, filters.to_date))

    if (isLoading) return <Loading />

    return user?.permissions?.length > 0 ? (
        <div className='flex flex-col w-full space-y-14'>
            {!error ? (
                <>
                    <Filters filters={filters} setFilters={setFilters} />
                    {can('view_statistics') && (
                        <div className='block xl:hidden'>
                            <Statistics classes='grid grid-cols-3 space-y-4 space-x-3' data={data?.statistics} />
                        </div>
                    )}
                    <div className='flex items-start justify-between'>
                        <div className='flex flex-col w-4/5 space-y-16'>
                            <Leads data={data?.leads} />
                            <TechStacks data={data?.tech_jobs} />
                            <WarmLeads data={data?.leads} />
                        </div>
                        <div className='w-1/5 pl-6 invisible xl:visible'>
                            {can('view_statistics') && (
                                <Statistics classes='flex-col space-y-8' data={data?.statistics} />
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <p className='mx-auto'>No Graphs or data Found!</p>
            )}
        </div>
    ) : (
        <div className='flex flex-col w-full space-y-14'>
            <p className='mx-auto mt-10 italic text-lg'>You don`t have any permission. Please contact your admin.</p>
        </div>
    )
}

export default memo(Dashboard)
