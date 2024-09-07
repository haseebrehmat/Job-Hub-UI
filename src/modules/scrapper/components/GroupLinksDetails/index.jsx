import { memo } from 'react'

import { useGroupLinksStore } from '@/stores'

import { Drawer, Button } from '@components'

import { GroupLinkRow } from '@modules/scrapper/components'

import { formatStringInPascal } from '@utils/helpers'

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
                    {Object.keys(tabs)?.map((tab, idx) => (
                        <Button
                            key={idx}
                            label={formatStringInPascal(tab)}
                            fill={tabs[tab]}
                            classes={`rounded-none ${!tabs[tab] && 'border-cyan-200'}`}
                            onClick={() => switchTab(tab)}
                        />
                    ))}
                </div>
                {tabs.total && (
                    <div className='p-3'>
                        <span className='font-semibold'>Total Group Links</span>
                        <div className='flex flex-col gap-2'>
                            {Array.from({ length: 45 }).map(() => (
                                <GroupLinkRow />
                            ))}
                        </div>
                    </div>
                )}
                {tabs.remaining && (
                    <div className='p-3'>
                        <span className='font-semibold'>Remaining Group Links</span>
                        <div className='flex flex-col gap-2'>
                            {Array.from({ length: 25 }).map(() => (
                                <GroupLinkRow />
                            ))}
                        </div>
                    </div>
                )}
                {tabs.running && (
                    <div className='p-3'>
                        <span className='font-semibold'>Running Group Links</span>
                        <div className='flex flex-col gap-2'>
                            {Array.from({ length: 1 }).map(() => (
                                <GroupLinkRow />
                            ))}
                        </div>
                    </div>
                )}
                {tabs.failed && (
                    <div className='p-3'>
                        <span className='font-semibold'>Failed Group Links</span>
                        <div className='flex flex-col gap-2'>
                            {Array.from({ length: 4 }).map(() => (
                                <GroupLinkRow />
                            ))}
                        </div>
                    </div>
                )}
                {tabs.completed && (
                    <div className='p-3'>
                        <span className='font-semibold'>Completed Group Links</span>
                        <div className='flex flex-col gap-2'>
                            {Array.from({ length: 10 }).map(() => (
                                <GroupLinkRow />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Drawer>
    )
}

export default memo(GroupLinksDetails)
