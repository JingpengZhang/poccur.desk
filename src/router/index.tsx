import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";

import ErrorPage from "@/pages/error";

import LoginPage from "@/pages/login";


const MainPage = lazy(() => import('@/pages/main'))

const AdminMenu = lazy(() => import('@/pages/main/admin-menu'))
const ArticleCategory = lazy(() => import("@/pages/main/article-category"))


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
          },
          {
            path: 'article-category',
            element: <Suspense>
              <ArticleCategory/>
            </Suspense>,
          },
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
      },
    ],
    errorElement: <ErrorPage/>
  },
])

export default router