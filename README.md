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

8. 