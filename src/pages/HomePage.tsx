import BlogPost from "../components/BlogPost"

const HomePage = () => {
  return (
    <div>
      <h1>Startsidan</h1>
      <p>Välkommen till denna blogg! Har du ett konto kan du logga in och posta inlägg under Logga in</p>

      <h2>Senaste inläggen</h2>
      {/*Blogginlägg här */}
      <BlogPost />
    </div>
  )
}

export default HomePage
