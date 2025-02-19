/*Komponenet för att  läsa in och skriva ut poster från api */
const BlogPost = () => {
    const GetPosts = async () => {
        
        try {
            let response = await fetch("https://hapiblog.onrender.com/posts"); 

            if(response.ok) {
                let data = await response.json(); 
                console.log(data); 
            } else {
                console.log("Fel vid hämtning av data"); 
            }

        } catch(error) {
            console.error(error); 
        }
    }

  return (

    <div>
      <button onClick={GetPosts}>Klicka!</button>
    </div>
  )
}

export default BlogPost
