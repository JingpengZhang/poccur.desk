import React, {useMemo} from "react";
import ErrorPage from "@/components/error-page";
import {useNavigate, useRouteError} from "react-router-dom";

const ErrorRouterPage: React.FC = () => {
  const error = useRouteError() as any;

  const navigate = useNavigate();

  const state = useMemo(() => {
    let message;
    switch (error.status) {
      case 400:
        message = '页面未找到!'
        break;
      default :
        message = '路由发生未知错误!'
    }
    return {
      code: error.status,
      message
    }
  }, [error.status])

  return (
      <ErrorPage
          code={state.code}
          message={state.message}
          extractRender={
            <>
              <button
                  onClick={() => navigate(-1)}
                  className='bg-transparent border border-blue-500 rounded-xl h-9 px-4 text-blue-500 mr-4  hover:text-white hover:bg-blue-500 transition-all'>
                <i className="bi bi-backspace-fill mr-3 "></i>
                返回上一页
              </button>
              <button
                  onClick={() => navigate('/')}
                  className='bg-transparent border border-blue-500 rounded-xl h-9 px-4 text-blue-500 hover:text-white hover:bg-blue-500 transition-all'>
                <i className="bi bi-house-fill mr-3 "></i>
                回到首页
              </button>
            </>
          }
      />
  )
}

export default ErrorRouterPage