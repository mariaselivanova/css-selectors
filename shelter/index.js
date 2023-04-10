const page = document.querySelector(".page");

//контейнеры для карточек, стрелки
const currentCardContainer = document.querySelector(".current");
const nextCardContainer = document.querySelector(".next");
const pastCardContainer = document.querySelector(".previous");
const arrowLeft = document.querySelector(".ourfriends__arrow");
const arrowRight = document.querySelector(".ourfriends__arrow_right");

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
    let randomValue = Math.floor(Math.random() * 8);
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

//Инициализация слайдера
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

  return { pastArray, currentArray, nextArray };
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
  card.setAttribute("data-breed", data.breed);
  card.setAttribute("data-description", data.description);
  card.setAttribute("data-age", data.age);
  card.setAttribute("data-inoculations", data.inoculations);
  card.setAttribute("data-diseases", data.diseases);
  card.setAttribute("data-parasites", data.parasites);
  card.setAttribute("data-type", data.type);
  card.innerHTML = `<img class="ourfriends__img" src="${data.img}" alt=${data.name}>
  <h3 class="ourfriends__names">${data.name}</h3>
  <button type="button" class="ourfriends__link">Learn more</button>`;
  return card
}

// Отображение карточек на экране
function displayCards(data, currArr, pastArr, nextArr) {

  removeCards();

  const filteredCardsCurrent = data.filter((card, index) => {
    return currArr.includes(index);
  });
  const filteredCardsPast = data.filter((card, index) => {
    return pastArr.includes(index);
  });
  const filteredCardsNext = data.filter((card, index) => {
    return nextArr.includes(index);
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
arrowLeft.addEventListener("click", () => {
  arrowLeft.style.pointerEvents = 'none';
  arrowRight.style.pointerEvents = 'none';
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
        arrowLeft.style.pointerEvents = 'auto';
        arrowRight.style.pointerEvents = 'auto';
      });
  }, 1000);
});

arrowRight.addEventListener("click", () => {
  arrowLeft.style.pointerEvents = 'none';
  arrowRight.style.pointerEvents = 'none';
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
        arrowLeft.style.pointerEvents = 'auto';
        arrowRight.style.pointerEvents = 'auto';
      });
  }, 1000);
});

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

//возвращаем диапазон по ширине окна
function getRangeByWidth(width) {
  if (width >= 1280) {
    return 'desktop';
  } else if (width >= 768) {
    return 'tablet';
  } else {
    return 'mobile';
  }
}
let prevWindowWidth = window.innerWidth;
let currentRange;
currentRange = getRangeByWidth(prevWindowWidth);

window.addEventListener("resize", () => {
  const currentWindowWidth = window.innerWidth;
  const currentRangeWidth = getRangeByWidth(currentWindowWidth);

  if (currentRangeWidth !== currentRange) {
    currentRange = currentRangeWidth;
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
  }
});

// Инициализация слайдера
let { pastArr, currArr, nextArr } = init();

//Получаем карточки
fetch("./data.json")
  .then((res) => res.json())
  .then((cards) => {
    displayCards(cards, currArr, pastArr, nextArr);
  })

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

function scrollToAnchor(anchor) {
  const anchorElement = document.querySelector(anchor);
  if (anchorElement) {
    setTimeout(() => {
      anchorElement.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }
}
scrollToAnchor(".help");

console.log(
  `
  110/110
  1. Реализация burger menu на обеих страницах: +26
    -при ширине страницы меньше 768рх панель навигации скрывается, появляется бургер-иконка: +2
    -при нажатии на бургер-иконку, справа плавно появляется адаптивное меню шириной 320px, бургер-иконка плавно поворачивается на 90 градусов: +4
    -высота адаптивного меню занимает всю высоту экрана: +2
    -при повторном нажатии на бургер-иконку или на свободное от бургер-меню пространство адаптивное меню плавно скрывается уезжая за правую часть экрана, бургер-иконка плавно поворачивается на 90 градусов обратно: +4
    -бургер-иконка создана при помощи html+css, без использования изображений: +2
    -ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям, сохраняются заданные на первом этапе выполнения задания требования интерактивности элементов меню: +2
    -при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается вправо, бургер-иконка поворачивается на 90 градусов обратно: +2
    -бургер-меню соответствует макету (центрирование по вертикали и горизонтали элементов меню, расположение иконки). При этом на странице Pets цветовая схема может быть как темная, так и светлая: +2
    -область, свободная от бургер-меню, затемняется: +2
    -страница под бургер-меню не прокручивается: +4
  2. Реализация слайдера-карусели на странице Main: +36
    -при нажатии на стрелки происходит переход к новому блоку элементов: +4
    -смена блоков происходит с соответствующей анимацией карусели (способ выполнения анимации не проверяется): +4
    -слайдер бесконечен, т.е. можно бесконечно много нажимать влево или вправо, и каждый раз будет прокрутка в эту сторону с новым набором карточек: +4
    -при переключении влево или вправо прокручивается ровно столько карточек, сколько показывается при текущей ширине экрана (3 для 1280px, 2 для 768px, 1 для 320px): +4
    -каждый новый слайд содержит псевдослучайный набор карточек животных, т.е. формируется из исходных объектов в случайном порядке со следующими условиями:
    -в текущем блоке слайда карточки с питомцами не повторяются: +4
    -в следующем блоке нет дублирования карточек с текущим блоком. Например в слайдере из 3 элементов, следующий выезжающий слайд будет содержать 3 (из 8 доступных) новых карточки питомца, таких, каких не было среди 3х карточек на предыдущем уехавшем слайде: +4
    -сохраняется только одно предыдущее состояние. Т.е. при последовательном переходе два раза влево, а потом два раза вправо, мы получим набор карточек, отличный от исходного: +4
    -при каждой перезагрузке страницы формируется новая последовательность карточек: +2
    -генерация наборов карточек происходит на основе 8 объектов с данными о животными: +2
    -при изменении ширины экрана (от 1280px до 320px и обратно), слайдер перестраивается и работает без перезагрузки страницы: +4
  3. Реализация пагинации на странице Pets: +36
    -при перезагрузке страницы всегда открывается первая страница пагинации: +2
    -при нажатии кнопок > или < открывается следующая или предыдущая страница пагинации соответственно: +2
    -при нажатии кнопок >> или << открывается последняя или первая страница пагинации соответственно: +2
    -при открытии первой страницы кнопки << и < неактивны: +2
    -при открытии последней страницы кнопки > и >> неактивны: +2
    -в кружке по центру указан номер текущей страницы. При переключении страниц номер меняется на актуальный: +2
    -каждая страница пагинации содержит псевдослучайный набор питомцев, т.е. формируется из исходных объектов в случайном порядке со следующими условиями:
    -при загрузке страницы формируется массив из 48 объектов питомцев. Каждый из 8 питомцев должен встречаться ровно 6 раз: +4
    -при каждой перезагрузке страницы формируется новый массив со случайной последовательностью: +4
    -карточки питомцев не должны повторяться на одной странице: +4
    -при переключении страницы данные меняются (для >1280px меняется порядок карточек, для остальных - меняется набор и порядок карточек): +4
    -при неизменных размерах области пагинации, в том числе размерах окна браузера, и без перезагрузки страницы, возвращаясь на страницу под определенным номером, контент на ней всегда будет одинаков. Т.е. карточки питомцев будут в том же расположении, что и были до перехода на другие страницы: +2
    -общее количество страниц при ширине экрана 1280px - 6, при 768px - 8, при 320px - 16 страниц: +2
    -при изменении ширины экрана (от 1280px до 320px и обратно), пагинация перестраивается и работает без перезагрузки страницы: +4
  4. Реализация попап на обеих страницах: +12
    -попап появляется при нажатии на любое место карточки с описанием конкретного животного: +2
    -часть страницы вне попапа затемняется: +2
    -при открытии попапа вертикальный скролл страницы становится неактивным, при закрытии - снова активным: +2
    -при нажатии на область вокруг попапа или на кнопку с крестиком попап закрывается, при этом при нажатии на сам попап ничего не происходит: +2
    -кнопка с крестиком интерактивная: +2
    -окно попапа (не считая кнопку с крестиком) центрировано по всем осям, размеры элементов попапа и их расположение совпадают с макетом: +2
  `
)
