
export const persWorldPointsHTML = document.getElementById('pers-world-points').getElementsByTagName('span');
export const camWorldPointsHTML = document.getElementById('cam-world-points').getElementsByTagName('span');

const firstX = document.getElementById('first-x');
const firstY = document.getElementById('first-y');
const firstZ = document.getElementById('first-z');
const secondX = document.getElementById('second-x');
const secondY = document.getElementById('second-y');
const secondZ = document.getElementById('second-z');
const thirdX = document.getElementById('third-x');
const thirdY = document.getElementById('third-y');
const thirdZ = document.getElementById('third-z');
const fourthX = document.getElementById('fourth-x');
const fourthY = document.getElementById('fourth-y');
const fourthZ = document.getElementById('fourth-z');

const submit = document.getElementById('submit');

function project(){
    // perspective projection matrix
    persWorldPointsHTML[0].innerHTML = firstX.value;
    console.log(firstX.value);
    persWorldPointsHTML[1].innerHTML = firstY.value;
    persWorldPointsHTML[2].innerHTML = firstZ.value;

    persWorldPointsHTML[4].innerHTML = secondX.value;
    persWorldPointsHTML[5].innerHTML = secondY.value;
    persWorldPointsHTML[6].innerHTML = secondZ.value;

    persWorldPointsHTML[8].innerHTML = thirdX.value;
    persWorldPointsHTML[9].innerHTML = thirdY.value;
    persWorldPointsHTML[10].innerHTML = thirdZ.value;

    persWorldPointsHTML[12].innerHTML = fourthX.value;
    persWorldPointsHTML[13].innerHTML = fourthY.value;
    persWorldPointsHTML[14].innerHTML = fourthZ.value;

    // camera projection matrix
    camWorldPointsHTML[0].innerHTML = firstX.value;
    camWorldPointsHTML[1].innerHTML = firstY.value;
    camWorldPointsHTML[2].innerHTML = firstZ.value;

    camWorldPointsHTML[4].innerHTML = secondX.value;
    camWorldPointsHTML[5].innerHTML = secondY.value;
    camWorldPointsHTML[6].innerHTML = secondZ.value;

    camWorldPointsHTML[8].innerHTML = thirdX.value;
    camWorldPointsHTML[9].innerHTML = thirdY.value;
    camWorldPointsHTML[10].innerHTML = thirdZ.value;

    camWorldPointsHTML[12].innerHTML = fourthX.value;
    camWorldPointsHTML[13].innerHTML = fourthY.value;
    camWorldPointsHTML[14].innerHTML = fourthZ.value;
}

export function buildEventListeners(){
    submit.addEventListener('click', project);
}

