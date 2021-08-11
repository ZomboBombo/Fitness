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
