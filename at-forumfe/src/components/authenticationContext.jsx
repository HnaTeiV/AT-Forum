import React,{createContext,useEffect,useState,useContext} from "react";

const AuthContext= createContext();
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        const userRole = localStorage.getItem("role");

        if (token && userData && userRole) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
            setRole(userRole);
        } else {
            setIsAuthenticated(false);
            setUser(null);
            setRole(null);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, role, setIsAuthenticated, setUser, setRole }}>
            {children}
        </AuthContext.Provider>
    );
}

//Helper hook to use the AuthContext
export function useAuth() {
    return useContext(AuthContext);
}