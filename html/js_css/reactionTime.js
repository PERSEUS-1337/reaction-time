const rectangle = document.querySelector('.rectangle');
const randomNumber = document.getElementById('number');
const nextButton = document.getElementById('next-button');
const statsRectangle = document.getElementById('stats-rectangle');

statsRectangle.style.display = "none";
nextButton.style.display = "none";

// Color Constants
const blueColor = "rgb(103, 165, 255)";
const pinkColor = "rgb(216, 103, 255)";
const whiteColor = "rgb(255, 255, 255)";

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

function sessionStorageFunc(currIter, currNum, currColor, currTime, intervalLimit, avgResult, checkResult, timeArray, numArray, colArray, keyArray, checkArray, minusConst, maxIter) {

    sessionStorage.setItem("currIter", currIter);
    sessionStorage.setItem("currNum", currNum);
    sessionStorage.setItem("currColor", currColor);
    sessionStorage.setItem("currTime", currTime);
    sessionStorage.setItem("intervalLimit", intervalLimit);
    sessionStorage.setItem("avgResult", avgResult);
    sessionStorage.setItem("checkResult", checkResult);
    sessionStorage.setItem("minusConst", minusConst);
    sessionStorage.setItem("maxIter", maxIter);
    sessionStorage.setItem("timeArray", JSON.stringify(timeArray));
    sessionStorage.setItem("numArray", JSON.stringify(numArray));
    sessionStorage.setItem("colArray", JSON.stringify(colArray));
    sessionStorage.setItem("keyArray", JSON.stringify(keyArray));
    sessionStorage.setItem("checkArray", JSON.stringify(checkArray));

}

function prepareForFetch() {
    let maxIter = parseInt(sessionStorage.getItem("maxIter"));
    // Get timeArray and numArray from user session and store to a unified data array, to be passed to submitData() as one whole array
    let timeArray = JSON.parse(sessionStorage.getItem("timeArray"));
    let numArray = JSON.parse(sessionStorage.getItem("numArray"));
    let colArray = JSON.parse(sessionStorage.getItem("colArray"));
    let keyArray = JSON.parse(sessionStorage.getItem("keyArray"));
    let checkArray = JSON.parse(sessionStorage.getItem("checkArray"));

    let dataArray = [];

    for (i = 0; i < maxIter-(4 - parseInt(sessionStorage.getItem("minusConst"))); i++) {           // Change
        dataArray.push(timeArray[i+1]);
    }
    for (i = 0; i < maxIter-(4 - parseInt(sessionStorage.getItem("minusConst"))); i++) {           // Change
        dataArray.push(numArray[i]);
    }
    for (i = 0; i < maxIter-(4 - parseInt(sessionStorage.getItem("minusConst"))); i++) {           // Change
        dataArray.push(colArray[i]);
    }
    for (i = 0; i < maxIter-(4 - parseInt(sessionStorage.getItem("minusConst"))); i++) {           // Change
        dataArray.push(keyArray[i]);
    }
    for (i = 0; i < maxIter-(4 - parseInt(sessionStorage.getItem("minusConst"))); i++) {           // Change
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
    let maxIter = parseInt(sessionStorage.getItem("maxIter"));

    let temp = parseInt(sessionStorage.getItem("currIter"))+1;
    sessionStorage.setItem("currIter", temp);

    timeHandler();
    
    if (parseInt(sessionStorage.getItem("currIter")) < maxIter) {

        // Handles reaction time recording
        // timeHandler();

        if (parseInt(sessionStorage.getItem("currIter")) > (3 - parseInt(sessionStorage.getItem("minusConst")))) {         // Change

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
    } else if (parseInt(sessionStorage.getItem("currIter")) === maxIter) {

        showStats();
        prepareForFetch();
        return;

    }
}

function timeHandler() {
    let maxIter = parseInt(sessionStorage.getItem("maxIter"));
    
    // Fetches current time array in user session and updates it
    let timeArray = JSON.parse(sessionStorage.getItem("timeArray"));
    let reactionTime = new Date().getTime() - sessionStorage.getItem("currTime");

    if (parseInt(sessionStorage.getItem("currIter")) > (3 - parseInt(sessionStorage.getItem("minusConst"))) && parseInt(sessionStorage.getItem("currIter")) < maxIter+1) {         // Change
        timeArray.push(reactionTime);
        sessionStorage.setItem("timeArray", JSON.stringify(timeArray));
    }
    
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
            if (key === "Z") {
                result = 1 
            } else {
                result = 0
            }
        } else if (number > 5) {
            if (key === "X") {
                result = 1 
            } else {
                result = 0
            }
        }
    } else {
        if (number % 2 == 0) {
            if (key === "M") {
                result = 1 
            } else {
                result = 0
            }
        } else {
            if (key === "N") {
                result = 1 
            } else {
                result = 0
            }
        }
    }

    let currIter = parseInt(sessionStorage.getItem("currIter"));
    let checkArray = JSON.parse(sessionStorage.getItem("checkArray"));
    checkArray[currIter-(4 - parseInt(sessionStorage.getItem("minusConst")))] = result;            // Change
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

function showStats() {

    // Hide current rectangle and number, show statistics rectangle and scroe and reaction time
    randomNumber.style.display = "none"; 
    rectangle.style.display = "none";

    statsRectangle.style.display = "block";
    nextButton.style.display = "block";

    // Fetch arrays from session storage
    let timeArray = JSON.parse(sessionStorage.getItem("timeArray"));
    let checkArray = JSON.parse(sessionStorage.getItem("checkArray"));

    // Get the average time the user got
    let sum = 0;
    for( i = 0; i < timeArray.length-1; i++ ){
        sum += parseInt( timeArray[i+1], 10 );
    }   
    console.log(sum);
    let avgResult = (sum/(timeArray.length-1)).toFixed(0);

    // Get how many correct answers the user got
    let checkCounter = checkArray.reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {});

    if (checkCounter["1"] === undefined) {
        checkCounter["1"] = 0;
    }

    // Displays the number of correct answers and average time
    let correct_answer = document.getElementById('correct-answer');
    let avg_time = document.getElementById('avg-time');
    correct_answer.innerHTML = checkCounter["1"];
    avg_time.innerHTML = avgResult;

    // Store again for use later, fetch data here when showing data to the screen
    sessionStorage.setItem("avgResult", avgResult);
    sessionStorage.setItem("checkResult", checkCounter["1"]);
}



// Where all code starts executed
window.onload = function() {

    // Initiallize vars and arrays to be used in session
    let intervalLimit = 1500;
    let currIter = 0;
    let currNum = 0;
    let currColor = "Black"
    let currTime = new Date().getTime();
    let avgResult = 0;
    let checkResult = 0;
    let minusConst = 0;
    let maxIter = 160+4
    let timeArray = [];     // Stores reaction times
    let numArray = [];      // Stores number shown in screen
    let colArray = [];      // Stores color shwon in screen
    let keyArray = [];      // Stores key pressed by user
    let checkArray = [];    // Stores the array of correct and wrong answers

    if (window.location.href.indexOf("trial") !== -1) {     //Change for trial
        maxIter = 10+4;
        // intervalLimit = 3000;
        // minusConst = 2
    }

    // Initiallize arrays
    for (i = 0; i < maxIter-(4-minusConst); i++) {           // Change
        checkArray[i] = 0;
    }
    for (i = 0; i < maxIter-(4-minusConst); i++) {           // Change
        keyArray[i] = "N/A";
    }
    
    // Stores initiallized variables to sessionStorage unique to user
    sessionStorageFunc(currIter, currNum, currColor, currTime, intervalLimit, avgResult, checkResult, timeArray, numArray, colArray, keyArray, checkArray, minusConst, maxIter);
    
    // Start the interval every 1.5s
    // Also execute function immediately to start
    countDownScreen();
    let handle = setInterval(changeRandColorNumber, sessionStorage.getItem("intervalLimit"));
    
    // Handles keypresses
    window.onkeypress = function(key) {

        // Checks if reached iteration limit
        currIter = parseInt(sessionStorage.getItem("currIter"));
        
        if (currIter < maxIter && currIter > (3 - parseInt(sessionStorage.getItem("minusConst")))) {           // Change

            // Records keypresses, correct or incorrect
            key = key || window.event;
            let uniCode = key.keyCode || key.which;
            let keyName = String.fromCharCode(uniCode).toUpperCase();

            if (keyName === "Z" | keyName === "X" | keyName === "N" | keyName === "M") {

                // Records keypresses once they are allowed from the conditions above
                keyArray = JSON.parse(sessionStorage.getItem("keyArray"));
                keyArray[currIter-(4 - parseInt(sessionStorage.getItem("minusConst")))] = keyName;         // Change
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