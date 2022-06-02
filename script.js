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


window.addEventListener("keydown",operatorKey);

clearBtn.addEventListener("click",clear);
del.addEventListener("click", deleteDigit);
btns.forEach(btns => btns.addEventListener('click', numEvent));
operatorList.forEach( operatorList => operatorList.addEventListener('click', function() {
    cache(operatorList.value);
}));

equals.addEventListener("click", function () {operate(digit.value)});

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
    
    if (calc.includes("\ 0") || calc.includes("/0")){
        return "error";
    }
    return new Function ('return ' + calc)();
}

function numEvent(e) {
    digit.value += e.target.value;
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
    console.log(key)
    let symbols = ['*','+','/','.','-'];
    if (isNaN(Number(key)) && symbols.includes(key) === false){
        e.preventDefault();
    }
    if (key === "Enter"){
        console.log("asdf");
        operate(digit.value);
        
    }
    if (key === "Backspace"){
        deleteDigit();
    }
    if (symbols.includes(key) === true){
        cache(key);
        e.preventDefault();
    }
    
    
}