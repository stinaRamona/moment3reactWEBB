//reactpaket importeras in
import { createContext, useState, useContext, ReactNode } from "react";

//interface importeras in
import { User, LoginCred, AuthResponse, AuthContextType} from "../types/auth.types"; 

const AuthContext = createContext<AuthContextType | null>(null); 

interface AuthProviderProps {
    children: ReactNode
}; 

export const AuthProvider: React.FC<AuthProviderProps>  = ({children}) => {

    //sätter state 
    const [user, setUser] = useState<User | null>(null); 

    const login = async (credentials: LoginCred) => {

        try {
            const response = await fetch("https://hapiblog.onrender.com/login/auth", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(credentials)
            })

            if(!response.ok) {
                throw new Error("Inloggningen misslyckades!"); 
            }

            const data = await response.json() as AuthResponse; 

            //lägger in token i localstorage
            localStorage.setItem("loginToken", data.token); 

            setUser(data.user); 

        } catch (error) {
            //konsollogg för utveckling 
            console.log(error); 
        }
    }

    const logout = () => {
        localStorage.removeItem("loginToken"); 
        setUser(null); 
    }

    return (
        <AuthContext.Provider value={{user, login, logout}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () : AuthContextType=> {
    const context = useContext(AuthContext); 

    if(!context) {
        throw new Error("Måste användas inom en AuthProvider"); 
    }

    return context; 
}