// Mobile Menu
const burgerIcon = document.querySelector("#burger") as HTMLDivElement;
const navbarMenu = document.querySelector("#nav-links") as HTMLDivElement;

burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
});