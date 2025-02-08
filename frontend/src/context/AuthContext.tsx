import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../store/actions/authActions";
import { jwtDecode } from "jwt-decode";
import { RootState } from "../store/rootReducer";

interface AuthContextType {
    token: string | null;
    user: { id: string } | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const dispatch = useDispatch();
    const tokenFromRedux = useSelector((state: RootState) => state.auth.token);
    
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [user, setUser] = useState<{ id: string } | null>(null);

    useEffect(() => {
        if (tokenFromRedux) {
            setToken(tokenFromRedux);
            localStorage.setItem("token", tokenFromRedux);
            decodeToken(tokenFromRedux);
        }
    }, [tokenFromRedux]);

    useEffect(() => {
        if (token) {
            decodeToken(token);
        }
    }, [token]);

    const decodeToken = (token: string) => {
        try {
            const decoded: any = jwtDecode(token);
            setUser({ id: decoded.userId });
        } catch (error) {
            console.error("Error decoding token: ", error);
            logout();
        }
    };

    const login = async (email: string, password: string): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            dispatch(loginRequest(email, password));

            const checkToken = setInterval(() => {
                const storedToken = localStorage.getItem("token");
                if (storedToken) {
                    setToken(storedToken);
                    decodeToken(storedToken);
                    clearInterval(checkToken);
                    resolve();
                }
            }, 500);

            setTimeout(() => {
                clearInterval(checkToken);
                reject(new Error("Login failed"));
            }, 5000);
        });
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
