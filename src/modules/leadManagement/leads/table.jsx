import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { EmptyTable, Loading, Searchbox, Button, Paginated } from '@components'

import { LeadModal, LeadFilters } from '@modules/leadManagement/components'
import { fetchLeadsData } from '@modules/leadManagement/api'

import { formatDate2, getSelectedVals } from '@utils/helpers'
import { LEADS_INITIAL_VALS, LEAD_HEADS } from '@constants/leadManagement'

import { CandidateFilterIcon } from '@icons'

const LeadsTable = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), LEADS_INITIAL_VALS)

    const { data, isLoading, error, mutate } = useSWR(
        `/api/lead_managament/leads_data/?search=${vals.query}&page=${vals.page}&from=${vals.from}&to=${
            vals.to
        }&team=${getSelectedVals(vals?.team)}&members=${getSelectedVals(vals.members)}&stacks=${getSelectedVals(
            vals.stacks
        )}&candidates=${getSelectedVals(vals.candidates)}`,
        fetchLeadsData,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            shouldRetryOnError: false,
            revalidateOnMount: true,
        }
    )

    const clearFilters = () => {
        dispatch({ filter: false, to: '', from: '', members: [], stacks: [], team: '', candidates: [] })
    }

    return isLoading ? (
        <Loading />
    ) : !error ? (
        <>
            {vals.draggable && <LeadModal vals={vals} dispatch={dispatch} refetch={mutate} />}
            <div className='flex flex-col gap-3 px-4'>
                <div className='flex items-center justify-between gap-2 flex-wrap'>
                    <div className='flex items-center gap-2'>
                        <Searchbox query={vals.query} setQuery={query => dispatch({ query })} clear={clearFilters} />
                        <Button
                            icon={CandidateFilterIcon}
                            label='Filters'
                            onClick={() => dispatch({ filter: !vals.filter })}
                            fit
                            fill={vals.filter}
                        />
                    </div>
                </div>
                {vals.filter && <LeadFilters data={data} filtered={vals} dispatch={dispatch} />}
                <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                    <thead className='text-xs uppercase border border-[#048C8C]'>
                        <tr>
                            {LEAD_HEADS.map(heading => (
                                <th scope='col' className='px-3 py-4' key={heading}>
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.leads?.length > 0 && !error ? (
                            data?.leads?.map((row, idx) => (
                                <tr
                                    className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-slate-100'
                                    key={row.id}
                                >
                                    <td className='px-3 py-4 w-10'>{idx + 1}</td>
                                    <td className='px-3 py-4 capitalize w-1/5'>{row?.applied_job?.title || '-'}</td>
                                    <td className='px-3 py-4 capitalize w-1/6'>{row?.applied_job?.company || '-'}</td>
                                    <td className='px-3 py-4 capitalize italic'>
                                        {row?.applied_job?.applied_by?.name || '-'}
                                    </td>
                                    <td className='px-3 py-4 capitalize font-semibold'>
                                        {row?.applied_job?.vertical_name || '-'}
                                    </td>
                                    <td className='px-3 py-4 capitalize font-semibold italic'>
                                        {row?.candidate?.name || 'unassigned'}
                                    </td>
                                    <td className='px-3 py-4'>{row?.applied_job?.tech_stack || '-'}</td>
                                    <td className='px-3 py-4'>{row?.status?.name || '-'}</td>
                                    <td className='px-3 py-4'>{row?.phase?.name || '-'}</td>
                                    <td className='px-3 py-4'>{formatDate2(row?.created_at)}</td>
                                    <td className='px-3 py-4'>{formatDate2(row?.updated_at)}</td>
                                    <td className='px-3 py-4 float-right'>Actions</td>
                                </tr>
                            ))
                        ) : (
                            <EmptyTable cols={8} msg='No leads found yet' />
                        )}
                    </tbody>
                </table>
                {data?.pages > 1 && (
                    <Paginated
                        pages={data?.pages ?? Math.ceil(data.total / 25)}
                        setPage={page => dispatch({ page })}
                        page={vals.page}
                    />
                )}
            </div>
        </>
    ) : (
        <span>Some gone wrong while fetching leads</span>
    )
}
export default memo(LeadsTable)
