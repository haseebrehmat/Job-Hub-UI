import { memo } from 'react'

import { useApiJobCountsByTechStore } from '@/stores'

import { Modal } from '@components'

import { formatDate2 } from '@utils/helpers'

import { BreadIcon, UptoIcon } from '@icons'

const apiResp = {
    primary_tech_stack_counts: {
        overall: 360,
        data: [
            { tech: 'php', jobs: 10 },
            { tech: 'python', jobs: 20 },
            { tech: 'java', jobs: 30 },
            { tech: 'c++', jobs: 40 },
            { tech: 'c#', jobs: 50 },
            { tech: 'javascript', jobs: 60 },
            { tech: 'ruby', jobs: 70 },
            { tech: 'go', jobs: 80 },
        ],
    },
    others_tech_stack_counts: {
        overall: 100,
        data: [
            { tech: 'others', jobs: 90 },
            { tech: 'others dev', jobs: 10 },
        ],
    },
    dates: {
        start: '2020-01-01',
        end: '2021-01-01',
    },
    type: 's2p', // 'p2s'
}

const ApiJobCountsByTechs = () => {
    const [show, type, setShow] = useApiJobCountsByTechStore(state => [state?.type, state?.show, state?.setShow])

    return (
        show && (
            <Modal
                classes='md:!w-[90%] lg:!w-[60%]'
                show={show}
                setShow={setShow}
                content={
                    <div className='py-2 w-full'>
                        <div className='flex flex-col overflow-y-scroll text-slate-700'>
                            <p className='text-xl'>Job Counts by Tech Stacks for API Logs</p>
                            <div className='flex flex-col md:flex-row md:items-center gap-2 md:gap-0 justify-between mt-1'>
                                <p className='text-slate-500'>
                                    {type === 's2p' ? (
                                        <span className='inline-flex items-center gap-2'>
                                            Staging {BreadIcon} Production
                                        </span>
                                    ) : (
                                        <span className='inline-flex items-center gap-2'>
                                            Production {BreadIcon} Sales Engine
                                        </span>
                                    )}
                                </p>
                                <span className='inline-flex items-center gap-3 text-sm'>
                                    {formatDate2(apiResp?.dates?.start)} {UptoIcon} {formatDate2(apiResp?.dates?.end)}
                                </span>
                            </div>
                            <hr className='mt-2 mb-4' />
                            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4'>
                                <div className='flex items-center justify-evenly border border-neutral-400 tracking-wider px-4 py-2 lg:col-span-3 md:col-span-2'>
                                    <span>Primary Tech Stacks</span>
                                    <span className='font-mono font-semibold'>
                                        {apiResp?.primary_tech_stack_counts?.overall}
                                    </span>
                                </div>
                                {apiResp?.primary_tech_stack_counts?.data?.map((row, idx) => (
                                    <div className='flex items-center justify-between border px-4 py-2' key={idx}>
                                        <span>{row?.tech}</span>
                                        <span className='font-mono font-semibold'>{row?.jobs}</span>
                                    </div>
                                ))}
                            </div>
                            <div className='grid md:grid-cols-2 gap-2 md:gap-4 mt-4'>
                                <div className='flex items-center justify-evenly border border-neutral-400 tracking-wider px-4 py-2 md:col-span-2'>
                                    <span>Others Tech Stacks</span>
                                    <span className='font-mono font-semibold'>
                                        {apiResp?.others_tech_stack_counts?.overall}
                                    </span>
                                </div>
                                {apiResp?.others_tech_stack_counts?.data?.map((row, idx) => (
                                    <div className='flex items-center justify-between border px-4 py-2' key={idx}>
                                        <span>{row?.tech}</span>
                                        <span className='font-mono font-semibold'>{row?.jobs}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            />
        )
    )
}

export default memo(ApiJobCountsByTechs)
