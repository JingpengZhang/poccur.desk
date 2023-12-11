import React from "react";
import {Link} from "react-router-dom";
import {Button} from "antd";

const LoginPage: React.FC = () => {


  return (
      <div>
        <Link to={'/main/menu'}>Menu</Link>
        <Button type='primary'>测试</Button>
      </div>
  )
}

export default LoginPage