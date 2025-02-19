

const LoginForm = () => {
  return (
    <form>
        <label htmlFor="email">E-post:</label><br />
        <input type="text" name="email" id="email" /><br />

        <label htmlFor="password">Lösenord:</label><br />
        <input type="text" id="password" name="password" /><br />

        <input type="submit" value="Logga in"/>
    </form>
  )
}

export default LoginForm
