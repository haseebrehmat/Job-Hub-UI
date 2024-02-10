import { memo, useState } from 'react'

import { Input } from '@components'

import { SearchIcon } from '@icons'

const Searchbox = memo(({ query = '', setQuery, setPage }) => {
    const [value, setValue] = useState(query)
    const handleChange = e => setValue(e.target.value)
    const handleClick = () => {
        setQuery(value)
        setPage(1)
    }

    return (
        <div className='p-4'>
            <label htmlFor='table-search' className='sr-only'>
                Search
            </label>
            <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer' onClick={handleClick}>
                    {SearchIcon}
                </div>
                <Input ph='Search & Click Icon' classes='block p-2 pl-10' value={value} onChange={handleChange} />
            </div>
        </div>
    )
})

export default Searchbox
