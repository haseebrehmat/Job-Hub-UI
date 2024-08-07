import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { Loading } from '@components'

import {
    JobTypeCounts,
    TechStackCounts,
    Filters,
    SubFilters,
    JobTypePies,
    TechStackBars,
    TechStackPies,
    Trends,
} from '@modules/analytics/components'
import { fetchAnalytics } from '@modules/analytics/api'
import { trendsData } from '@modules/analytics/api/data'

import { ANALYTIC_INITIAL_VALUES } from '@constants/analytics'

const Analytics = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), ANALYTIC_INITIAL_VALUES)

    const { data, isLoading } = useSWR(
        `/api/job_portal/generate_analytics/?start_date=${vals.from}&end_date=${vals.to}&week=${vals.week}&month=${vals.month}&year=${vals.year}&quarter=${vals.quarter}&search=${vals.query}`,
        fetchAnalytics,
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        }
    )
    return isLoading ? (
        <Loading />
    ) : (
        <div className='max-w-full mb-14 px-3 mt-6'>
            <Filters values={vals} set={dispatch} data={data} />
            <SubFilters options={data?.filters} set={dispatch} vals={vals} />
            <div className='flex gap-2'>
                <JobTypeCounts data={data?.job_type_data} set={dispatch} />
                <JobTypePies data={data?.job_type_data} />
            </div>
            <TechStackBars
                data={data?.tech_stack_data}
                type={vals.bar}
                set={dispatch}
                options={{ title: 'Tech Stacks', id: 'tech-stack-bars' }}
            />
            <div className='flex gap-2'>
                <TechStackCounts data={data?.tech_stack_data} set={dispatch} stack={vals.stack} />
                <TechStackPies data={data?.tech_stack_data?.find(row => row.name === vals.stack)} stack={vals.stack} />
            </div>
            <TechStackBars
                data={data?.trend_analytics}
                type={vals.bar}
                set={dispatch}
                options={{ title: 'Tech Stack Trend Categories', fs: 18, id: 'tech-stack-category-trends-bars' }}
            />
            <Trends data={trendsData} />
            <div className='flex flex-col gap-5 justify-center items-center p-3' id='export-div' />
        </div>
    )
}
export default memo(Analytics)
