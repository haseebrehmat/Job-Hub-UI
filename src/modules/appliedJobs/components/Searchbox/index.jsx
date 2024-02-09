import { memo } from 'react'

import { Input } from '@components'

import { SearchIcon } from '@icons'

const Searchbox = memo(() => (
    <div className='p-4'>
        <label htmlFor='table-search' className='sr-only'>
            Search
        </label>
        <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>{SearchIcon}</div>
            <Input ph='Search for items' classes='block p-2 pl-10' />
        </div>
    </div>
))

export default Searchbox
