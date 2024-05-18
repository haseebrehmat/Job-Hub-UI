import { memo } from 'react'

import { CustomSelector, Button, Input } from '@components'

import { parseSelectedStatus, parseStatuses, parseStatusPhases, parseSelectedStatusPhase } from '@utils/helpers'

const UpdateStatus = ({ lead = null, status = null, error = null, loading = true }) =>
    lead ? (
        <div className='border p-2'>
            <p className='text-lg'>Update Status</p>
            <hr />
            <div className='flex flex-col mt-2 p-1 gap-2 text-sm text-cyan-700'>
                {loading ? (
                    <span>Loading...</span>
                ) : error ? (
                    <span>Error to Load statuses</span>
                ) : (
                    <>
                        <div>
                            <span className='text-xs font-semibold'>Status*</span>
                            <CustomSelector
                                options={parseStatuses(status)}
                                handleChange={({ value }) => console.log('status', value)}
                                selectorValue={parseSelectedStatus(lead?.company_status?.id, status)}
                                placeholder='Select Status'
                            />
                        </div>
                        <div>
                            <span className='text-xs font-semibold'>Phase*</span>
                            <CustomSelector
                                options={parseStatusPhases(lead?.company_status?.id, status)}
                                handleChange={({ value }) => console.log('status', value)}
                                selectorValue={parseSelectedStatusPhase(
                                    lead?.phase?.id,
                                    lead?.company_status?.id,
                                    status
                                )}
                                placeholder='Select Phase'
                            />
                        </div>
                    </>
                )}
                <div>
                    <span className='text-xs font-semibold'>Effective Date*</span>
                    <Input type='date' name='effect_date' />
                </div>
                <div>
                    <span className='text-xs font-semibold'>Due Date*</span>
                    <Input type='date' name='due_date' />
                </div>
                <Button label='Update' />
            </div>
        </div>
    ) : null

export default memo(UpdateStatus)
