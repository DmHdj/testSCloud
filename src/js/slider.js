window.addEventListener('DOMContentLoaded', () => { 
    'use strict';

    // Получаем элементы
    const sliderContent = document.querySelectorAll('.slider__content'),
          sliderArrowToggles = document.querySelectorAll('.slider__arrowToggle'),
          sliderTogglersParent = document.querySelector('.slider__toggle'),
          sliderTogglers = sliderTogglersParent.querySelectorAll('.slider__toggleItem');

    // Главный объект - слайдер
    const slider = {
        content: sliderContent,
        arrowTogglers: sliderArrowToggles,
        counter: 0,
        // Проверяет счетчик counter
        controlСounter: function (counter) {
            if (counter >= this.content.length - 1) {
                this.counter = this.content.length - 1;
            } else if ( counter < 0 ) {
                this.counter = 0;
            }
        },
        // Проверяет на начало/конец слайдов, чтобы применить класс активности - оранжевый цвет, сигнализирующий, что можно листать вправо/влево
        controlArrowToggles: function (counter) {
            if (counter >= this.content.length - 1) {
                this.arrowTogglers[1].classList.remove('slider__arrowToggle_active');
                this.arrowTogglers[0].classList.add('slider__arrowToggle_active');
            }  else if (counter <= 0 ) {
                this.arrowTogglers[0].classList.remove('slider__arrowToggle_active');
                this.arrowTogglers[1].classList.add('slider__arrowToggle_active');
            } else {
                this.arrowTogglers[0].classList.add('slider__arrowToggle_active');
                this.arrowTogglers[1].classList.add('slider__arrowToggle_active');

            }
        },
        // Позволяет применить стили к "задним" слайдам, а также проверяется существование слайдов, позади текущего
        switchingBackgroundSlides: function (counter) {
            if ( (counter + 1) <= (this.content.length - 1) ) {
                this.content[counter + 1].classList.add('slider__content_backOne');
            }

            if ( (counter + 2) <= (this.content.length - 1) ) {
                this.content[counter+ 2].classList.add('slider__content_backTwo');
            }
        },
        // Главная функция: очищает стили у всех картинок в слайдере, очищает стиль активности у переключателей слайдов (круглые переключатели), вызывает функцию - проверку стрелок, проверку счетчика, и добавляет стиль видимиости слайду и переключателю по текущему показанию счетчика.
        switchingSlides: function () {
            sliderContent.forEach((item) => {
                item.classList.remove('slider__content_show' , 'slider__content_backOne', 'slider__content_backTwo');
            });

            sliderTogglers.forEach((item) => {
                item.classList.remove('slider__toggleItem_active');
            });

            slider.controlArrowToggles(slider.counter);

            slider.controlСounter(slider.counter);

            sliderContent[slider.counter].classList.add('slider__content_show');

            slider.switchingBackgroundSlides(slider.counter);

            sliderTogglers[slider.counter].classList.add('slider__toggleItem_active');
        }
    };

    // Вызов фукций при загрузке страницы.
    slider.controlArrowToggles(slider.counter);

    slider.switchingSlides();

    // Делегирование события клика на круглые переключатели 
    sliderTogglersParent.addEventListener('click', (event) => {
        const target = event.target;

        // Проверяем что "попали" кликом куда надо
        if (target && target.classList.contains('slider__toggleItem')) {
            sliderTogglers.forEach((item, i) => {
                // Забирвем номер "кружочка"- переключателя
                if (target === item) {
                    slider.counter = +i;
                    slider.switchingSlides();
                }
            });
        }
    });

    // Добавление обработчика событий к кнопкам со стрелками, которые переключают слайды на 1 вперед/назад
    sliderArrowToggles.forEach((item) => {
        item.addEventListener('click', (event) => {
            const e = event.target;

            if (e.classList.contains('slider__arrowToggle_left')) {
                slider.counter--;
            } else {
                slider.counter++;
            }
            
            slider.switchingSlides();
        });
    });
    

});