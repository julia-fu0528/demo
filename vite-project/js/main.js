import '../style.css'

import * as THREE from 'three';
// import * as np from 'numpy';

const extrinsicMatrixHTML = document.getElementById('extrinsic').getElementsByTagName('span');
const transMatrixHTML = document.getElementById('transformation').getElementsByTagName('span');
const cameraMatrixHTML = document.getElementById('camera-proj').getElementsByTagName('span');
const cameraMatrixMapHTML = document.getElementById('camera-proj-map').getElementsByTagName('span');
const persProjMatrixHTML = document.getElementById('pers-proj').getElementsByTagName('span');
const persProjMatrixMapHTML = document.getElementById('pers-proj-map').getElementsByTagName('span');

const orthoMatrixHTML = document.getElementById('ortho-proj').getElementsByTagName('span');
const projMatrixHTML = document.getElementById('proj-matrix').getElementsByTagName('span');
const persMatrixHTML = document.getElementById('pers-matrix').getElementsByTagName('span');
const scaleMatrixHTML = document.getElementById('scale-matrix').getElementsByTagName('span');
const intrinsicMatrixHTML = document.getElementById('intrinsic').getElementsByTagName('span');

const rotateXSlider = document.getElementById('rotateX')
const rotateYSlider = document.getElementById('rotateY')
const rotateZSlider = document.getElementById('rotateZ')
const translateXSlider = document.getElementById('translateX')
const translateYSlider = document.getElementById('translateY')
const translateZSlider = document.getElementById('translateZ')

let rotateXMatrix = new THREE.Matrix3();
rotateXMatrix.set(1, 0, 0, 
                  0, 1, 0,
                  0, 0, 1);
let rotateYMatrix = new THREE.Matrix3();
rotateYMatrix.set(1, 0, 0, 
  0, 1, 0,
  0, 0, 1);
let rotateZMatrix = new THREE.Matrix3();
rotateZMatrix.set(1, 0, 0, 
  0, 1, 0,
  0, 0, 1);

buildEventListeners();

function buildEventListeners(){
    rotateXSlider.oninput = function(){
        let cos = Math.cos(rotateXSlider.value);
        let sin = Math.sin(rotateXSlider.value);
        rotateXMatrix.set(1, 0, 0, 
                          0, 1 * cos.toFixed(2), 1 * sin.toFixed(2),
                          0, -sin.toFixed(2), 1 * cos.toFixed(2));

        updateExtrinsicMatrix();
        updateCamMatrix();
        updatePersMatrix();
    }
    rotateYSlider.oninput = function(){
      let cos = Math.cos(rotateYSlider.value);
      let sin = Math.sin(rotateYSlider.value);
      rotateYMatrix.set(1 * cos.toFixed(2), 0, -sin.toFixed(2),
                        0, 1, 0,
                        1 * sin.toFixed(2), 0, 1 * cos.toFixed(2));
      updateExtrinsicMatrix();
      updateCamMatrix();
      updatePersMatrix();
    }
    rotateZSlider.oninput = function(){
      let cos = Math.cos(rotateZSlider.value);
      let sin = Math.sin(rotateZSlider.value);
      rotateZMatrix.set(1 * cos.toFixed(2), 1 * sin.toFixed(2), 0, 
                        -sin.toFixed(2), 1 * cos.toFixed(2), 0, 
                        0, 0, 1)
      updateExtrinsicMatrix();
      updateCamMatrix();
      updatePersMatrix();
    }
    translateXSlider.oninput = function(){
      extrinsicMatrixHTML[9].innerHTML = translateXSlider.value;
      transMatrixHTML[12].innerHTML = translateXSlider.value;
      updateCamMatrix();
      updatePersMatrix();
    }
    translateYSlider.oninput = function(){
      extrinsicMatrixHTML[10].innerHTML = translateYSlider.value;
      transMatrixHTML[13].innerHTML = translateYSlider.value;
      updateCamMatrix();
      updatePersMatrix();
    }
    translateZSlider.oninput = function(){
      extrinsicMatrixHTML[11].innerHTML = translateZSlider.value;
      transMatrixHTML[14].innerHTML = translateZSlider.value;
      updateCamMatrix();
      updatePersMatrix();
    }
}
function updateExtrinsicMatrix(){
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
function updateCamMatrix() {
    let intrinsicMatrix = buildMatrix3to4( intrinsicMatrixHTML );
    let extrinsicMatrix = buildMatrix34( extrinsicMatrixHTML);
    let matrix = intrinsicMatrix
    .multiply(extrinsicMatrix);
    for (let i =0; i<12; i ++){
      let row = i % 3;
      let col = parseInt(i / 3);
      cameraMatrixHTML[col * 3 + row].innerHTML = Math.round(matrix.elements[col * 4 + row] * 100) / 100;
      cameraMatrixMapHTML[col * 3 + row].innerHTML = Math.round(matrix.elements[col * 4 + row] * 100) / 100
    }
}
function updatePersMatrix(){
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
  // for (let i = 0; i < 3; i ++){
  //   for (let j = 0; j < 3; j ++ ){
  //     arr[i * 4 + j] = Math.round(matrixHTML[i * 3 + j].innerHTML * 100) / 100
  //   }
  //   arr[i * 4 + 3] = 0
  // }
  // for (let j = 0; j < 3; j ++ ){
  //   arr[12 + j] = 0
  // }
  // arr[15] = 1;
  for (let i = 0; i < 9; i++) {
    arr[i] = Math.round(matrixHTML[i].innerHTML * 100) / 100;
  }
  ret.set(arr[0], arr[3], arr[6], 0, 
          arr[1], arr[4], arr[7], 0,
          arr[2], arr[5], arr[8], 0,
          0, 0, 0, 1)
  return ret;
}
function buildArray(matrixHTML, row, col){
  let arr = []
  for (let i = 0; i < row; i ++){
    let section=[];
    for (let j = 0; j < col; j ++ ){
      section[j] = Math.round(matrixHTML[3*j+i] * 100) / 100;
    }
    arr[i] = section
  }
}
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