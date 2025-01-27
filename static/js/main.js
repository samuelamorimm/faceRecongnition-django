const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");
const itemFaq = document.querySelectorAll('.item-faq')

itemFaq.forEach(item => {
  item.addEventListener('click', () => {
    if (item.classList == 'item-faq item-faq1') {
      const resp1 = document.querySelector('#resp1')
      resp1.style.display = 'flex'
      resp1.classList.add('animation-resp')
      item.classList.add('active')
    } else if (item.classList == 'item-faq item-faq1 active'){
      const resp1 = document.querySelector('#resp1')
      resp1.style.display = 'none'
      resp1.classList.remove('animation-resp')
      item.classList.remove('active')
    }
  })
});

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".header__content .header__btn", {
  ...scrollRevealOption,
  delay: 2000,
});
ScrollReveal().reveal(".header__content .socials", {
  ...scrollRevealOption,
  delay: 2500,
});
ScrollReveal().reveal(".header__bar", {
  ...scrollRevealOption,
  delay: 3000,
});
