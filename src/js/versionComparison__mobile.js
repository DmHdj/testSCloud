'use strict';

window.addEventListener('DOMContentLoaded', () => { 
    // Получаем элементы
    const content = document.querySelectorAll('.versionComparison__mobileContainer'),
          togglersParent = document.querySelector('.versionComparison__toggle'),
          togglers = togglersParent.querySelectorAll('.versionComparison__toggleItem');

    // объект слайдера
    const slider = {
        content: content,
        counter: 0,
        controlСounter: function (counter) {
            if (counter >= this.content.length - 1) {
                this.counter = 0;
                return this.counter;
            }
            
            return this.counter += 1;
        },
        switchingSlides: function () {
            content.forEach((item) => {
                item.classList.remove('versionComparison__mobileContainer_active');
            });

            togglers.forEach((item) => {
                item.classList.remove('versionComparison__toggleItem_active');
            });

            content[slider.counter].classList.add('versionComparison__mobileContainer_active');
            togglers[slider.counter].classList.add('versionComparison__toggleItem_active');
            slider.controlСounter(slider.counter);
        }
    };

    // Вызов для того, чтобы при первом запуске был показан 1 элемент. пока не заработал таймер
    slider.switchingSlides();

    let timerID;
    
    // задаем таймер для автопереключения слайдов
    function startAutoSwitchingSlides () {
        timerID = setInterval(slider.switchingSlides, 2000);
    }

    // останавливает таймер
    function stopAutoSwitchingSlides () {
        clearInterval(timerID);
    }

    // включаем авто смену слайдов
    startAutoSwitchingSlides();

    // делегируем собитие на переключатели
    togglersParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('versionComparison__toggleItem')) {
            togglers.forEach((item, i) => {
                if (target === item) {
                    slider.counter = +i;
                    slider.switchingSlides();

                    // каждое нажатие на переключатель заново запустит автопереключение
                    stopAutoSwitchingSlides();
                    startAutoSwitchingSlides();
                }   
            });
        }
    });
});