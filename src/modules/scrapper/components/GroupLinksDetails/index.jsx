import { memo } from 'react'

import { useGroupLinksStore } from '@/stores'

import { Drawer, Button } from '@components'

import { GroupLinkRow } from '@modules/scrapper/components'

import { formatStringInPascal } from '@utils/helpers'

const GroupLinksDetails = () => {
    const [name, show, tabs, setShow, switchTab] = useGroupLinksStore(state => [
        state?.link?.group_scraper?.name,
        state?.show?.details,
        state?.tabs,
        state?.toggle?.details,
        state?.switchTab,
    ])

    return (
        <Drawer show={show} setShow={setShow} w='50%'>
            <div className='flex flex-col mb-4'>
                <span className='text-3xl uppercase mx-auto pb-3'>{name ?? 'Group A'}</span>
                <div className='flex flex-col mb-2 space-y-2 md:gap-5 sm:flex-row sm:space-y-0'>
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
                {Object.keys(tabs)
                    ?.filter(tab => tab !== 'running')
                    ?.map(
                        (tab, idx) =>
                            tabs[tab] && (
                                <div className='p-3' key={idx}>
                                    <span className='font-semibold'>{formatStringInPascal(tab)} Group Links</span>
                                    <div className='flex flex-col gap-2'>
                                        {Array.from({ length: 45 }).map(() => (
                                            <GroupLinkRow status={tab === 'total'} />
                                        ))}
                                    </div>
                                </div>
                            )
                    )}
            </div>
        </Drawer>
    )
}

export default memo(GroupLinksDetails)
