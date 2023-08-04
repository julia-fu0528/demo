const coordinate = document.getElementById('first-x');
const btn1 = document.getElementById('coordinate');
const out1 = document.getElementById('output1');

function fun1(){
    out1.innerHTML = coordinate.value;
}

btn1.addEventListener('click', fun1);