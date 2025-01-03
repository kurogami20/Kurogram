import postInfo from "../../data/posts.json" with { type: "json" };
import userInfo from "../../data/user_info.json" with { type: "json" };
import userInfoConnected from "../../data/user_info.json" with { type: "json" };
import posts from "../../data/posts.json" with { type: "json" };


const controllersList = {
  // *affichage de la page d'accueil
  displayHome(req, res) {
    res.render("index",{
      postInfo
    });

  },
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

  

userInfo.push(
  {
    "name": info.name,
    "password":info.password,
    "photo": info.photo,
    "publication": 0,
    "followers": 0,
    "followings": 0
  }
)
console.log(userInfo)
      res.redirect("/login")
    }
    
},
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
info.publication=+1
posts.unshift({
"user_photo":info.photo,
"user_name":info.name,
"user_post":publiPhoto.post,
"user_description":publiPhoto.description
}


)
  // res.render("index_connected",{
  //   postInfo, connected:"link",
  //   userName:userName,
  //   info
  // })
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

export default controllersList;
