import React from "react";
import {Link} from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
      <div>
        <Link to={'/main/menu'}>Menu</Link>
      </div>
  )
}

export default LoginPage