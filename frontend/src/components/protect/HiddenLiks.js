/*
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";


export const ShowOnLogin = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if(isLoggedIn) {
        return <>{children}</>
    }
    return null
}


export const ShowOnLogout = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if(!isLoggedIn) {
        return <>{children}</>
    }
    return null
}
*/
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import React, { useState, useEffect } from "react";
import { getUser } from "../../services/authService";







export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <>{children}</>;
  }
  return null;
  
};


export const ShowOnAdminLogin = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const user = await getUser();
          setIsAdmin(user.admin === "true");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      fetchUser();
    }, []);
  
    if (isAdmin) {
      return <>{children}</>;
    }
    return null;
  };

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};

