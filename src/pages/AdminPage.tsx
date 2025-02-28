import { useAuth } from "../context/AuthContext"; 
import BlogPost from "../components/BlogPost"

const AdminPage = () => {

  const {user} = useAuth();

  return (
    <div>
        <h1>Du är inloggad {user?.user_name}!</h1>

        <h2>Redigera inlägg:</h2>
        <BlogPost />
    </div>
  )
}

export default AdminPage
