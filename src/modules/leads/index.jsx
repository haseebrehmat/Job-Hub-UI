import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { useMutate } from '@/hooks'

import { Board, Loading } from '@components'

import { LeadCard, LeadModal } from '@modules/leads/components'
import { fetchLeads, changeLeadStatus } from '@modules/leads/api'

import { LEADS_INITIAL_VALS } from '@constants/leads'

const Leads = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), LEADS_INITIAL_VALS)
    const { data, isLoading, mutate } = useSWR('/api/lead_managament/leads/', fetchLeads)

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
            {data?.leads?.length > 0 && (
                <Board data={convertToColumns(data?.leads)} set={dispatch} handleDrag={handleSubmit} />
            )}
        </>
    )
}
export default memo(Leads)
