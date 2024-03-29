/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Mousewheel, Navigation, Pagination, Keyboard, Thumbs } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	if (document.querySelector('.home-template__slider')) {
		let homeSlider;
		let homeSlider6md = window.matchMedia('(min-width: 374.98px)');

		function homeSlider6mdChange(e) {
			if (e.matches) {
				homeSlider = new Swiper('.home-template__slider', {
					// Подключаем модули слайдера
					// для конкретного случая
					modules: [Mousewheel, Pagination, Keyboard],
					observer: true,
					observeParents: true,
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: false,
					speed: 1500,
					direction: 'vertical',
					mousewheel: true,
					keyboard: true,

					//touchRatio: 0,
					//simulateTouch: false,
					//loop: true,
					//preloadImages: false,
					//lazy: true,

					/*
					// Эффекты
					effect: 'fade',
					autoplay: {
						delay: 3000,
						disableOnInteraction: false,
					},
					*/

					// Пагинация

					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},


					// Скроллбар
					/*
					scrollbar: {
						el: '.swiper-scrollbar',
						draggable: true,
					},
					*/

					// Кнопки "влево/вправо"
					// navigation: {
					// 	prevEl: '.swiper-button-prev',
					// 	nextEl: '.swiper-button-next',
					// },

					// Брейкпоинты
					/*
					breakpoints: {
						320: {
							slidesPerView: 1,
							spaceBetween: 0,
							autoHeight: true,
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						992: {
							slidesPerView: 3,
							spaceBetween: 20,
						},
						1268: {
							slidesPerView: 4,
							spaceBetween: 30,
						},
					},
					*/
					// События
					on: {
						afterInit() {
							// console.log(this);
							this.slideTo(1);
							this.slideTo(0);
						}
					}
				});
			}
			else {
				if (homeSlider) {
					homeSlider.destroy();
				}
			}
		}

		homeSlider6md.addEventListener('change', homeSlider6mdChange);
		homeSlider6mdChange(homeSlider6md);
	}

	if (document.querySelector('.template4__slider')) { // Указываем скласс нужного слайдера
		new Swiper('.template4__slider', {
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 80,
			autoHeight: true,
			speed: 800,

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.template4 .swiper__button_prev',
				nextEl: '.template4 .swiper__button_next',
			},
			on: {

			}
		});
	}

	if (document.querySelector('.reviews-main__slider')) { // Указываем скласс нужного слайдера
		new Swiper('.reviews-main__slider', {
			modules: [Thumbs],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 80,
			autoHeight: false,
			speed: 800,

			thumbs: {
				swiper: {
					el: '.reviews-thumb__slider',
					slidesPerView: 3,
					spaceBetween: 10,
					
					breakpoints: {
						768: {
							slidesPerView: 4,
							spaceBetween: 28,
						},
						992: {
							slidesPerView: 5,
							spaceBetween: 28,
						},
					},
					
				}
			},

			on: {

			}
		});
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});