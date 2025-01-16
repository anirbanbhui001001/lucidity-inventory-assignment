import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Switch } from "antd";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // If the path is / or /admin, set the switch to unchecked
    if (location.pathname === "/" || location.pathname === "/admin") {
      setIsAdmin(false);
    } else if (location.pathname === "/user") {
      setIsAdmin(true);
    }
  }, [location.pathname]);

  const onChange = (checked: boolean) => {
    setIsAdmin(checked);
    if (checked) {
      navigate("/user");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="flex justify-end gap-2 text-white p-4">
      Admin
      <Switch
        checked={isAdmin}
        onChange={onChange}
        className="bg-tableBgColor"
      />
      User
    </div>
  );
};

export default NavigationBar;
