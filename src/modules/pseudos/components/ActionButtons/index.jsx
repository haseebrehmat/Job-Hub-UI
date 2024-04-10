import React, { memo } from 'react'

import { Button } from '@components'

import { useNavigate } from 'react-router-dom'

const ActionButtons = ({ form = false, mutate, classes = null }) => {
    const navigate = useNavigate()

    return (
        <div className={`flex items-center w-1/2 ${classes}`}>
            {form && <Button label='Update' type='submit' fill classes='mr-2' />}
            <Button label='Refetch' fill classes='mr-2' onClick={() => mutate()} />
            <Button label='Back to pseudos' onClick={() => navigate('/pseudos')} />
        </div>
    )
}

export default memo(ActionButtons)
