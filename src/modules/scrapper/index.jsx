import { memo, useState } from 'react'
import useSWR from 'swr'

import { Button, EmptyTable, Loading } from '@components'

import { CronjobSettingActions, CronjobSettingForm, SyncNow } from '@modules/scrapper/components'
import { fetchCronjobSettings } from '@modules/scrapper/api'

import { can, convertFrom24To12Format } from '@utils/helpers'
import { JOB_SOURCES, SETTING_HEADS } from '@constants/scrapper'

import { CreateIcon } from '@icons'

const Scrapper = () => {
    const [setting, setSetting] = useState()
    const [show, setShow] = useState(false)

    const { data, isLoading, error, mutate } = useSWR('/api/job_portal/scheduler/', fetchCronjobSettings)

    const handleClick = (values = null) => {
        setSetting(values)
        setShow(!show)
    }

    if (isLoading) return <Loading />

    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 pb-6'>
                <Button label='Create Cronjob Setting' fit icon={CreateIcon} onClick={() => handleClick()} />
                <SyncNow />
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {SETTING_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {data?.settings?.length > 0 && !error ? (
                        data?.settings?.map((row, idx) => (
                            <tr className='border-b border-[#006366] border-opacity-30 hover:bg-gray-100' key={row.id}>
                                <td className='px-3 py-6'>{idx + 1}</td>
                                <td className='px-3 py-6'>{JOB_SOURCES[row?.job_source]}</td>
                                <td className='px-3 py-6'>{row?.time_based ? 'Time Based' : 'Interval Based'}</td>
                                <td className='px-3 py-6'>
                                    {row?.time_based
                                        ? convertFrom24To12Format(row?.time)
                                        : row?.interval && row?.interval_type
                                        ? `After every ${row?.interval} ${row?.interval_type}`
                                        : 'not-specified'}
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
            {can('edit_cronjob_setting') && show && (
                <CronjobSettingForm show={show} setShow={setShow} mutate={mutate} setting={setting} />
            )}
        </div>
    )
}

export default memo(Scrapper)
