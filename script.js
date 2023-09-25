//number_string stores all user inputs into a string for future operations
let number_string = "";

//Variable that stores display value
let display_value = 0;

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

//Function that stores display value into display_value variable
let storeDisplay = () => {
    display_value = document.querySelector(".display_text").textContent;
}

//Set display to equal whatever button is pressed
let buttonPressed = () => {

    let all_buttons = document.querySelectorAll(".num");
    //Attach eventListener to each and every button
    all_buttons.forEach((element) => {        
        element.addEventListener("click", function() {
            //console.log(this.id);
            if (this.id == "decimal") {
                console.log(this.id);
                this.id = ".";
            } 
            let digit_pressed = this.id;
            let display_text = document.querySelector(".display_text").textContent;

            if (display_text == 0) {
                document.querySelector(".display_text").textContent = digit_pressed;
                storeDisplay();
            }
            else {
                document.querySelector(".display_text").textContent += digit_pressed;
                storeDisplay();
            }

        });
    })

}
buttonPressed();

//Operation 
number_string = ""; //This is a string that will be fed into the operate() function

let doOperation = () => {

    //Add EventListener for all operator buttons
    let all_operators = document.querySelectorAll(".operator");
    all_operators.forEach((element) => {
        element.addEventListener(("click"), function() {
            //1. Store the displayed number into the number_string
            number_string += display_value;
            //1.2 Clear display value so it can store the next set of numbers
            //May consider adding a small indicator icon
            document.querySelector(".display_text").textContent = 0;
            display_value = "";
            //2. Append the operator into the string
            switch (this.id) {
                case ("add"):
                    number_string += "+";
                    break;
                case ("subtract"):
                    number_string += "-";
                    break;
                case ("multiply"):
                    number_string += "*";
                    break;
                case ("divide"):
                    number_string += "/";
                    break;
                //If user pressed equal, complete the appending the string
                case ("equal"):
                    number_string += display_value;
                    number_string = operate(number_string);
                    console.log(number_string);
                    //TODO: return here to display value and not run operate? 
                    break;    
            }
            
            console.log("number_string: " + number_string);
        })
    })

}
doOperation();