import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app= express();
const port = 3000;
const API_URL= "https://v2.jokeapi.dev/joke/";

app.use(bodyParser.urlencoded({ extended: true }));

 app.get("/",(req,res)=>{
    res.render("index.ejs",{content:"choose your humor"});
 });

 app.post("/choose-category-type", async (req, res) => {
    const category = req.body.category;
    const type = req.body.type;
    const apiUrl = `${API_URL}${category}?type=${type}`;
  
    try {
      const result = await axios.get(apiUrl);
  
      if (type === "twopart") {
        const jokeSetup = result.data.setup;
        const jokeDelivery = result.data.delivery;
        const jokeText = `Q: ${jokeSetup}  \n REPLY: ${jokeDelivery}`;
        res.render("index.ejs", { content: jokeText });
      } else {
        const joke = result.data.joke;
        res.render("index.ejs", { content: joke });
      }
    } catch (error) {
      // Check if error.response exists before accessing data
      if (error.response) {
        console.error("API request failed:", error.response.data);
        res.render("index.ejs", { content: "An error occurred. Please try again." });
      } else {
        console.error("Other error:", error);
        res.render("index.ejs", { content: "An unexpected error occurred." });
      }
    }
  });
app.listen(port,()=>{
    console.log(`listening on port: ${port}`);
}) 