import * as React from "react";
import { Routes, Route } from "react-router-dom";
import AdminView from "./views/AdminView";
import UserView from "./views/UserView";
import NavigationBar from "./components/NavigationBar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 min-w-[600px]">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<AdminView />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/user" element={<UserView />} />
        <Route
          path="*"
          element={<div className="text-white">404: Page not found</div>}
        />
      </Routes>
    </div>
  );
}
