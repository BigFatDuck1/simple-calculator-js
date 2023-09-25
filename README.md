# Simple Calculator
Made with HTML, CSS and Javascript 

## My approach

1. I created all the functions for add, subtract, multiply and divide and an operate() function that takes two numbers and an operator and calls the appropriate function that spits out the sum/product/quotient

2. Created the buttons and display on HTML using flexbox and grid

3. Then I added EventListeners for each number button so it changes the display on each button press; I also stored what's displayed on the screen in a variable `display_text` - this is done with variable assignment, not concatenation, as this variable gets overwritten whenever there is a change in what's displayed. I emphasize this because this gave me problems in the next step when I was stuck.

4. I created a variable called `number_string` which is a "running total" of all button presses. Originally I concatenated `display_text` as well as any operation key that has been pressed, but this obviously gave me problems because concatenation meant instead of storing `56` when I press the buttons `5` and then `6`, it stored `5` first, then `56`, giving `556` (hope you get my gist). The key to solving this problem was to not concatenate `display_text`, but concatenate each button presses only, meaning concatenating `this.id` whenever a number button is pressed.

5. Operator buttons were handled by a switch statement. Each case concatenates the symbol/operator onto `number_string`.

6. The function `doOperation()` contains the switch statement in step 6. This function adds EventListeners to each operator button, and begins by clearing the display by setting its value (`textContent`) to `0` whenever an operator button is pressed. It also resets `display_value` to `0`.

7. I wanted to check whether `number_string` contains only 2 numbers and 1 operator (e.g. `"2+6"`) so I can call `operate()`. I used regex to split number_string with the separator being any character in `/[+-/*/]/` meaning any symbols e.g. +,-,*,/. If the resultant array after splitting contains only 2 numbers i.e. `[2,6]`, then `operate()` can be called. 

8. Problem: `operate()` can only process single digit calculations. That's because `[...arg]` splits the entire string into each and every one of its digit. Therefore, `10*10` becomes `["1", "0", "*", "1", "0"]` which breaks the function because `operate()` now parses only the first three elements of the array - which means it will try to look for the operator, which is now `0` and the two numbers, which are `1` and `*`. No calculation can be done as there is no operator found that matches any case in the switch statement, and the `results` variable still remains `= 0`.
I fixed it as follows:
```js //The string passed into operate is all split up, so "100+50" becomes ["1", "0"...]
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
                console.log("last")
            }
        }
        else if (operators_array.includes(element)) {
            temp_arg.push(temp_concat_number);
            temp_concat_number = ""; //Reset so it can store next number
            temp_arg.push(element); //Now push the symbol into the array
        }
    })
    arg = temp_arg; //Overwrite original arguments passed to operate()
```
If the iterable is a number, simply concatenate it into a temporary variable (`temp_concat_number`) that holds a string, but don't push it into the array yet until all the digits of the number is stored in the temporary variable. How do I know it is over? Either a. the iterable is now a symbol or b. it is the last element of the `arg` array. In either case, the temporary number variable can be pushed into the array as a number by itself, and the `arg` array now only contains 3 arguments. The `operate()` function is no longer broken.