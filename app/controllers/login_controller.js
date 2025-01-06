import postInfo from "../../data/posts.json" with { type: "json" };
import userInfo from "../../data/user_info.json" with { type: "json" };
import userInfoConnected from "../../data/user_info.json" with { type: "json" };
import fs from "node:fs"

const controllerLogList = {

  // *affichage de la page de login
  displaylogin(req,res){
    res.render("login",{
      userInfo
    })
  },

// *vérifivation des information du formulaire de login
  checkLogin(req,res,next){
    
    function log (){
      const info = req.body;
      

      // *on vérifie si l'utilisateur a bien rempli tous les champs

    if (info.name===''||info.password===''||info===""){
     res.render("login",{
      userInfo,
      errorLog:"Veuillez bien renseigner tous les champs."
      
    })
  return}

  // *on vérifie si l'utilisateur a bien remplis les bonnes informations

    else if(userInfoConnected.find((user)=> user.name!==info.name&&user.password===info.password || user.name===info.name&& user.password!==info.password)){
      res.render("login",{
      userInfo,
      errorLog:"Mot de passe ou nom d'utilisateur incorrect "
    })
   return}

   // *on envoie l'utilisateur sur la page d'accueil si toutes les informations sont justes

    else if(userInfoConnected.find((user)=> user.name.includes(info.name) && user.password.includes(info.password))){
        const user = userInfoConnected.find((user)=> user.name===info.name || user.password===info.password);

// console.log(userInfoTemp)
    // res.render("index_connected",{
    //  postInfo,
    //  info,
    //  userPhoto : user.photo
    // })
    // res.redirect("/connected")
     
   res.redirect(`/connected/${user.name}`)}

  //* si aucune des situations ci-dessus ne fonctionnent on renvoit ce message 

    else {
         res.render("login",{
      userInfo,
      errorLog:"Compte inexistant "
    })
   return}}
    log()
    
  },

  // *page d'accueil quand l'utilisateur est connecté
displayHomeConnected(req,res){
const userName = req.params.userName
const info = userInfo.find((user)=>user.name===userName)
console.log(info)
console.log(userName)

  res.render("index_connected",{
    postInfo,
    connected:"link",
    userName:userName,
    info
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
