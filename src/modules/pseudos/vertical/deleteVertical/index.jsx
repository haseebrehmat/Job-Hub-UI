import { memo, useState } from 'react'

import { Input } from '@components'

import { ActionButtons } from '@modules/pseudos/components'

const Skills = ({ id }) => {
    const [confirmInput, setConfirmInput] = useState('')

    if (confirmInput === 'DELETE') {
        console.log(id)
    }
    return (
        <div className='max-w-full overflow-x-auto mb-2 px-1'>
            <div className='flex items-center space-x-4 py-4'>
                <Input value={confirmInput} onChange={e => setConfirmInput(e.target.value)} />
            </div>
            <ActionButtons classes='mt-4' />
        </div>
    )
}

export default memo(Skills)
