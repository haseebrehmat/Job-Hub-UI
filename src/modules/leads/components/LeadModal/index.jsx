import { memo } from 'react'
import useSWR from 'swr'

import { Modal, Loading } from '@components'

import { AppliedDetail, JobDetail, Notes, UpdatePhase } from '@modules/leads/components'
import { fetchLead, fetchNotes } from '@modules/leads/api'
import { fetchStatusPhases } from '@modules/appliedJobs/api'

import { BreadIcon } from '@icons'
import { formatDate2 } from '@/utils/helpers'

const LeadModal = ({ vals, dispatch }) => {
    const { data, isLoading, mutate } = useSWR(
        `/api/lead_managament/leads/${vals.draggable}/`,
        vals.show && vals.draggable && fetchLead
    )
    const {
        data: notes,
        isLoading: notesLoading,
        mutate: mutateNotes,
    } = useSWR(
        `/api/lead_managament/lead_activity_notes/?lead=${vals.draggable}&status=${vals.status}&phase=${vals.phase}`,
        vals.show && vals.draggable && fetchNotes
    )
    const {
        data: status,
        isLoading: statusLoading,
        error,
    } = useSWR('/api/lead_managament/company_status_phases/', fetchStatusPhases)

    if (isLoading) return <Loading />
    return (
        <Modal
            show={vals.show}
            setShow={show => dispatch({ show })}
            content={
                <div className='flex flex-col w-full gap-2.5'>
                    <div className='flex gap-x-2.5'>
                        <div className='w-3/4 flex flex-col gap-y-2.5'>
                            <div className='flex justify-between'>
                                <div className='flex items-center space-x-2.5 uppercase'>
                                    <span>{data?.company_status?.status?.name ?? 'Unassigned'}</span>
                                    <span className='text-gray-500'>{BreadIcon}</span>
                                    <span>{data?.phase?.name ?? 'Unphased'}</span>
                                </div>
                                <div className='flex items-center space-x-2 text-sm'>
                                    <span>{formatDate2(data?.effect_date)}</span>
                                    <span>--</span>
                                    <span>{formatDate2(data?.due_date)}</span>
                                </div>
                            </div>
                            <JobDetail job={data?.applied_job_status?.job} />
                            <AppliedDetail applied={data?.applied_job_status} />
                        </div>
                        <div className='w-1/4'>
                            <UpdatePhase
                                lead={data}
                                status={status}
                                error={error}
                                loading={statusLoading}
                                mutate={mutate}
                            />
                        </div>
                    </div>
                    <Notes
                        lead={data}
                        status={status}
                        error={error}
                        loading={statusLoading && notesLoading}
                        mutate={mutateNotes}
                        notes={notes}
                        dispatch={dispatch}
                    />
                </div>
            }
        />
    )
}

export default memo(LeadModal)
