import { useState, useEffect } from "react"
import "../css/NewPostForm.css"; 

interface PostForm {
    _id?: string,
    title: string, 
    author: string, 
    postText: string,
    created?: string
}

interface Post {
    _id: string,
    title: string, 
    author: string, 
    postText: string, 
    created: string
  };

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
    
    //state för errors 
    const [error, setError] = useState<string[]>([]); 

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

        //för att spara errors från formuläret
        const errors = [];

        console.log("Formulärdata vid submit:", formData);

        if(!formData.title) {
            errors.push("Du måste ange en rubrik");
        }

        if(!formData.author) {
            errors.push("Du måste ange en författare"); 
        }

        if(!formData.postText) {
            errors.push("Du måste skriva en inläggstext"); 
        }

        if(errors.length > 0 ) {
            setError(errors); 
            return; 
        }

        if (mode === "update" && initialData) {
            onSubmit({ ...initialData, ...formData }); 
        } else {
            onSubmit(formData); 
        }

        if (mode === "create") {
            setFormData({title: "", author: "", postText: ""});
        }
         
        onSubmit(formData); 

        setError([""]); 
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
        {error.length > 0 && error.map((err, index) => <p key={index}>{err}</p>)}
    </form>
  )
}; 

export default NewPostForm
