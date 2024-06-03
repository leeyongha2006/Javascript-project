let popped = 0;

document.addEventListener('mouseover', function (e) {
    if(e.target.className === "balloon") {
        e.target.style.backgroundColor = "#19172e"
        e.target.textContent = "🎈";
        e.target.classList.add('popped')
        popped ++;
        checkAllpopped();
    }
});

function checkAllpopped() {
    if(popped === 10) {
        console.log('all popped!');
        let gallery = document.querySelector('#balloos-gallery');
        let message = document.querySelector('#yay-no-balloons');
        gallery.innerHTML = '';
        message.style.display = 'block'
    }
};