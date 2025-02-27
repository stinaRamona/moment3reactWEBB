import { useState, useEffect } from "react"; 
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

interface LoginForm {
  email: string, 
  password: string
}

const LoginForm = () => {

  const [loginData, setLoginData] = useState<LoginForm>({email: "", password: ""}); 
  const [error, setError] = useState<string>(""); 

  const {login, user} = useAuth(); 
  const navigate = useNavigate();

  useEffect( () => {
    if(user) {
      navigate("/admin"); 
    }
  }, [user])

  const loginUser = async (event : any) => {
    event.preventDefault(); 

    try {
      console.log("Försöker logga in med: ", loginData); 
      await login(loginData); 
      console.log("Det gick att logga in, navigering till /admin"); 
      navigate("/admin"); 
      console.log("Inloggad"); 

    } catch (error) {
      setError("Det gick inte att logga in. Ange korrekt e-post och lösenord.");
      // konsoll koll för utveckling 
      console.log("login error: " + error); 
    }
  }

  return (
    <form onSubmit={loginUser}>
      <label htmlFor="email">E-post:</label><br />
      <input type="text" name="email" id="email" value={loginData.email}
      onChange={(event) => setLoginData({...loginData, email: event.target.value})}
      />
      <br />

      <label htmlFor="password">Lösenord:</label><br />
      <input type="text" id="password" name="password" value={loginData.password} 
      onChange={(event) => setLoginData({...loginData, password: event.target.value})}
      />
      <br />
      {error && <p>{error}</p>}
      <input type="submit" value="Logga in"/>
    </form>
  )
}

export default LoginForm
