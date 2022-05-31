//add event listener to "collect" digits for the first number
//once operator is pressed, the first digit is passed to another var and the next digit is calculated

let btns = document.querySelectorAll(".num");
let operatorList = document.querySelectorAll(".op");
let cached = document.querySelector(".history");
let digit = document.querySelector(".numDisplay");
let equals = document.querySelector(".equals");
let calcComplete = false;
let clearBtn = document.querySelector(".backBtn1");
let del = document.querySelector(".backBtn2");


clearBtn.addEventListener("click",clear);
del.addEventListener("click", deleteDigit);
btns.forEach(btns => btns.addEventListener('click', numEvent));
operatorList.forEach( operatorList => operatorList.addEventListener('click', function() {
    cache(digit.innerHTML,operatorList.value);
}));

equals.addEventListener("click", operate);

function operate(){
    let funct = cached.innerHTML + " " + digit.innerHTML;
    cached.innerHTML = funct + " =";
    digit.innerHTML = parseCalc(funct);
}

function parseCalc(calc){
    return new Function ('return ' + calc)();
}

function numEvent(e) {
    digit.innerHTML += e.target.value;
}

function cache(num,op){
    //build the string to be executed by the parseCalc function
    let cachFunc = num + " " + op;
    cached.innerHTML = cachFunc;
    digit.innerHTML = "";
}

function clear(){
    digit.innerHTML = "";
    cached.innerHTML = "";
}

function deleteDigit(){
    let output = digit.innerHTML.slice(0,-1);
    console.log(output);
    digit.innerHTML = output;
}