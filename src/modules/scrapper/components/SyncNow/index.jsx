import { memo, useState, useRef, useEffect } from 'react'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'

import { Button } from '@components'

import { syncNow, getScrapperCycleStatus, toggleScrapperCycleStatus } from '@modules/scrapper/api'

import { JOB_SOURCE_OPTIONS } from '@constants/scrapper'

import { RunScrapperIcon, PauseIcon } from '@icons'
import { baseURL } from '@utils/http'

const SyncNow = () => {
    const [isOpen, setIsOpen] = useState(false)
    const divRef = useRef(null)

    const { data, isLoading, mutate } = useSWR('api/job_scraper/sync_scheduler/', getScrapperCycleStatus)
    const { isMutating: isMutating1, trigger: trigger1 } = useSWRMutation(
        ['/api/job_scraper/sync/', 'single-job-source'],
        syncNow,
        {
            shouldRetryOnError: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )

    const { isMutating: isMutating2, trigger: trigger2 } = useSWRMutation(
        [`${baseURL}api/job_scraper/sync_scheduler/`],
        toggleScrapperCycleStatus,
        {
            shouldRetryOnError: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )

    const runSingleScraper = source => {
        trigger1({ link: `/api/job_scraper/sync/?job_source=${source}` })
        setIsOpen(!isOpen)
    }

    const handleClickOutside = event => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    const handleTriggerforScrapper = () => {
        trigger2()
        if (!isMutating2) {
            mutate()
        }
    }
    return (
        <div className='relative inline-block text-left' ref={divRef}>
            <div className='flex'>
                <Button
                    label={isMutating1 ? 'Running........' : 'Run Scrapper Now'}
                    fit
                    icon={RunScrapperIcon}
                    onClick={() => setIsOpen(!isOpen)}
                    disabled={isMutating1}
                    classes='mx-2'
                />
                {!isMutating2 && !isLoading && (
                    <Button
                        label={!data ? 'Pause ' : 'Continue '}
                        fit
                        icon={!data ? PauseIcon : RunScrapperIcon}
                        onClick={() => handleTriggerforScrapper()}
                        disabled={isLoading}
                        fill={!data}
                        classes='disabled:opacity-25'
                    />
                )}
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
                            disabled={isMutating1}
                        >
                            All
                        </button>
                        {JOB_SOURCE_OPTIONS.filter(job => job.value !== 'other').map(({ label, value }) => (
                            <button
                                className='block w-full text-start px-4 py-2 text-sm hover:bg-gray-100'
                                onClick={() => runSingleScraper(value)}
                                disabled={isMutating1}
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
