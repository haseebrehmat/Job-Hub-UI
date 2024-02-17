import { createBrowserRouter } from 'react-router-dom'

import { Protected } from '@components'

import { AppLayout } from '@modules'

import { routes, authRoutes } from './routes'

const browserRoutes = routes.map(({ path, protect, component }) => ({
    path,
    element: protect ? (
        <Protected>
            <AppLayout>{component}</AppLayout>
        </Protected>
    ) : (
        <AppLayout>{component}</AppLayout>
    ),
}))

const router = createBrowserRouter([...browserRoutes, ...authRoutes])

export default router
