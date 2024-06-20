import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { Loading, Searchbox, EmptyTable, Paginated, Button } from '@components'

import { fetchApiLogs } from '@modules/settings/api'
import { ApiLogFilters } from '@modules/settings/components'

import { formatDate2, getSelectedVals } from '@utils/helpers'
import { API_LOGS_HEADS, API_LOGS_INITIAL_VALUES } from '@constants/settings'
import { JOB_SOURCES } from '@constants/scrapper'

import { CandidateFilterIcon } from '@icons'

const ApiLogs = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), API_LOGS_INITIAL_VALUES)
    const { data, error, isLoading } = useSWR(
        `/api/job_portal/sales_engine_logs/?page=${vals.page}&search=${vals.query}&from=${vals.from}&to=${
            vals.to
        }&sources=${getSelectedVals(vals.sources)}`,
        fetchApiLogs
    )

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full mb-14 px-5'>
            <div className='flex items-center space-x-3 pt-6'>
                <Searchbox query={vals.query} setQuery={query => dispatch({ query })} />
                <Button
                    icon={CandidateFilterIcon}
                    label='Filters'
                    onClick={() => dispatch({ filter: !vals.filter })}
                    fit
                    fill={vals.filter}
                />
            </div>
            {vals.filter && <ApiLogFilters filtered={vals} dispatch={dispatch} />}
            <table className='table-auto w-full text-sm text-left text-[#048C8C] mt-3'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {API_LOGS_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.logs?.length > 0 && !error ? (
                        data?.logs?.map((row, idx) => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={row.id}>
                                <td className='px-1 py-4 break-words'>{idx + 1}</td>
                                <td className='px-1 py-4 break-words'>
                                    {JOB_SOURCES[row?.job_source] ?? JOB_SOURCES.other}
                                </td>
                                <td className='px-1 py-4 break-words'>{formatDate2(row?.created_at)}</td>
                                <td className='px-1 py-4 break-words font-bold text-lg'>{row?.jobs_count || 0}</td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={4} msg='No logs found yet!' />
                    )}
                </tbody>
            </table>
            {data?.logs?.length > 24 && (
                <div className='w-full'>
                    <Paginated pages={data?.pages} setPage={page => dispatch({ page })} page={vals.page} />
                </div>
            )}
        </div>
    )
}

export default memo(ApiLogs)
