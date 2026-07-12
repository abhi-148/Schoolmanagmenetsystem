import {
  createContext,
  useState,
  useEffect
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [role, setRole] = useState(
    localStorage.getItem("role")
  );

  const [schoolId, setSchoolId] = useState(
  localStorage.getItem("schoolId")
);

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  useEffect(() => {

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

  }, [token]);

  const login = (
  newToken,
  newRole,
  newSchoolId
) => {

    localStorage.setItem(
      "token",
      newToken
    );

    localStorage.setItem(
      "role",
      newRole
    );

    localStorage.setItem(
  "schoolId",
  newSchoolId
);

    setToken(newToken);
    setRole(newRole);
    setSchoolId(newSchoolId);
    setIsAuthenticated(true);

  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("schoolId");

    setToken(null);
    setRole(null);
    setSchoolId(null);
    setIsAuthenticated(false);

  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        schoolId,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};