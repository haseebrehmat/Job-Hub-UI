import { memo, useState } from 'react'

import { Input } from '@components'

import { SearchIcon, SearchClearIcon } from '@icons'

const Searchbox = memo(({ query = '', setQuery, setPage, last12HoursJobsCount }) => {
    const [value, setValue] = useState(query)
    const handleChange = e => setValue(e.target.value)
    const handleClick = () => {
        setQuery(value)
        setPage(1)
    }

    const handleEnter = e => {
        if (e.key === 'Enter') {
            setQuery(value)
            setPage(1)
        }
    }

    const handleClear = () => {
        setQuery('')
        setValue('')
        setPage(1)
    }

    return (
        <div className='flex items-center justify-between'>
            <p className='py-2 pl-4 text-[#006366] font-bold text-lg'>
                Applied Jobs: {last12HoursJobsCount} (Last 12 hours)
            </p>

            <div className='p-4'>
                <label htmlFor='table-search' className='sr-only'>
                    Search
                </label>
                <div className='relative'>
                    <div
                        className='absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer'
                        onClick={handleClick}
                    >
                        {SearchIcon}
                    </div>
                    <Input
                        ph='Search & Click Icon'
                        classes='block p-2 pl-10'
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleEnter}
                    />
                    {query === '' ? (
                        ''
                    ) : (
                        <div
                            className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
                            onClick={handleClear}
                        >
                            {SearchClearIcon}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
})

export default Searchbox
