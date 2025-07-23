import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Defining contex authentication shape
type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider to wrap our app and manage the login state
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthanticated] = useState(false);

  // Onmount to check if the token exist on localstorage to set auth state
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthanticated(!!token);
  });

  // saving token
  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthanticated(true);
  };
  // logout by clearing token
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthanticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
