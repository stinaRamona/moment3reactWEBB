import { useState } from "react"
import { useEffect } from "react"

interface PostForm {
    title: string, 
    author: string, 
    postText: string,
}

const NewPostForm = () => {

    //state för formulärdata
    const [formData, setFormData] = useState<PostForm>({title: "", author: "", postText: ""}); 

    const addBlogpost = async () => {
        try {
            let response = await fetch("https://hapiblog.onrender.com/post", {
                method: "POST", 
                headers: {
                    contentType: "application/json"
                }, 
                body: JSON.stringify(formData)
            }); 

            if(!response.ok) {
                console.log("Något gick fel vid postandet"); 
            }
        } catch(error) {
            console.error(error); 
        }
    }

  return (
    <form>
        <label htmlFor="title">Rubrik:</label><br />
        <input type="text" name="title" id="title" value={formData.title}/><br />

        <label htmlFor="author">Författare:</label><br />
        <input type="text" name="author" id="author" value={formData.author}/><br />

        <label htmlFor="postText">Ditt inlägg:</label><br />
        <textarea name="postText" id="postText" value={formData.postText}></textarea><br />

        <input type="submit" value="Posta inlägg"/>
    </form>
  )
}

export default NewPostForm
