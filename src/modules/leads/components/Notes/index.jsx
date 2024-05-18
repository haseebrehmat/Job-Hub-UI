import { memo } from 'react'

import { CustomSelector, Textarea, Button } from '@components'

import {
    decodeJwt,
    parseSelectedStatus,
    parseStatuses,
    parseStatusPhases,
    parseSelectedStatusPhase,
} from '@utils/helpers'
import { avatarPlaceholder } from '@constants/profile'

const Notes = ({ lead = null, status = null, error = null, loading = true }) => {
    const user = decodeJwt()

    return lead ? (
        <div className='border p-2'>
            <p className='text-lg'>Notes</p>
            <hr />
            <div className='flex items-center justify-between mt-2 p-2 text-sm bg-cyan-50'>
                <div className='flex gap-2.5 items-center w-full'>
                    <span>Show:</span>
                    {loading ? (
                        <span>Loading...</span>
                    ) : error ? (
                        <span>Error to Load statuses</span>
                    ) : (
                        <>
                            <div className='w-1/4'>
                                <CustomSelector
                                    options={parseStatuses(status)}
                                    handleChange={({ value }) => console.log('status', value)}
                                    selectorValue={parseSelectedStatus(lead?.company_status?.id, status)}
                                    placeholder='Select Status'
                                />
                            </div>
                            <div className='w-1/4'>
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
                </div>
                <Button label='Get' fit classes='!float-right !py-1.5' />
            </div>
            <div className='grid grid-cols-[auto_1fr] pt-2.5 gap-x-2.5'>
                <img
                    alt={user?.username}
                    src={user?.file_url ?? avatarPlaceholder}
                    onError={e => (e.target.src = avatarPlaceholder)}
                    className='h-12 w-12 rounded-full object-cover shadow-sm'
                />
                <Textarea ph='Type your notes' rows={2} />
            </div>
        </div>
    ) : null
}

export default memo(Notes)
