import React from "react";
import {useNavigate} from "react-router-dom";
import ErrorPage from "@/components/error-page";

const ErrorNetworkPage: React.FC = () => {

  const navigate = useNavigate();

  return (
      <ErrorPage
          code={500}
          message='服务器发生未知错误,请稍后再试!'
          extractRender={
            <button
                onClick={() => navigate(-1)}
                className='bg-transparent border border-blue-500 rounded-xl h-9 px-4 text-blue-500 hover:text-white hover:bg-blue-500 transition-all'>
              <i className="bi bi-arrow-clockwise mr-3 "></i>
              刷新
            </button>}
      />
  )
}

export default ErrorNetworkPage