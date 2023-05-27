function GameManager(size, InputManager, Actuator) {
  this.size         = size; // Size of the grid
  this.inputManager = new InputManager;
  this.actuator     = new Actuator;

  this.running      = false;

  this.aiarray      = new Array();

  this.moveList     = new Array();

  this.inputManager.on("move", this.move.bind(this));
  this.inputManager.on("restart", this.restart.bind(this));

  this.inputManager.on('think', function() {
    var best = AI_getBest(this.grid, true);
    this.actuator.showHint(best.move);
  }.bind(this));


  this.setup();
}

// Restart the game
GameManager.prototype.restart = function () {
  this.actuator.restart();
  this.running = false;
  this.actuator.aicomment("new game");
  this.setup();
};

// Set up the game
GameManager.prototype.setup = function () {
  this.grid         = new Grid(this.size);
  this.grid.addStartTiles();

  this.score        = 0;
  this.over         = false;
  this.won          = false;

  // Update the actuator
  this.actuator.aicomment("new game");
  this.actuate();
};


// Sends the updated grid to the actuator
GameManager.prototype.actuate = function () {
  this.actuator.actuate(this.grid, {
    score: this.score,
    over:  this.over,
    won:   this.won
  });
};

// makes a given move and updates state
GameManager.prototype.move = function(direction) {
  // console.log("attempting to move "+ moveName(direction));
  // compare this move to ai's ranking
  let comparison = this.compareMove(direction);
  // console.log("move rank: "+comparison);

  // can implement blocking of a move here with 
  // clippy-like character being a bit of an ass

  var result = this.grid.move(direction);
  this.score += result.score;

  if (!result.won) {
    if (result.moved) {
      this.grid.computerMove();
    }
  } else {
    // this.won = true;
    // don't stop after getting to 2048
  }

  // store move that was made here to array
  this.addMoveToList(this.grid, direction, this.aiarray, comparison, result);

  //console.log(this.grid.valueSum());

  if (!this.grid.movesAvailable()) {
    this.over = true; // Game over!
  }
  else {
    // now we can ask the ai which move it would make
    // console.log("finding best move...")
    let begin = new Date().getTime();
    this.aiarray = AI_getMoveRankings(this.grid);
    let end = new Date().getTime();
    let diffms = end - begin;
    // // console.log(this.compareHelper());
    // console.log("found moves. took " + diffms + "ms");
  }

  this.actuate();
}

GameManager.prototype.compareHelper = function() {
  let ailist = this.aiarray;
  if (ailist.length == 0) {
    // console.log("short")
    return;
  }
  let sortedAiList = [...ailist].sort().reverse();
  let sorted = sortedAiList.map((x,i) => sortedAiList.indexOf(ailist[i]));
  return sorted;
}


GameManager.prototype.compareMove = function(direction) {
  // // a sorted o [3,1,0,2] means that 
  // // index 0, (up) is the 4th best move
  // // index 1, (right) is the 2nd best move
  // // index 2, (down) is the best move
  // // index 3, (left) is the 3rd best move
  // // so we get the ranking of the human move by returning sorted[humanMove]

  let sorted = this.compareHelper();
  if (sorted == undefined) {
    return;
  }
  let humanMove = direction;
  let comparison = sorted[humanMove];
  // 0: human move was ai's first choice
  // 1: human move was ai's second choice
  // 2: ...
  return comparison;
};

GameManager.prototype.addMoveToList = function(inputgrid, direction, inputaiarray, comparison, inputresult) {
  this.moveList.push({
    grid: inputgrid,
    direction: direction,
    dirName: moveName(direction),
    comparison: comparison,
    aiarr: inputaiarray
  });

  // console.log(inputresult);
  // console.log(this.grid.movesAvailable());

  // print something to display on screen
  if (this.grid.movesAvailable() && inputresult.moved) {
    if (comparison != undefined) {
      this.actuator.aicomment("Move rank: "+comparison);
    }
    else {
      this.actuator.aicomment("first move is not ranked");
    }
  }
  else if (!this.grid.movesAvailable() && !inputresult.moved) {
    this.actuator.aicomment("Game over");
  }
}