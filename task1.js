let currentScore = 0;                               //Keeping track of the current score
scoreElem = document.querySelector('.score');       //Accessing the score element to update the score
scoreElem.innerHTML = `Score: ${currentScore}`;     

let maxScore = localStorage.getItem('highscore') || 0;      //Acessing the previous highscore if exists
document.querySelector('.highScore').innerHTML = `High-Score: ${maxScore}`;        //Displaying the max score to the screen


let t=61;                                       //Starting with 60 seconds
let x = setInterval(decTime, 1000);             //Decreasing the time by 1 second every second
function decTime () {
    /*
    A function to display amount of the time remaining, and displays with an appropriate
    message when the time runs out.
    */
    if(t>0) {
        t--;
        document.querySelector('.remTime').innerHTML = `Time remaining: ${t}`;           //Displaying the time on screen
    } else {
        clearInterval(z);
        clearInterval(x);
        document.querySelector('.remTime').innerHTML = 'Time Up';           //Stopping the function call when time runs out
        
        //Checking if the user has achieved a highscore or not and displaying the appropriate message
        if (currentScore > maxScore) {
            localStorage.setItem('highscore', currentScore);
            alert(`You beat the highscore!\nYour score is ${currentScore}!\nClick Ok to play again.`);
            location.reload();         
        } else {
           alert(`Thanks for playing!\nYour score is ${currentScore}!\nClick Ok to play again.`);
           location.reload();
        }
    }
}
decTime();                  //Calling the function to start the timer

let colorList = ['lightblue', 'purple', 'yellow', 'orange', 'red'];
let foodCoords = []         //A list to keep track of each food block's coordinates
let foodEaten = 0;          //A counter to know how many foods have been eaten out of 5

function createFood() {
    /*
    A function to create 5 colour blocks at random positions within the grid and storing them.
    */
    console.log('Creating food');
    for(let i=0; i<5; i++) {
        let colorElem = document.querySelector(`.${colorList[i]}-food`);
        colorElem.style['background-color'] = `${colorList[i]}`
        let x = Math.floor(Math.random()*25)*20;        //Randomizing the x-coordinate of the food  
        let y = Math.floor(Math.random()*25)*20;        //Randomizing the y-coordinate of the food
        colorElem.style.left = x + 'px';
        colorElem.style.top = y + 'px';
        foodCoords.push([x, y]);
    }
}

let z = '';             //Initializing the id for our setInterval functions

//Accessing the snake element in js
let snakeHead = document.querySelector('.snake-head'); 
let snakeBody = document.querySelector('.snake-body');
let snakeTail = document.querySelector('.snake-tail');

//Keeping track of the snake's position
//Initializing the position to the middle of the grid
let coords = {head: {x: 240, y: 240},
              body: {x: 220, y: 240},
              tail: {x: 200, y: 240}
};

//Assigning the position of the snake to the above coordinates
snakeHead.style.left = coords.head.x + 'px';        
snakeBody.style.left = coords.body.x + 'px';
snakeTail.style.left = coords.tail.x + 'px';
snakeHead.style.top = coords.head.y + 'px';
snakeBody.style.top = coords.body.y + 'px';
snakeTail.style.top = coords.tail.y + 'px';

createFood();       //Creating the food

//Functions to move the snake
function moveToRight() {
    clearInterval(z);                   //Clears the movement of the snake in the direction it was just moving in
    if (foodEaten === 5) {              //Checking if all 5 foods have been eaten
        foodEaten = 0;                  //Reseting the number of foods eaten
        currentScore += 5;              //Giving 5 points to the user
        scoreElem.innerHTML = `Score: ${currentScore}`;
        foodCoords = [];
        t+=6;                           //Awarding the user an extra 6 seconds of time
        createFood();                   //Randomising and creating food after all foods have been eaten
    }
    if(coords.head.x <= 470) {          //Making sure the snake does not go outside the grid
        console.log(foodEaten);
        
        //Waiting till all parts of the snake are in the same horizontal line
        coords.tail.y = coords.body.y;              
        snakeTail.style.top = coords.tail.y + 'px';
        coords.body.y = coords.head.y;
        snakeBody.style.top = coords.body.y + 'px';

        //Moving the snake's head to the right
        //And making the body and tail follow the head
        coords.tail.x = coords.body.x;
        snakeTail.style.left = coords.tail.x+'px';
        coords.body.x = coords.head.x;
        snakeBody.style.left = coords.body.x+'px';
        coords.head.x = coords.head.x + 20;
        snakeHead.style.left = coords.head.x + 'px';
        if(coords.head.x === foodCoords[foodEaten][0] && coords.head.y === foodCoords[foodEaten][1]) {
            
            //Checking if the snake has eaten the target colour block
            document.querySelector(`.${colorList[foodEaten]}-food`).style['background-color'] = 'black';        //Making the food disappear
            document.querySelector(`.${colorList[foodEaten]}-food`).style['z-index'] = 0;                       //Allowing the snake to move over the eaten food
            foodEaten++;                                                                                        //Incremeneting the number of foods eaten
            currentScore += 2;                                                                                  //Awarding 2 points to the user
            scoreElem.innerHTML = `Score: ${currentScore}`;                                                     //Updating the score
        }
        prevDir = 'right';
    } else {
        hitWall();                      //Calls a function if the snake hits a wall
        clearInterval(z);       
    }
    z=setInterval(moveToRight, 200);    //Continues to call this function till a different direction has been chosen
}

function moveToLeft() {
    clearInterval(z);
    if (foodEaten === 5) {
        foodEaten = 0;
        currentScore += 5;
        scoreElem.innerHTML = `Score: ${currentScore}`;
        foodCoords = [];
        t+=6;
        createFood();
    }
    if(coords.head.x >= 20) {
        console.log(foodEaten);

        coords.tail.y = coords.body.y;
        snakeTail.style.top = coords.tail.y + 'px';
        coords.body.y = coords.head.y;
        snakeBody.style.top = coords.body.y + 'px';

        
        coords.tail.x = coords.body.x;
        snakeTail.style.left = coords.tail.x+'px';
        coords.body.x = coords.head.x;
        snakeBody.style.left = coords.body.x+'px';
        coords.head.x = coords.head.x - 20;
        snakeHead.style.left = coords.head.x + 'px';
        if(coords.head.x === foodCoords[foodEaten][0] && coords.head.y === foodCoords[foodEaten][1]) {
            document.querySelector(`.${colorList[foodEaten]}-food`).style['background-color'] = 'black';
            document.querySelector(`.${colorList[foodEaten]}-food`).style['z-index'] = 0;
            foodEaten++;
            currentScore += 2;
            scoreElem.innerHTML = `Score: ${currentScore}`;
        }
    } else {
        hitWall();
        clearInterval(z);
    }
    z=setInterval(moveToLeft, 200);
}

function moveToDown() {
    clearInterval(z);
    if (foodEaten === 5) {
        foodEaten = 0;
        currentScore += 5;
        scoreElem.innerHTML = `Score: ${currentScore}`;
        t+=6;
        foodCoords = [];
        createFood();
    }
    if(coords.head.y <= 470) {

        coords.tail.x = coords.body.x;
        snakeTail.style.left = coords.tail.x + 'px';
        coords.body.x = coords.head.x;
        snakeBody.style.left = coords.body.x + 'px';


        coords.tail.y = coords.body.y;
        snakeTail.style.top = coords.tail.y+'px';
        coords.body.y = coords.head.y;
        snakeBody.style.top = coords.body.y+'px';
        coords.head.y = coords.head.y + 20;
        snakeHead.style.top = coords.head.y + 'px';
        prevDir = 'down';
        if(coords.head.x === foodCoords[foodEaten][0] && coords.head.y === foodCoords[foodEaten][1]) {
            document.querySelector(`.${colorList[foodEaten]}-food`).style['background-color'] = 'black';
            document.querySelector(`.${colorList[foodEaten]}-food`).style['z-index'] = 0;
            foodEaten++;
            currentScore += 2;
            scoreElem.innerHTML = `Score: ${currentScore}`;;
        }
    } else {
        hitWall();
        clearInterval(z);
    }
    z=setInterval(moveToDown, 200);
}

function moveToUp() {
    clearInterval(z);
    if (foodEaten === 5) {
        foodEaten = 0;
        currentScore += 5;
        scoreElem.innerHTML = `Score: ${currentScore}`;
        t+=6;
        foodCoords = [];
        createFood();
    }
    if(coords.head.y >= 20) {

        coords.tail.x = coords.body.x;
        snakeTail.style.left = coords.tail.x + 'px';
        coords.body.x = coords.head.x;
        snakeBody.style.left = coords.body.x + 'px';


        coords.tail.y = coords.body.y;
        snakeTail.style.top = coords.tail.y+'px';
        coords.body.y = coords.head.y;
        snakeBody.style.top = coords.body.y+'px';
        coords.head.y = coords.head.y - 20;
        snakeHead.style.top = coords.head.y + 'px';
        prevDir = 'up';
        if(coords.head.x === foodCoords[foodEaten][0] && coords.head.y === foodCoords[foodEaten][1]) {
            document.querySelector(`.${colorList[foodEaten]}-food`).style['background-color'] = 'black';
            document.querySelector(`.${colorList[foodEaten]}-food`).style['z-index'] = 0;
            foodEaten++;
            currentScore += 2;
            scoreElem.innerHTML = `Score: ${currentScore}`;
        }
    } else {
        hitWall();
        clearInterval(z);
    }
    z=setInterval(moveToUp, 200);
}

function hitWall() {
    /*
    A function which is called when the snake has hit a wall
     */
    clearInterval(z);
    clearInterval(x);

    //Checking the user has achieved a high score or not and displaying the appropriate message
    if(currentScore > maxScore) {
        localStorage.setItem('highscore', currentScore);        //Keeping track of the highscore
        alert(`You hit a wall. Game Over! But you beat the highscore!\nYour score is ${currentScore}!\nClick Ok to play again.`);
        location.reload();
    } else {
        alert(`You hit a wall. Game Over!\nYour score is ${currentScore}!\nClick Ok to play again.`);
        location.reload();      //Reloading the window for a newgame
    }
    
}