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

function galleryAnimation() {
  let zSpacing = -1000,
    lastPoss = zSpacing / 5,
    $frames = document.getElementsByClassName('gallery-frame'),
    frames = Array.from($frames),
    zVals = [];

  const templateGallery = document.querySelector('.template-gallery');
  const galleryItems = document.querySelector('.template-gallery__items');
  let galleryHeight = Math.abs(zSpacing) / 4.5 * (frames.length + 1) + galleryItems.offsetHeight;

  templateGallery.setAttribute('style', `height: ${galleryHeight + 'px'}`);

  window.onscroll = function () {
    let top = document.documentElement.scrollTop,
      delta = lastPoss - top;

    lastPoss = top;

    frames.forEach(function (n, i) {
      zVals.push((i * zSpacing) + zSpacing);
      zVals[i] += delta * -4;

      let frame = frames[i],
        transform = `translateZ(${zVals[i]}px)`,
        opacity = zVals[i] < Math.abs(zSpacing) / 1.8 ? 1 : 0;

      frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity}`);
    })
  }
}

window.addEventListener('DOMContentLoaded', function () {
  const firstscreen = document.querySelector('._firstscreen');
  const templateGallery = document.querySelector('.template-gallery');

  setTimeout(() => {
    showHeaderHeight();

    if (templateGallery) {
      galleryAnimation();

      window.scrollTo(0, 1);
    }
  }, 300);
});
window.addEventListener('resize', function () {
  const firstscreen = document.querySelector('._firstscreen');

  if (firstscreen) {
    showHeaderHeight();
  }
});