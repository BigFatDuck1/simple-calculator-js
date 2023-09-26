//number_string stores all user inputs into a string for future operations
let number_string = "";

//Some arrays for comparison purposes
let operators_array = ["+", "-", "*", "/"];
let arabic_number_array = [];
for (i = 0; i < 10; i++) {
    arabic_number_array.push(i.toString());
}

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
    //The string passed into operate is all split up, so "100+50" becomes ["1", "0"...]
    //Fix the string so it merges a single number into a three-digit number instead of three separate elements
    let temp_arg = [];
    let temp_concat_number = "";
    let temp_counter = 0;
    arg.forEach((element) => {
        temp_counter += 1; //First element, Second element, nth element...
        if (arabic_number_array.includes(element)) {
            temp_concat_number += element;
            if (temp_counter == arg.length) { //If last element, push into array as there are no more symobls left
                temp_arg.push(temp_concat_number);
            }
        }
        else if (operators_array.includes(element)) {
            temp_arg.push(temp_concat_number);
            temp_concat_number = ""; //Reset so it can store next number
            temp_arg.push(element); //Now push the symbol into the array
        }
    })
    arg = temp_arg; //Overwrite original arguments passed to operate()

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

//show_answer is a "switch" - if the currently displayed value is the result of an operation,
//then overwrite instead of concatenate e.g. 5 + 6 when press + again displays 11, if the next key pressed
//is 5, instead of showing 115 show just 5
let show_answer = 0; //not showing an answer

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
            else if (show_answer == 0) {
                document.querySelector(".display_text").textContent += digit_pressed;
                storeDisplay();
            }
            else if (show_answer == 1) {
                document.querySelector(".display_text").textContent = digit_pressed;
                storeDisplay();
                show_answer = 0; //Reset the switch, because the next button press should be concatenated
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

//Call this function to 
//1. Check if there is only 2 numbers and 1 operator sandwiched in between
//If yes, then operate() can be called as it takes ("a+b") and checks what operator in between
//2. Therefore, call operator() if the arguments fit the pattern accepted by operate()
let checkAndCallOperate = () => {
    let split_number_string = number_string.split(/[+-/*/]/);
    if (split_number_string.length == 2) {
        number_string = operate(number_string);
    }
} 

//Operation 
number_string = ""; //This is a string that will be fed into the operate() function

let doOperation = () => {

    //Add EventListener for all operator buttons
    let all_operators = document.querySelectorAll(".operator");
    all_operators.forEach((element) => {
        element.addEventListener(("click"), function() {

            //1. Whenever any operator button is pressed, check if the previous presses resulted in a string
            //that you can call operate() on 
            checkAndCallOperate();
            console.log(number_string, " is number_string");
            //2. Set display to equal answer after pressing another operator
            display_value = document.querySelector(".display_text").textContent = number_string.toString();
            show_answer = 1; //This is an answer that is being shown, not something the user inputted
            //3. Append the operator into the string
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
            }
            
        })
    })

}
doOperation();