// Подключение функционала 
import { isMobile, removeClasses, _slideUp, _slideToggle } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// Прячем меню на мобильных устройствах
if (window.innerWidth < 991.98) {
  const menuItemsHasChildren = document.querySelectorAll('.menu__list .menu-item-has-children');
  if (menuItemsHasChildren.length > 0) {
    menuItemsHasChildren.forEach(element => {
      const menuList = element.querySelector('ul');
      console.log(menuList);
      _slideUp(menuList, 0);
    });
  }
}

document.addEventListener('click', function (e) {
  const targetElement = e.target;

  // Показываем выпадающее меню при клике на стрелку
  if (window.innerWidth > 991.98) {
    if (targetElement.classList.contains('menu__arrow')) {
      targetElement.closest('.menu-item').classList.toggle('_hover');
    }
    if (!targetElement.closest('.menu-item') && document.querySelectorAll('.menu-item._hover').length > 0) {
      removeClasses(document.querySelectorAll('.menu-item._hover'), "_hover");
    }
  }

  if (window.innerWidth < 991.98) {
    if (targetElement.classList.contains('menu__arrow')) {
      const arrowParent = targetElement.closest('.menu-item');
      const list = arrowParent.querySelector('ul');
      _slideToggle(list);
      arrowParent.classList.toggle('_hover');
    }
  }
})


function showHeaderHeight() {
  const header = document.querySelector('.header');

  if (header) {
    let headerHeight = getComputedStyle(header).height;
    let calcHeight = parseFloat(headerHeight);

    document.documentElement.style.setProperty('--header-height', `${calcHeight}px`);
  }
}

window.addEventListener('DOMContentLoaded', function () {
  const homeTemplate = document.querySelector('.home-template');

  setTimeout(() => {
    if (homeTemplate) {
      showHeaderHeight();
    }
  }, 500);
});
window.addEventListener('resize', function () {
  const homeTemplate = document.querySelector('.home-template');

  if (homeTemplate) {
    showHeaderHeight();
  }
});