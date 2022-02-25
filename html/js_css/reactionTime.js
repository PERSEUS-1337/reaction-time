let rectangle = document.querySelector('.rectangle');
let randomNumber = document.getElementById('number');
let start = document.getElementById('start');
let timeText = document.getElementById('time-text');

// Color Constants
const blueColor = "rgb(103, 165, 255)";
const pinkColor = "rgb(216, 103, 255)";
const whiteColor = "rgb(255, 255, 255)";

const maxIter = 20+1;

function submitData() {
    fetch(window.location.href, {
        method: 'POST',
        body: JSON.stringify({
            data: JSON.parse(sessionStorage.getItem("dataArray")),
        }),
        headers: {
            'Content-Type': 'application/json'
          },
        }).then(()=>{console.log("Submitted to server.js")})
}

function sessionStorageFunc(currIter, currNum, currColor, currTime, intervalLimit, timeArray, numArray, colArray, keyArray, checkArray) {

    sessionStorage.setItem("currIter", currIter);
    sessionStorage.setItem("currNum", currNum);
    sessionStorage.setItem("currColor", currColor);
    sessionStorage.setItem("currTime", currTime);
    sessionStorage.setItem("intervalLimit", intervalLimit);
    sessionStorage.setItem("timeArray", JSON.stringify(timeArray));
    sessionStorage.setItem("numArray", JSON.stringify(numArray));
    sessionStorage.setItem("colArray", JSON.stringify(colArray));
    sessionStorage.setItem("keyArray", JSON.stringify(keyArray));
    sessionStorage.setItem("checkArray", JSON.stringify(checkArray));

}

function prepareForFetch() {
    // Get timeArray and numArray from user session and store to a unified data array, to be passed to submitData() as one whole array
    let timeArray = JSON.parse(sessionStorage.getItem("timeArray"));
    let numArray = JSON.parse(sessionStorage.getItem("numArray"));
    let colArray = JSON.parse(sessionStorage.getItem("colArray"));
    let keyArray = JSON.parse(sessionStorage.getItem("keyArray"));
    let checkArray = JSON.parse(sessionStorage.getItem("checkArray"));

    let dataArray = [];

    for (i = 0; i < maxIter-1; i++) {
        dataArray.push(timeArray[i+1]);
    }
    for (i = 0; i < maxIter-1; i++) {
        dataArray.push(numArray[i]);
    }
    for (i = 0; i < maxIter-1; i++) {
        dataArray.push(colArray[i]);
    }
    for (i = 0; i < maxIter-1; i++) {
        dataArray.push(keyArray[i]);
    }
    for (i = 0; i < maxIter-1; i++) {
        dataArray.push(checkArray[i]);
    }
    sessionStorage.setItem("dataArray", JSON.stringify(dataArray));
}

function getRandomColor(list) {
    return list[Math.floor((Math.random() * list.length))];
}

function generateNumber(currNum) {
    let tempNum = Math.floor(Math.random() * 10);

    // console.log("Curr num inside genNumber: "+currNum);

    // Generates number if condition in while statement is still not met
    while (tempNum === parseInt(currNum) | tempNum === 5 | tempNum === 0) {
        tempNum = Math.floor(Math.random() * 10);
    }
    // console.log("Temp num inside genNumber: "+tempNum);

    // Handles storage of array to session storage, for submission later
    let numArray = JSON.parse(sessionStorage.getItem("numArray"));
    numArray.push(tempNum);
    sessionStorage.setItem("numArray", JSON.stringify(numArray));

    // let currTime = new Date().getTime();
    // sessionStorage.setItem("currTime", currTime);

    return tempNum;
}

function changeRandColorNumber() {

    if (parseInt(sessionStorage.getItem("currIter")) === 0) {
        sessionStorage.setItem("intervalLimit", 1500);
    }
    
    if (parseInt(sessionStorage.getItem("currIter")) !== maxIter) {

        let temp = parseInt(sessionStorage.getItem("currIter"))+1;
        sessionStorage.setItem("currIter", temp);

        if (parseInt(sessionStorage.getItem("currIter")) !== 0) {
            // Handles reaction time recording
            timeHandler();

            // Handles changing of color + recording of color shown in screen
            let currColor = rectangle.style.background = getRandomColor([blueColor, pinkColor]);
            let colArray = JSON.parse(sessionStorage.getItem("colArray"));
            if (currColor === blueColor) {
                currColor = "Blue";
            } else {
                currColor = "Pink";
            }
            colArray.push(currColor);
            sessionStorage.setItem("colArray", JSON.stringify(colArray));
            sessionStorage.setItem("currColor", currColor);

            // Handles changing of numbers + recording of number shown in screen
            let currNum = sessionStorage.getItem("currNum");
            currNum = randomNumber.innerHTML = generateNumber(currNum);
            sessionStorage.setItem("currNum", currNum);

        }
    } else {

        prepareForFetch();
        return;

    }
}

function timeHandler() {
    // Fetches current time array in user session and updates it
    let timeArray = JSON.parse(sessionStorage.getItem("timeArray"));
    let reactionTime = new Date().getTime() - sessionStorage.getItem("currTime");

    // if (parseInt(sessionStorage.getItem("currIter")) !== 0) {
        timeArray.push(reactionTime);
        sessionStorage.setItem("timeArray", JSON.stringify(timeArray));
    // }
    
    let currTime = new Date().getTime();
    sessionStorage.setItem("currTime", currTime);

    console.log("Reaction Time: "+reactionTime);
}

function checkKey(key) {
    let color = sessionStorage.getItem("currColor");
    let number = sessionStorage.getItem("currNum");
    let result = 0;

    if (color === "Blue") {
        if (number < 5) {
            if (key = "Z") {
                result = 1 
            } else {
                result = 0
            }
        } else if (number > 5) {
            if (key = "X") {
                result = 1 
            } else {
                result = 0
            }
        }
    } else {
        if (number % 2 === 1) {
            if (key = "N") {
                result = 1 
            } else {
                result = 0
            }
        } else if (number % 2 === 0) {
            if (key = "M") {
                result = 1 
            } else {
                result = 0
            }
        }
    }

    let currIter = parseInt(sessionStorage.getItem("currIter"));
    let checkArray = JSON.parse(sessionStorage.getItem("checkArray"));
    checkArray[currIter-1] = result;
    sessionStorage.setItem("checkArray", JSON.stringify(checkArray));

}

function countDownScreen() {
    rectangle.style.background = whiteColor;
    let i = 4;
    let countDown = setInterval(function() {
        if (i === 0) {
            clearInterval(countDown);
        } else {
            if (i === 1) {
                randomNumber.innerHTML = "";
                i--;
            } else {
                randomNumber.innerHTML = i-1;
                i--;
            }
        }
    }, 1000);
}

// Where all code starts executed
window.onload = function() {
    
    // Initiallize vars and arrays to be used in session
    let intervalLimit = 5000;
    let currIter = 0;
    let currNum = 0;
    let currColor = "Black"
    let currTime = new Date().getTime();
    let timeArray = [];     // Stores reaction times
    let numArray = [];      // Stores number shown in screen
    let colArray = [];      // Stores color shwon in screen
    let keyArray = [];      // Stores key pressed by user
    let checkArray = [];    // Stores the array of correct and wrong answers

    for (i = 0; i < maxIter-1; i++) {
        checkArray[i] = 0;
    }
    for (i = 0; i < maxIter-1; i++) {
        keyArray[i] = "N/A";
    }
    
    // Stores initiallized variables to sessionStorage unique to user
    sessionStorageFunc(currIter, currNum, currColor, currTime, intervalLimit, timeArray, numArray, colArray, keyArray, checkArray);
    
    // Start the interval every 1.5s
    countDownScreen();
    let handle = setInterval(changeRandColorNumber, sessionStorage.getItem("intervalLimit"));
    // Also execute function immediately to start
    
    // Handles keypresses
    window.onkeypress = function(key) {

        // Checks if reached iteration limit
        currIter = parseInt(sessionStorage.getItem("currIter"));
        // intervalLimit = sessionStorage.getItem("intervalLimit");
        if (currIter !== maxIter && currIter !== 0) {

            // Records keypresses, correct or incorrect
            key = key || window.event;
            let uniCode = key.keyCode || key.which;
            let keyName = String.fromCharCode(uniCode).toUpperCase();

            if (keyName === "Z" | keyName === "X" | keyName === "N" | keyName === "M") {

                // Records keypresses once they are allowed from the conditions above
                keyArray = JSON.parse(sessionStorage.getItem("keyArray"));
                keyArray[currIter-1] = keyName;
                sessionStorage.setItem("keyArray", JSON.stringify(keyArray));

                // Checks if correct or not
                checkKey(keyName);

                // Resets time and re-executes function
                clearInterval(handle);
                handle = setInterval(changeRandColorNumber, sessionStorage.getItem("intervalLimit"));
                changeRandColorNumber();
            }
        }  
    };
};

module.exports = {
    sessionStorageFunc,
    getRandomColor,
    generateNumber,
    changeRandColorNumber,
    timeHandler,
    checkKey,
    countDownScreen,
    rectangle: document.querySelector('.rectangle'),
    randomNumber: document.getElementById('number'),
    blueColor: "rgb(103, 165, 255)",
    pinkColor: "rgb(216, 103, 255)",
    whiteColor: "rgb(255, 255, 255)",
    maxIter: 10+1,
}