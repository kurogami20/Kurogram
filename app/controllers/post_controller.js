import userInfo from "../../data/user_info.json" with { type: "json" };
import fs from "node:fs"


const controllersPostList = {

// *publication d'image
displayPublication(req,res){
   const userName= req.params.userName
  const info = userInfo.find((user)=>user.name===userName)
  res.render("publication",{
    stylePublicate:"css",
    info
  })
},
handlePublication(req,res){
  const userName= req.params.userName
  const info = userInfo.find((user)=>user.name===userName)
const publiPhoto = req.body

if (publiPhoto.post!== ""){
const number = userInfo.find((user)=>user.name===userName)

number.publication++
// *On récupère les donnée du nouveau post
const newpost ={
"user_photo":info.photo,
"user_name":info.name,
"user_post":publiPhoto.post,
"user_description":publiPhoto.description
}
 // *on récupère le chemin vers le fichier des données posts
const filePath ="/var/www/html/sigurd/Kurogram/data/posts.json"

// *on récupère le fichier de données
const postData =fs.readFileSync(filePath)
// **on transforme le fichier de donées en tableau
const  postData2 = JSON.parse(postData)
// *on ajoute les données du nouvel utilisateur (au début)
postData2.unshift(newpost)
// *on transforme le tableau en JSON string
const newpostJsonData = JSON.stringify(postData2, null, 2)
// *on ajoute JSON string dans le fichier de donnée post
try {
  fs.writeFileSync(filePath, newpostJsonData);
  console.log('JSON data saved to file successfully.');
} catch (error) {
  console.error('Error writing JSON data to file:', error);
}








res.redirect(`/connected/${info.name}`)  
}
  else{
    res.render("publication",{
    stylePublicate:"css",
    info,
    errorLog:"Veuillez mettre une image."
  })
  }
}
};

export default controllersPostList;
