/*Komponenet för att  läsa in och skriva ut poster från api */

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
    {
      posts.map((post) => (
        <div className="blogpostDiv" key={post._id}>
          <h3>{post.title}</h3>
          <em>{post.created}</em>
          <p>{post.author}</p>
          <article>{post.postText}</article> 
          <button onClick={() => goToPage(post._id)}>Gå till inlägget</button>
        </div>
      ))
    }
    </>
  )
}

export default BlogPost
