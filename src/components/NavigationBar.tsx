import React from "react";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <ul className="flex justify-around">
        <li>
        Admin View
        </li>
        <li>
        User View
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
