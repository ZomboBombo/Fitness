'use strict';

/*
===================================================================================================================================
-------------------------------------------- Модуль маски ввода номера телефона: НАЧАЛО -------------------------------------------
===================================================================================================================================
*/
window.maskForInputs = (() => {
  // ---------- КОНСТАНТЫ -----------
  const MIN_PHONE_LENGHT = 11;
  const EMPTY = '';

  // *** Словарь языковых аббревиатур ***
  const LanguageAbbr = {
    RU: 'ru',
    ru_RU: 'ru-RU',
    EN: 'en',
    en_US: 'en-US',
    en_GB: 'en-GB',
  };

  // *** Словарь сообщений валидации полей Формы ***
  const ValidityMessage = {
    PHONE_RU: 'Номер телефона введён не полностью. Пожалуйста, введите номер телефона.',
    PHONE_EN: 'The phone number is incomplete. Please enter your phone number.',
  };


  // --------- DOM-элементы ---------
  const telInputs = document.querySelectorAll('input[type="tel"]');


  /*
  ======================== ОСНОВНАЯ ЛОГИКА ========================
  */

  // *** Переменная, определяющая язык Локали браузера ***
  const browserLanguage = navigator.language;

  /*
  *** Условия определения, на каком языке будет выведено
  *** валидационное сообщение (по умолчанию — на Русском)
  */
  let phoneValidityMessage = EMPTY;
  switch (true) {
    case browserLanguage === LanguageAbbr.RU || browserLanguage === LanguageAbbr.ru_RU:
      phoneValidityMessage = ValidityMessage.PHONE_RU;
      break;

    case browserLanguage === LanguageAbbr.EN || browserLanguage === LanguageAbbr.en_US || browserLanguage === LanguageAbbr.en_GB:
      phoneValidityMessage = ValidityMessage.PHONE_EN;
      break;

    default:
      phoneValidityMessage = ValidityMessage.PHONE_RU;
  }


  /*
  *** Ф-ция для обработчика события ИЗМЕНЕНИЯ содержимого
  *** поля ввода номера телефона
  */
  const onInputChange = (inputElement) => {
    const regExpForInput = /^\d$/;
    const valueOfInput = inputElement.value;

    // --- Счётчик цифровых символов ---
    let truePhoneLength = 0;

    /*
    *** Цикл перебирает строку посимвольно:
    *** ---
    *** ЕСЛИ текущий символ соответствует установленному RegExp,
    *** ТОГДА счётчик увеличивается на один.
    */
    for (let i = 0; i < valueOfInput.length; i++) {
      if (valueOfInput.charAt(i).match(regExpForInput)) {
        truePhoneLength++;
      }
    }

    /*
    *** ЕСЛИ количество цифровых символов в номере телефона
    *** меньше установленной Минимальной длины,
    *** ТОГДА выведется валидационное сообщение
    */
    if (truePhoneLength < MIN_PHONE_LENGHT) {
      inputElement.setCustomValidity(phoneValidityMessage);
    } else {
      inputElement.setCustomValidity(EMPTY);
    }
  };


  // *** Установка обработчика события и маски на все поля ввода номера телефона ***
  for (let telInput of telInputs) {
    Inputmask({ 'mask': '+7 (999) 999-99-99' }).mask(telInput);
    telInput.addEventListener('change', () => {
      onInputChange(telInput);
    });
  }
})();
/*
===================================================================================================================================
-------------------------------------------- Модуль маски ввода номера телефона: КОНЕЦ --------------------------------------------
===================================================================================================================================
*/

'use strict';

/*
===================================================================================================================================
----------------------------------- Модуль настройки слайдера «Swiper» в секции "Отзывы": НАЧАЛО ----------------------------------
===================================================================================================================================
*/
window.reviewsSlider = (() => {
  // ---------- КОНСТАНТЫ -----------
  const SwiperSliderElement = {
    CONTAINER: '.reviews .swiper-container',

    toggle: {
      PREVIOUS: '.reviews .swiper-button-prev',
      NEXT: '.reviews .swiper-button-next',
    }
  };


  // --------- DOM-элементы ---------
  const reviewsSliderTrack = document.querySelector('.reviews .slider__track');
  const reviewsTogglesBlock = reviewsSliderTrack.querySelector('.reviews .slider__toggles');
  const reviewsList = reviewsSliderTrack.querySelector('.reviews__list');
  const swiperSlides = reviewsList.querySelectorAll('li');


  /*
  ======================== ОСНОВНАЯ ЛОГИКА ========================
  */

  // *** Установка модификаторов классов для активизации JS-стилей ***
  reviewsTogglesBlock.classList.add('slider__toggles--js-active');
  reviewsList.classList.add('reviews__list--js-active');


  /*
  *** Установка элементам списка Карточек с отзывами
  *** соответствующих классов для слайдера «Swiper»
  */
  Array.from(swiperSlides).forEach((element) => {
    element.classList.add('swiper-slide');
  });


  // *** Инициализация слайдера «Swiper» ***
  const reviewsSlider = new Swiper(SwiperSliderElement.CONTAINER, {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 40,

    speed: 700,

    navigation: {
      nextEl: SwiperSliderElement.toggle.NEXT,
      prevEl: SwiperSliderElement.toggle.PREVIOUS,
    },
  });
})();
/*
*** ---------------------------------- Модуль настройки слайдера «Swiper» в секции "Отзывы": КОНЕЦ --------------------------------
*/

'use strict';

/*
===================================================================================================================================
--------------------------------------- Модуль сохранения данных Формы в localStorage: НАЧАЛО -------------------------------------
===================================================================================================================================
*/
window.saveToLocalStorage = (() => {
  // ---------- КОНСТАНТЫ -----------
  const FormField = {
    TYPE_TEXT: 'text',
    TYPE_TEL: 'tel',
    TAG_TEXTAREA: 'textarea'
  };


  // --------- DOM-элементы ---------
  const formInputs = document.querySelectorAll('form input');
  const formTextareas = document.querySelectorAll('form textarea');


  /*
  ======================== ОСНОВНАЯ ЛОГИКА ========================
  */

  /*
  *** Ф-ция для обработчика события ИЗМЕНЕНИЯ значения
  *** в поле ввода
  */
  const onFormFieldChange = (fieldToSave) => {
    localStorage.setItem(fieldToSave.name, fieldToSave.value);
  };


  // *** Ф-ция для СОХРАНЕНИЯ значений полей Формы в `localStorage` ***
  const saveValueToLocalStorage = (formFields) => {
    for (let formFieldToSave of formFields) {
      const typeOfField = formFieldToSave.getAttribute('type');
      const tagNameOfField = formFieldToSave.tagName.toLowerCase();

      if (typeOfField === FormField.TYPE_TEXT || typeOfField === FormField.TYPE_TEL || tagNameOfField === FormField.TAG_TEXTAREA) {
        formFieldToSave.addEventListener('change', () => {
          onFormFieldChange(formFieldToSave);
        });
      }
    }
  };


  /*
  *** Вызовы ф-ции СОХРАНЕНИЯ значений в `localStorage`
  *** для каждой коллекции элементов ввода
  */
  saveValueToLocalStorage(formInputs);
  saveValueToLocalStorage(formTextareas);
})();
/*
===================================================================================================================================
--------------------------------------- Модуль сохранения данных Формы в localStorage: КОНЕЦ --------------------------------------
===================================================================================================================================
*/

'use strict';

/*
===================================================================================================================================
------------------------------------- Модуль логики работы Табов в секции "Абонементы": НАЧАЛО ------------------------------------
===================================================================================================================================
*/
window.subscriptionsTabs = (() => {
  // ---------- КОНСТАНТЫ -----------
  const IS_TRUE = true;

  // *** Словарь для модификаторов элементов в секции "Абонементы" ***
  const SubscriptionsMod = {
    TAB_JS_ACTIVE: 'subscriptions__tab-list--js-active',
    CARD_LIST_JS_ACTIVE: 'subscriptions__card-list--js-active',
    TAB_SELECTED: 'subscriptions__tab--selected',
    CARD_LIST_SELECTED: 'subscriptions__card-list--selected',
  };


  // --------- DOM-элементы ---------
  const subscriptionsSection = document.querySelector('#subscriptions-section');

  const subscriptionsTabList = subscriptionsSection.querySelector('.subscriptions__tab-list');
  const subscriptionsTabs = subscriptionsTabList.querySelectorAll('.subscriptions__tab');

  const subscriptionsCardBoard = subscriptionsSection.querySelector('.subscriptions__card-board');
  const subscriptionsCardLists = subscriptionsCardBoard.querySelectorAll('.subscriptions__card-list');


  /*
  ======================== ОСНОВНАЯ ЛОГИКА ========================
  */

  /*
  *** Установка модификаторов стилей для элементов, которые по умолчанию
  *** при отключённом JS ведут себя иначе.
  */
  subscriptionsTabList.classList.add(SubscriptionsMod.TAB_JS_ACTIVE);
  for (let cardList of subscriptionsCardLists) {
    cardList.classList.add(SubscriptionsMod.CARD_LIST_JS_ACTIVE);
  }


  // *** Функция для отображения правильного содержания Таба ***
  const openTabContent = (currentTab) => {
    subscriptionsCardLists.forEach((element) => {
      switch (IS_TRUE) {
        case element.dataset.id === currentTab.dataset.id:
          element.classList.add(SubscriptionsMod.CARD_LIST_SELECTED);
          break;

        default:
          element.classList.remove(SubscriptionsMod.CARD_LIST_SELECTED);
      }
    });
  };


  // --- Первое отображение содержимого Таба, выбранного по умолчанию ---
  for (let tab of subscriptionsTabs) {
    if (tab.classList.contains(SubscriptionsMod.TAB_SELECTED)) {
      openTabContent(tab);
    }
  }


  // *** Функция для обработчика события клика по Табу ***
  const onTabClick = (evt) => {
    evt.preventDefault();

    const selectedTab = evt.target;

    // --- Обнуление модификаторов у всех кнопок Табов ---
    subscriptionsTabs.forEach((element) => {
      element.classList.remove(SubscriptionsMod.TAB_SELECTED);
    });

    /*
    *** Добавление модификатора кликнутой кнопке
    *** и открытие соответствующего содержимого Таба
    */
    selectedTab.classList.add(SubscriptionsMod.TAB_SELECTED);
    openTabContent(selectedTab);
  };


  // === Установка обраотчика события клика на кнопкуи Табов ===
  subscriptionsTabs.forEach((tabElement) => {
    tabElement.addEventListener('click', onTabClick);
  });
})();
/*
*** ------------------------------------ Модуль логики работы Табов в секции "Абонементы": КОНЕЦ ----------------------------------
*/

'use strict';

/*
===================================================================================================================================
----------------------------------- Модуль настройки слайдера «Swiper» в секции "Тренеры": НАЧАЛО ---------------------------------
===================================================================================================================================
*/
window.trainersSlider = (() => {
  // ---------- КОНСТАНТЫ -----------
  const SwiperSliderElement = {
    CONTAINER: '.trainers .swiper-container',

    toggle: {
      PREVIOUS: '.trainers .swiper-button-prev',
      NEXT: '.trainers .swiper-button-next',
    }
  };


  // --------- DOM-элементы ---------
  const trainersSliderTrack = document.querySelector('.slider__track');
  const trainersTogglesBlock = trainersSliderTrack.querySelector('.slider__toggles');
  const trainersList = trainersSliderTrack.querySelector('.trainers__list');
  const swiperSlides = trainersSliderTrack.querySelectorAll('.trainers__list > li');


  /*
  ======================== ОСНОВНАЯ ЛОГИКА ========================
  */

  // *** Установка модификаторов классов для активизации JS-стилей ***
  trainersTogglesBlock.classList.add('slider__toggles--js-active');
  trainersList.classList.add('trainers__list--js-active');


  /*
  *** Установка элементам списка Карточек тренеров
  *** соответствующих классов для слайдера «Swiper»
  */
  Array.from(swiperSlides).forEach((element) => {
    element.classList.add('swiper-slide');
  });


  // *** Инициализация слайдера «Swiper» ***
  const swiper = new Swiper(SwiperSliderElement.CONTAINER, {
    slidesPerView: 1,
    slidesPerGroup: 1,

    speed: 700,
    preventClicks: false,

    navigation: {
      nextEl: SwiperSliderElement.toggle.NEXT,
      prevEl: SwiperSliderElement.toggle.PREVIOUS,
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 10,
      },

      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30,
      },

      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 40,
      }
    },
  });
})();
/*
*** ---------------------------------- Модуль настройки слайдера «Swiper» в секции "Тренеры": КОНЕЦ -------------------------------
*/
