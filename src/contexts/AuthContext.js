import React, { useState } from "react";

const localToken = localStorage.getItem("nevitsToken");
const localLoggerUserId = localStorage.getItem("nevitsUser");

const token = localToken ? localToken : "";
const loggerUserId = localLoggerUserId ? localLoggerUserId: "";

const initialData = { token, loggerUserId };

const DataContext = React.createContext(initialData);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialData);

  const value = { auth, setAuth };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(DataContext);

  return context;
};