import { memo } from 'react'

import { Drawer, Button } from '@components'

import { useGroupLinksStore } from '@/stores'

import { UptoIcon } from '@icons'

const LinkRow = () => (
    <div className='mt-2 flex justify-between items-center p-3 bg-slate-100 border border-[#338d8c] border-opacity-40 rounded-lg hover:bg-cyan-50'>
        <span>Monster</span>
        <span>Contract On Site</span>
        <a
            href='google.com'
            target='_blank'
            rel='noreferrer'
            className='flex w-fit items-center gap-1.5 border border-[#4ab9a7] rounded-full px-2'
        >
            <span className='animate-ping'>{UptoIcon}</span>
            <span>Visit link</span>
        </a>
    </div>
)

const GroupLinksDetails = () => {
    const [show, tabs, setShow, switchTab] = useGroupLinksStore(state => [
        state?.show?.details,
        state?.tabs,
        state?.toggle?.details,
        state?.switchTab,
    ])

    return (
        <Drawer show={show} setShow={setShow} w='50%'>
            <div className='flex flex-col mb-4'>
                <div className='flex flex-col mb-4 space-y-2 md:gap-5 sm:flex-row sm:space-y-0'>
                    <Button
                        label='Stopped'
                        fill={tabs.stop}
                        classes={`rounded-none ${!tabs.stop && 'border-cyan-200'}`}
                        onClick={() => switchTab('stop')}
                    />
                    <Button
                        label='Running'
                        fill={tabs.running}
                        classes={`rounded-none ${!tabs.running && 'border-cyan-200'}`}
                        onClick={() => switchTab('running')}
                    />
                    <Button
                        label='Completed'
                        fill={tabs.completed}
                        classes={`rounded-none ${!tabs.completed && 'border-cyan-200'}`}
                        onClick={() => switchTab('completed')}
                    />
                    <Button
                        label='Failed'
                        fill={tabs.failed}
                        classes={`rounded-none ${!tabs.failed && 'border-cyan-200'}`}
                        onClick={() => switchTab('failed')}
                    />
                </div>
                {tabs.stop && (
                    <div className='p-3'>
                        <span className='font-semibold'>Stopped Group Links</span>
                        <div className='flex flex-col gap-2'>
                            {Array.from({ length: 25 }).map(() => (
                                <LinkRow />
                            ))}
                        </div>
                    </div>
                )}
                {tabs.running && (
                    <div className='p-3'>
                        <span className='font-semibold'>Running Group Links</span>
                        <div className='flex flex-col gap-2'>
                            {Array.from({ length: 1 }).map(() => (
                                <LinkRow />
                            ))}
                        </div>
                    </div>
                )}
                {tabs.failed && (
                    <div className='p-3'>
                        <span className='font-semibold'>Failed Group Links</span>
                        <div className='flex flex-col gap-2'>
                            {Array.from({ length: 4 }).map(() => (
                                <LinkRow />
                            ))}
                        </div>
                    </div>
                )}
                {tabs.completed && (
                    <div className='p-3'>
                        <span className='font-semibold'>Completed Group Links</span>
                        <div className='flex flex-col gap-2'>
                            {Array.from({ length: 10 }).map(() => (
                                <LinkRow />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Drawer>
    )
}

export default memo(GroupLinksDetails)
