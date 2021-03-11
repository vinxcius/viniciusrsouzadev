
const menuItems = document.querySelectorAll(
    '.wrap a')

menuItems.forEach(link => {
    link.addEventListener('click', scrollToId)
})

//Pega a altura e o código do ID clicado
function getScrollTopByHref(element) {
    const id = element.getAttribute('href') //pega o valor de href, ex: #contact

    return document.querySelector(id).offsetTop
    //pega o código do id que foi clicado
    //OffsetTop informa a distância (em pixels) do topo para a sessão que foi clicada
}

//Scrolla para a sessão
function scrollToId(event) {
    //impede de aparecer as '#' de cada link (meusite.com/index.html#Portfolio)
    event.preventDefault()

    //-80 define a distancia entre a sessão e o navbar
    const goToSection = getScrollTopByHref(event.target) - 50

    scrollToPosition(goToSection)
}


//recebe a distancia entre o ID e a navbar e seta o scroll para smooth
function scrollToPosition(goToSection) {

    //scroll recebe dois parâmetros: valor de x e y;
    //É possível passar um objeto também
    //CODIGO NAO FUNCIONA EM TODOS OS BROWSERS
    // window.scroll({
    //     top: goToSection,
    //     behavior: "smooth" //
    // })

    //Eixo X, Eixo Y e Duração
    smoothScrollTo(0, goToSection)
}


// Caso deseje suporte a browsers antigos / que não suportam scroll smooth nativo
/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
    * @param {int} duration: animation duration in ms
    */
function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== 'undefined' ? duration : 400;

    // Easing function
    const easeInOutQuart = (time, from, distance, duration) => {
        if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
        return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
        const time = new Date().getTime() - startTime;
        const newX = easeInOutQuart(time, startX, distanceX, duration);
        const newY = easeInOutQuart(time, startY, distanceY, duration);
        if (time >= duration) {
            clearInterval(timer);
        }
        window.scroll(newX, newY);
    }, 1000 / 60); // 60 fps
};



//NavSlide


const burger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav-links');


function navSlide() {


    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active')
        burger.classList.toggle('toggle')
    })

    function closeOnClick() {
        nav.addEventListener('click', () => {
            nav.classList.remove('nav-active')
            burger.classList.toggle('toggle')
        })
    }
    closeOnClick()

}

navSlide()