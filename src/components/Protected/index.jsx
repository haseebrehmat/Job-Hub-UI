import { Navigate, useLocation } from 'react-router-dom'

import { getToken } from '@utils/helpers'

const Protected = ({ children }) => {
    const token = getToken()
    const location = useLocation()

    return token ? children : <Navigate to='/login' replace state={{ path: location.pathname }} />
}

export default Protected
