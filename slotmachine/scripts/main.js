﻿/**
Author: Emily Black
File Name: main.js
File Desc: Main javascript file for images and functions
**/

/// <reference path="jquery.js" />

//stage
var stage;
//reels
var spin1;
var spin2;
var spin3;
//images
var bananaImg = new Image();
bananaImg.src = "images/Banana.png";
var cherryImg = new Image();
cherryImg.src = "images/Cherry.png";
var orangeImg = new Image();
orangeImg.src = "images/Orange.png";
var grapeImg = new Image();
grapeImg.src = "images/Grapes.png";
var barImg = new Image();
barImg.src = "images/Bar.png";
var bellImg = new Image();
bellImg.src = "images/Bell.png";
var blankImg = new Image();
blankImg.src = "images/blank.png";
var sevenImg = new Image();
sevenImg.src = "images/Seven.png";
//stats and buttons
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var jackpotMoney;
var money;
var powerButton;
var spinButton;
var reset;
var bet;
var bet5;
var bet10;
var betAmount;
var turn = 0;
var playerTurn;
var playerBet = 0;
var winNumber = 0;
var wins;
var lossNumber = 0;
var loses;
var spinResult;
var winRatio = 0;
//fruit tally
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;
var ratio;
var win;
//reel array
var reel = [spin1 = new createjs.Bitmap(sevenImg), spin2 = new createjs.Bitmap(sevenImg), spin3 = new createjs.Bitmap(sevenImg)];

//draws canvas
function init() {
    stage = new createjs.Stage(document.getElementById("canvas"));
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTick);

    drawSlotMachine();
}
//updates stage
function handleTick() {
    stage.update();
}
//adds images to canvas and positions them
function drawSlotMachine() {
    var slotMachine = new createjs.Bitmap("images/slot-machine.png");
    slotMachine.x = 0;
    slotMachine.y = 0;

    reel[0].x = 115;
    reel[0].y = 233;

    reel[1].x = 247;
    reel[1].y = 233;

    reel[2].x = 387;
    reel[2].y = 233;

    powerButton = new createjs.Bitmap("images/powerButton.fw.png");
    powerButton.x = 78;
    powerButton.y = 79;
   
    spinButton = new createjs.Bitmap("images/spinButton.fw.png");
    spinButton.x = 483;
    spinButton.y = 490;

    bet = new createjs.Bitmap("images/bet.png");
    bet.x = 133;
    bet.y = 493;

    bet5 = new createjs.Bitmap("images/bet5.fw.png");
    bet5.x = 256;
    bet5.y = 493;

    bet10 = new createjs.Bitmap("images/bet10.fw.png");
    bet10.x = 375;
    bet10.y = 493;

    reset = new createjs.Bitmap("images/resetButton.fw.png");
    reset.x = 27;
    reset.y = 500;

    money = new createjs.Text(playerMoney, "20px Arial", "red");
    money.x = 440;
    money.y = 450;

    jackpotMoney = new createjs.Text(jackpot, "20px Arial", "red");
    jackpotMoney.x = 257;
    jackpotMoney.y = 130;


    win = new createjs.Text(winnings, "20px Arial", "red");
    win.x = 280;
    win.y = 450;

    betAmount = new createjs.Text(playerBet, "20px Arial", "red");
    betAmount.x = 107;
    betAmount.y = 450;

    stage.enableMouseOver();
    
    stage.addChild(slotMachine, spinButton, reset, money, jackpotMoney, bet, bet5, bet10, betAmount,  win, powerButton);
    stage.addChild(reel[0], reel[1], reel[2]);

    //button events
    spinButton.addEventListener("click", clickHandler);
    spinButton.addEventListener("mouseover", spinHover);
    spinButton.addEventListener("mouseout", spinOutHover);

    bet.addEventListener("click", betHandler);
    bet.addEventListener("mouseover", betOver);
    bet.addEventListener("mouseout", betOut);

    bet5.addEventListener("click", bet5Handler);
    bet5.addEventListener("mouseover", bet5Over);
    bet5.addEventListener("mouseout", bet5Out);

    bet10.addEventListener("click", bet10Handler);
    bet10.addEventListener("mouseover", bet10Over);
    bet10.addEventListener("mouseout", bet10Out);

    reset.addEventListener("click", resetHandler);
    reset.addEventListener("mouseover", resetHover);
    reset.addEventListener("mouseout", resetOutHover);

    powerButton.addEventListener("click", powerOff);
    powerButton.addEventListener("mouseover", powerOver);
    powerButton.addEventListener("mouseout", powerOut);
}
//closes window
function powerOff() {

    window.location.assign("http://webdesign4.georgianc.on.ca/~200261931/comp2068/Portfolio/index.html");

    
}
//button hover
function powerOver() {
    powerButton.alpha = 0.7;
}
function powerOut() {
    powerButton.alpha = 1.0;
}
function spinHover() {
    spinButton.alpha = 0.7;
}
function spinOutHover() {
    spinButton.alpha = 1.0;
}
function betOver() {
    bet.alpha = 0.7;
}
function betOut() {
    bet.alpha = 1.0;
}
function bet5Over() {
    bet5.alpha = 0.7;
}
function bet5Out() {
    bet5.alpha = 1.0;
}
function bet10Over() {
    bet10.alpha = 0.7;
}
function bet10Out() {
    bet10.alpha = 1.0;
}
function resetHover() {
    reset.alpha = 0.7;
}
function resetOutHover() {
    reset.alpha = 1.0;
}
/* Utility function to show Player Stats */
function showPlayerStats() {
 
    jackpotMoney.text = jackpot;
    money.text = playerMoney;
    betAmount.text = playerBet;
    
   
    stage.update();
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
   
}


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
        stage.update();
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    win.text = winnings;
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    win.text = 0;
    resetFruitTally();
    jackpot += parseInt(playerBet);
    stage.update();

}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    } else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels(event) {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                reel[spin].image = blankImg;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "Grapes";
                grapes++;
                reel[spin].image = grapeImg;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "Banana";
                bananas++;
                reel[spin].image = bananaImg;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "Orange";
                oranges++;
                reel[spin].image = orangeImg;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "Cherry";
                cherries++;
                reel[spin].image = cherryImg;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "Bar";
                reel[spin].image = barImg;
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "Bell";
                bells++;
                reel[spin].image = bellImg;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "Seven";
                sevens++;
                reel[spin].image = sevenImg;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if (bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else {
        lossNumber++;
        showLossMessage();
    }

}
//resets all stats
function resetHandler() {
    alert("reset all");
    resetAll();
    showPlayerStats();


}
//bet buttons
function betHandler() {
    playerBet += 1;
    showPlayerStats();

}

function bet5Handler() {
    playerBet += 5;
    showPlayerStats();
   
}
function bet10Handler() {
    playerBet += 10;
    showPlayerStats(); 
}

//spin button function
function clickHandler() {

  
     
    if (playerBet <= 0) {
        
        alert("Please make a bet/ Invalid bet");
        

    } else {
      

        if (playerMoney == 0) {
            if (confirm("You ran out of Money! \nDo you want to play again?")) {
                resetAll();
                showPlayerStats();

            }
        }
        else if (playerBet > playerMoney) {
            alert("You don't have enough Money to place that bet.");
        }
        else if (playerBet < 0) {
            alert("All bets must be a positive $ amount.");
        }
        else if (playerBet <= playerMoney) {
            spinResult = Reels();
            playerMoney = playerMoney - playerBet;
            playerBet = 0;
            determineWinnings();
            turn++;
            showPlayerStats();


        }
       
        else {
            alert("Please enter a valid bet amount");
        }
    }
}

init();
