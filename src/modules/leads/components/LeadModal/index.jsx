import { memo } from 'react'
import useSWR from 'swr'

import { Modal, Loading } from '@components'

import { AppliedDetail, JobDetail, Notes, UpdatePhase } from '@modules/leads/components'
import { fetchLead } from '@modules/leads/api'
import { fetchStatusPhases } from '@modules/appliedJobs/api'

const LeadModal = ({ vals, dispatch }) => {
    const { data, isLoading, mutate } = useSWR(
        `/api/lead_managament/leads/${vals.draggable}/`,
        vals.show && vals.draggable && fetchLead
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
                    <Notes lead={data} status={status} error={error} loading={statusLoading} />
                </div>
            }
        />
    )
}

export default memo(LeadModal)
