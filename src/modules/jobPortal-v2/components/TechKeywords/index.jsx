import { memo } from 'react'

import { Badge } from '@components'

const TechKeywords = ({ keywords }) =>
    keywords ? (
        <span className='flex items-center gap-2 border border-neutral-400 px-2 py-1 rounded-md text-[14px]'>
            <span className='text-neutral-500'>Tech Stacks:</span>
            <span className='text-neutral-700 capitalize tracking-wider inline-flex gap-2 text-xs'>
                {Array.from({ length: 5 }, () => (
                    <Badge label={keywords} type='success' classes='!text-xs' />
                ))}
            </span>
        </span>
    ) : null

export default memo(TechKeywords)
