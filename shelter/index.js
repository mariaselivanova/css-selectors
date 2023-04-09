//TODO:
//слайдер - сделать адапттив
const page = document.querySelector(".page");

//контейнеры для карточек
const currentCardContainer = document.querySelector(".current");
const nextCardContainer = document.querySelector(".next");
const pastCardContainer = document.querySelector(".previous");

//попап
const popup = document.getElementById("popup");
const popupClose = document.getElementById("closeButton");
const popupTitle = popup.querySelector(".popup__title");
const popupName = popup.querySelector(".popup__name");
const popupParagraph = popup.querySelector(".popup__paragraph");
const popupPhoto = popup.querySelector(".popup__photo");
const popupAge = popup.querySelector(".popup__list-definition_age");
const popupInoculations = popup.querySelector(".popup__list-definition_inoculations");
const popupDiseases = popup.querySelector(".popup__list-definition_diseases");
const popupParasites = popup.querySelector(".popup__list-definition_parasites");
const popupType = popup.querySelector(".popup__type");

//бургер
const burgerIcon = document.querySelector(".header__burger");
const burgerNav = document.querySelector(".header__burger-nav");
const menuItems = document.querySelectorAll(".header__burger-item");

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

//Слайдер

//Получаем карточки
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    displayCards(data, currArr, pastArr, nextArr);
  })

//Сколько карточек отображать
function calculateCardAmount() {
  const width = window.innerWidth;
  if (width >= 1280) {
    return 3;
  } else if (width < 1280 && width >= 768) {
    return 2;
  } else if (width < 768 && width >= 320) {
    return 1;
  }
  return 0;
}

//Генерируем массив, отличный от данного
function generateArray(arr, numOfCards) {
  let newArr = [];
  while (newArr.length < numOfCards) {
    let randomValue = Math.floor(Math.random() * 8) + 1;
    if (!arr.includes(randomValue) && !newArr.includes(randomValue)) {
      newArr.push(randomValue);
    }
  }
  return newArr;
}

//Возвращаем пустой массив
function clearArray(arr) {
  return [];
}

// Инициализация слайдера
function init() {
  let cardAmount = calculateCardAmount();
  let pastArr = [];
  let currArr = [];
  let nextArr = [];

  nextArr = generateArray(currArr, cardAmount);
  currArr = nextArr.slice();
  nextArr = clearArray(nextArr);
  nextArr = generateArray(currArr, cardAmount);
  pastArr = currArr.slice();
  currArr = nextArr.slice();
  nextArr = clearArray(nextArr);
  nextArr = generateArray(currArr, cardAmount);

  return { pastArr, currArr, nextArr };
}

//Прокрутка вправо
function forward(pastArray, currentArray, nextArray) {
  let cardAmount = calculateCardAmount();
  pastArray = clearArray(pastArray);
  pastArray = currentArray.slice();
  currentArray = nextArray.slice();
  nextArray = clearArray(nextArray);
  nextArray = generateArray(currentArray, cardAmount);

  return { pastArray, currentArray, nextArray};
}

//Прокрутка влево
function backward(pastArray, currentArray, nextArray) {
  let cardAmount = calculateCardAmount();
  nextArray = clearArray(nextArray);
  nextArray = currentArray.slice();
  currentArray = pastArray.slice();
  pastArray = clearArray(pastArray);
  pastArray = generateArray(currentArray, cardAmount);

  return { pastArray, currentArray, nextArray };
}

//Удаление карточек
function removeCards() {
  const cards = document.querySelectorAll(".ourfriends__card")
  cards.forEach(card => {
    card.remove();
  });
}

//Отображение карточек на слайде
function displaySlide(data) {
  const card = document.createElement("article");
  card.classList.add("ourfriends__card");
  card.setAttribute("breed", data.breed);
  card.setAttribute("description", data.description);
  card.setAttribute("age", data.age);
  card.setAttribute("inoculations", data.inoculations);
  card.setAttribute("diseases", data.diseases);
  card.setAttribute("parasites", data.parasites);
  card.setAttribute("type", data.type);
  card.innerHTML = `<img class="ourfriends__img" src="${data.img}" alt=${data.name}>
  <h3 class="ourfriends__names">${data.name}</h3>
  <button type="button" class="ourfriends__link">Learn more</button>`;
  return card
}

// Отображение карточек на экране
function displayCards(data, currArr, pastArr, nextArr) {

  removeCards();

  const changedIndexesCurrent = currArr.map((num) => num - 1);
  const changedIndexesPast = pastArr.map((num) => num - 1);
  const changedIndexesNext = nextArr.map((num) => num - 1);

  const filteredCardsCurrent = data.filter((card, index) => {
    return changedIndexesCurrent.includes(index);
  });
  const filteredCardsPast = data.filter((card, index) => {
    return changedIndexesPast.includes(index);
  });
  const filteredCardsNext = data.filter((card, index) => {
    return changedIndexesNext.includes(index);
  });

  filteredCardsCurrent.forEach((item) => {
    currentCardContainer.appendChild(displaySlide(item));
  });
  filteredCardsPast.forEach((item) => {
    pastCardContainer.appendChild(displaySlide(item));
  })
  filteredCardsNext.forEach((item) => {
    nextCardContainer.appendChild(displaySlide(item));
  });
  addCardEventListeners();
}

// Обработка нажатий на стрелки
document.querySelector(".ourfriends__arrow").addEventListener("click", () => {
  currentCardContainer.style.transition = `transform 1s ease`;
  pastCardContainer.style.transition = `transform 1s ease`;
  if (window.innerWidth >= 1280) {
    currentCardContainer.style.transform = `translateX(109%)`;
    pastCardContainer.style.transform = `translateX(109%)`;
  } else if (window.innerWidth < 1280 && window.innerWidth >= 768) {
    currentCardContainer.style.transform = `translateX(107%)`;
    pastCardContainer.style.transform = `translateX(107%)`;
  } else {
    currentCardContainer.style.transform = `translateX(115%)`;
    pastCardContainer.style.transform = `translateX(115%)`;
  }

  setTimeout(() => {
    let backwardResult = backward(pastArr, currArr, nextArr);
    pastArr = backwardResult.pastArray;
    currArr = backwardResult.currentArray;
    nextArr = backwardResult.nextArray;
    fetch("./data.json")
      .then((res) => res.json())
      .then((cards) => {
        displayCards(cards, currArr, pastArr, nextArr);
        currentCardContainer.style.transition = `none`;
        pastCardContainer.style.transition = `none`;
        currentCardContainer.style.transform = `initial`;
        pastCardContainer.style.transform = `initial`;
      });
  }, 1000);
});

document.querySelector(".ourfriends__arrow_right").addEventListener("click", () => {
  currentCardContainer.style.transition = `transform 1s ease`;
  nextCardContainer.style.transition = `transform 1s ease`;

  if (window.innerWidth >= 1280) {
    currentCardContainer.style.transform = `translateX(-109%)`;
    nextCardContainer.style.transform = `translateX(-109%)`;
  } else if (window.innerWidth < 1280 && window.innerWidth >= 768) {
    currentCardContainer.style.transform = `translateX(-107%)`;
    nextCardContainer.style.transform = `translateX(-107%)`;
  } else {
    currentCardContainer.style.transform = `translateX(-115%)`;
    nextCardContainer.style.transform = `translateX(-115%)`;
  }

  setTimeout(() => {
    let forwardResult = forward(pastArr, currArr, nextArr);
    pastArr = forwardResult.pastArray;
    currArr = forwardResult.currentArray;
    nextArr = forwardResult.nextArray;
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        displayCards(data, currArr, pastArr, nextArr);
        currentCardContainer.style.transition = `none`;
        nextCardContainer.style.transition = `none`;
        currentCardContainer.style.transform = `initial`;
        nextCardContainer.style.transform = `initial`;
      });
  }, 1000);
});

function addCardEventListeners() {
  const cards = document.querySelectorAll(".ourfriends__card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const cardTitle = card.querySelector('.ourfriends__names')
      const cardPhoto = card.querySelector('.ourfriends__img')
      const breed = card.getAttribute("breed");
      const description = card.getAttribute("description");
      const title = cardTitle.textContent
      const img = cardPhoto.src
      const age = card.getAttribute("age");
      const inoculations = card.getAttribute("inoculations")
      const diseases = card.getAttribute("diseases")
      const parasites = card.getAttribute("parasites")
      const type = card.getAttribute("type")

      showPopup(title, breed, description, img, age, inoculations, diseases, parasites, type);
    });
  });
}

let prevWindowWidth = window.innerWidth;
let resizeTimeout;

window.addEventListener("resize", () => {
  const currentWindowWidth = window.innerWidth;
  if (currentWindowWidth !== prevWindowWidth) {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      let newSlide = init();
      pastArr = newSlide.pastArr;
      currArr = newSlide.currArr;
      nextArr = newSlide.nextArr;
      fetch("./data.json")
        .then((response) => response.json())
        .then((data) => {
          displayCards(data, currArr, pastArr, nextArr);
        });
      prevWindowWidth = currentWindowWidth;
    }, 200);
  }
});

// Инициализация слайдера
let { pastArr, currArr, nextArr } = init();

//ПОПАП
function showPopup(title, breed, description, img, age, inoculations, diseases, parasites, type) {
  popupTitle.textContent = title;
  popupName.textContent = breed;
  popupParagraph.textContent = description;
  popupPhoto.alt = title;
  popupPhoto.src = img;
  popupAge.textContent = age;
  popupDiseases.textContent = diseases;
  popupParasites.textContent = parasites;
  popupInoculations.textContent = inoculations;
  popupType.textContent = type
  popup.classList.add("popup_open");
  page.style.overflow = 'hidden';
}

function closePopup() {
  popup.classList.remove("popup_open");
  page.style.overflow = 'visible';
}

popupClose.addEventListener("click", closePopup);

popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    closePopup();
  }
});
