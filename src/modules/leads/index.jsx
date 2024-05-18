import { memo, useMemo, useReducer } from 'react'
import useSWR from 'swr'

import { useMutate } from '@/hooks'

import { Modal, Board, Loading } from '@components'

import { LeadCard } from '@modules/leads/components'
import { fetchLeads, changeLeadStatus } from '@modules/leads/api'

import { LEADS_INITIAL_VALS } from '@constants/leads'

const Leads = () => {
    const { data, isLoading, mutate } = useSWR('/api/lead_managament/leads/', fetchLeads)
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), LEADS_INITIAL_VALS)

    const memoizedCols = useMemo(() => {
        if (data) {
            return data.leads.reduce((acc, row) => {
                acc[row.id] = {
                    name: `${row?.status?.toUpperCase()} ${row?.leads?.length} LEAD${
                        row?.leads?.length > 1 ? 'S' : ''
                    }`,
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

    if (isLoading) return <Loading />
    return (
        <div>
            <Modal
                show={vals.show}
                setShow={show => dispatch({ show })}
                content={<Board data={memoizedCols} set={dispatch} />}
            >
                <span
                    onClick={() => dispatch({ show: true })}
                    className='bg-gray-700 text-white p-2 m-2 flex justify-between'
                >
                    <span>Source Id : {vals.source}</span>
                    <span>Destination Id : {vals.destination}</span>
                    <span>Draggable Id : {vals.draggable}</span>
                </span>
            </Modal>
            <Board data={memoizedCols} set={dispatch} handleDrag={handleSubmit} />
        </div>
    )
}
export default memo(Leads)
