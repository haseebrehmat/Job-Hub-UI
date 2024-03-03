import { Navigate, useLocation } from 'react-router-dom'

import { getToken, can } from '@utils/helpers'

const Protected = ({ children, permission }) => {
    const token = getToken()
    const location = useLocation()
    const isAuthorized = permission === 'all' ? true : can(permission)

    return token ? (
        isAuthorized ? (
            children
        ) : (
            <Navigate to='/' />
        )
    ) : (
        <Navigate to='/login' replace state={{ path: location.pathname }} />
    )
}

export default Protected
