import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";
import App from "@/App.tsx";
import LoginPage from "@/pages/login";

const MainPage = lazy(() => import('@/pages/main'))

const Menu = lazy(() => import('@/pages/main/menu'))

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
            path: 'menu',
            element: <Suspense>
              <Menu/>
            </Suspense>
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