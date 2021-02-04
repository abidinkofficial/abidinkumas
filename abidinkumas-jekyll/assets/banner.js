const text1 = 'Arayüz geliştirmeye çalışıyorum.';
const text2 = 'JavaScript ve arkadaşlarını öğrenmeye çabalıyorum.';
const text3 = 'Kedileri severim! 😸';

let bannerText = document.querySelector('.banner-text');
let cursor = document.querySelector('.cursor');

async function bannerType(text) {
    for (let i = 0; i < text.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        bannerText.innerHTML += text.charAt(i);
    }
}

async function wait(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

async function bannerDelete() {
    for (let i = bannerText.innerHTML.length - 1; i >= 0; i--) {
        await new Promise(resolve => setTimeout(resolve, 20));
        bannerText.innerHTML = bannerText.innerHTML.slice(0, i);
    }
}

function loop(callback) {
    bannerType(text1)
        .then(wait.bind(null, 2000))
        .then(bannerDelete)
        .then(bannerType.bind(null, text2))
        .then(wait.bind(null, 2000))
        .then(bannerDelete)
        .then(bannerType.bind(null, text3))
        .then(wait.bind(null, 2000))
        .then(bannerDelete)
        .then(callback.bind(null, callback));
}

let cursorState = true;
setInterval(() => {
    if (cursorState) {
        cursor.style.opacity = 0;
        cursorState = false;
    } else {
        cursor.style.opacity = 1;
        cursorState = true;
    }
}, 225);

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Loaded.');
    loop(loop);
});