'use strict';

/*
===================================================================================================================================
-------------------------------------------- Модуль настройки слайдера «Swiper»: НАЧАЛО -------------------------------------------
===================================================================================================================================
*/
window.swiperSettings = (() => {
  // --------- DOM-элементы ---------
  const sliderTrack = document.querySelector('.trainers-slider__track');
  const sliderTogglesBlock = sliderTrack.querySelector('.trainers-slider__toggles');
  const sliderList = sliderTrack.querySelector('.trainers-slider__list');
  const swiperSlides = sliderTrack.querySelectorAll('.swiper-wrapper > li');


  /*
  ======================== ОСНОВНАЯ ЛОГИКА ========================
  */

  // *** Установка модификаторов классов для активизации JS-стилей ***
  sliderTogglesBlock.classList.add('trainers-slider__toggles--js-active');
  sliderList.classList.add('trainers-slider__list--js-active');

  /*
  *** Установка элементам списка Карточек тренеров
  *** соответствующих классов для слайдера «Swiper»
  */
  Array.from(swiperSlides).forEach((element) => {
    element.classList.add('swiper-slide');
  });


  // *** Инициализация слайдера «Swiper» ***
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    slidesPerGroup: 1,

    speed: 700,
    preventClicks: false,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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
*** ---------------------------------------- Модуль настройки слайдера «Swiper»: КОНЕЦ --------------------------------------------
*/
