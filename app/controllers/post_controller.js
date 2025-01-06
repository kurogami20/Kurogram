import userInfo from "../../data/user_info.json" with { type: "json" };
import posts from "../../data/posts.json" with { type: "json" };


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

export default controllersPostList;
