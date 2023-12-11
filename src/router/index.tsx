import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import LoginPage from "@/pages/login";

const MainPage = lazy(() => import('@/pages/main'))

const AdminMenu = lazy(() => import('@/pages/main/admin-menu'))

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: 'main',
        element: <Suspense>
          <MainPage/>
        </Suspense>,
        children: [
          {
            path: 'admin-menu',
            element: <Suspense>
              <AdminMenu/>
            </Suspense>,
          }
        ]
      },
      {
        path: '/',
        element: <Suspense>
          <LoginPage/>
        </Suspense>,
      },
      {
        path: 'login',
        element: <Suspense>
          <LoginPage/>
        </Suspense>,
      }
    ]
  }
])

export default router