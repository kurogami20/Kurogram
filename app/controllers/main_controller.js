import postInfo from "../../data/posts.json" with { type: "json" };
import userInfo from "../../data/user_info.json" with { type: "json" };
import userInfoConnected from "../../data/user_info.json" with { type: "json" };

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
    const userPhoto = userInfoConnected.find((user)=> user.name===info.name);
    console.log(userPhoto.photo)
    console.log(userInfo)
    console.log(info)
    if (info.name===''||info.password===''){

      
     res.render("login",{
      userInfo,
      errorLog:"Veuillez bien renseigner tous les champs."
    })}
    else if(userInfoConnected.forEach(user=>user.name!==info.name||user.password!==info.password)){
      res.render("login",{
      userInfo,
      errorLog:"Mot de passe ou nom d'utilisateur incorrect "
    })
    }
    else{
      res.render("index",{
      postInfo,
     info,
     userPhoto : userPhoto.photo
    }
    ); }
    
    
  },
  displayAccount(req,res){
   const accountName= req.params.accountName
   const user = userInfo.find(user=>user.name===accountName)
   console.log(user)
res.render("account",{
     user,
    inAccount:"no photo",
     
    })
  }
};

export default controllersList;
