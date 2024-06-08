import { memo, useState, useMemo } from 'react'
import useSWR from 'swr'

import { Loading, SelectBox } from '@components'

import { Filters, Statistics, Leads, WarmLeads, TechStacks } from '@modules/dashboard/components'
import { fetchDashboardData } from '@modules/dashboard/api'
import { fetchCompanies } from '@modules/userManagement/api'

import { can, decodeJwt, isSuper, parseComapnies, parseSelectedCompany } from '@/utils/helpers'

const Dashboard = () => {
    const user = decodeJwt()
    const [filters, setFilters] = useState({ from_date: '', to_date: '', company: '' })
    const { data, error, isLoading } = useSWR([filters], () => fetchDashboardData(filters), {
        revalidateOnFocus: false,
    })
    const {
        data: fetchedCompanies,
        error: companyError,
        isLoading: companyLoading,
    } = useSWR(`/api/auth/company/`, isSuper() && fetchCompanies, {
        revalidateOnFocus: false,
    })

    const memoizedCompaniesSelect = useMemo(
        () =>
            isSuper() &&
            (companyLoading ? (
                <small className='ml-1 p-3 text-xs text-gray-400'>Companies Loading...</small>
            ) : companyError ? (
                <div>Failed to load companies</div>
            ) : (
                <SelectBox
                    options={parseComapnies(fetchedCompanies?.companies)}
                    selected={parseSelectedCompany(filters.company, fetchedCompanies?.companies)}
                    handleChange={({ value }) => setFilters({ ...filters, company: value })}
                    classes='text-gray-500 text-sm w-1/4'
                />
            )),
        [companyLoading, companyError, fetchedCompanies?.companies, filters.company]
    )

    if (isLoading || companyLoading) return <Loading />

    return user?.permissions?.length > 0 && can(['view_dashboard', 'view_statistics']) ? (
        <div className='flex flex-col w-full space-y-14'>
            {!error ? (
                <>
                    <div className='flex justify-between'>
                        <Filters filters={filters} setFilters={setFilters} />
                        {memoizedCompaniesSelect}
                    </div>
                    {can('view_statistics') && data?.statistics && (
                        <div className='block xl:hidden'>
                            <Statistics classes='grid grid-cols-3 space-y-4 space-x-3' data={data?.statistics} />
                        </div>
                    )}
                    <div className='flex items-start justify-between'>
                        {can('view_dashboard') && (
                            <div className='flex flex-col w-4/5 space-y-16'>
                                {data?.leads && data?.leads?.length > 0 && <Leads data={data?.leads} />}
                                {data?.tech_jobs && data?.tech_jobs?.length > 0 && (
                                    <TechStacks data={data?.tech_jobs} />
                                )}
                                {data?.leads && data?.leads?.length > 0 && <WarmLeads data={data?.leads} />}
                            </div>
                        )}
                        <div className='w-1/5 pl-6 invisible xl:visible'>
                            {can('view_statistics') && data?.statistics && (
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
