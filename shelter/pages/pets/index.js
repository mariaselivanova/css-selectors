const page = document.querySelector(".page");

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

//пагинация
const firstPageBtn = document.getElementById("first");
const prevPageBtn = document.getElementById("prev");
const currentPage = document.getElementById("current-page");
const nextPageBtn = document.getElementById("next");
const lastPageBtn = document.getElementById("last");
const cardContainer = document.querySelector(".ourfriends__cards");
let currentPageNum = 1;
let totalPages;
let mappedArr;

//ПАГИНАЦИЯ

//Генерируем массив со случайным набором чисел от 0 до 7
function generateArray() {
  let newArr = [];
  while (newArr.length < 8) {
    let randomValue = Math.floor(Math.random() * 8);
    if (!newArr.includes(randomValue)) {
      newArr.push(randomValue);
    }
  }
  return newArr;
}

//Нарезаем массив из 8 элементов
function cutArray(arr) {
  let firstSubArr = [];
  let secondSubArr = [];
  let thirdSubArr = [];
  firstSubArr = arr.slice(0, 3);
  secondSubArr = arr.slice(3, 6);
  thirdSubArr = arr.slice(6, 8);
  return { firstSubArr, secondSubArr, thirdSubArr }
}

//Модифицируем каждый субмассив
function modifySubArr(subArr) {
  let randomNumber;
  if (subArr.length === 2) {
    randomNumber = Math.floor(Math.random() * 2);
    switch (randomNumber) {
      case 0:
        return [subArr[0], subArr[1]];
      case 1:
        return [subArr[1], subArr[0]];
    }
  } else if (subArr.length === 3) {
    randomNumber = Math.floor(Math.random() * 6);
    switch (randomNumber) {
      case 0:
        return [subArr[0], subArr[1], subArr[2]];
      case 1:
        return [subArr[0], subArr[2], subArr[1]];
      case 2:
        return [subArr[1], subArr[0], subArr[2]];
      case 3:
        return [subArr[1], subArr[2], subArr[0]];
      case 4:
        return [subArr[2], subArr[0], subArr[1]];
      case 5:
        return [subArr[2], subArr[1], subArr[0]];
    }
  }
  return subArr;
}

//Сборка финального массива
function makeFinalArr(firstSubArr, secondSubArr, thirdSubArr) {
  let finalArr = [];
  for (let i = 0; i < 6; i++) {
    finalArr.push(...modifySubArr(firstSubArr));
    finalArr.push(...modifySubArr(secondSubArr));
    finalArr.push(...modifySubArr(thirdSubArr));
  }
  return finalArr
}

//Считаем количество страниц пагинации при разных разрешениях
function getPageNum() {
  const width = window.innerWidth;
  if (width >= 1280) {
    return 6
  } else if (width >= 768) {
    return 8
  }
  return 16
}

//Считаем количество отображаемых карточек при определенном количестве страниц
function getCardsNum(pageNum) {
  if (pageNum === 6) {
    return 8
  } else if (pageNum === 8) {
    return 6
  }
  return 3
}

//Обновляем кнопки
function updateButtons() {
  currentPage.innerHTML = currentPageNum;

  if (currentPageNum === 1) {
    firstPageBtn.disabled = true;
    prevPageBtn.disabled = true;
  } else {
    firstPageBtn.disabled = false;
    prevPageBtn.disabled = false;
  }

  if (currentPageNum === totalPages) {
    nextPageBtn.disabled = true;
    lastPageBtn.disabled = true;
  } else {
    nextPageBtn.disabled = false;
    lastPageBtn.disabled = false;
  }
}

//Отрисовка карточек
function displayCards(cards) {
  cards.forEach((cardData) => {
    const card = document.createElement("article");
    card.classList.add("ourfriends__card");
    card.setAttribute("data-breed", cardData.breed);
    card.setAttribute("data-description", cardData.description);
    card.setAttribute("data-age", cardData.age);
    card.setAttribute("data-inoculations", cardData.inoculations);
    card.setAttribute("data-diseases", cardData.diseases);
    card.setAttribute("data-parasites", cardData.parasites);
    card.setAttribute("data-type", cardData.type);
    card.innerHTML = `<img class="ourfriends__img" src="${cardData.img}" alt=${cardData.name}>
    <h3 class="ourfriends__names">${cardData.name}</h3>
    <button type="button" class="ourfriends__link">Learn more</button>`;
    cardContainer.append(card);
  });
  addCardEventListeners()
}

//Обновление страницы
function updatePage() {

  const pageNum = getPageNum();
  const cardsNum = getCardsNum(pageNum);

  totalPages = pageNum;

  const startIndex = (currentPageNum - 1) * cardsNum;
  const endIndex = startIndex + cardsNum;
  const currentCards = mappedArr.slice(startIndex, endIndex);
  cardContainer.innerHTML = '';

  displayCards(currentCards);
  updateButtons();
}

//Формируем массив из 48 элементов
const subArrays = cutArray(generateArray());
const result = makeFinalArr(subArrays.firstSubArr, subArrays.secondSubArr, subArrays.thirdSubArr);

//Получаем карточки
fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    mappedArr = result.map((item) => item = data[item]);
    updatePage();
  });

firstPageBtn.addEventListener('click', () => {
  currentPageNum = 1;
  updatePage();
});

prevPageBtn.addEventListener('click', () => {
  currentPageNum -= 1;
  updatePage();
});

nextPageBtn.addEventListener('click', () => {
  currentPageNum += 1;
  updatePage();
});

lastPageBtn.addEventListener('click', () => {
  currentPageNum = totalPages;
  updatePage();
});

//Возвращаем диапазон по ширине окна
function getRangeByWidth(width) {
  if (width >= 1280) {
    return 'desktop';
  } else if (width >= 768) {
    return 'tablet';
  } else {
    return 'mobile';
  }
}

//Обновляем номер страницы
function resetCurrentPage() {
  const newTotalPages = getPageNum();
  if (currentPageNum > newTotalPages) {
    currentPageNum = newTotalPages;
  }
}

let prevWindowWidth = window.innerWidth;
let prevRange = getRangeByWidth(prevWindowWidth);

//Обработчик события resize
window.addEventListener("resize", () => {
  const currentWindowWidth = window.innerWidth;
  const currentRangeWidth = getRangeByWidth(currentWindowWidth);

  if (currentRangeWidth !== prevRange) {
    resetCurrentPage();
    prevRange = currentRangeWidth;
    updatePage();
    prevWindowWidth = currentWindowWidth;
  }
});

//ПОПАП
function addCardEventListeners() {
  const cards = document.querySelectorAll(".ourfriends__card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const cardTitle = card.querySelector('.ourfriends__names')
      const cardPhoto = card.querySelector('.ourfriends__img')
      const breed = card.getAttribute("data-breed");
      const description = card.getAttribute("data-description");
      const title = cardTitle.textContent
      const img = cardPhoto.src
      const age = card.getAttribute("data-age");
      const inoculations = card.getAttribute("data-inoculations")
      const diseases = card.getAttribute("data-diseases")
      const parasites = card.getAttribute("data-parasites")
      const type = card.getAttribute("data-type")

      showPopup(title, breed, description, img, age, inoculations, diseases, parasites, type);
    });
  });
}

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
