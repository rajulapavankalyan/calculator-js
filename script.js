const userInput = document.querySelector('.user_input');
const keys = document.querySelectorAll('.key');
const delKey = document.querySelector('.delete_key');
const resetKey = document.querySelector('.reset');
const answer = document.querySelector('.evaluation');

let lastKeyIsOperator = false; // To track if the last key clicked was an operator key.
let decimalAdded = false; // To track if a decimal point has been added to the current expression.

//reset key is handled
resetKey.addEventListener('click', () => {
    // console.log('reset');
    userInput.value="";
});

const keyArray = Array.from(keys);
keyArray.forEach((key)=>{
    key.addEventListener('click',(event)=>{
        // console.log(event.target.innerText);
        const value = event.target.innerText; 
        if(value === "." && decimalAdded){ 
            return;
        }
        if("+-x/".includes(value)){ 
            // check if user input is operator.
            if(lastKeyIsOperator){ // prevent multiple operators side by side, and updating the last operator to new userInput Operator.
                let initialValue = userInput.value;
                let updatedValue = initialValue.substring(0,initialValue.length-1)+value;
                userInput.value = updatedValue;
                return;
            }
            lastKeyIsOperator = true; 
            decimalAdded =false;
        }else{
            lastKeyIsOperator = false;
            if(value==="."){
                decimalAdded = true;
            }
        }
        userInput.value+=value;
    });
});

//delKey should del the latest key from the left
delKey.addEventListener('click',()=>{
    let initialValue = userInput.value;
    let updatedValue = initialValue.substring(0,initialValue.length-1);
    userInput.value = updatedValue;
});

//answrKey should evaluate the expression
answer.addEventListener('click',()=>{
    const expression = userInput.value;
    const formattedExpression = expression.replace('x','*');
    const solution = eval(formattedExpression);
    userInput.value = solution;
});
    
