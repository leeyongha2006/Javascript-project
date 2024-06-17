const container = document.getElementById('container');
const randomWaveButton = document.getElementById('randomWave');
const circlesArr = [];
let rows = 15;
let cols = 15;

for (let i = 0; i < cols; i++) {
    circlesArr[i] = [];
    for (let j = 0; j < rows; j++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        container.appendChild(circle);
        circlesArr[i].push(circle);
    }
}

circlesArr.forEach((cols, i) => {
    cols.forEach((circle, j) => {
        circle.addEventListener('click', () => {
            growCircles(i, j);
        });
    });
});

function growCircles(i, j) {
    if (circlesArr[i] && circlesArr[i][j] && !circlesArr[i][j].classList.contains('grow')) { // 'contains'로 수정
        circlesArr[i][j].classList.add('grow');
        setTimeout(() => {
            growCircles(i - 1, j);
            growCircles(i + 1, j);
            growCircles(i, j - 1);
            growCircles(i, j + 1);
        }, 100);

        setTimeout(() => {
            circlesArr[i][j].classList.remove('grow');
        }, 300);
    }
}

function makeRandomWave() {
    const randomCoords = [Math.floor(Math.random() * cols), Math.floor(Math.random() * rows)]; // 두 번째 인덱스에 'rows' 사용
    growCircles(randomCoords[0], randomCoords[1]);
}

randomWaveButton.addEventListener('click', makeRandomWave);
