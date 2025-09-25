 import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Menu = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();

  const pathMap = {
    "/": 0,
    "/orders": 1,
    "/holdings": 2,
    "/positions": 3,
    "/funds": 4,
    "/apps": 6,
  };

  const [selectedMenu, setSelectedMenu] = useState(pathMap[location.pathname] || 0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    setSelectedMenu(pathMap[location.pathname]);
  }, [location.pathname]);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const getUserInitials = () => {
    if (user && user.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "ZU";
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container"> {/* This should be styled as your sidebar */}
      <img src="logo.png" style={{ width: "50px" }} alt="Logo" />
      <div className="menus">
        <ul>
          <li>
            <Link to="/" className="no-decoration" onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link to="/orders"  className="no-decoration" onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link to="/holdings"   className="no-decoration" onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link to="/positions"  className="no-decoration" onClick={() => handleMenuClick(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link to="/funds"  className="no-decoration" onClick={() => handleMenuClick(4)}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
          <li>
            <Link to="/apps"  className="no-decoration" onClick={() => handleMenuClick(6)}>
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">{getUserInitials()}</div>
          <p className="username">{user ? user.email : 'USERID'}</p>
        </div>

        {isProfileDropdownOpen && (
          <div className="profile-dropdown">
            <ul>
              <li onClick={logOut} style={{cursor: 'pointer'}}>Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;