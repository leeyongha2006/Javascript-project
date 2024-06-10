const text = document.getElementById("text");
const sppedEl = document.getElementById("speed");
const prog = "Sungil infomation High School Class 'get a job' of JavaScript";
let idx = 1;
let speed = 300 / sppedEl.value;

writeText();

function writeText() {
    text.innerText = prog.slice(0, idx)

    idx++;

    if(idx > prog.length) {
        idx=1;
    }
    setTimeout(writeText, speed);
}

sppedEl.addEventListener('input', (e) => {
    speed = 300 / e.target.value;
})