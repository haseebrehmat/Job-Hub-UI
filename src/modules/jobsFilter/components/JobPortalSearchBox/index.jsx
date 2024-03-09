import { memo } from 'react'

import { Input } from '@components'

import { NavbarSearchIcon } from '@icons'

const JobPortalSearchBox = ({ value, setQuery, handleEnter }) => {
    const handleChange = e => {
        setQuery(e.target.value)
    }

    return (
        <div className='relative hidden md:block'>
            <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                {NavbarSearchIcon}
            </div>
            <Input ph='Search' value={value} onChange={handleChange} onKeyDown={handleEnter} />
        </div>
    )
}

export default memo(JobPortalSearchBox)
