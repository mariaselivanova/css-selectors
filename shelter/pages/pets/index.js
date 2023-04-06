const popup = document.getElementById("popup");
const popupClose = document.getElementById("closeButton");
const page = document.querySelector(".page");
const pets = document.querySelectorAll(".ourfriends__card")

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
