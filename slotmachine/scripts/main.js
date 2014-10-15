/// <reference path="jquery.js" />
var stage;
var spin1;
var spin2;
var spin3;
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
var bets = 0;
var reel = [spin1 = new createjs.Bitmap(sevenImg), spin2 = new createjs.Bitmap(sevenImg), spin3 = new createjs.Bitmap(sevenImg)];


function init() {
    stage = new createjs.Stage(document.getElementById("canvas"));
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTick);

    drawSlotMachine();
}

function handleTick() {
    stage.update();
}
function drawSlotMachine() {
    var slotMachine = new createjs.Bitmap("images/slot-machine.png");
    slotMachine.x = 0;
    slotMachine.y = 0;

    reel[0].x = 58;
    reel[0].y = 134;

    reel[1].x = 163;
    reel[1].y = 134;

    reel[2].x = 267;
    reel[2].y = 134;

    powerButton = new createjs.Bitmap("images/powerButton.fw.png");
    powerButton.x = 41;
    powerButton.y = 254;
   
    spinButton = new createjs.Bitmap("images/spinButton.fw.png");
    spinButton.x = 310;
    spinButton.y = 340;

    bet = new createjs.Bitmap("images/bet.png");
    bet.x = 40;
    bet.y = 345;

    bet5 = new createjs.Bitmap("images/bet5.fw.png");
    bet5.x = 100;
    bet5.y = 345;

    bet10 = new createjs.Bitmap("images/bet10.fw.png");
    bet10.x = 160;
    bet10.y = 345;

    reset = new createjs.Bitmap("images/resetButton.fw.png");
    reset.x = 240;
    reset.y = 345;

    var title = new createjs.Text("Player Statistics", "25px Arial", "black");
    title.x = 480;
    title.y = 25;

    money = new createjs.Text("Player Money: " + playerMoney, "20px Arial", "black");
    money.x = 450;
    money.y = 110;

    jackpotMoney = new createjs.Text("Jackpot: " + jackpot, "20px Arial", "black");
    jackpotMoney.x = 450;
    jackpotMoney.y = 90;

    playerTurn = new createjs.Text("Player Turns: " + turn, "20px Arial", "black");
    playerTurn.x = 450;
    playerTurn.y = 130;

    wins = new createjs.Text("Wins: " + winNumber, "20px Arial", "black");
    wins.x = 450;
    wins.y = 150;

    loses = new createjs.Text("Losses: " + lossNumber, "20px Arial", "black");
    loses.x = 450;
    loses.y = 170;

    ratio = new createjs.Text("Win Ratio: " + (winRatio * 100).toFixed(2), "20px Arial", "black");
    ratio.x = 450;
    ratio.y = 190;

    win = new createjs.Text("Winnings: " + winnings, "20px Arial", "black");
    win.x = 450;
    win.y = 210;

    betAmount = new createjs.Text("Credits: " + bets, "20px Arial", "black");
    betAmount.x = 450;
    betAmount.y = 230;

    stage.enableMouseOver();
    
    stage.addChild(slotMachine, spinButton, reset, money, title, jackpotMoney, playerTurn, bet, bet5, bet10, betAmount, wins, loses, ratio, win, powerButton);
    stage.addChild(reel[0], reel[1], reel[2]);

    spinButton.addEventListener("click", clickHandler);
    spinButton.addEventListener("mouseover", spinHover);
    spinButton.addEventListener("mouseout", spinOutHover);

    bet.addEventListener("click", betHandler);

    bet5.addEventListener("click", bet5Handler);

    bet10.addEventListener("click", bet10Handler);

    reset.addEventListener("click", resetHandler);
    reset.addEventListener("mouseover", resetHover);
    reset.addEventListener("mouseout", resetOutHover);
}

function spinHover() {
    spinButton.alpha = 0.5;
}
function spinOutHover() {
    spinButton.alpha = 1.0;
}
function resetHover() {
    reset.alpha = 0.5;
}
function resetOutHover() {
    reset.alpha = 1.0;
}
/* Utility function to show Player Stats */
function showPlayerStats() {

    winRatio = winNumber / turn;
    jackpotMoney.text = "Jackpot: " + jackpot;
    money.text = "Player Money: " + playerMoney;
    betAmount.text = "Credits: " + bets;
    playerTurn.text = "Player Turns: " + turn;
    wins.text = "Wins: " + winNumber;
    loses.text = "Losses: " + lossNumber;
    ratio.text = "Win Ratio: " + (winRatio * 100).toFixed(2) + "%";
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
    bets = 0;
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
    win.text = "You Won: $" + winnings;
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    win.text = "You Lost!";
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

function resetHandler() {
    alert("reset all");
    resetAll();
    showPlayerStats();


}

function betHandler() {
    playerBet = 1;
    bets += 1;
    playerMoney = playerMoney - playerBet;
    showPlayerStats();

}

function bet5Handler() {
    playerBet = 5;
    bets += 5;
    playerMoney = playerMoney - playerBet;
    showPlayerStats();
   
}
function bet10Handler() {
    playerBet = 10;
    bets += 10;
    playerMoney = playerMoney - playerBet;
    showPlayerStats(); 
}


function clickHandler() {
    
     
    if (bets == 0) {
        alert("Please make a bet");
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
            bets = bets - 1;
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
