import { memo, useMemo, useReducer } from 'react'
import useSWR from 'swr'

import { Modal, Board, Loading } from '@components'

import { LeadCard } from '@modules/leads/components'
import { fetchLeads } from '@modules/leads/api'

import { LEADS_INITIAL_VALS } from '@constants/leads'

const Leads = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), LEADS_INITIAL_VALS)

    const { data, isLoading } = useSWR('/api/lead_managament/leads/', fetchLeads)

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

    if (isLoading) return <Loading />
    return (
        <div>
            <Modal
                show={vals.show}
                setShow={show => dispatch({ show })}
                content={<Board data={memoizedCols} set={dispatch} move={vals.move} />}
            >
                <span
                    onClick={() => dispatch({ show: true })}
                    className='bg-gray-700 text-white p-2 m-2 flex justify-around'
                >
                    <span>Source Id : {vals.source}</span>
                    <span>Destination Id : {vals.destination}</span>
                </span>
            </Modal>
            <Board data={memoizedCols} set={dispatch} move={vals.move} />
        </div>
    )
}
export default memo(Leads)
