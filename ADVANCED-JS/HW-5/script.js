class Card {
  constructor(post) {
    this.post = post;
  }

  create() {
    const card = document.createElement("div");
    card.className = "card";

    const profileContainer = document.createElement("div");
    profileContainer.className = "profileContainer";

    const imgContainer = document.createElement("div");
    imgContainer.className = "imgContainer";

    const img = document.createElement("img");
    img.className = "image";
    img.src =
      "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg";

    imgContainer.appendChild(img);

    profileContainer.appendChild(imgContainer);

    const userContainer = document.createElement("div");
    userContainer.className = "userContainer";

    const user = document.createElement("p");
    user.className = "user";
    user.textContent = this.post.user.name;

    userContainer.appendChild(user);

    const email = document.createElement("span");
    email.className = "email";
    email.textContent = this.post.user.email;

    userContainer.appendChild(email);
    profileContainer.appendChild(userContainer);

    const postTitle = document.createElement("h3");
    postTitle.className = "title";
    postTitle.textContent = this.post.title;

    const postText = document.createElement("p");
    postText.className = "text";
    postText.textContent = this.post.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-button";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => this.showConfirmationModal());

    card.appendChild(profileContainer);
    card.appendChild(postTitle);
    card.appendChild(postText);

    card.appendChild(deleteBtn);

    var removeLoading = document.getElementById("loading");
    removeLoading.style.display = "none";

    return card;
  }
  showConfirmationModal() {
    const confirmationModal = confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmationModal) {
      this.deletePost();
    }
  }

  deletePost() {
    fetch(`https://ajax.test-danit.com/api/json/posts/${this.post.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          this.deletePostContext();
        }
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  }

  deletePostContext() {
    const card = document.getElementById(`post-${this.post.id}`);
    if (card) {
      card.parentNode.removeChild(card);
    }
  }
}

function fetchAPIs() {
  Promise.all([
    fetch("https://ajax.test-danit.com/api/json/users"),
    fetch("https://ajax.test-danit.com/api/json/posts"),
  ])
    .then(([users, posts]) => Promise.all([users.json(), posts.json()]))
    .then(([users, posts]) => showPosts(users, posts))
    .catch((error) => {
      console.error("Error happened", error);
    });
}

function showPosts(users, posts) {
  const root = document.getElementById("feed");
  posts.forEach((post) => {
    const user = users.find((user) => user.id == post.userId);
    if (user) {
      const card = new Card({
        id: post.id,
        title: post.title,
        text: post.body,
        user: user,
      });
      const cardPost = card.create();
      cardPost.id = `post-${post.id}`;
      root.appendChild(cardPost);
    }
  });
}

function loading() {
  var load = document.getElementById("loading");
  var loading = document.createElement("div");
  loading.classList.add("loading");
  load.appendChild(loading);
}

loading();
fetchAPIs();
