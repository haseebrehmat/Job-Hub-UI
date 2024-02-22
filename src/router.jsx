import { createBrowserRouter } from 'react-router-dom'

import { Protected } from '@components'

import { AppLayout } from '@modules'

import { routes, authRoutes } from './routes'

const browserRoutes = routes.map(({ path, protect, component, title }) => ({
    path,
    element: protect ? (
        <Protected>
            <AppLayout title={title}>{component}</AppLayout>
        </Protected>
    ) : (
        <AppLayout title={title}>{component}</AppLayout>
    ),
}))

const router = createBrowserRouter([...browserRoutes, ...authRoutes])

export default router
