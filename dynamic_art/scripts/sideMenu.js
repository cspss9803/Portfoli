const sideMenuBtn = document.querySelector('#side_menu_toggle_btn');

const sideMenu = document.querySelector('#side_menu');

sideMenuBtn.addEventListener('click', () => {

    sideMenuBtn.classList.toggle("side_menu_open");

    sideMenu.style.left = sideMenu.style.left == '100vw' ? 0 : '100vw';

    document.querySelectorAll('.white > div').forEach( element => {

        element.style.backgroundColor = element.style.backgroundColor == 'rgb(255, 255, 255)' ? '#000' : '#fff';

    } );

    document.querySelector('body').style.overflow = document.querySelector('body').style.overflow != 'hidden' ? 'hidden' : '';
    
    document.querySelector('html').style.overflow = document.querySelector('html').style.overflow != 'hidden' ? 'hidden' : '';
    
});