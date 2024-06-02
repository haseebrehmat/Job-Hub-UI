import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { useMutate } from '@/hooks'

import { Board, Loading, Searchbox, Button, Paginated } from '@components'

import { LeadCard, LeadModal, LeadFilters } from '@modules/leadManagement/components'
import { fetchLeads, changeLeadStatus } from '@modules/leadManagement/api'

import { LEADS_FILTERS, LEADS_INITIAL_VALS } from '@constants/leadManagement'

import { CandidateFilterIcon } from '@icons'

const Leads = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), {
        ...LEADS_INITIAL_VALS,
        ...LEADS_FILTERS,
    })
    const { data, isLoading, mutate } = useSWR(
        `/api/lead_managament/leads/?search=${vals.query}&page=${vals.page}&from=${vals.from}&to=${vals.to}`,
        fetchLeads
    )

    const convertToColumns = columns =>
        columns.reduce((acc, row) => {
            acc[row.id] = {
                name: row?.status?.toUpperCase(),
                items: row?.leads?.map(lead => ({
                    id: lead?.id,
                    content: <LeadCard lead={lead} dispatch={dispatch} />,
                })),
            }
            return acc
        }, {})

    const { handleSubmit, trigger } = useMutate(
        `/api/lead_managament/leads/${vals.draggable}/`,
        changeLeadStatus,
        {},
        null,
        async () => trigger({ status: vals.destination }),
        null,
        () => mutate()
        // () => setTimeout(() => window.location.reload(), 1000)
    )
    return isLoading ? (
        <Loading />
    ) : (
        <>
            {vals.draggable && <LeadModal vals={vals} dispatch={dispatch} refetch={mutate} />}
            {data?.leads?.length > 0 ? (
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center justify-between px-4 gap-2 flex-wrap'>
                        <div className='flex items-center gap-2'>
                            <Searchbox
                                query={vals.query}
                                setQuery={query => dispatch({ query })}
                                clear={() => dispatch(LEADS_FILTERS)}
                            />
                            <Button
                                icon={CandidateFilterIcon}
                                label='Filters'
                                onClick={() => dispatch({ filter: !vals.filter })}
                                fit
                                fill={vals.filter}
                            />
                        </div>
                        {data?.pages > 1 && (
                            <Paginated
                                pages={data?.pages ?? Math.ceil(data.total / 25)}
                                setPage={page => dispatch({ page })}
                                page={vals.page}
                            />
                        )}
                    </div>
                    {vals.filter && <LeadFilters filtered={vals} dispatch={dispatch} />}
                    <Board data={convertToColumns(data?.leads)} set={dispatch} handleDrag={handleSubmit} />
                </div>
            ) : (
                <span className='mx-7 text-lg italic font-light'>No leads found yet</span>
            )}
        </>
    )
}
export default memo(Leads)
