import postInfo from "../../data/posts.json" with { type: "json" };
import userInfo from "../../data/user_info.json" with { type: "json" };
import userInfoConnected from "../../data/user_info.json" with { type: "json" };
import userInfoTemp from "../../data/temporary.json" with { type: "json" };

const controllersList = {
  displayHome(req, res) {
    res.render("index",{
      postInfo
    });

  },
  displaylogin(req,res){
    res.render("login",{
      userInfo
    })
  },


  displayHomeConnected(req,res){
    
    const info = req.body
// userInfoTemp.push(info)
// console.log(userInfoTemp)
    // const user = userInfoConnected.find((user)=> user.name===info.name || user.password===info.password);


    // console.log(userPhoto.photo)
    // console.log(userInfo)
    console.log(info)
    console.log(info.password)
    // console.log(user.name)

    
    if (info.name===''||info.password===''||info===""){
     res.render("login",{
      userInfo,
      errorLog:"Veuillez bien renseigner tous les champs."
    })}
    else if(userInfoConnected.find((user)=> user.name!==info.name&&user.password===info.password || user.name===info.name&& user.password!==info.password)){
      res.render("login",{
      userInfo,
      errorLog:"Mot de passe ou nom d'utilisateur incorrect "
    })
    }
    else if(userInfoConnected.find((user)=> user.name!==info.name && user.password!==info.password)){
      res.render("login",{
      userInfo,
      errorLog:"Compte inexistant "
    })
    }
    else if (info.name===user.name&&info.password===user.password){
    res.render("index",{
     postInfo,
     info,
     userPhoto : user.photo
    })
    }
    // else {
    //  res.render("login",{
    //   userInfo,
    //   errorLog:"Compte inexistant "
    // })
    //  }
  },
//   displayIndexConnected(req,res){
//     const info = userInfoTemp
//      console.log(info)
//      const userPhoto = userInfoConnected.find((user)=> user.name===info.name);
//    res.render("index",{
//      postInfo,
//      info,
//      userPhoto : userPhoto.photo
//     }
//     ); 
// },
  displayAccount(req,res){
   const accountName= req.params.accountName
   const user = userInfo.find(user=>user.name===accountName)
   console.log(user)
res.render("account",{
     user,
    inAccount:"no photo",
     
    })
  },

displayCreateAccount(req,res){
  res.render("create_account",
   { create:"css"}
  )
},

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


};

export default controllersList;
