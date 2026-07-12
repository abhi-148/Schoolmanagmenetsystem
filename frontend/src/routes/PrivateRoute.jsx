import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function PrivateRoute({ children }) {

  const {
    token,
    role,
    isAuthenticated
  } = useContext(AuthContext);

  console.log({
    token,
    role,
    isAuthenticated
  });

  return children;
}

export default PrivateRoute;