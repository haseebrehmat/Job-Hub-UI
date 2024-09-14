import { memo } from 'react'

const TechKeywords = ({ keywords }) =>
    keywords ? (
        <span className='flex items-center gap-2 border border-neutral-400 px-2 py-1 rounded-md text-[14px]'>
            <span className='text-neutral-500'>Tech Stacks:</span>
            <span className='text-neutral-700 capitalize tracking-wider'>
                {Array.from({ length: 5 }, () => ` ${keywords},`)}
            </span>
        </span>
    ) : null

export default memo(TechKeywords)
