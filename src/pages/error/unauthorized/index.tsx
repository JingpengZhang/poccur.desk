import ErrorPage from "@/components/error-page";
import React from "react";
import {useNavigate} from "react-router-dom";

const UnauthorizedPage: React.FC = () => {

  const navigate = useNavigate();

  return (
      <ErrorPage
          code={401}
          message='对不起,您没有权限进行此操作!'
          extractRender={
            <>
              <button
                  onClick={() => navigate('/')}
                  className='bg-transparent border border-blue-500 rounded-xl h-9 px-4 text-blue-500 hover:text-white hover:bg-blue-500 transition-all'>
                <i className="bi bi-house-fill mr-3 "></i>
                首页
              </button>
              <button
                  onClick={() => navigate('/login')}
                  className='bg-transparent border border-blue-500 rounded-xl h-9 px-4 text-blue-500 hover:text-white hover:bg-blue-500 transition-all'>
                <i className="bi bi-box-arrow-in-right mr-3 "></i>
                登陆页
              </button>
              <button
                  onClick={() => navigate(-1)}
                  className='bg-transparent border border-blue-500 rounded-xl h-9 px-4 text-blue-500 hover:text-white hover:bg-blue-500 transition-all'>
                <i className="bi bi-backspace-fill mr-3 "></i>
                上一页
              </button>
            </>
          }
      />
  )
}

export default UnauthorizedPage