import { memo } from 'react'

const TechKeywords = ({ keywords }) =>
    keywords ? (
        <span className='flex items-center gap-2 border-b border-neutral-500 pr-2 text-[14px]'>
            <span className='text-neutral-500'>Tech Stacks:</span>
            <span className='text-neutral-700 capitalize tracking-wider'>
                {Array.from({ length: 5 }, () => ` ${keywords},`)}
            </span>
        </span>
    ) : null

export default memo(TechKeywords)
