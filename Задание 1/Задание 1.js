const btn = document.querySelector('.btn');
const btnsvg = document.querySelector('.btn_img');



btn.addEventListener('click', () => {
    btnsvg.classList.toggle('btn_svg2_light');
    btn.classList.toggle('btn_light');
    btnsvg.classList.toggle('btn_svg2_dark');
    btn.classList.toggle('btn_dark');
});
