const burger = document.querySelector(".burger-menu");
burger.addEventListener("click", function () {
  const burgerIcon = document.querySelector("#menu-icon");
  burgerIcon.classList.toggle("fa-times");

  const mobileMenu = document.querySelector(".drop-menu");
  mobileMenu.classList.toggle("open");
});
