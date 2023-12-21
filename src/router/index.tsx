import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from "react";

import RootPage from "@/pages";

import ErrorRouterPage from "@/pages/error/error-router";
import ErrorNetworkPage from "@/pages/error/error-network";
import UnauthorizedPage from "@/pages/error/unauthorized";

import SignInPage from "@/pages/auth/sign-in";
import SignUpPage from "@/pages/auth/sign-up";
import ForgotPasswordPage from "@/pages/auth/forgot-password";
import withSuspense from "@/hoc/with-suspense.tsx";


const MainPage = lazy(() => import('@/pages/main'))

import DashboardPage from "@/pages/main/dashboard"

const AdminMenu = lazy(() => import('@/pages/main/admin-menu'))
const ArticleCategory = lazy(() => import("@/pages/main/article-category"))
const ProfilePage = lazy(() => import('@/pages/main/profile'))
const TagPage = lazy(() => import('@/pages/main/tag'))


const router = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(RootPage),
    children: [
      {
        path: 'main',
        element: withSuspense(MainPage),
        children: [
          {
            path: '',
            element: withSuspense(DashboardPage)
          },
          {
            path: 'dashboard',
            element: withSuspense(DashboardPage)
          },
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
          {
            path: 'tag',
            element: withSuspense(TagPage)
          },
          {
            path: 'profile',
            element: withSuspense(ProfilePage),
          },
        ]
      },
      {
        path: 'sign-in',
        element: withSuspense(SignInPage),
      },
      {
        path: 'sign-up',
        element: <Suspense>
          <SignUpPage/>
        </Suspense>,
      },
      {
        path: 'forgot-password',
        element: <Suspense>
          <ForgotPasswordPage/>
        </Suspense>,
      },
    ],
    errorElement: <ErrorRouterPage/>
  },
  {
    path: '/error-network',
    element: <ErrorNetworkPage/>
  }, {
    path: '/unauthorized',
    element: <UnauthorizedPage/>
  },

])

export default router