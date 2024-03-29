import { memo, useState } from 'react'
import useSWRMutation from 'swr/mutation'

import { Button } from '@components'

import { syncNow } from '@modules/scrapper/api'

import { JOB_SOURCE_OPTIONS } from '@constants/scrapper'

import { RunScrapperIcon } from '@icons'

const SyncNow = () => {
    const [isOpen, setIsOpen] = useState(false)

    const { isMutating, trigger } = useSWRMutation(['/api/job_scraper/sync/', 'single-job-source'], syncNow, {
        shouldRetryOnError: true,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    const runSingleScraper = source => trigger({ link: `/api/job_scraper/sync/?job_source=${source}` })

    return (
        <div className='relative inline-block text-left z-20'>
            <div>
                <Button
                    label={isMutating ? 'Running........' : 'Run Scrapper Now'}
                    fit
                    icon={RunScrapperIcon}
                    onClick={() => setIsOpen(!isOpen)}
                    disabled={isMutating}
                />
            </div>
            {isOpen && (
                <div
                    className='origin-top-right absolute right-0 mt-2 w-max rounded-md shadow-lg bg-white ring-1 ring-cyan-600  focus:outline-none text-[#048C8C]'
                    tabIndex={-1}
                >
                    <div className='py-1'>
                        <button
                            className='block w-full text-start px-4 py-2 text-sm hover:bg-gray-100'
                            onClick={() => runSingleScraper('all')}
                            disabled={isMutating}
                        >
                            All
                        </button>
                        {JOB_SOURCE_OPTIONS.filter(job => job.value !== 'other').map(({ label, value }) => (
                            <button
                                className='block w-full text-start px-4 py-2 text-sm hover:bg-gray-100'
                                onClick={() => runSingleScraper(value)}
                                disabled={isMutating}
                                key={value}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default memo(SyncNow)
