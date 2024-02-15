import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading } from '@components'

import { Filters, Statistics, Leads, WarmLeads, TechStacks } from '@modules/dashboard/components'
import { fetchDashboardData } from '@modules/dashboard/api'

const Dashboard = () => {
    const [filters, setFilters] = useState({
        from_date: '',
        to_date: '',
    })
    const { data, error, isLoading } = useSWR([filters], () => fetchDashboardData(filters.from_date, filters.to_date))

    return isLoading || error ? (
        <Loading />
    ) : (
        <div className='flex flex-col w-full space-y-14'>
            <Filters filters={filters} setFilters={setFilters} />
            <div className='flex items-start justify-between'>
                <div className='flex flex-col w-4/5 space-y-16'>
                    <Leads data={data.leads} />
                    <TechStacks data={data.tech_jobs} />
                    <WarmLeads data={data.leads} />
                </div>
                <div className='w-1/5 pl-6'>
                    <Statistics data={data.statistics} />
                </div>
            </div>
        </div>
    )
}

export default memo(Dashboard)
