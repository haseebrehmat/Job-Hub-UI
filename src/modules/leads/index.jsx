import { memo, useMemo, useReducer } from 'react'
import useSWR from 'swr'

import { useMutate } from '@/hooks'

import { Board, Loading } from '@components'

import { LeadCard, LeadModal } from '@modules/leads/components'
import { fetchLeads, changeLeadStatus } from '@modules/leads/api'

import { LEADS_INITIAL_VALS } from '@constants/leads'

const Leads = () => {
    const { data, isLoading, mutate } = useSWR('/api/lead_managament/leads/', fetchLeads)
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), LEADS_INITIAL_VALS)

    const memoizedCols = useMemo(() => {
        if (data) {
            return data.leads.reduce((acc, row) => {
                acc[row.id] = {
                    name: row?.status?.toUpperCase(),
                    items: row?.leads?.map(lead => ({
                        id: lead?.id,
                        content: <LeadCard lead={lead} dispatch={dispatch} />,
                    })),
                }
                return acc
            }, {})
        }
        return []
    }, [data])

    const { handleSubmit, trigger } = useMutate(
        `/api/lead_managament/leads/${vals.draggable}/`,
        changeLeadStatus,
        {},
        null,
        async () => trigger({ status: vals.destination }),
        null,
        () => mutate()
    )
    return isLoading ? (
        <Loading />
    ) : (
        <>
            <LeadModal vals={vals} dispatch={dispatch} />
            <Board data={memoizedCols} set={dispatch} handleDrag={handleSubmit} />
        </>
    )
}
export default memo(Leads)
