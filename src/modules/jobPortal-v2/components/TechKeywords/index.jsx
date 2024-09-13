import { memo } from 'react'

import { Button } from '@components'

const TechKeywords = ({ keywords }) =>
    keywords ? (
        <Button
            label={`Stacks: ${Array.from({ length: 5 }, () => ` ${keywords}`)}`}
            fit
            classes='!py-1 !px-5 !text-neutral-800 tracking-wider !text-sm !border-neutral-500 !border-opacity-70 hover:!bg-white hover:!text-[#338d8c] hover:!border-[#338d8c] !capitalize'
        />
    ) : null

export default memo(TechKeywords)
