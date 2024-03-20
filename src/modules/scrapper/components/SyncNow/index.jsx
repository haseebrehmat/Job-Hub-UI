import { memo } from 'react'

import { Button } from '@components'

const SyncNow = memo(() => (
    <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md mt-4'>
        <h1 className='mb-2 text-lg font-medium'>Sync Now</h1>
        <hr className='mb-5' />
        <Button label='Run Scrapper Now' fit />
    </div>
))

export default SyncNow
