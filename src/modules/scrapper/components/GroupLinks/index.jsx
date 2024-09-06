import { memo, useState } from 'react'
import useSWR from 'swr'

import { Button, Loading } from '@components'

import { GroupLinkActions, GroupLinksForm } from '@modules/scrapper/components'
import { fetchGroupLinks } from '@modules/scrapper/api'

import { can, formatStringInPascal } from '@utils/helpers'

import { CreateIcon, UptoIcon } from '@icons'

const GroupLinks = () => {
    const [link, setLink] = useState()
    const [show, setShow] = useState(false)

    const { data, isLoading, error, mutate } = useSWR('/api/job_scraper/group_scheduler_link/', fetchGroupLinks)

    const handleClick = (values = null) => {
        setLink(values)
        setShow(true)
    }

    if (isLoading) return <Loading />

    return (
        <div className='max-w-full overflow-x-auto mb-14'>
            <div className='flex items-center space-x-4 pb-4'>
                {can('create_job_source_link') && (
                    <Button label='Create Group Links' fit icon={CreateIcon} onClick={() => handleClick()} />
                )}
            </div>
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                {data?.grouplinks?.length > 0 && !error ? (
                    data?.grouplinks.map((row, idx) => (
                        <div className='bg-white rounded-md p-4 border relative text-[#338d8c]' key={idx}>
                            <h2 className='text-2xl'>{formatStringInPascal(row?.group_scraper?.name)}</h2>
                            {can(['edit_job_source_link', 'delete_job_source_link']) && (
                                <GroupLinkActions id={row?.id} edit={() => handleClick(row)} mutate={mutate} />
                            )}
                            <div className='flex flex-col mt-2 ml-2 text-sm'>
                                <div className='mb-2 flex justify-between'>
                                    <span className='tracking-wider italic'>Links Summary</span>
                                    <span className='underline underline-offset-4 inline-flex gap-2 items-center text-xs'>
                                        View Details {UptoIcon}
                                    </span>
                                </div>
                                <div className='flex flex-wrap gap-x-3 gap-y-3.5 mt-3'>
                                    <div className='flex items-center gap-6 px-2.5 py-1 rounded-full cursor-pointer border border-blue-400 text-blue-400'>
                                        <span>Total</span>
                                        <span className='font-mono'>10</span>
                                    </div>
                                    <div className='flex items-center gap-6 px-2.5 py-1 rounded-full cursor-pointer border border-orange-400 text-orange-400'>
                                        <span>Stopped</span>
                                        <span className='font-mono'>10</span>
                                    </div>
                                    <div className='flex items-center gap-6 px-2.5 py-1 rounded-full cursor-pointer border border-[#338d8c] text-[#338d8c]'>
                                        <span>Running</span>
                                        <span className='font-mono'>1</span>
                                    </div>
                                    <div className='flex items-center gap-6 px-2.5 py-1 rounded-full cursor-pointer border border-red-400 text-red-400'>
                                        <span>Failed</span>
                                        <span className='font-mono'>10</span>
                                    </div>
                                    <div className='flex items-center gap-6 px-2.5 py-1 rounded-full cursor-pointer border border-purple-400 text-purple-400'>
                                        <span>Completed</span>
                                        <span className='font-mono'>23</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <span className='ml-2 text-gray-500'>No group links / urls found yet!</span>
                )}
            </div>
            {can(['edit_job_source_link', 'delete_job_source_link']) && show && (
                <GroupLinksForm show={show} setShow={setShow} mutate={mutate} link={link} />
            )}
        </div>
    )
}

export default memo(GroupLinks)
