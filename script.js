//add event listener to "collect" digits for the first number
//once operator is pressed, the first digit is passed to another var and the next digit is calculated





function parseCalc(calc){
    return new Function ('return ' + calc)();
}
console.log(parseCalc("2+2"));