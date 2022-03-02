import { createContext, useState } from "react";
import clayful from "clayful/client-js";
import { useNavigate } from "react-router";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const isAuthenticated = () => {
    var Customer = clayful.Customer;
    var options = {
      customer: localStorage.getItem("accessToken"),
    };
    Customer.isAuthenticated(options, function (err, result) {
      if (err) {
        // Error case
        console.log(err.code);
        setIsAuth(false);
        return;
      }
      var data = result.data;
      if (data.authenticated) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
      console.log(data);
    });
  };

  const signOut = () => {
    setIsAuth(false);
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const AuthContextData = {
    isAuth,
    isAuthenticated,
    signOut,
  };

  return (
    <AuthContextProvider value={AuthContextData}>
      {children}
    </AuthContextProvider>
  );
};

export default AuthContextProvider;
