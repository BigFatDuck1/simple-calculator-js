
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

//Test
//console.log(operate("3*5"))

//On start, set display text to = 0
let switchOn = () => {
    document.querySelector(".display_text").textContent = 0;
}
switchOn();

//Set display to equal whatever button is pressed
let buttonPressed = () => {

    let all_buttons = document.querySelectorAll(".num");
    //Attach eventListener to each and every button
    all_buttons.forEach((element) => {        
        element.addEventListener("click", function() {
            //console.log(this.id);
            let digit_pressed = this.id;
            let display_text = document.querySelector(".display_text").textContent;

            if (display_text == 0) {
                document.querySelector(".display_text").textContent = digit_pressed;
            }
            else {
                document.querySelector(".display_text").textContent += digit_pressed;
            }

        });
    })

}
buttonPressed();