import { memo, useReducer, useRef } from 'react'
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
    TechStackCategoryBars,
    QuarterWiseCategory,
    QuarterWiseTechStack,
    MonthlyTechStacks,
    MonthlyCategories,
} from '@modules/analytics/components'
import { fetchAnalytics } from '@modules/analytics/api'
import { trendsData, quarterlyTrends, rawStacksData, monthlyTechs, monthlyTrends } from '@modules/analytics/api/data'

import { ANALYTIC_INITIAL_VALUES } from '@constants/analytics'

const Analytics = () => {
    const [ref1, ref2, ref3, ref4, ref5] = [useRef(''), useRef(''), useRef(''), useRef(''), useRef('')]
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
        <div className='md:mb-14 px-2 md:px-3 md:mt-6'>
            <Filters values={vals} set={dispatch} data={data} />
            <SubFilters options={data?.filters} set={dispatch} vals={vals} />
            <div className='flex flex-col md:flex-row gap-2'>
                <JobTypeCounts data={data?.job_type_data} set={dispatch} />
                <JobTypePies data={data?.job_type_data} />
            </div>
            <TechStackBars
                data={data?.tech_stack_data}
                type={vals.bar}
                set={dispatch}
                options={{ title: 'Tech Stacks', id: 'tech-stack-bars' }}
            />
            <div className='flex flex-col md:flex-row gap-2'>
                <TechStackCounts data={data?.tech_stack_data} set={dispatch} stack={vals.stack} />
                <TechStackPies data={data?.tech_stack_data?.find(row => row.name === vals.stack)} stack={vals.stack} />
            </div>
            <Trends data={trendsData} />
            <TechStackCategoryBars data={data?.trend_analytics} ref={ref1} />
            <QuarterWiseCategory data={quarterlyTrends} ref={ref2} />
            <QuarterWiseTechStack data={rawStacksData} ref={ref3} />
            <MonthlyTechStacks data={monthlyTechs} ref={ref4} />
            <MonthlyCategories data={monthlyTrends} ref={ref5} />
            <div className='flex flex-col gap-5 justify-center items-center p-3' id='export-div' />
        </div>
    )
}
export default memo(Analytics)
