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
    //Attach eventListener to each and every number button
    all_buttons.forEach((element) => {        
        element.addEventListener("click", function() {
            //Convert decimal button to output "." instead of "decimal"
            if (this.id == "decimal") {
                this.id = ".";
            } 
            //Stores the number that was pressed into a variable
            let digit_pressed = this.id;
            //The only purpose of this line is to make sure the 0 goes away when you press on any number
            //instead of being concatenated onto the display (i.e. instead of 023 it becomes 0->23)
            let display_text = document.querySelector(".display_text").textContent;
            if (display_text == 0) {
                document.querySelector(".display_text").textContent = digit_pressed;
                //storeDisplay() stores what is on the display into var display_value 
                storeDisplay();
            }
            else {
                document.querySelector(".display_text").textContent += digit_pressed;
                storeDisplay();
            }
            //Concatenate the button pressed (this.id), NOT the display_value, otherwise
            //it would give duplicate numbers e.g. 56 becomes 556
            number_string += this.id;
            console.log(number_string);
            console.log(number_string.split(/[+-/*/]/));

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
            
            //1. Clear display value so it can store the next set of numbers
            //May consider adding a small indicator icon
            document.querySelector(".display_text").textContent = 0;
            display_value = 0; //0 instead of "" because it stores intergers/floats, not strings (unlike number_string)
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
                    //TODO: return here to display value and not run operate? 
                    break;    
            }
            
        })
    })

}
doOperation();