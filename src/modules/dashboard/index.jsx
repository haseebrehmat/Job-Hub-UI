import { memo, useState, useMemo } from 'react'
import { Navigate } from 'react-router-dom'
import useSWR from 'swr'

import { Loading, SelectBox } from '@components'

import { Filters, Statistics, Leads, WarmLeads, TechStacks } from '@modules/dashboard/components'
import { fetchDashboardData } from '@modules/dashboard/api'
import { fetchCompanies } from '@modules/userManagement/api'

import { can, decodeJwt, isSuper, parseComapnies, parseSelectedCompany } from '@utils/helpers'
import { TECH_STACKS_RANDOM_MAX } from '@constants/dashboard'

const Dashboard = () => {
    const user = decodeJwt()
    if (user.role === 'candidate') {
        return <Navigate to='/my-profile' />
    }
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
                    classes='text-gray-500 text-sm mt-2 w-[90%] md:mt-0 md:w-1/4'
                />
            )),
        [companyLoading, companyError, fetchedCompanies?.companies, filters.company]
    )

    if (isLoading || companyLoading) return <Loading />

    return user?.permissions?.length > 0 ? (
        can(['view_dashboard', 'view_statistics']) ? (
            <div className='flex flex-col w-full space-y-6 md:space-y-10 pb-10'>
                {!error ? (
                    <>
                        <div className='flex justify-between md:justify-end md:gap-3 flex-wrap pt-4 md:pb-3'>
                            <Filters filters={filters} setFilters={setFilters} />
                            {memoizedCompaniesSelect}
                        </div>
                        {can('view_statistics') && data?.statistics && (
                            <div className=' xl:hidden'>
                                <Statistics
                                    classes='grid md:grid-cols-3 space-y-4 md:space-x-3 items-end'
                                    data={data?.statistics}
                                />
                            </div>
                        )}
                        <div className='flex items-start justify-between'>
                            {can('view_dashboard') && (
                                <div className='flex flex-col w-4/5 space-y-7 md:space-y-16'>
                                    {data?.leads && data?.leads?.length > 0 && (
                                        <Leads data={data?.leads} stats={data?.statistics} />
                                    )}
                                    {data?.tech_jobs?.length > 0 &&
                                        data?.tech_jobs?.length < TECH_STACKS_RANDOM_MAX && (
                                            <TechStacks data={data?.tech_jobs} />
                                        )}
                                    {data?.leads && data?.leads?.length > 0 && <WarmLeads data={data?.leads} />}
                                </div>
                            )}
                            <div className='pl-6 hidden xl:block'>
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
                <p className='mx-auto mt-10 italic'>You don`t have permission to view dashboard and statistics.</p>
            </div>
        )
    ) : (
        <div className='flex flex-col w-full space-y-14'>
            <p className='mx-auto mt-10 italic text-lg'>You don`t have any permission. Please contact your admin.</p>
        </div>
    )
}

export default memo(Dashboard)
