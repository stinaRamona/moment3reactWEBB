import { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";

interface Post {
    _id: string,
    title: string, 
    author: string, 
    postText: string, 
    created: string
};

const SinglePost = () => {
    //states 
    const { id } = useParams<{id : string}>(); 
    const [post, setPost] = useState<Post | null>(null); 
    const [error, setError] = useState<string>(); 


    const fetchPost = async () => {
        try {

            let response = await fetch("https://hapiblog.onrender.com/post/" + id);
            
            if(response.ok) {
                let data = await response.json(); 
                setPost(data); 
            } else {
                //consollogg för utveckling 
                console.log("fel vid hämtnig av data"); 

                //felmeddelande
                setError("Kunde inte hämta posten. Försök igen senare.")
            }
            
        } catch(error) {
            console.log(error); 
        }
    }

    useEffect( () => {
        fetchPost();
    }, [id]); 

    if(!post) {
        return <p>Laddar inlägg...</p>; 
    }

    return ( 
        <div id="singlePostDiv">
            <span>{error && error}</span>
            <h2>{post.title}</h2>
            <em>{new Date(post.created).toLocaleDateString()}</em>
            <p>{post.author}</p>
            <article>{post.postText}</article>
        </div>
    )

}

export default SinglePost

