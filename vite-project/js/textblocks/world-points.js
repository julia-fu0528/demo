import * as CAM from '../canvas/cam-canvas.js';
import * as PERS from '../canvas/pers-canvas.js';
import * as RENDER from '../render.js';

const submit = document.getElementById('submit');


function project(){
    if (RENDER.pointsUnready()){
        RENDER.alertPoint();
     }else{
        // perspective projection matrix
        RENDER.persWorldPointsHTML[0].innerHTML = RENDER.firstX.value;
        RENDER.persWorldPointsHTML[1].innerHTML = RENDER.firstY.value;
        RENDER.persWorldPointsHTML[2].innerHTML = RENDER.firstZ.value;

        RENDER.persWorldPointsHTML[4].innerHTML = RENDER.secondX.value;
        RENDER.persWorldPointsHTML[5].innerHTML = RENDER.secondY.value;
        RENDER.persWorldPointsHTML[6].innerHTML = RENDER.secondZ.value;

        RENDER.persWorldPointsHTML[8].innerHTML = RENDER.thirdX.value;
        RENDER.persWorldPointsHTML[9].innerHTML = RENDER.thirdY.value;
        RENDER.persWorldPointsHTML[10].innerHTML = RENDER.thirdZ.value;

        RENDER.persWorldPointsHTML[12].innerHTML = RENDER.fourthX.value;
        RENDER.persWorldPointsHTML[13].innerHTML = RENDER.fourthY.value;
        RENDER.persWorldPointsHTML[14].innerHTML = RENDER.fourthZ.value;

        // camera projection matrix
        RENDER.camWorldPointsHTML[0].innerHTML = RENDER.firstX.value;
        RENDER.camWorldPointsHTML[1].innerHTML = RENDER.firstY.value;
        RENDER.camWorldPointsHTML[2].innerHTML = RENDER.firstZ.value;

        RENDER.camWorldPointsHTML[4].innerHTML = RENDER.secondX.value;
        RENDER.camWorldPointsHTML[5].innerHTML = RENDER.secondY.value;
        RENDER.camWorldPointsHTML[6].innerHTML = RENDER.secondZ.value;

        RENDER.camWorldPointsHTML[8].innerHTML = RENDER.thirdX.value;
        RENDER.camWorldPointsHTML[9].innerHTML = RENDER.thirdY.value;
        RENDER.camWorldPointsHTML[10].innerHTML = RENDER.thirdZ.value;

        RENDER.camWorldPointsHTML[12].innerHTML = RENDER.fourthX.value;
        RENDER.camWorldPointsHTML[13].innerHTML = RENDER.fourthY.value;
        RENDER.camWorldPointsHTML[14].innerHTML = RENDER.fourthZ.value;
        
        RENDER.updateCamPoints();
        RENDER.updatePersPoints();

        // CAM.camRenderDots([firstX.value, firstY.value, 
        //                     secondX.value, secondY.value,
        //                 thirdX.value, thirdY.value,
        //                     fourthX.value, fourthY.value]);
        // PERS.persRenderDots([firstX.value, firstY.value, 
        //                     secondX.value, secondY.value,
        //                 thirdX.value, thirdY.value,
        //                     fourthX.value, fourthY.value]); 
        CAM.camRenderDots(RENDER.matrixToArray(RENDER.camPointsMatrixHTML));
        PERS.persRenderDots(RENDER.matrixToArray(RENDER.persPointsMatrixHTML));
        }             
}

export function buildEventListeners(){
    submit.addEventListener('click', project);

    RENDER.firstX.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){
            RENDER.firstY.focus();
        }
    })
    RENDER.firstY.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){
            RENDER.firstZ.focus();
        }
    })
    RENDER.firstZ.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){
            RENDER.secondX.focus();
        }
    })
    RENDER.secondX.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){
            RENDER.secondY.focus();
        }
    })
    RENDER.secondY.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){
            RENDER.secondZ.focus();
        }
    })
    RENDER.secondZ.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){
            RENDER.thirdX.focus();
        }
    })
    RENDER.thirdX.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){
            RENDER.thirdY.focus();
        }
    })
    RENDER.thirdY.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){
            RENDER.thirdZ.focus();
        }
    })
    RENDER.thirdZ.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){
            RENDER.fourthX.focus();
        }
    })
    RENDER.fourthX.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){
            RENDER.fourthY.focus();
        }
    })
    RENDER.fourthY.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){
            RENDER.fourthZ.focus();
        }
    })
    RENDER.fourthZ.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){
            submit.click();
        }
    })
}

