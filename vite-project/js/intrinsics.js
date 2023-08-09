import * as RENDER from './render.js'
import * as CAM from './cam-canvas.js'
import * as PERS from './pers-canvas.js'

const fx = document.getElementById('focal-x')
const fy = document.getElementById('focal-y')
const far = document.getElementById('far-clipping')
const near = document.getElementById('near-clipping')

const submit = document.getElementById('submit-intrinsics')

function enter(){
    RENDER.projMatrixHTML[10].innerHTML = Math.round(1 / (1 + near.value) * 100) / 100;
    RENDER.projMatrixHTML[14].innerHTML = Math.round(- near.value / (1 + near.value) * 100) / 100;

    RENDER.persMatrixHTML[0].innerHTML = Math.round(fx.value * 100) / 100;
    RENDER.persMatrixHTML[5].innerHTML = Math.round(fy.value * 100) / 100;

    RENDER.intrinsicMatrixHTML[0].innerHTML = Math.round(fx.value * 100) / 100;
    console.log(fx.value);
    RENDER.intrinsicMatrixHTML[4].innerHTML = Math.round(fy.value * 100) / 100;

    RENDER.scaleMatrixHTML[0].innerHTML = Math.round(1 / far.value * 100) / 100;
    RENDER.scaleMatrixHTML[5].innerHTML = Math.round(1 / far.value * 100) / 100;
    RENDER.scaleMatrixHTML[10].innerHTML = Math.round(1 / far.value * 100) / 100;

    RENDER.updateCamMatrix();
    RENDER.updatePersMatrix();
    RENDER.updateCamPoints();
    RENDER.updatePersPoints();
    CAM.camRenderDots(RENDER.matrixToArray(RENDER.camPointsMatrixHTML));
    PERS.persRenderDots(RENDER.matrixToArray(RENDER.persPointsMatrixHTML));
}
export function buildEventListeners(){
    submit.addEventListener('click', enter);
}