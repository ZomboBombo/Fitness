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
