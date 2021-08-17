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
