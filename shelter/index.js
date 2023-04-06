const cardsContainer = document.querySelector(".ourfriends__cards");
const popup = document.getElementById("popup");
const popupClose = document.getElementById("closeButton");
const page = document.querySelector(".page");

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const slicedData = data.slice(0, 3)
    slicedData.forEach((item) => {
      const card = document.createElement("article");
      card.classList.add("ourfriends__card");
      card.setAttribute("bread", item.breed);
      card.setAttribute("description", item.description);
      card.setAttribute("age", item.age);
      card.setAttribute("inoculations", item.inoculations)
      card.setAttribute("diseases", item.diseases)
      card.setAttribute("parasites", item.parasites)
      card.innerHTML = `<img class="ourfriends__img" src="${item.img}" alt=${item.name}>
      <h3 class="ourfriends__names">${item.name}</h3>
      <button type="button" class="ourfriends__link">Learn more</button>`;

      cardsContainer.appendChild(card);
    });
    addCardEventListeners();
  });

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
  const popupTitle = popup.querySelector(".popup__title");
  const popupName = popup.querySelector(".popup__name");
  const popupParagraph = popup.querySelector(".popup__paragraph");
  const popupPhoto = popup.querySelector(".popup__photo");
  const popupAge = popup.querySelector(".popup__list-definition_age")
  const popupInoculations = popup.querySelector(".popup__list-definition_inoculations")
  const popupDiseases = popup.querySelector(".popup__list-definition_diseases")
  const popupParasites = popup.querySelector(".popup__list-definition_parasites")
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

//Бургер-меню

const burgerIcon = document.querySelector(".header__burger");
const burgerNav = document.querySelector(".header__burger-nav");

function toggleBurgerMenu() {
  page.classList.toggle("page_no-scroll");
  burgerIcon.classList.toggle("header__burger_active");
  burgerNav.classList.toggle("header__burger-nav_active");
}

 burgerIcon.addEventListener("click", toggleBurgerMenu)
