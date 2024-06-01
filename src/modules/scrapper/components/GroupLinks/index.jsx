import { memo, useState } from 'react'
import useSWR from 'swr'

import { Button, EmptyTable, Loading, Badge, Tooltip } from '@components'

import { GroupLinkActions, GroupLinksForm } from '@modules/scrapper/components'
import { fetchGroupLinks } from '@modules/scrapper/api'

import { can, formatStringInPascal } from '@utils/helpers'
import { GROUP_SOURCE_LINK_HEADS } from '@constants/scrapper'

import { CreateIcon } from '@icons'

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
            <div className='flex items-center space-x-4 pb-6'>
                {can('create_job_source_link') && (
                    <Button label='Create Group Links' fit icon={CreateIcon} onClick={() => handleClick()} />
                )}
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {GROUP_SOURCE_LINK_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {data?.grouplinks?.length > 0 && !error ? (
                        data?.grouplinks?.map((row, idx) => (
                            <tr className='border-b border-[#006366] border-opacity-30 hover:bg-gray-100' key={row.id}>
                                <td className='px-3 py-6'>{idx + 1}</td>
                                <td className='px-3 py-6'>{formatStringInPascal(row?.group_scraper?.name)}</td>
                                <td className='px-3 py-6'>
                                    {row?.queries?.length > 0 &&
                                        row?.queries.map((q, index) => (
                                            <span className='font-mono m-1 inline-block' key={index}>
                                                <a href={q.link} target='_blank' rel='noreferrer'>
                                                    <Tooltip text={q.link}>
                                                        <Badge
                                                            label={`Link ${index + 1} | ${q.job_type} | ${
                                                                q.job_source
                                                            } `}
                                                            type='success'
                                                        />
                                                    </Tooltip>
                                                </a>
                                            </span>
                                        ))}
                                </td>
                                <td className='px-3 py-6 float-right'>
                                    {can(['edit_job_source_link', 'delete_job_source_link']) && (
                                        <GroupLinkActions id={row?.id} edit={() => handleClick(row)} mutate={mutate} />
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No group links / urls found yet!' />
                    )}
                </tbody>
            </table>
            {can(['edit_job_source_link', 'delete_job_source_link']) && show && (
                <GroupLinksForm show={show} setShow={setShow} mutate={mutate} link={link} />
            )}
        </div>
    )
}

export default memo(GroupLinks)
