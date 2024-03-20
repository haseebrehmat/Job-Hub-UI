import { memo } from 'react'

import { SyncNow, CronjobTimeForm } from '@modules/scrapper/components'

const Scrapper = () => (
    <div className='p-2'>
        <div className='flex flex-col'>
            <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md mt-4'>
                <h1 className='mb-2 text-lg font-medium'>Update Srcapper Cronjob</h1>
                <hr className='mb-5' />
                <CronjobTimeForm />
            </div>
            <SyncNow />
        </div>
    </div>
)

export default memo(Scrapper)
