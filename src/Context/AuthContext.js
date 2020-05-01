import React, { useReducer, createContext } from "react";
import { AuthReducer } from "../reducers/AuthReducer";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [userData, dispatch] = useReducer(AuthReducer, {
    token: null,
    userId: null,
    error: null,
    loading: false,
  });
  return (
    <AuthContext.Provider value={{ userData, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
}
