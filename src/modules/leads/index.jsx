import { memo, useMemo, useReducer } from 'react'
import useSWR from 'swr'

import { Modal, Board, Badge, Loading } from '@components'

import { fetchLeads } from '@modules/leads/api'

import { CurrentPhaseIcon } from '@icons'

const Leads = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), {
        source: null,
        destination: null,
        show: false,
        move: true,
        page: 1,
        query: '',
    })
    const { data, isLoading } = useSWR('/api/lead_managament/leads/', fetchLeads)

    const memoizedCols = useMemo(() => {
        if (data) {
            return data.leads.reduce((acc, row) => {
                acc[row.id] = {
                    name: `${row?.status?.toUpperCase()} ${row?.leads?.length} LEADS`,
                    items: row?.leads?.map(lead => ({
                        id: lead?.id,
                        content: (
                            <div
                                className='bg-white text-gray-500 border border-[#048C8C] rounded-md p-2'
                                onClick={() => dispatch({ show: true })}
                            >
                                <h2 className='text-sm capitalize'>{lead?.applied_job?.title}</h2>
                                <h2 className='capitalize italic py-2'>{lead?.applied_job?.company}</h2>
                                <h2 className='flex'>
                                    <span>{CurrentPhaseIcon}</span>
                                    <span className='text-xs'>{lead?.phase_name ?? 'not set'}</span>
                                </h2>
                                <h2 className='text-right'>
                                    <Badge label={lead?.applied_job?.tech_stack} />
                                </h2>
                            </div>
                        ),
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
