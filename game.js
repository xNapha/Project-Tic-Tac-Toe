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
    
    var playerTurn = [];
    var counter = 0;
    
    
    const playerRotation = (player1, player2) =>{
            for(let i = 0; i<9; i++){
                if(i%2 ==0){
                    playerTurn[i] = player1
                } else{
                    playerTurn[i] = player2
                };
            };
            createBoard()
            addEvent(playerTurn[counter]);
        };

    const createBoard = () =>{
        Object.entries(boardState).forEach(([key,value])=>{
            const img = document.createElement("img");
            const markerCon = document.querySelector("#"+key.toString()+"Con")
            img.setAttribute("id", key.toString());
            img.setAttribute("class", "marker");
            img.setAttribute("src", "./assets/" + value.toString() + ".png")
            markerCon.appendChild(img)
        });
    };

    const addEvent = (x) => {
        Object.entries(boardState).forEach(([key,value])=>{
            if(value == "empty"){
                const current = document.querySelector("#"+key.toString());
                const squares = document.querySelectorAll(".marker");
                current.addEventListener("click", () =>{
                    boardState[key] = x
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
    };

    const checkWin = () =>{
        const playerOneWin = [playerTurn[0], playerTurn[0],playerTurn[0]]
        const playerTwoWin = [playerTurn[1],playerTurn[1],playerTurn[1]]
        const winConOne = [boardState.topLeft, boardState.topMiddle, boardState.topRight]
        const winConTwo = [boardState.left, boardState.middle, boardState.right]
        const winConThree = [boardState.botLeft, boardState.botMiddle, boardState.botRight]
        const winConFour = [boardState.topLeft, boardState.middle, boardState.botRight]
        const winConFive = [boardState.botLeft, boardState.middle, boardState.topRight]
        const winConSix = [boardState.topLeft, boardState.left, boardState.botLeft]
        const winConSeven = [boardState.topMiddle, boardState.middle, boardState.botMiddle]
        const winConEight = [boardState.topRight, boardState.right, boardState.botRight]

        const winCons = [winConOne.join(""), winConTwo.join(""), winConThree.join(""), winConFour.join(""), winConFive.join(""), winConSix.join(""), winConSeven.join(""), winConEight.join("")]
        
        for (let i = 0; i< winCons.length; i++){
            if(winCons[i] == playerOneWin.join("")){
                score.playerOne++;
                const playerOneScores = document.querySelector("#player1Scores");
                playerOneScores.textContent = score.playerOne;
                counter = 0;
                displayController.newRound()
                return;
            } else if (winCons[i] == playerTwoWin.join("")){
                score.playerTwo++;
                const playerTwoScores = document.querySelector("#player2Scores");
                playerTwoScores.textContent = score.playerTwo;
                counter = 0;
                displayController.newRound()
                return;
            };
        };
        counter++;
        addEvent(playerTurn[counter]);
    };

    return {boardState ,score, playerRotation, createBoard, addEvent, playerTurn, counter}

})();

const displayController = (() =>{
    const singlePlayer= () => {

        return;
    };

    const twoPlayer= () => {
        const playerCount = document.querySelector("#playerCount");
        
        return playerCount.setAttribute("z-index", "0");
    };

    const markerOption = () => {
        return;
    };

    const newRound = () => {
        const newBoard = document.querySelector("#newBoard");
        const button = document.querySelector("button")
        button.setAttribute("type", "button")
        button.textContent = "Play again?";
        button.addEventListener("click", ()=>{
            Object.keys(gameBoard.boardState).forEach(key =>{
                gameBoard.boardState[key] = "empty"
            })
            gameBoard.createBoard;
            gameBoard.addEvent(gameBoard.playerTurn[0])
            button.remove()
        });
        newBoard.append(button)
        
    }

    return {singlePlayer, twoPlayer, newRound}
})();

const Player = (marker) =>{
    const gamePiece = () => marker;

    return {gamePiece};
};

const crosses = Player("crosses");
const noughts = Player("noughts");
