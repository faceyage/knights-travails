//shows shortest possible way to start location to end location
function knightMoves(knightPos, targetPos) {
  const knight = new Cell(knightPos[0], knightPos[1], 0);

  const queue = [];
  const visited = [];

  //make all board unvisited(visited=false) as default
  for (let i = 0; i < 8; i++) {
    visited.push([]);
    for (let j = 0; j < 8; j++) {
      visited[i].push(false);
    }
  }

  //start queue from knight and make it visited as default
  visited[knightPos[0]][knightPos[1]] = true;
  queue.push(knight);
  //to record path
  let prev = knight;

  while (queue.length !== 0) {
    let curr = queue.shift();
    if (curr.dist >= prev.dist) prev = curr;

    //if current cell is equal target then write the path and distance
    //and below if it prints results nothing to worry about
    if (curr.x === targetPos[0] && curr.y === targetPos[1]) {
      console.log(`You made it in ${curr.dist} moves!  Here's your path:`);
      let list = [];
      while (curr !== null) {
        list.push([curr.x, curr.y]);
        curr = curr.prev;
      }
      list = list.reverse();
      list.forEach((x) => {
        console.log(x);
      });
      return;
    }

    //get possible moves knight can make
    const possibleMoves = curr.findPossibleMoves();
    possibleMoves.forEach(([x, y]) => {
      //visit node if not visited
      if (!visited[x][y]) {
        visited[x][y] = true;
        queue.push(new Cell(x, y, curr.dist + 1, prev));
      }
    });
  }
  //returns -1 if can't find path
  return -1;
}

class Cell {
  constructor(x, y, dist, prev = null) {
    this.x = x;
    this.y = y;
    this.dist = dist;
    this.prev = prev;
  }

  //finds possible moves for given cell for a knight
  findPossibleMoves(x = this.x, y = this.y) {
    const X = [2, 1, -1, -2, -2, -1, 1, 2];
    const Y = [1, 2, 2, 1, -1, -2, -2, -1];

    const moves = [];
    for (let i = 0; i < X.length; i++) {
      const _x = x + X[i];
      const _y = y + Y[i];
      if (this.isPossibleMove(_x, _y)) {
        moves.push([_x, _y]);
      }
    }
    return moves;
  }

  //checks if the move is possible or not
  isPossibleMove(x, y) {
    return !(x >= 8 || y >= 8 || x < 0 || y < 0);
  }
}

const result = knightMoves([4, 5], [1, 1]);
