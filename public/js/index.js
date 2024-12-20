let likes = 3000;
let userLike = 0;
let userBookmark = 0;
const post = document.querySelectorAll(".post");

const interactionSelector = post.forEach((post) => {
  // *éléments de l'évent
  const like = post.querySelector(".fa-heart");
  const bookMark = post.querySelector(".fa-bookmark");

  const likeNumbers = post.querySelector(".post_interaction_like_number");

  // *création de l'élément de validation du bookmark
  const enrOk = document.querySelector(".enr_ok");

  // *fonction event
  function clickInteraction() {
    like.addEventListener("click", clickedLike);
    bookMark.addEventListener("click", clickedBookMark);
  }
  clickInteraction();

  // *les différentes fonction de l'event
  function clickedLike(event) {
    if (userLike % 2 === 0) {
      userLike += 1;
      likes += 1;
      like.classList.remove("fa-regular");
      like.classList.add("fa-solid");
      like.style.color = "#ad0000";
      likeNumbers.textContent = `${likes} likes`;
      console.log("click");
      like.style.cursor = "pointer";
    } else {
      likes -= 1;
      userLike += 1;
      like.classList.add("fa-regular");
      like.classList.remove("fa-solid");
      like.style.color = "rgb(204, 204, 204)";
      likeNumbers.textContent = `${likes} likes`;
      console.log("click");
    }
  }
  function clickedBookMark(event) {
    if (userBookmark % 2 === 0) {
      userBookmark += 1;
      bookMark.classList.remove("fa-regular");
      bookMark.classList.add("fa-solid");
      bookMark.style.color = "rgb(204, 204, 204)";
      enrOk.style.display = "block";
      setTimeout(() => {
        enrOk.style.display = "none";
      }, 900);
      bookMark.style.cursor = "pointer";
    } else {
      userBookmark += 1;
      bookMark.classList.remove("fa-solid");
      bookMark.classList.add("fa-regular");
      bookMark.style.color = "rgb(204, 204, 204)";
    }
  }
});
