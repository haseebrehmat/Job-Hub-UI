import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { EmptyTable, Loading, Searchbox, Button, Paginated } from '@components'

import { LeadModal, LeadFilters } from '@modules/leadManagement/components'
import { fetchLeads } from '@modules/leadManagement/api'

import { getSelectedVals } from '@utils/helpers'
import { LEADS_INITIAL_VALS, LEAD_HEADS } from '@constants/leadManagement'

import { CandidateFilterIcon } from '@icons'

const LeadsTable = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), LEADS_INITIAL_VALS)

    const { data, isLoading, error, mutate } = useSWR(
        `/api/lead_managament/leads/?search=${vals.query}&page=${vals.page}&from=${vals.from}&to=${
            vals.to
        }&team=${getSelectedVals(vals?.team)}&members=${getSelectedVals(vals.members)}&stacks=${getSelectedVals(
            vals.stacks
        )}&candidates=${getSelectedVals(vals.candidates)}`,
        fetchLeads,
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
                        {data?.candidates?.length > 0 && !error ? (
                            data?.candidates?.map((row, idx) => (
                                <tr className='bg-white border-b border-[#006366] border-opacity-30' key={row.id}>
                                    <td className='px-3 py-6'>{idx + 1}</td>
                                    <td className='px-3 py-6'>{idx + 1}</td>
                                    <td className='px-3 py-6'>{idx + 1}</td>
                                    <td className='px-3 py-6'>{idx + 1}</td>
                                    <td className='px-3 py-6'>{idx + 1}</td>
                                    <td className='px-3 py-6'>{idx + 1}</td>
                                    <td className='px-3 py-6'>{idx + 1}</td>
                                    <td className='px-3 py-6'>{idx + 1}</td>
                                    <td className='px-3 py-6 float-right'>Actions</td>
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
