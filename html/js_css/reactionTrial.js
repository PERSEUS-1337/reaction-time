const {sessionStorageFunc, getRandomColor, generateNumber, changeRandColorNumber, timeHandler, checkKey, countDownScreen, rectangle, randomNumber, blueColor, pinkColor, whiteColor, maxIter} = require("./reactionTime");

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