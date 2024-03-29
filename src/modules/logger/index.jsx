import { memo } from 'react'

const Logger = () => {
    console.log('Logger')

    return <p>Here comes logger</p>
}

export default memo(Logger)
