function moveName(move) {
 return {
    0: 'up',
    1: 'right',
    2: 'down',
    3: 'left'
  }[move];
}

var	global_max_score;
var global_max_score_moves;

function getBestMove(grid, runs, debug) {
		var bestScore = 0; 
		var bestMove = -1;

		for (var i=0;i<4;i++) {
			// score move position
			var res = multiRandomRun(grid, i, runs);
			var score = res.score;
			
			if (score >= bestScore) {
				bestScore = score;
				bestMove = i;
				bestAvgMoves = res.avg_moves;
			}
			
			if (debug) {
				console.log('Move ' + moveName(i) + ": Extra score - " + score);
			}
		}
		if(!grid.movesAvailable()) console.log('bug2');		
		// assert move found		
		if (bestMove == -1) {
			console.log('ERROR...'); 
			errorGrid = grid.clone();
		} 
		
		console.log('Move ' + moveName(bestMove) + ": Extra score - " + bestScore + " Avg number of moves " + bestAvgMoves);			
		
		return {move: bestMove, score: bestScore};
}

function getBestMoveArray(grid, runs, debug) {
	var moveArr = [0,0,0,0];
	
	for (var i = 0; i < 4; i++) {
		// score move position
		var res = multiRandomRun(grid, i, runs);
		var score = res.score;
		// console.log(res, score);

		if (isNaN(score)) {
			// console.log('ERROR: NaN');
		}
		else {
			moveArr[i] += score;
		}

		if (debug) {
			// console.log('Move ' + moveName(i) + ": Extra score - " + score);
		}
	}
	if (!grid.movesAvailable()) console.log('bug2');
	// assert move found
	let bestMove = moveArr.indexOf(Math.max.apply(Math, moveArr));

	if (debug) {
		console.log('Movearr ' + moveArr);
	}

	if (bestMove == -1) {
		console.log('ERROR...');
		errorGrid = grid.clone();
	}

	if (debug) {
		console.log('Best move: ' + moveName(bestMove) + ": Extra score - " + moveArr[bestMove]);
	}

	return moveArr;
}


function multiRandomRun(grid, move, runs) {
	var total = 0.0;
	var min = 1000000;
	var max = 0;
	var total_moves = 0;
	
	for (var i=0 ; i < runs ; i++) {
		var res = randomRun(grid, move);
		var s = res.score;
		if (s == -1) return -1;
			
		total += s;
		total_moves += res.moves;
		if (s < min) min = s;
		if (s > max) max = s;
	}
	
	var avg = total / runs;
	var avg_moves = total_moves / runs;

//	return max;
//	return min;
//	return avg+max;
	return {score: avg, avg_moves:avg_moves};
}

function randomRun(grid, move) {	
	var g = grid.clone();
	var score = 0;
	var res = moveAndAddRandomTiles(g, move);
	if (!res.moved) {
		return -1; // can't start
	}	
	score += res.score;

	// run til we can't
	var moves=1;
	while (true) {
		if (!g.movesAvailable()) break;
		
		var res = g.move(Math.floor(Math.random() * 4));
		if (!res.moved) continue;
		
		score += res.score;
		g.addRandomTile();
		moves++;
	}
	// grid done.
	return {score:score, moves:moves};
}

function moveAndAddRandomTiles(grid, direction) {
	var res = grid.move(direction);
	if (res.moved) grid.addRandomTile();
	return res;
}

// performs a search and returns the best move
function AI_getBest(grid, debug) {
	var runs = document.getElementById('run-count').value;
    return getBestMove(grid, runs, debug);  
}

function AI_getMoveRankings(grid, debug) {
	// could hard-code runs later
	// could also base runs off of computer performance - what is completed within x ms
	// could continue running until user inputs next move
	var runs = document.getElementById('run-count').value;
	return getBestMoveArray(grid, runs, debug);
}

