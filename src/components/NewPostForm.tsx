import { useState } from "react"

interface PostForm {
    title: string, 
    author: string, 
    postText: string,
}

const NewPostForm = () => { 
    
    //state för formulärdata
    const [formData, setFormData] = useState<PostForm>({title: "", author: "", postText: ""}); 

    const addBlogpost = async (event : any) => {
        event.preventDefault();

        try {
            let response = await fetch("https://hapiblog.onrender.com/post", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(formData)
            }); 

            if(!response.ok) {
                console.log("Något gick fel vid inloggningen"); 
            } 

        } catch(error) {
            console.error(error); 
        }
    }

  return (
    <form onSubmit={addBlogpost}>
        <label htmlFor="title">Rubrik:</label><br />
        <input type="text" name="title" id="title" value={formData.title}
        onChange={(event) => setFormData({...formData, title: event.target.value})}
        />
        <br />

        <label htmlFor="author">Författare:</label><br />
        <input type="text" name="author" id="author" value={formData.author}
        onChange={(event) => setFormData({...formData, author: event.target.value})}
        />
        <br />

        <label htmlFor="postText">Ditt inlägg:</label><br />
        <textarea name="postText" id="postText" value={formData.postText} 
        onChange={(event) => setFormData({...formData, postText: event.target.value})}
        ></textarea><br />
        <input type="submit" value="Posta inlägg"/>
    </form>
  )
}

export default NewPostForm
