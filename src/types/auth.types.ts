export interface User {
    id: string,
    user_name: string, 
    email: string, 
    password: string //behöver kanske inte ha med 
}

export interface LoginCred {
    email: string, 
    password: string 
}

export interface AuthResponse {
    user: User, 
    token: string
}

export interface AuthContextType {
    user: User | null, 
    login: (credentials: LoginCred) => Promise<void>, 
    logout: () => void
}