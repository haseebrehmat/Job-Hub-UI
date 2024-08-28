import { memo, useState, useRef, useEffect } from 'react'
import useSWRMutation from 'swr/mutation'
import useSWRImmutable from 'swr/immutable'

import { Button, Input } from '@components'

import { syncNow, getScrapperCycleStatus, toggleScrapperCycleStatus } from '@modules/scrapper/api'

import { JOB_SOURCES_INITIAL_VALS } from '@constants/scrapper'

import { RunScrapperIcon, PauseIcon } from '@icons'

const SyncNow = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [sources, setSources] = useState(JOB_SOURCES_INITIAL_VALS)
    const divRef = useRef(null)

    const { data, isLoading, mutate } = useSWRImmutable('api/job_scraper/sync_scheduler/', getScrapperCycleStatus)

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
        'api/job_scraper/sync_scheduler/',
        toggleScrapperCycleStatus,
        {
            shouldRetryOnError: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            onSuccess: () => mutate(),
        }
    )

    const runSingleScraper = source => {
        trigger1({ link: `/api/job_scraper/sync/?job_source=${source}` })
        setIsOpen(!isOpen)
    }

    const handleClickOutside = event => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            setIsOpen(false)
            setSources(JOB_SOURCES_INITIAL_VALS)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    const handleTriggerforScrapper = () => trigger2()
    const filterSources = e =>
        setSources(
            JOB_SOURCES_INITIAL_VALS.filter(job => job?.label.toLowerCase().includes(e.target?.value.toLowerCase()))
        )

    return (
        <div className='relative inline-block text-left' ref={divRef}>
            <div className='flex'>
                <Button
                    label={isMutating1 ? 'Running........' : 'Run Scrapper Now'}
                    fit
                    icon={RunScrapperIcon}
                    onClick={() => {
                        setIsOpen(!isOpen)
                        setSources(JOB_SOURCES_INITIAL_VALS)
                    }}
                    disabled={isMutating1}
                    classes='mx-2'
                />
                {!isMutating2 && !isLoading && (
                    <Button
                        label={data ? 'Stop ' : 'Start '}
                        fit
                        icon={data ? PauseIcon : RunScrapperIcon}
                        onClick={() => handleTriggerforScrapper()}
                        disabled={isLoading}
                        fill={!data}
                        classes='disabled:opacity-25'
                    />
                )}
            </div>
            {isOpen && (
                <div
                    className='origin-top-right absolute right-0 mt-2 w-max rounded-md shadow-lg bg-white ring-1 ring-cyan-600  focus:outline-none text-[#048C8C] max-h-96 overflow-y-scroll'
                    tabIndex={-1}
                >
                    <div className='p-1 flex flex-col'>
                        <Input ph='searh by typing..' classes='!h-8' onChange={filterSources} />
                        {sources.map(({ label, value }) => (
                            <button
                                className='text-start px-2 py-2 text-sm hover:bg-gray-100'
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
