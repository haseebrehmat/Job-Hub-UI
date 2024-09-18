import { memo, useState, useRef } from 'react'

import { useJobPortalV2Store } from '@/stores'

import { Button } from '@components'

import { VISIBILITY_OPTIONS } from '@constants/jobPortalV2'

import { JobVisibilityIcon } from '@icons'

const Visibility = () => {
    const dropdownRef = useRef(null)
    const [showOptions, setShowOptions] = useState(false)

    const [visible, setVisible] = useJobPortalV2Store(state => [state?.filters?.visible, state?.setFilters?.visible])

    if (showOptions)
        window.addEventListener('click', event => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setShowOptions(false)
        })

    return (
        <div className='relative' ref={dropdownRef}>
            <Button
                label='Job Visibility'
                icon={JobVisibilityIcon}
                fit
                fill={showOptions}
                classes='visibility !py-1.5 pl-5 pr-6 !m-0 !flex !items-center'
                onClick={() => setShowOptions(!showOptions)}
            />
            {showOptions && (
                <div className='absolute right-0 w-max z-20 bg-white rounded border border-[#55bf84] shadow-md flex flex-col mt-2 text-sm'>
                    {Object.keys(VISIBILITY_OPTIONS).map(key => (
                        <button
                            key={key}
                            onClick={() => setVisible(key)}
                            className={`border-0 text-left w-full hover:underline py-2 px-3 ${
                                key === visible ? 'bg-[#4f9d9b] text-white' : null
                            }`}
                        >
                            {VISIBILITY_OPTIONS[key]}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default memo(Visibility)
