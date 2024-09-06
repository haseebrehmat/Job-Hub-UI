import { memo } from 'react'

import { Drawer, Button } from '@components'

import { useGroupLinksStore } from '@/stores'

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
                {tabs.stop && <div className='p-3'>Stopped Scrapers here</div>}
                {tabs.running && <div className='p-3'>Running Scrapers here</div>}
                {tabs.failed && <div className='p-3'>Failed Scrapers here</div>}
                {tabs.completed && <div className='p-3'>Completed Scrapers here</div>}
            </div>
        </Drawer>
    )
}

export default memo(GroupLinksDetails)
