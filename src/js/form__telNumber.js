'use strict';

window.addEventListener('DOMContentLoaded', () => {

    // Получаем элементы
    const selectCountry = document.querySelectorAll('.form__select'),
          inputNum = document.querySelectorAll('.form__input_num');

    // Проверяем Страну и по ней подставляем код телефона
    function substitutionСountryСode (country) {
        switch (country) {
            case 'ru':
                inputNum.forEach(item => {
                    item.value = '+7';
                });
                break;
            case 'ua':
                inputNum.forEach(item => {
                    item.value = '+380';
                });
                break;
            case 'bel':
                inputNum.forEach(item => {
                    item.value = '+375';
                });
                break;
        }
    }

    // Назначенаяем обработчик событий на изменение в селекте 
    selectCountry.forEach(item => {
        item.addEventListener('change', e => {
            substitutionСountryСode(e.target.value);
        });
    });

});