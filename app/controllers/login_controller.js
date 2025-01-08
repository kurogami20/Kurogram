import postInfo from "../../data/posts.json" with { type: "json" };
import userInfo from "../../data/user_info.json" with { type: "json" };
import userInfoConnected from "../../data/user_info.json" with { type: "json" };
import fs from "node:fs"
import user_info from "../../data/connect.js"
import allPost from "../../data/connect.js";



const controllerLogList = {

  // *affichage de la page de login
  displaylogin(req,res){
    res.render("login",{
      userInfo
    })
  },

// *vérifivation des information du formulaire de login
   checkLogin(req,res,next){
    
   async function log (){
    // *on récupère les donnée de user
      const info = req.body;

      // *On vérifie les donnée par rapport a la db
      const namePass = await user_info.query(`select name from all_user_info where name='${info.name}' and password='${info.password}' `)
     
   
      try{
        // *si username a une valeur on connecte l'user
     const userNameDb = namePass.rows[0].name
res.redirect(`/connected/${userNameDb}`)
   }catch(error){

    // *message d'erreur
     if (info.name===''||info.password===''||info===""){
      
     res.render("login",{
      userInfo,
      errorLog:"Veuillez bien renseigner tous les champs." 
    })
     
   }else {
      res.render("login",{
      userInfo,
      errorLog:"Mot de passe et/ou nom d'utilisateur incorrect "
    })
   return}
  
  }
    
}
    log()
    
  },

  // *page d'accueil quand l'utilisateur est connecté
async displayHomeConnected(req,res){
const userName = req.params.userName

const info = await user_info.query(`select * from "all_user_info" where "name"='${userName}';`)
const infoPost = await allPost.query('select * from "post_info";');

console.log(userName)

  res.render("index_connected",{
    postInfo:infoPost.rows,
    connected:"link",
    userName:userName,
    info:info.rows[0]
  })
},
// *page du compte de l'utilisateur
  displayAccount(req,res){
   const accountName= req.params.accountName
   const user = userInfo.find(user=>user.name===accountName)
   console.log(user)
res.render("account",{
     user,
    inAccount:"no photo",
     
    })
  },
// *page de création de compte
displayCreateAccount(req,res){
  res.render("create_account",
   { create:"css"}
  )
},
// *vérifivation des information du formulaire de création de compte
displayCreateAccountverify(req,res){
const info = req.body
    console.log(info)
    if (info.name===''||info.password===''){

      
     res.render("create_account",{
      userInfo,
      create:"css",
      errorLog:"Veuillez bien renseigner tous les champs obligatoires."
    })}
   
    else{

// * on récupère les donnée fournie dans un objet
const newUser = 

  {
    "name": info.name,
    "password":info.password,
    "photo": info.photo,
    "publication": 0,
    "followers": 0,
    "followings": 0
  }
// *on récupère le chemin vers le fichier des données utilisateurs
const filePath ="/var/www/html/sigurd/Kurogram/data/user_info.json"

// *on récupère le fichier de donné es
const userData =fs.readFileSync(filePath)
// **on transforme le fichier de donées en tableau
const  userData2 = JSON.parse(userData)
// *on ajoute les données du nouvel utilisateur (au début)
userData2.unshift(newUser)
// *on transforme le tableau en JSON string
const newUserJsonData = JSON.stringify(userData2, null, 2)
// *on ajoute JSON string dans le fichier de donnée utilisateur
try {
  fs.writeFileSync(filePath, newUserJsonData);
  console.log('JSON data saved to file successfully.');
} catch (error) {
  console.error('Error writing JSON data to file:', error);
}

res.redirect("/login")
    }
    
},
}

export default controllerLogList;
