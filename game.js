const gameBoard = (() =>{
    var boardState = {
        topLeft : "empty",
        topMiddle: "empty",
        topRight: "empty",
        left: "empty",
        middle: "empty",
        right: "empty",
        botLeft: "empty",
        botMiddle: "empty",
        botRight: "empty"};

    var score = {
        playerOne: 0,
        playerTwo: 0
    };
    
    var startingPlayer = 0;
    var playerTurn = [];
    var turnCounter = 0;
    var pieceCounter = 0;
    
    
    const playerRotation = (player1, player2) =>{
            for(let i = 0; i < 11; i++){
                if(i % 2 == 0){
                    playerTurn[i] = player1;
                } else {
                    playerTurn[i] = player2;
                };
            };
            createBoard()
            addEvent(playerTurn[turnCounter]);
            return;
        };

    const createBoard = () =>{
        console.log(boardState);
        Object.entries(boardState).forEach(([key,value])=>{
            const img = document.createElement("img");
            const markerCon = document.querySelector("#"+key.toString()+"Con")
            img.setAttribute("id", key.toString());
            img.setAttribute("class", "marker");
            img.setAttribute("src", "./assets/" + value.toString() + ".png")
            markerCon.appendChild(img)
        });
        return;
    };

    const addEvent = (x) => {
        Object.entries(boardState).forEach(([key,value])=>{
            if(value == "empty"){
                const current = document.querySelector("#"+key.toString());
                const squares = document.querySelectorAll(".marker");
                current.addEventListener("click", () =>{
                    boardState[key] = x;
                    squares.forEach(square =>{
                        square.remove();
                    });
                    createBoard();
                    checkWin();
                });
                return;
            } else {
                return;
            };
        });
        return;
    };

    const checkWin = () =>{
        const playerOneWin = [playerTurn[0], playerTurn[0],playerTurn[0]];
        const playerTwoWin = [playerTurn[1],playerTurn[1],playerTurn[1]];
        const winConOne = [boardState.topLeft, boardState.topMiddle, boardState.topRight];
        const winConTwo = [boardState.left, boardState.middle, boardState.right];
        const winConThree = [boardState.botLeft, boardState.botMiddle, boardState.botRight];
        const winConFour = [boardState.topLeft, boardState.middle, boardState.botRight];
        const winConFive = [boardState.botLeft, boardState.middle, boardState.topRight];
        const winConSix = [boardState.topLeft, boardState.left, boardState.botLeft];
        const winConSeven = [boardState.topMiddle, boardState.middle, boardState.botMiddle];
        const winConEight = [boardState.topRight, boardState.right, boardState.botRight];

        const winCons = [winConOne.join(""), winConTwo.join(""), winConThree.join(""), winConFour.join(""), winConFive.join(""), winConSix.join(""), winConSeven.join(""), winConEight.join("")]
        for (let i = 0; i< winCons.length; i++){
            if(winCons[i] == playerOneWin.join("")){
                score.playerOne++;
                const playerOneScores = document.querySelector("#player1Scores");
                playerOneScores.textContent = score.playerOne;
                playerTwoFirst();
                return;
            } else if (winCons[i] == playerTwoWin.join("")){
                score.playerTwo++;
                const playerTwoScores = document.querySelector("#player2Scores");
                playerTwoScores.textContent = score.playerTwo;
                playerOneFirst();
                return;
            };
        };
        pieceCounter++;
        if(pieceCounter == 9 && startingPlayer == 0){
            console.log("player 1 test")
            playerTwoFirst();
            return;
        } else if(pieceCounter == 9 && startingPlayer == 1){
            console.log("player 2 test")
            playerOneFirst();
            return;
        };
        turnCounter++;
        addEvent(playerTurn[turnCounter]);
    };

    const playerOneFirst = () => {
        const newBoard = document.querySelector("#newBoard");
        const button = document.createElement("button");
        newBoard.append(button);
        button.setAttribute("type", "button");
        button.textContent = "Play again?";
        pieceCounter = 0;
        turnCounter = 0;
        startingPlayer = 0;
        button.addEventListener("click", ()=>{
            Object.keys(boardState).forEach(key =>{
                boardState[key] = "empty";
            })
            createBoard()
            addEvent(playerTurn[turnCounter]);
            button.remove();
        });
        return;
    };

    const playerTwoFirst = () => {
        const newBoard = document.querySelector("#newBoard");
        const button = document.createElement("button");
        newBoard.append(button);
        button.setAttribute("type", "button");
        button.textContent = "Play again?";
        pieceCounter = 0;
        turnCounter = 1;
        startingPlayer = 1;
        button.addEventListener("click", ()=>{
            Object.keys(boardState).forEach(key =>{
                boardState[key] = "empty";
            })
            createBoard()
            addEvent(playerTurn[turnCounter]);
            button.remove();
        });
        return;
    };
    return {playerRotation}
})();

const displayController = (() =>{
    
    const markerOption = () => {
        const markerDiv = document.querySelector("#markerOption");

        const header = document.createElement("h1");
        header.textContent = "Select your piece"

        const container = document.querySelector("#container")
        container.setAttribute("class", "blur");

        const form = document.createElement("form");
        form.setAttribute("class", "markerButtonCon");

        const crossesButton = document.createElement("img");
        crossesButton.setAttribute("id", "crosses");
        crossesButton.setAttribute("src", "./assets/crosses.png")
        crossesButton.addEventListener("click", ()=>{
            gameBoard.playerRotation(Player('crosses').gamePiece(), Player('noughts').gamePiece());
            markerDiv.remove()
            container.removeAttribute("class", "blur");
        });

        const noughtsButton = document.createElement("img");
        noughtsButton.setAttribute("id", "noughts");
        noughtsButton.setAttribute("src", "./assets/noughts.png")
        noughtsButton.addEventListener("click", ()=>{
            gameBoard.playerRotation(Player('noughts').gamePiece(), Player('crosses').gamePiece())
            markerDiv.remove()
            container.removeAttribute("class", "blur");
        });

        markerDiv.append(header)

        form.append(crossesButton);
        form.append(noughtsButton);

        markerDiv.append(form);
        return;
    }

    return {markerOption};
})();

const Player = (marker) =>{
    const gamePiece = () => marker;

    return {gamePiece};
};

displayController.markerOption()