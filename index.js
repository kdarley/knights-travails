console.log("hello world")

const boardFactory = () => {
    function buildBoard() {
        let row = new Array(8).fill(null)
        let board = row.map(() => new Array(8).fill(false))
        return board
    }
    let board = buildBoard()

    const knightMoves = [
        [2,1], [1,2], [-1,2], [-2,1],
        [-2,-1], [-1,-2], [1,-2], [2,-1]
    ];

    function validMove(x, y) {
        if (x >=0 && // can't be off left side of board
            y >=0 && // can't be off bottom of board
            x < 8 && // can't be off right of board
            y < 8 && // can't be off top of board
            board[x][y] !== true){ // can't be a spot that has been visited before 
            return true
        } else {
            return false
        }
    }

    function shortestPath(start, end){
        const startX = start[0]
        const startY = start[1]
        const endX = end[0]
        const endY = end[1]

        const queue = [{x:startX, y:startY, steps:0, path: [[startX, startY]]}] // 0 is the current steps count
        board[startX][startY] = true // visit the board location
        while (queue.length > 0){
            const currentPosition = queue.shift();

            //end logic
            if (currentPosition.x === endX && currentPosition.y === endY){
                return {steps: currentPosition.steps, path: currentPosition.path}
            }

            // iterate through possible move set
            for (const [knightMoveX, knightMoveY] of knightMoves){
                const newX = currentPosition.x + knightMoveX
                const newY = currentPosition.y + knightMoveY
                
                // check if new position is valid if if it is, move to queue
                if (validMove(newX, newY)){
                    board[newX][newY] = true;
                    queue.push({x:newX, y:newY, 
                        steps:currentPosition.steps+1, path: [...currentPosition.path, [newX,newY]]})
                }
            }
        }
        return null
    }

    return {
        shortestPath
    }
}

const b = boardFactory()

const checkPath=b.shortestPath([3,3], [4,3])
console.log(checkPath)