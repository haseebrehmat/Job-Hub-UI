import { Navigate } from 'react-router-dom'

import { getToken } from '@utils/helpers'

const token = getToken()

const Protected = ({ children }) => {
    if (!token) {
        return <Navigate to='/login' replace />
    }
    return children
}
export default Protected
