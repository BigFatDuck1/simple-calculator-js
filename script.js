//number_string stores all user inputs into a string for future operations
let number_string = "";
//Store all user input into a variable
let input_log = ""; 

//Did the user press equal 
let after_pressed_equal = 0;

//Some arrays for comparison purposes
let operators_array = ["+", "-", "*", "/"];
let arabic_number_array = [];
for (i = 0; i < 10; i++) {
    arabic_number_array.push(i.toString());
    arabic_number_array.push(".")
}

//Variable that stores display value
let display_value = "0";

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
        return "Error";
    }
    if (a % b != 0) { //If not completely divisible i.e. returns a remainder, round the number 
        let answer = a / b;
        return answer.toFixed(10);
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
        if (element == "-") {
            temp_concat_number += element;
        }
        else if (arabic_number_array.includes(element)) {
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
    console.log(temp_arg);
    arg = temp_arg; //Overwrite original arguments passed to operate()

    let a = parseFloat(arg[0]);
    let operator = arg[1];
    let b = parseFloat(arg[2]);
    
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

//Functions that change the input_log display at the top of the calculator
let logAppend = (str) => {
    document.querySelector(".input_log").textContent += str;
}
let logClear = () => {
    document.querySelector(".input_log").textContent = "";
}

//On start, set display text to = 0
let switchOn = () => {
    document.querySelector(".display_text").textContent = 0;
    logClear();
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
            //*Decimal point bugs
            //If there is already a decimal point in the number, exit the function, don't let user enter anything
            if (this.id == "decimal") {
                if (display_value.includes(".") == true) {
                    return "Already has decimal point in number, block input";
                }

            } 

            //Clear everything if the previous button press was equal 
            if (after_pressed_equal == 1) {
                after_pressed_equal = 0;
                allClear();
            }

            //Convert decimal button to output "." instead of "decimal"
            // if (this.id == "decimal") {
            //     this.id = ".";
            // } 
            //Stores the number that was pressed into a variable
            let digit_pressed = this.id;
            if (this.id == "decimal") {
                digit_pressed = ".";
            }
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
            if (this.id == "decimal") {
                number_string += ".";
                logAppend(".");
            } 
            else {
                number_string += this.id;
                logAppend(this.id);
            }

        });
    })

}
buttonPressed();

//Call this function to 
//1. Check if there is only 2 numbers and 1 operator sandwiched in between
//If yes, then operate() can be called as it takes ("a+b") and checks what operator in between
//2. Therefore, call operator() if the arguments fit the pattern accepted by operate()
let checkAndCallOperate = () => {
    let temp_num_str = "";
    let split_number_string = [];
    //split_number_string contains number_string stripped of all its operators
    //Old version uses regex, but cannot handle decimal points
    //let split_number_string = number_string.toString().split(/[+-/*/]/);
    let length_of_number_string = number_string.toString().split("").length;
    let x = 0;
    number_string.toString().split("").forEach((element) => {
        x += 1; //This is the nth item in number_string
        if (operators_array.includes(element) && x != 1) {
            split_number_string.push(temp_num_str);
            temp_num_str = ""; //Reset for next number
        }
        else if (element == 1 && x == 1) { //If this first character is -, append - to the number
            temp_num_str += "-";
        }
        else {
            temp_num_str += element;
            if (x == length_of_number_string) {
                split_number_string.push(temp_num_str);
            }
        }
    });

    console.log(split_number_string)
    //Check if, when stripped of all its operators, whether the string contains two numbers only
    //If yes, do the calculation
    if (split_number_string.length == 2) {
        number_string = operate(number_string);
        number_string = number_string.toString();
    }
    return number_string.toString();
} 

//Operation 
number_string = ""; //This is a string that will be fed into the operate() function

let doOperation = () => {

    //Add EventListener for all operator buttons
    let all_operators = document.querySelectorAll(".operator");
    all_operators.forEach((element) => {

        element.addEventListener(("click"), function() {

            //If number_string is empty, don't let user enter just an operator
            if (number_string == "" && this.id != "subtract") { //Allow first character to be negative
                return "Block input since no number"; //Prevent NaN error
            }

            //If the user has already inputted an operator, don't concatenate or overwrite the pre-existing operator
            //Stop all subsequent user inputs unless the user presses Del button
            if (operators_array.includes(number_string.slice(-1))) {
                return "Pre-existing operation not overwritten"
            }
            //Don't let user input an operator if the last input was just a decimal point
            if (number_string.slice(-1) == ".") {
                return "Block operator input as user hasn't completed decimal number"
            }

            //1. Whenever any operator button is pressed, check if the previous presses resulted in a string
            //that you can call operate() on 
            checkAndCallOperate();
            //2. Set display to equal answer after pressing another operator
            display_value = document.querySelector(".display_text").textContent = number_string.toString();
            show_answer = 1; //This is an answer that is being shown, not something the user inputted
            after_pressed_equal = 0; //The user wants to continue operation with the answer, set switch to off
            //3. Append the operator into the string
            switch (this.id) {
                case ("add"):
                    number_string += "+";
                    logAppend("+");
                    break;
                case ("subtract"):
                    number_string += "-";
                    logAppend("-");
                    break;
                case ("multiply"):
                    number_string += "*";
                    logAppend("x");
                    break;
                case ("divide"):
                    number_string += "/";
                    logAppend("/");
                    break;   
            }
            
        })
    })

}
doOperation();

//Equal button
let pressEqualButton = ()  => {
    document.querySelector(".equal").addEventListener("click", () => {
        
        if (number_string == "") { //Pressing equal when number_string is empty won't result in an empty display
            document.querySelector(".display_text").textContent = 0;
            return 0;
        }

        //Don't respond if the previous input was an operator symbol
        if (operators_array.includes(number_string.slice(-1))) {
            return "Block equal button as previous input was operator";
        }
        document.querySelector(".display_text").textContent = checkAndCallOperate();
        
        after_pressed_equal = 1; //Set this state so if the next button press is a number button, call AC() to clear everything

    })
}
pressEqualButton();

//C button deletes one digit from 
//1. display (querySelector(".display_text"), 2. display_value and 3. number_string
let del = () =>  {

    let lastDigitCut = (str) => str.toString().slice(0,-1);
    
    document.querySelector("#del").addEventListener(("click"), () => {

        //Don't allow delete button if it is after user pressed equal
        if (after_pressed_equal == 1) {
            return "User pressed equal previously, don't allow delete";
        }
        
        if (operators_array.includes(number_string.slice(-1))) {
            number_string = lastDigitCut(number_string); //Don't delete the numbers, only delete operator
            show_answer = 0;
            document.querySelector(".input_log").textContent = document.querySelector(".input_log").textContent.slice(0,-1); 
            return "Cleared operator only"
        }
        number_string = lastDigitCut(number_string);
        document.querySelector(".display_text").textContent = lastDigitCut(document.querySelector(".display_text").textContent); 
        display_value = lastDigitCut(display_value);

        //Check if it is equal to empty string, if yes reset display to "0"
        if (display_value == "") {
            display_value = "0";
        }
        if (document.querySelector(".display_text").textContent == "") {
            document.querySelector(".display_text").textContent = "0";
            //Don't change number_string as it contains previous numbers/inputs
        }

        //Deletes last character from input log
        document.querySelector(".input_log").textContent = document.querySelector(".input_log").textContent.slice(0,-1); 

        console.log(`
        Delete button pressed.
        display_value: ${display_value}
        number_string: ${number_string}`)

    })
    
}
del();

//AC button
let allClear = () => {
    display_value = "0"; 
    number_string = "";
    document.querySelector(".display_text").textContent = "0";
    logClear();
}
let AC = () => {
    document.querySelector("#AC").addEventListener("click", () => {
        
        allClear();

    })
}
AC();

//Adding keyboard functionality
let keyPress = () => {
    document.addEventListener("keypress", (event) => {
        
        event.preventDefault();

        let keypress = event.key;
        switch (event.key) {
            case "+":
                keypress = "add";
                break;
            case "-":
                keypress = "subtract";
                break;
            case "*":
                keypress = "multiply";
                break;
            case "x":
                keypress = "multiply";
                break;
            case "/":
                keypress = "divide";
                break;
            case ".":
                keypress = "decimal";
                break;
            case "Enter":
                keypress = "equal";
                break;
            case "=":
                keypress = "equal";
                break;
            case "a": 
                keypress = "AC";
                break;
            default:
                keypress = event.key;
        }

        if (document.getElementById(keypress) == null) { //Filter irrelevant keypresses
            //console.log("No such element")
            //return 404;
        }
        else {
            document.getElementById(keypress).click();
        }

        //console.log(keypress);

    })
}

let deleteKey = () => {
    document.addEventListener("keydown", (event) => {

        if (event.key == "Backspace" || event.key == "Delete") {
            document.getElementById("del").click();
        }
        else {
            return "Irrelevant keys, return";
        }

    })
}

keyPress();
deleteKey();

//Copy and pasted from del()
let deleteDigit = () => {

    let lastDigitCut = (str) => str.toString().slice(0,-1);

    //Don't allow delete button if it is after user pressed equal
    if (after_pressed_equal == 1) {
        return "User pressed equal previously, don't allow delete";
    }
    
    if (operators_array.includes(number_string.slice(-1))) {
        number_string = lastDigitCut(number_string); //Don't delete the numbers, only delete operator
        show_answer = 0;
        document.querySelector(".input_log").textContent = document.querySelector(".input_log").textContent.slice(0,-1); 
        return "Cleared operator only"
    }

    number_string = lastDigitCut(number_string);
    document.querySelector(".display_text").textContent = lastDigitCut(document.querySelector(".display_text").textContent); 
    display_value = lastDigitCut(display_value);

    //Check if it is equal to empty string, if yes reset display to "0"
    if (display_value == "") {
        display_value = "0";
    }
    if (document.querySelector(".display_text").textContent == "") {
        document.querySelector(".display_text").textContent = "0";
        //Don't change number_string as it contains previous numbers/inputs
    }

    //Deletes last character from input log
    document.querySelector(".input_log").textContent = document.querySelector(".input_log").textContent.slice(0,-1); 
}

//C button: clears entry on the screen but leaves everything else untouched
let C = () => {
    
    document.querySelector("#C").addEventListener("click", () => {
        
        let run_del_n_times = display_value.length;
    
        if (display_value == 0) {
            return "Do nothing, because nothing on display"
        }

        for (let i = 0; i < run_del_n_times; i++) {
            deleteDigit();
        }
    })
}
C();