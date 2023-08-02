import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

import * as THREE from 'three';

const extrinsicMatrixHTML = document.getElementById('extrinsic').getElementsByTagName('span');
const transMatrixHTML = document.getElementById('transformation').getElementsByTagName('span');
const cameraMatrixHTML = document.getElementById('camera-proj').getElementsByTagName('span');
const persMatrixHTML = document.getElementById('pers-proj').getElementsByTagName('span');

const orthoMatrixHTML = document.getElementById('ortho-proj').getElementsByTagName('span');
const projMatrixHTML = document.getElementById('proj-matrix').getElementsByTagName('span');
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
        // var r21 = parseInt(extrinsicMatrixHTML[1].innerHTML);
        // var r22 = parseInt(extrinsicMatrixHTML[4].innerHTML);
        // var r23 = parseInt(extrinsicMatrixHTML[7].innerHTML);
        // var r31 = parseInt(extrinsicMatrixHTML[2].innerHTML);
        // var r32 = parseInt(extrinsicMatrixHTML[5].innerHTML);
        // var r33 = parseInt(extrinsicMatrixHTML[8].innerHTML);

        // extrinsicMatrixHTML[1].innerHTML = (cos * r21 - sin * r31).toFixed(2);
        // extrinsicMatrixHTML[4].innerHTML = (cos * r22 - sin * r32).toFixed(2);
        // extrinsicMatrixHTML[7].innerHTML = (cos * r23 - sin * r33).toFixed(2);
        // extrinsicMatrixHTML[2].innerHTML = (sin * r21 + cos * r31).toFixed(2);
        // extrinsicMatrixHTML[5].innerHTML = (sin * r22 + cos * r32).toFixed(2);
        // extrinsicMatrixHTML[8].innerHTML = (sin * r23 + cos * r33).toFixed(2);

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
    let intrinsicMatrix = buildMatrix33( intrinsicMatrixHTML );
    let extrinsicMatrix = new THREE.Matrix4();
    console.log(extrinsicMatrixHTML.elements);
    extrinsicMatrix[0].innerHTML = 
    extrinsicMatrix.set(extrinsicMatrixHTML.toArray[0],extrinsicMatrixHTML.toArray[3], extrinsicMatrixHTML.toArray[6],extrinsicMatrixHTML.toArray[9],
                        extrinsicMatrixHTML.toArray[1],extrinsicMatrixHTML.toArray[4], extrinsicMatrixHTML.toArray[7],extrinsicMatrixHTML.toArray[10],
                        extrinsicMatrixHTML.toArray[2],extrinsicMatrixHTML.toArray[5], extrinsicMatrixHTML.toArray[8],extrinsicMatrixHTML.toArray[11],
                        extrinsicMatrixHTML.toArray[3],extrinsicMatrixHTML.toArray[6], extrinsicMatrixHTML.toArray[9],extrinsicMatrixHTML.toArray[12]);
    let matrix = intrinsicMatrix
    .multiply(extrinsicMatrix);
    // console.log(matrix.toArray())
    for (let i = 0 ; i < 12 ; i ++){
      cameraMatrixHTML[i].innerHTML = Math.round(matrix.elements[i] * 100) / 100;
    }
    // buildToHTML34(matrix, cameraMatrixHTML)
}
function updatePersMatrix(){
    let orthoMatrix = buildMatrix44(orthoMatrixHTML);
    let projMatrix = buildMatrix44(projMatrixHTML);
    projMatrix.set(1, 0, 0, 0,
                  0, 1, 0, 0,
                  0, 0, Math.round(2/3 * 100) / 100, -1,
                  0, 0, - Math.round(1/3 * 100) / 100, 0);
    let scaleMatrix = buildMatrix44(scaleMatrixHTML);
    let transMatrix = buildMatrix44(transMatrixHTML);
    let matrix = orthoMatrix
    .multiply(projMatrix)
    .multiply(scaleMatrix)
    .multiply(transMatrix);
    // for (let i = 0; i < 16; i ++){
    //   persMatrixHTML[i].innerHTML = Math.round(matrix.elements[i] * 100) / 100;
    // }
    buildToHTML44(matrix, persMatrixHTML);
}
function buildMatrix33(matrixHTML) {
    let ret = new THREE.Matrix4();
    let arr = []
    for (let i = 0; i < 9; i++) {
        arr[i] = Math.round(matrixHTML[i].innerHTML * 100) / 100;
    }
    ret.set (arr[0], arr[3], arr[6],  
             arr[1], arr[4], arr[7],  
             arr[2], arr[5], arr[8]);
    return ret;

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