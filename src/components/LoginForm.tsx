import { useState } from "react"

interface LoginForm {
  email: string, 
  password: string
}

const LoginForm = () => {

  const [loginData, setLoginData] = useState<LoginForm>({email: "", password: ""}); 

  const loginUser = async (event : any) => {
    event.preventDefault(); 

    try {
      let response = await fetch("https://hapiblog.onrender.com/login/auth", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify(loginData)
      })

      if(!response.ok) {
        // koll för utveckling 
        console.log("Något gick fel vid inloggning"); 
      } else {
        console.log("inloggad!"); 
      }
      
    } catch (error) {
      
      // konsoll koll för utveckling 
      console.log(error); 
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

        <input type="submit" value="Logga in"/>
    </form>
  )
}

export default LoginForm
