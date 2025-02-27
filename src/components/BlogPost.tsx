/*Komponenet för att  läsa in och skriva ut poster från api */

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewPostForm from "./NewPostForm";

//interface för svar från api
interface Post {
  _id: string,
  title: string, 
  author: string, 
  postText: string, 
  created: string
}; 

const BlogPost = () => {
  
  //state för bloggpost 
  const [posts, setPosts] = useState<Post [] | []>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null); 
  const navigate = useNavigate();  

  //useEffect 
  useEffect(() => {
    getPosts(); 
  }, [])

  const getPosts = async () => {
        
      try {
          let response = await fetch("https://hapiblog.onrender.com/posts"); 

          if(response.ok) {
              let data = await response.json(); 
              setPosts(data); 
                
          } else {
              console.log("Fel vid hämtning av data"); 
          }

      } catch(error) {
          console.error(error); 
      }
  }

  const goToPage = (id: string) => {
    navigate("/post/" + id); 
  }

  const deletePost = async (id : string) => {
    try {
      const response = await fetch("https://hapiblog.onrender.com/post/" + id, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json"
        }
      }); 

      if(response.ok) {
        console.log("Inlägget är raderat"); 
        getPosts(); 
      } else {
        console.log("Något gick fel vid radering av inlägget"); 
      }

    } catch(error) {
      console.log(error); 
    }
  }

  const handleUpdate = async (updatedPost: Post) => {
    try {
      const response = await fetch("https://hapiblog.onrender.com/post/" + updatedPost._id, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify(updatedPost),
        
      }); 

      if(response.ok) {
        console.log("Inlägget är uppdaterat!"); 
        setEditingPost(null); 
        getPosts(); 
      } else {
        console.log("Kunde inte uppdatera inlägget. Något gick fel")
      }

    } catch(error) {
      console.log(error); 
    }
  } 

  const handleCreate = async (newPost: PostForm) => {
    try {
      const response = await fetch("https://hapiblog.onrender.com/post", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify(newPost)
      }); 

      if(response.ok) {
        console.log("Inlägget är postat"); 
        getPosts(); 
      } else {
        console.log("Gick inte att posta inlägg. Något gick tok"); 
      }
    } catch(error) {
      console.log(error); 
    }

  }

  return (
    <>
    {editingPost ? (
      <NewPostForm mode="update" initialData={editingPost} onSubmit={handleUpdate} />
    ) : (
      <NewPostForm mode="create" onSubmit={handleCreate}/>
    )}
    {
      posts.map((post) => (
        <div className="blogpostDiv" key={post._id}>
          <h3>{post.title}</h3>
          <em>{post.created}</em>
          <p>{post.author}</p>
          <article>{post.postText}</article> 
          {window.location.pathname === "/admin" ? <button onClick={() => deletePost(post._id)}>Radera</button> : <button onClick={() => goToPage(post._id)}>Gå till inlägget</button>}
          {window.location.pathname === "/admin" && <button onClick={() => setEditingPost(post)}>Uppdatera</button>}
        </div>
      ))
    }
    </>
  )
}

export default BlogPost
