'use strict';

window.addEventListener('DOMContentLoaded', () => { 

    // Получаем элементы
    const menu = document.querySelector('.headerTop__menuList'),
          menuItem = document.querySelectorAll('.headerTop__menuItem'),
          hamburger = document.querySelector('.hamburger'),
          search = document.querySelector('.headerTop__search');

    // Назначаем событие на гамбургер при котором переключаются (добавляются/удаляются) классы активности 
    // у блока меню, блока с поиском и самого гамбургера. Также при открытом окне меню, скролл запрещен
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('headerTop__menuList_active');
        search.classList.toggle('headerTop__search_active');
        document.body.style.overflow = '';

        if (hamburger.classList.contains('hamburger_active')) {
            document.body.style.overflow = 'hidden';
        }
    });

    // Если нажать на пункт меню, то само меню скроется - уберутся классы активности у блока меню, поиска и гамбургера
    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('headerTop__menuList_active');
            search.classList.toggle('headerTop__search_active');

            document.body.style.overflow = '';
        });
    });
});
