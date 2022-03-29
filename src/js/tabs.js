window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    // Tabs

    const tabs = document.querySelectorAll('.tabHeader__item'),
          tabsContent = document.querySelectorAll('.tabContent'),
          tabsParent = document.querySelector('.tabHeader__items');

    function hideTabContent () {
        tabsContent.forEach(item => {
            item.classList.add('tabContent_hide');
            item.classList.remove('tabContent_show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabHeader__item_active');
        });
    }

    function showTabsContent (i = 0) {
        tabsContent[i].classList.add('tabContent_show', 'fade');
        tabsContent[i].classList.remove('tabContent_hide');
        tabs[i].classList.add('tabHeader__item_active');
    }

    // Вызываем, чтобы по умолчанию показывалась 1 вкладка.
    hideTabContent();
    showTabsContent();

    // Делегируем событие клика переключателям вкладок
    tabsParent.addEventListener('click', (event) => {
        const target = event.target; 

        if (target && target.classList.contains('tabHeader__item')) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabsContent(i);
                }
            });
        }
    });

});