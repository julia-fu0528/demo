import * as THREE from 'three';
import * as CAM from './cam-canvas.js';
import * as PERS from './pers-canvas.js';


export const projMatrixHTML = document.getElementById('proj-matrix').getElementsByTagName('span');
export const persMatrixHTML = document.getElementById('pers-matrix').getElementsByTagName('span');
export const scaleMatrixHTML = document.getElementById('scale-matrix').getElementsByTagName('span');
export const intrinsicMatrixHTML = document.getElementById('intrinsic').getElementsByTagName('span');

export const persWorldPointsHTML = document.getElementById('pers-world-points').getElementsByTagName('span');
export const camWorldPointsHTML = document.getElementById('cam-world-points').getElementsByTagName('span');

const extrinsicMatrixHTML = document.getElementById('extrinsic').getElementsByTagName('span');
const transMatrixHTML = document.getElementById('transformation').getElementsByTagName('span');
const cameraMatrixHTML = document.getElementById('camera-proj').getElementsByTagName('span');
const cameraMatrixMapHTML = document.getElementById('camera-proj-map').getElementsByTagName('span');
const persProjMatrixHTML = document.getElementById('pers-proj').getElementsByTagName('span');
const persProjMatrixMapHTML = document.getElementById('pers-proj-map').getElementsByTagName('span');

export const persPointsMatrixHTML = document.getElementById('pers-projected-points').getElementsByTagName('span');
export const camPointsMatrixHTML = document.getElementById('cam-projected-points').getElementsByTagName('span');

const orthoMatrixHTML = document.getElementById('ortho-proj').getElementsByTagName('span');


const rotateXSlider = document.getElementById('rotateX')
const rotateYSlider = document.getElementById('rotateY')
const rotateZSlider = document.getElementById('rotateZ')
const translateXSlider = document.getElementById('translateX')
const translateYSlider = document.getElementById('translateY')
const translateZSlider = document.getElementById('translateZ')

const persZ = document.getElementById('pers-coefficient')
const camZ = document.getElementById('cam-coefficient')

const resetRotButton = document.getElementById('reset-rot-button')
const resetTransButton = document.getElementById('reset-trans-button')

var rotateXVal =  document.getElementById('rotateX-val')
var rotateYVal =  document.getElementById('rotateY-val')
var rotateZVal =  document.getElementById('rotateZ-val')
var transXVal =  document.getElementById('transX-val')
var transYVal =  document.getElementById('transY-val')
var transZVal =  document.getElementById('transY-val')


export const firstX = document.getElementById('first-x');
export const firstY = document.getElementById('first-y');
export const firstZ = document.getElementById('first-z');
export const secondX = document.getElementById('second-x');
export const secondY = document.getElementById('second-y');
export const secondZ = document.getElementById('second-z');
export const thirdX = document.getElementById('third-x');
export const thirdY = document.getElementById('third-y');
export const thirdZ = document.getElementById('third-z');
export const fourthX = document.getElementById('fourth-x');
export const fourthY = document.getElementById('fourth-y');
export const fourthZ = document.getElementById('fourth-z');


let rotateXMatrix = new THREE.Matrix3().set(1, 0, 0, 0, 1, 0, 0, 0, 1);
let rotateYMatrix = rotateXMatrix.clone();
let rotateZMatrix = rotateYMatrix.clone();

export function pointsUnready(){
    if (firstX.value === '' || firstY.value === '' || firstZ.value === ''
     || secondX.value === '' || secondY.value === '' || secondZ.value === ''
     || thirdX.value === '' || thirdY.value === '' || thirdZ.value === ''
     || fourthX.value === '' || fourthY.value === '' || fourthZ.value === ''){
        return true;
     }else{
        return false;
     }
}
export function alertPoint(){
    alert('Please fill in all coordinates of the four points')
}

export function buildEventListeners(){
    rotateXSlider.oninput = function(){
        if (pointsUnready()){
          alertPoint();
        }else{
          rotateXVal.innerHTML = "Rotation around x axis: " + rotateXSlider.value;
          let cos = Math.cos(rotateXSlider.value);
          let sin = Math.sin(rotateXSlider.value);
          rotateXMatrix = new THREE.Matrix3().clone().set(1, 0, 0, 
                            0, 1 * cos.toFixed(2), 1 * sin.toFixed(2),
                            0, - sin.toFixed(2), 1 * cos.toFixed(2));
          // console.log(rotateXMatrix.elements)
          updateExtrinsicMatrix();
          updateCamMatrix();
          updatePersMatrix();
          updatePersPoints();
          updateCamPoints();
          CAM.camRenderDots(matrixToArray(camPointsMatrixHTML));
          PERS.persRenderDots(matrixToArray(persPointsMatrixHTML));
        }
    }
    rotateYSlider.oninput = function(){
      if (pointsUnready()){
        alertPoint();
      }else{
        rotateYVal.innerHTML = "Rotation around y axis: " + rotateYSlider.value;
        let cos = Math.cos(rotateYSlider.value);
        let sin = Math.sin(rotateYSlider.value);
        rotateYMatrix = new THREE.Matrix3().clone().set(1 * cos.toFixed(2), 0, 1 *  sin.toFixed(2),
                          0, 1, 0,
                          -  sin.toFixed(2), 0, 1 * cos.toFixed(2));
        updateExtrinsicMatrix();
        updateCamMatrix();
        updatePersMatrix();
        updatePersPoints();
        updateCamPoints();
        CAM.camRenderDots(matrixToArray(camPointsMatrixHTML));
        PERS.persRenderDots(matrixToArray(persPointsMatrixHTML));
      }
    }
    rotateZSlider.oninput = function(){
      if (pointsUnready()){
        alertPoint();
      }else{
        rotateZVal.innerHTML = "Rotation around z axis: " + rotateZSlider.value;
        let cos = Math.cos(rotateZSlider.value);
        let sin = Math.sin(rotateZSlider.value);
        rotateZMatrix = new THREE.Matrix3().clone().set(1 * cos.toFixed(2), - sin.toFixed(2), 0, 
                          1 *  sin.toFixed(2), 1 * cos.toFixed(2), 0, 
                          0, 0, 1)
        updateExtrinsicMatrix();
        updateCamMatrix();
        updatePersMatrix();
        updatePersPoints();
        updateCamPoints();
        CAM.camRenderDots(matrixToArray(camPointsMatrixHTML));
        PERS.persRenderDots(matrixToArray(persPointsMatrixHTML));
      }
    } 
    resetRotButton.onclick = function(){
      rotateXVal.innerHTML = "Rotation around x axis: 0";
      rotateYVal.innerHTML = "Rotation around y axis: 0";
      rotateZVal.innerHTML = "Rotation around z axis: 0";

      rotateXSlider.value = 0;
      rotateYSlider.value = 0;
      rotateZSlider.value = 0;
      rotateXMatrix = new THREE.Matrix3().set(1, 0, 0, 0, 1, 0, 0, 0, 1)
      rotateYMatrix = new THREE.Matrix3().set(1, 0, 0, 0, 1, 0, 0, 0, 1)
      rotateZMatrix = new THREE.Matrix3().set(1, 0, 0, 0, 1, 0, 0, 0, 1)

      updateExtrinsicMatrix();
      updateCamMatrix();
      updatePersMatrix();
      updatePersPoints();
      updateCamPoints();
      CAM.camRenderDots(matrixToArray(camPointsMatrixHTML));
      PERS.persRenderDots(matrixToArray(persPointsMatrixHTML));
    }

    translateXSlider.oninput = function(){
      if (pointsUnready()){
        alertPoint();
      }else{
        transXVal.innerHTML = "Translation in x direction: " + translateXSlider.value;
        extrinsicMatrixHTML[9].innerHTML = translateXSlider.value;
        transMatrixHTML[12].innerHTML = translateXSlider.value;
        updateCamMatrix();
        updatePersMatrix();
        updatePersPoints();
        updateCamPoints();
        CAM.camRenderDots(matrixToArray(camPointsMatrixHTML));
        PERS.persRenderDots(matrixToArray(persPointsMatrixHTML));
      }
    }
    translateYSlider.oninput = function(){
      if (pointsUnready()){
        alertPoint();
      }else{
        transYVal.innerHTML = "Translation in y direction: " + translateYSlider.value;
        extrinsicMatrixHTML[10].innerHTML = translateYSlider.value;
        transMatrixHTML[13].innerHTML = translateYSlider.value;
        updateCamMatrix();
        updatePersMatrix();
        updatePersPoints();
        updateCamPoints();
        CAM.camRenderDots(matrixToArray(camPointsMatrixHTML));
        PERS.persRenderDots(matrixToArray(persPointsMatrixHTML));
      }
    }
    translateZSlider.oninput = function(){
      if (pointsUnready()){
        alertPoint();
      }else{
        transZVal.innerHTML = "Translation in z direction: " + translateZSlider.value;
        extrinsicMatrixHTML[11].innerHTML = translateZSlider.value;
        transMatrixHTML[14].innerHTML = translateZSlider.value;
        updateCamMatrix();
        updatePersMatrix();
        updatePersPoints();
        updateCamPoints();
        CAM.camRenderDots(matrixToArray(camPointsMatrixHTML));
        PERS.persRenderDots(matrixToArray(persPointsMatrixHTML));
      }
    }
    resetTransButton.onclick = function(){
      transXVal.innerHTML = "Translation in x direction: 0";
      transYVal.innerHTML = "Translation in y direction: 0";
      transZVal.innerHTML = "Translation in z direction: 0";
      translateXSlider.value = 0;
      translateYSlider.value = 0;
      translateZSlider.value = 0;
      for (let i = 9; i < 12; i ++){
        extrinsicMatrixHTML[i].innerHTML = 0;
        transMatrixHTML[i + 3].innerHTML = 0;
      }
      updateExtrinsicMatrix();
      updateCamMatrix();
      updatePersMatrix();
      updatePersPoints();
      updateCamPoints();
      CAM.camRenderDots(matrixToArray(camPointsMatrixHTML));
      PERS.persRenderDots(matrixToArray(persPointsMatrixHTML));
    }
}
function updateExtrinsicMatrix(){
  console.log(rotateXMatrix.elements)
  console.log(rotateYMatrix.elements)
  console.log(rotateZMatrix.elements)
  let matrix = rotateXMatrix
  .multiply(rotateYMatrix)
  .multiply(rotateZMatrix)
  let elts = matrix.elements
  for (let i = 0; i < 9; i++) {
      extrinsicMatrixHTML[i].innerHTML = Math.round(elts[i] * 100) / 100;
  }
  transMatrixHTML[0].innerHTML = Math.round(elts[0] * 100) / 100;
  transMatrixHTML[1].innerHTML = Math.round(elts[1] * 100) / 100;
  transMatrixHTML[2].innerHTML = Math.round(elts[2] * 100) / 100;
  transMatrixHTML[4].innerHTML = Math.round(elts[3] * 100) / 100;
  transMatrixHTML[5].innerHTML = Math.round(elts[4] * 100) / 100;
  transMatrixHTML[6].innerHTML = Math.round(elts[5] * 100) / 100;
  transMatrixHTML[8].innerHTML = Math.round(elts[6] * 100) / 100;
  transMatrixHTML[9].innerHTML = Math.round(elts[7] * 100) / 100;
  transMatrixHTML[10].innerHTML = Math.round(elts[8] * 100) / 100;
}
export function updateCamMatrix() {
    let intrinsicMatrix = buildMatrix3to4( intrinsicMatrixHTML );
    let extrinsicMatrix = buildMatrix34( extrinsicMatrixHTML);
    let matrix = intrinsicMatrix
    .multiply(extrinsicMatrix);
    // (matrix.elements)
    for (let i =0; i<12; i ++){
      let row = i % 3;
      let col = parseInt(i / 3);
      cameraMatrixHTML[col * 3 + row].innerHTML = Math.round(matrix.elements[col * 4 + row] * 100) / 100;
      cameraMatrixMapHTML[col * 3 + row].innerHTML = Math.round(matrix.elements[col * 4 + row] * 100) / 100
    }
}
export function updatePersMatrix(){
    let orthoMatrix = buildMatrix44(orthoMatrixHTML);
    let projMatrix = buildMatrix44(projMatrixHTML);
    projMatrix.set(1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, Math.round(2/3 * 100) / 100, -Math.round(1/3 * 100) / 100,
      0, 0, - 1, 0);
    let persMatrix = buildMatrix44(persMatrixHTML);
    let scaleMatrix = buildMatrix44(scaleMatrixHTML);
    let transMatrix = buildMatrix44(transMatrixHTML);
    let matrix = orthoMatrix
    .multiply(projMatrix)
    .multiply(persMatrix)
    .multiply(scaleMatrix)
    .multiply(transMatrix);
    buildToHTML44(matrix, persProjMatrixHTML);
    buildToHTML44(matrix, persProjMatrixMapHTML);
}
export function updatePersPoints(){
  let persMatrix = buildMatrix44(persProjMatrixMapHTML);
  let persWorld = buildMatrix44(persWorldPointsHTML);
  let matrix = persMatrix.multiply(persWorld);
  for (let i = 0; i < 4; i ++){
    // x = matrix.elements[4 * i]
    // y = matrix.elements[4 * i + 1]
    // z = matrix.elements[4 * i + 3]
    // persPointsMatrixHTML[3 * i].innerHTML = Math.round(x / z * 100) / 100
    // persPointsMatrixHTML[3 * i + 1].innerHTML = Math.round(y / z * 100) / 100
    // persZ.innerHTML = Math.round(z * 100) / 100
    persPointsMatrixHTML[3 * i].innerHTML = Math.round(matrix.elements[4 * i] * 100) / 100
    persPointsMatrixHTML[3 * i + 1].innerHTML = Math.round(matrix.elements[4 * i + 1] * 100) / 100
    persZ.innerHTML = Math.round(matrix.elements[4 * i + 3] * 100) / 100
    // persPointsMatrixHTML[3 * i + 2].innerHTML = Math.round(matrix.elements[4 * i + 3] * 100) / 100
  }
}
export function updateCamPoints(){
  let camMatrix = buildMatrix34(cameraMatrixMapHTML);
  let camWorld = buildMatrix44(camWorldPointsHTML);
  let matrix = camMatrix.multiply(camWorld);
  for (let i = 0; i < 4 ; i ++){
    let x = matrix.elements[4 * i];
    let y = matrix.elements[4 * i + 1];
    let z = matrix.elements[4 * i + 2];
    // if (z == 0){
    //   camZ.innerHTML = 1;
    //   camPointsMatrixHTML[3 * i + 1].innerHTML = 0;
    //   camPointsMatrixHTML[3 * i + 2].innerHTML = 0;
    // }else{
      camPointsMatrixHTML[3 * i].innerHTML = Math.round(x   * 100) / 100 ;
      camPointsMatrixHTML[3 * i + 1].innerHTML = Math.round(y   * 100) / 100;
      camZ.innerHTML = Math.round(z * 100) / 100;
    // }
    // camPointsMatrixHTML[3 * i + 2].innerHTML = Math.round(matrix.elements[4 * i + 2] * 100) / 100;
  }
}
function buildMatrix33(matrixHTML) {
    let ret = new THREE.Matrix3();
    let arr = []
    for (let i = 0; i < 9; i++) {
        arr[i] = Math.round(matrixHTML[i].innerHTML * 100) / 100;
    }
    ret.set (arr[0], arr[3], arr[6],  
             arr[1], arr[4], arr[7],  
             arr[2], arr[5], arr[8]);
    return ret;

}
function buildMatrix3to4(matrixHTML){
  let ret = new THREE.Matrix4();
  let arr = [];
  for (let i = 0; i < 9; i++) {
    arr[i] = Math.round(matrixHTML[i].innerHTML * 100) / 100;
  }
  ret.set(arr[0], arr[3], arr[6], 0, 
          arr[1], arr[4], arr[7], 0,
          arr[2], arr[5], arr[8], 0,
          0, 0, 0, 1)
  return ret;
}
// function buildArray(matrixHTML, row, col){
//   let arr = []
//   for (let i = 0; i < row; i ++){
//     let section=[];
//     for (let j = 0; j < col; j ++ ){
//       section[j] = Math.round(matrixHTML[3*j+i] * 100) / 100;
//     }
//     arr[i] = section
//   }
// }
function buildMatrix34(matrixHTML) {
    let ret = new THREE.Matrix4();

    let arr = []
    for (let i = 0; i < 12; i++) {
        arr[i] = Math.round(matrixHTML[i].innerHTML * 100) / 100;
    }

    ret.set (arr[0], arr[3], arr[6],  arr[9],
             arr[1], arr[4], arr[7],  arr[10],
             arr[2], arr[5], arr[8], arr[11],
             0, 0, 0, 1);
    
    return ret;
}
function buildMatrix44(matrixHTML) {
    let ret = new THREE.Matrix4();

    let arr = []
    for (let i = 0; i < 16; i++) {
        arr[i] = Math.round(matrixHTML[i].innerHTML * 100) / 100;
    }

    ret.set (arr[0], arr[4], arr[8],  arr[12],
             arr[1], arr[5], arr[9],  arr[13],
             arr[2], arr[6], arr[10], arr[14],
             arr[3], arr[7], arr[11], arr[15]);
    
    return ret;
}
function buildToHTML44(mat, matrixHTML) {
    let arr= mat.toArray();
    for (let i = 0; i < 16; i++) {
        arr[i] = Math.round(arr[i] * 100) / 100;
    }
    matrixHTML[0].innerHTML = arr[0];
    matrixHTML[1].innerHTML = arr[1];
    matrixHTML[2].innerHTML = arr[2];
    matrixHTML[3].innerHTML = arr[3];
    matrixHTML[4].innerHTML = arr[4];
    matrixHTML[5].innerHTML = arr[5];
    matrixHTML[6].innerHTML = arr[6];
    matrixHTML[7].innerHTML = arr[7];
    matrixHTML[8].innerHTML = arr[8];
    matrixHTML[9].innerHTML = arr[9];
    matrixHTML[10].innerHTML = arr[10];
    matrixHTML[11].innerHTML = arr[11];
    matrixHTML[12].innerHTML = arr[12];
    matrixHTML[13].innerHTML = arr[13];
    matrixHTML[14].innerHTML = arr[14];
    matrixHTML[15].innerHTML = arr[15];
}
function buildToHTML34(mat, matrixHTML) {
    let arr= mat.toArray();
    for (let i = 0; i < 12; i++) {
        arr[i] = Math.round(arr[i] * 100) / 100;
    }
    matrixHTML[0].innerHTML = arr[0];
    matrixHTML[1].innerHTML = arr[1];
    matrixHTML[2].innerHTML = arr[2];
    matrixHTML[3].innerHTML = arr[3];
    matrixHTML[4].innerHTML = arr[4];
    matrixHTML[5].innerHTML = arr[5];
    matrixHTML[6].innerHTML = arr[6];
    matrixHTML[7].innerHTML = arr[7];
    matrixHTML[8].innerHTML = arr[8];
    matrixHTML[9].innerHTML = arr[9];
    matrixHTML[10].innerHTML = arr[10];
    matrixHTML[11].innerHTML = arr[11];
}
export function matrixToArray(matrixHTML){
  // for projected points, + dehomogenization
  let arr = [];
  for (let i = 0; i < 4; i ++ ){
    // arr[2 * i] = matrixHTML[3 * i].innerHTML / matrixHTML[3 * i + 2].innerHTML;
    // arr[2 * i + 1] = matrixHTML[3 * i + 1].innerHTML/ matrixHTML[3 * i + 2].innerHTML;
    arr[2 * i] = matrixHTML[3 * i].innerHTML;
    arr[2 * i + 1] = matrixHTML[3 * i + 1].innerHTML;
  }
  return arr;
}
