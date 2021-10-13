import React, { useContext } from "react";
import { PageHeader, Button } from "antd";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

const Navbar = () => {
  const { loginStatus, setLoginStatus } = useContext(AppContext);
  console.log(loginStatus);
  const history = useHistory();
  const handleClick = () => {
    localStorage.clear();
    setLoginStatus(false);
    return history.push("/login");
  };

  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        title="Inshal Ayaz"
        subTitle="My First Full Stack App"
        extra={[
          loginStatus ? (
            <Button key="1" type="primary" onClick={handleClick}>
              Log Out
            </Button>
          ) : (
            <Link to="/login">
              <Button key="2" type="primary">
                Log In
              </Button>
            </Link>
          ),
        ]}
      />
    </div>
  );
};

export default Navbar;
