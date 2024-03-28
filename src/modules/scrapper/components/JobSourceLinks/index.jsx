import { memo, useState } from 'react'
import useSWR from 'swr'

import { Button, EmptyTable, Loading } from '@components'

import { CronjobSettingActions, CronjobSettingForm } from '@modules/scrapper/components'
import { fetchJobSourceLinks } from '@modules/scrapper/api'

import { can } from '@utils/helpers'
import { JOB_SOURCES, JOB_SOURCE_LINK_HEADS } from '@constants/scrapper'

import { CreateIcon } from '@icons'
import { Badge, Tooltip } from '@/components'

const JobSourceLinks = () => {
    const [setting, setSetting] = useState()
    const [show, setShow] = useState(false)

    const { data, isLoading, error, mutate } = useSWR('/api/job_scraper/job_source_link/', fetchJobSourceLinks)

    const handleClick = (values = null) => {
        setSetting(values)
        setShow(true)
    }

    if (isLoading) return <Loading />

    return (
        <div className='max-w-full overflow-x-auto mb-14'>
            <div className='flex items-center space-x-4 pb-6'>
                {can('create_cronjob_setting') && (
                    <Button label='Create Job Source Link' fit icon={CreateIcon} onClick={() => handleClick()} />
                )}
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {JOB_SOURCE_LINK_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {data?.links?.length > 0 && !error ? (
                        data?.links?.map((row, idx) => (
                            <tr className='border-b border-[#006366] border-opacity-30 hover:bg-gray-100' key={row.id}>
                                <td className='px-3 py-6'>{idx + 1}</td>
                                <td className='px-3 py-6'>{JOB_SOURCES[row?.job_source]}</td>
                                <td className='px-3 py-6'>
                                    {row?.queries?.length > 0 &&
                                        row?.queries.map((q, index) => (
                                            <span className='font-mono mx-2 inline-block'>
                                                <a href={q} target='_blank' rel='noreferrer'>
                                                    <Tooltip text={q}>
                                                        <Badge label={`Link ${index + 1}`} type='success' />
                                                    </Tooltip>
                                                </a>
                                            </span>
                                        ))}
                                </td>
                                <td className='px-3 py-6 float-right'>
                                    {can(['edit_cronjob_setting', 'delete_cronjob_setting']) && (
                                        <CronjobSettingActions
                                            id={row?.id}
                                            edit={() => handleClick(row)}
                                            mutate={mutate}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No cronjob settings found yet!' />
                    )}
                </tbody>
            </table>
            {can(['edit_cronjob_setting', 'create_cronjob_setting']) && show && (
                <CronjobSettingForm show={show} setShow={setShow} mutate={mutate} setting={setting} />
            )}
        </div>
    )
}

export default memo(JobSourceLinks)
