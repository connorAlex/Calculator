
//  Odin Project Calculator

let btns = document.querySelectorAll(".num");
let operatorList = document.querySelectorAll(".op");
let cached = document.querySelector(".history");
let digit = document.querySelector(".numDisplay");
let equals = document.querySelector(".equals");
let clearBtn = document.querySelector(".backBtn1");
let del = document.querySelector(".backBtn2");

//add event listeners
window.addEventListener("keydown",operatorKey);
clearBtn.addEventListener("click",clear);
del.addEventListener("click", deleteDigit);
equals.addEventListener("click", function () {operate(digit.value)});

//forEach to add to buttons 0-9
btns.forEach(btns => btns.addEventListener('click', numEvent));
operatorList.forEach( operatorList => operatorList.addEventListener('click', function() {
    cache(operatorList.value);
}));

//  Functions


function operate(value){
    let funct = cached.innerHTML + " " + value;
    cached.innerHTML = funct + " =";
    let output = parseCalc(funct);
    if (output === "error"){
        digit.value = "";
        cached.innerHTML = "";
    }
    else{
        digit.value = parseCalc(funct);
    }
    
    
}

function parseCalc(calc){
    //calculate the entered string as real function. 
    //Safety measures are taken place in operatorKey()

    if (calc.includes("/ 0") || calc.includes("/ 0")){
        console.log("div 0");
        return "error";
    }
    return new Function ('return ' + calc)();
}

function numEvent(e) {
    let num = digit.value;
    if (!num.includes(".") || e.target.value !== "."){
        digit.value += e.target.value;
    }
    
}

function cache(op){
    //build the string to be executed by the parseCalc function
    let cachFunc = digit.value + " " + op;
    cached.innerHTML = cachFunc;
    digit.value = "";
}

function clear(){
    digit.value = "";
    cached.innerHTML = "";
}

function deleteDigit(){
    let output = digit.value.slice(0,-1);
    digit.value = output;
}

function operatorKey(e){
    let key = e.key;
    let symbols = ['*','+','/','-','.'];
    let hasPeriod = digit.value.includes(".");

    console.log(hasPeriod);

    //verify the key is either a number or selected symbol
    if (isNaN(Number(key)) && symbols.includes(key) === false || e.keyCode === 32){
        e.preventDefault();
    }
    if (hasPeriod === true && key === "."){
        e.preventDefault();
    }
    if (key === "Enter"){
        operate(digit.value);
    }
    if (key === "Backspace"){
        deleteDigit();
    }
    if (symbols.includes(key) === true){
        if (key !== "."){
            cache(key);
        }
    }
    
    
}