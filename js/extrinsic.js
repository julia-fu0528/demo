const extrinsicMatrixHTML = document.getElementById('extrinsic').getElementsByTagName('span');
const transMatrixHTML = document.getElementById('transformation').getElementsByTagName('span');
const cameraMatrixHTML = document.getElementById('camera-proj').getElementsByTagName('span');
const persMatrixHTML = document.getElementById('pers-proj').getElementsByTagName('span');

const orthoMatrixHTML = document.getElementById('ortho-proj').getElementsByTagName('span');
const projMatrixHTML = document.getElementById('proj-matrix').getElementsByTagName('span');
const scaleMatrixHTML = document.getElementById('scale-matrix').getElementsByTagName('span');
const intrinsicMatrixHTML = document.getelementbyid('intrinsic').getElementsByTagName('span');

const rotateXSlider = document.getElementById('rotateX')
const rotateYSlider = document.getElementById('rotateY')
const rotateZSlider = document.getElementById('rotateZ')
const translateXSlider = document.getElementById('translateX')
const translateYSlider = document.getElementById('translateY')
const translateZSlider = document.getElementById('translateZ')

function buildEventListeners(){

}
function updateCamMatrix() {
    let intrinsicMatrix = buildMatrix33( intrinsicMatrixHTML );
    let extrinsicMatrix = buildMatrix34( extrinsicMatrixHTML );
    matrix = intrinsicMatrix
    .multiply(extrinsicMatrix);
    buildToHTML34(matrix, cameraMatrixHTML)
}
function updatePersMatrix(){
    let orthoMatrix = buildMatrix44(orthoMatrixHTML);
    let projMatrix = buildMatrix44(projMatrixHTML);
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