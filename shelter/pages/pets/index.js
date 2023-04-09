const page = document.querySelector(".page");

//попап
const popup = document.getElementById("popup");
const popupClose = document.getElementById("closeButton");
const popupTitle = popup.querySelector(".popup__title");
const popupName = popup.querySelector(".popup__name");
const popupParagraph = popup.querySelector(".popup__paragraph");
const popupPhoto = popup.querySelector(".popup__photo");
const popupAge = popup.querySelector(".popup__list-definition_age")
const popupInoculations = popup.querySelector(".popup__list-definition_inoculations")
const popupDiseases = popup.querySelector(".popup__list-definition_diseases")
const popupParasites = popup.querySelector(".popup__list-definition_parasites")

//бургер
const burgerIcon = document.querySelector(".header__burger");
const burgerNav = document.querySelector(".header__burger-nav");
const menuItems = document.querySelectorAll(".header__burger-item");

function addCardEventListeners() {
  const cards = document.querySelectorAll(".ourfriends__card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const cardTitle = card.querySelector('.ourfriends__names')
      const cardPhoto = card.querySelector('.ourfriends__img')
      const bread = card.getAttribute("bread");
      const description = card.getAttribute("description");
      const title = cardTitle.textContent
      const img = cardPhoto.src
      const age = card.getAttribute("age");
      const inoculations = card.getAttribute("inoculations")
      const diseases = card.getAttribute("diseases")
      const parasites = card.getAttribute("parasites")

      showPopup(title, bread, description, img, age, inoculations, diseases, parasites);
    });
  });
}

function showPopup(title, bread, description, img, age, inoculations, diseases, parasites) {
  popupTitle.textContent = title;
  popupName.textContent = bread;
  popupParagraph.innerHTML = description;
  popupPhoto.alt = title
  popupPhoto.src = img
  popupAge.textContent = age
  popupDiseases.textContent = diseases
  popupParasites.textContent = parasites
  popupInoculations.textContent = inoculations
  popup.classList.add("popup_open");
  page.style.overflow = 'hidden'
}

function closePopup() {
  popup.classList.remove("popup_open");
  page.style.overflow = 'visible'
}

popupClose.addEventListener("click", closePopup);
popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    closePopup();
  }
});

//БУРГЕР
function toggleBurgerMenu() {
  page.classList.toggle("page_no-scroll");
  burgerIcon.classList.toggle("header__burger_active");
  burgerNav.classList.toggle("header__burger-nav_active");

  if (burgerNav.classList.contains("header__burger-nav_active")) {
    document.addEventListener("click", handleClickOutsideMenu);
  } else {
    document.removeEventListener("click", handleClickOutsideMenu);
  }
}

burgerIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleBurgerMenu();
});

menuItems.forEach(menuItem => {
  menuItem.addEventListener("click", toggleBurgerMenu);
});

function handleClickOutsideMenu(event) {
  if (!burgerNav.contains(event.target) && event.target !== burgerIcon) {
    toggleBurgerMenu();
  }
}
