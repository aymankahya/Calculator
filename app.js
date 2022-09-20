var userInput = [];
var userEquation = [];
const equationScreen = document.querySelector('#equation');
const resultScreen = document.querySelector('#result');
const buttons = Array.from(document.querySelectorAll('.button'));
const timeDisplay = document.querySelector('#date');
var powerOp = false;
const weekDays = ["Mon.","Tue.","Wed.","Thu.","Fri."];
const months = ["Jan." , "Feb." , "Mar." , "Apr.", "May.","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."];



const displayTime = function(){
  const fullDate = new Date();
  const day = weekDays[fullDate.getDay()-1];
  const date = fullDate.getDate();
  const month = months[fullDate.getMonth()-1];
  const hour = fullDate.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  const minutes = fullDate.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  const secondes = fullDate.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

  timeDisplay.innerHTML = `${day} ${date} ${month} <span style="color:blue">${hour}:${minutes}:${secondes}</span>`;    
  

}

const typeEquation = function(){
    if(userEquation.length <= 28){
        equationScreen.innerHTML = userInput.join("");
    }else{
        alert("Maximum display capability reached !");
        clearEquation();
        typeEquation();
    }  
};

const displayResult = function(result){
    resultScreen.textContent = "= " + result;
}

const clearEquation = function(){
    userInput = [];
    userEquation = [];
    resultScreen.textContent = "= 0";
};

const evalPercentage = function(){
    // Find the recent number inputed by the user
    const reverseUserInput = [...userInput];
    reverseUserInput.reverse();
    const targetIndex = reverseUserInput.findIndex(element => typeof element === 'string');
    if(targetIndex == -1){
        userEquation = [];
        userEquation = userEquation.concat(['(',Number(userInput.join("")),'.','/',1,0,0,')']);
    }else{
        const targetNumberLength = reverseUserInput.slice(0 , targetIndex).length;
        const targetNumber = userEquation.splice(userEquation.length - targetNumberLength);
        userEquation = userEquation.concat(["(" + Number(targetNumber.join("")).toString() + "./100)"]);
    }
    
};

const delPercentage = function(){
    userEquation.pop();
    const reverseUserInput = [...userInput];
    reverseUserInput.reverse();
    const targetIndex = reverseUserInput.findIndex(element => typeof element === 'string');
    const targetNumber = reverseUserInput.slice(0 , targetIndex);
    targetNumber.reverse();
    userEquation = userEquation.concat(targetNumber);
}

displayTime();
setInterval(displayTime , 1000);

// Create EventLister for each button

buttons.map( nodeChild => {
    switch(nodeChild.className){
        case 'button clear':
            nodeChild.addEventListener('click' , function(){
                clearEquation();
                typeEquation();
                
            } );
            break;

        case 'button special square':
            nodeChild.addEventListener('click', function(){
                userInput = userInput.concat(["√("]);
                userEquation = userEquation.concat("Math.sqrt(");
                typeEquation();   
            });
            break;

        case 'button special power':
            nodeChild.addEventListener('click' , function(){
                if(powerOp){
                    userInput = userInput.concat("</sup>");
                    powerOp = false;
                }else{
                    powerOp = true;
                    userInput = userInput.concat("<sup>");
                    userEquation = userEquation.concat("**");
                } 
                typeEquation();
            });
            break;

        case 'button operation multiply':
            nodeChild.addEventListener('click' , function(){
                userInput = userInput.concat('×');
                userEquation = userEquation.concat('*');
                typeEquation();
            });
            break;

        case 'button special percentage':
            nodeChild.addEventListener('click' , function(){
                evalPercentage();
                userInput = userInput.concat('%');
                typeEquation();
            });
            break;

        case 'button operation divide':
            nodeChild.addEventListener('click' , function(){
                userInput = userInput.concat('÷');
                userEquation = userEquation.concat('/');
                typeEquation();
            });
            break;

        case 'button operation equal':
            nodeChild.addEventListener('click' , function(){
                displayResult(parseFloat(eval(userEquation.join("").toString()).toFixed(10)));
                userInput = [];
                userEquation = [];
                powerOp = false;
            });
            break;

        case 'button number delete':
            nodeChild.addEventListener('click' , function(){
                if(userInput.slice(-1) == '%'){
                    userInput.pop();
                    delPercentage();
                }else{
                    userInput.pop();
                    userEquation.pop();
                }
    
                typeEquation();
            });
            break;
            

        default:
            nodeChild.addEventListener('click' , function(){
                if(isNaN(Number(nodeChild.textContent))){
                    userInput = userInput.concat(nodeChild.textContent);
                    userEquation = userEquation.concat(nodeChild.textContent);
                }else{
                    userInput = userInput.concat(Number(nodeChild.textContent));
                    userEquation = userEquation.concat(Number(nodeChild.textContent));
                }

                typeEquation();
            });
    };
});


