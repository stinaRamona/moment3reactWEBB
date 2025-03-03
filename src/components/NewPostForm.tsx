import { useState, useEffect } from "react"
import "../css/NewPostForm.css"; 

interface PostForm {
    _id?: string,
    title: string, 
    author: string, 
    postText: string,
    created?: string
}

//props som komponenten kan ta emot 
interface NewPostFormProps {
    mode: "create" | "update", 
    initialData?: PostForm,
    onSubmit: (post: PostForm | Post) => void 
}


const NewPostForm: React.FC<NewPostFormProps> = ({mode = "create", initialData, onSubmit}) => { 
    
    //state för formulärdata
    const [formData, setFormData] = useState<PostForm>(
        initialData || {title: "", author: "", postText: ""});  
    
    //körs när när initialData ändras 
    useEffect(() => {
        if(initialData) {
            setFormData(initialData); 
        }
    }, [initialData]); 

    //för uppdatering av bloggpost
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target; 
        setFormData({...formData, [name] : value }); 
    }; 

    //för att skapa en ny blogpost
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        event.stopPropagation();

        console.log("Formulärdata vid submit:", formData);

        if (mode === "update" && initialData) {
            onSubmit({ ...initialData, ...formData }); 
        } else {
            onSubmit(formData); 
        }

         
        onSubmit(formData); 
    }; 

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="title">Rubrik:</label><br />
        <input type="text" name="title" id="title" value={formData.title}
        onChange={handleChange}
        />
        <br />

        <label htmlFor="author">Författare:</label><br />
        <input type="text" name="author" id="author" value={formData.author}
        onChange={handleChange}
        />
        <br />

        <label htmlFor="postText">Ditt inlägg:</label><br />
        <textarea name="postText" id="postText" value={formData.postText} 
        onChange={handleChange}
        ></textarea><br />
        <input type="submit" value={mode === "create" ? "Posta inlägg" : "Uppdatera inlägg"} />
    </form>
  )
}; 

export default NewPostForm
