import NewPostForm from "../components/NewPostForm"
import BlogPost from "../components/BlogPost"

const AdminPage = () => {
  return (
    <div>
        <h1>Skyddad adminsida</h1>
        <h2>Lägg till inlägg:</h2>
        <NewPostForm />

        <h2>Redigera inlägg:</h2>
        <BlogPost />
    </div>
  )
}

export default AdminPage
