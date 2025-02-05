import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginRequest } from "../store/actions/authActions";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    token: string | null;
    user: { id: string  } | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [user, setUser] = useState<{ id: string; } | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            decodeToken(token); // Decode the token when it's available
        }
    }, [token]);

    const decodeToken = (token: string) => {
        try {
            const decoded = jwtDecode(token);
            setUser({ id: decoded.userId });
        } catch (error) {
            console.error("Error decoding token: ", error);
        }
    };
    const login = (email: string, password: string) => {
        dispatch(loginRequest(email, password));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    };


    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
