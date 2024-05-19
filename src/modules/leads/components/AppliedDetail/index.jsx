import { memo } from 'react'

import { Tooltip } from '@components'

import { formatDate } from '@utils/helpers'

import { DownloadIcon, DownloadIcon2 } from '@icons'

const AppliedDetail = ({ applied = null }) =>
    applied ? (
        <div className='border p-2'>
            <p className='text-lg'>Applied Details</p>
            <hr />
            <div className='grid grid-cols-2 gap-x-4 gap-y-2 pt-2.5'>
                <div className='flex justify-between flex-wrap'>
                    <span className='text-gray-600 text-sm'>Pseudo</span>
                    <span className='capitalize'>{applied?.vertical?.pseudo ?? '-'}</span>
                </div>
                <div className='flex justify-between flex-wrap'>
                    <span className='text-gray-600 text-sm'>Vertical</span>
                    <span className='capitalize'>{applied?.vertical?.pseudo ?? '-'}</span>
                </div>
                <div className='flex justify-between flex-wrap'>
                    <span className='text-gray-600 text-sm'>Attachements</span>
                    <span className='capitalize'>
                        {applied?.cover_letter ? (
                            <a href={applied?.cover_letter} download target='_blank' rel='noreferrer'>
                                <Tooltip text='Download Cover Letter'>{DownloadIcon}</Tooltip>
                            </a>
                        ) : (
                            '-'
                        )}
                        {applied?.resume ? (
                            <a href={applied?.resume} download target='_blank' rel='noreferrer'>
                                <Tooltip text='Download Resume'>{DownloadIcon2}</Tooltip>
                            </a>
                        ) : (
                            '-'
                        )}
                    </span>
                </div>
                <div className='flex justify-between flex-wrap'>
                    <span className='text-gray-600 text-sm'>Applied Date</span>
                    <span className='capitalize'>{formatDate(applied?.applied_date)}</span>
                </div>
            </div>
        </div>
    ) : null

export default memo(AppliedDetail)
