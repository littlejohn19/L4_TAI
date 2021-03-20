const button = document.querySelector('.scroll');

function goToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

button.addEventListener('click', goToTop);

function showTopButton() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.querySelector(".scroll").style.display = "block";
    } else {
        document.querySelector(".scroll").style.display = "none";
    }
}

window.onscroll = () => {
    showTopButton()
};




