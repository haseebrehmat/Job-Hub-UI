import { memo, useState } from 'react'

import { Input, Filters } from '@components'

import { NavbarSearchIcon } from '@icons'

const Searchbox = ({ name = 'search', ph = 'Search', query, setQuery }) => {
    const [value, setValue] = useState(query)
    const handleChange = e => setValue(e.target.value)
    const handleClick = () => setQuery(value)
    const handleEnter = e => (e.key === 'Enter' ? setQuery(value) : null)
    const handleClear = () => {
        setQuery('')
        setValue('')
    }

    return (
        <>
            <div className='relative hidden md:block'>
                <div
                    className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'
                    onClick={handleClick}
                >
                    {NavbarSearchIcon}
                </div>
                <Input name={name} ph={ph} value={value} onChange={handleChange} onKeyDown={handleEnter} />
            </div>
            <Filters clear={handleClear} />
        </>
    )
}

export default memo(Searchbox)
