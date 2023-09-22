
//Create functions for add, subtract, multiply, divide
let add = (a,b) => {
    return a + b;
}

let subtract = (a,b) => {
    return a - b;
}

let multiply = (a,b) => {
    return a * b;
}

let divide = (a,b) => {
    if (b == 0) {
        return "error";
    }
    return a / b;
}

//Function that takes 2 numbers and an operator
let operate = ([...arg]) => { //Spread the arguments into individual elements

    let a = parseInt(arg[0]);
    let operator = arg[1];
    let b = parseInt(arg[2]);
    //console.log(arg);
    let result = 0;

    switch (operator) {
        case "+":
            result = add(a,b);
            break;
        case "-":
            result = subtract(a,b);
            break;
        case "*":
            result = multiply(a,b);
            break;
        case "/":
            result = divide(a,b);
            break;
    }

    return result;

}

console.log(operate("3*5"))