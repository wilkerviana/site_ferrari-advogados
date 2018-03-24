'use strict';

$('.carousel').slick({
  dots: true
});

$('.input-newsletter').focus(function(){
  $(this).siblings('.label-newsletter').hide();
});

$('.slick-dots li , .slick-arrow').text('');

// fixed header animation
window.addEventListener('scroll',function(){
  const myScroll = window.pageYOffset;
  let header = document.getElementById('header');
  if (myScroll > 200) {
    header.classList.add('is-fixed');
  }else {
    header.classList.remove('is-fixed');
  }
});

const btnMobile = document.querySelector('.btn-menu-mobile');
const menu = document.querySelector('.navegation-menu');
btnMobile.addEventListener('click',function(){
  menu.classList.toggle('menu-open');
  if (menu.classList.contains('menu-open')) {
    btnMobile.textContent = 'Fechar x';
  } else {
    btnMobile.textContent = 'MENU';
  }
});

//accordion
const btnAccordion = document.querySelectorAll('.btn-accordion');
btnAccordion.forEach(function(button){
  button.addEventListener('click',function(){
    this.classList.toggle('btn-open');
    this.parentNode.parentNode.classList.toggle('is-open');
    if (this.classList.contains('btn-open')) {
      this.textContent = '-';
    } else {
      this.textContent = '+';
    }
  });
});