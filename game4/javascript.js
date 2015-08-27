$(document).ready(function(){
	var BLOCKWIDTH = 75;
	var BLOCKHEIGHT = 100;
	
	// Player Info
	$('#score').append(document.createTextNode("SCORES:"));
	var score = 0;
	var scoreList = new Array;

	// Next block value Array
	var newBlockArray = new Array;
	newBlockArray = [1,1,2,2,3,3,3,3,3,3,3,6,12,24,48,96,192,384,768,1536,3072];
	
	// Ones and Twos Adjustment Array
	var adjustmentProbArray = new Array;
	adjustmentProbArray = [0, 2, 4, 6, 8, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
	
	var randomSeedIndexMax = 9;
	var maxNumValue = 3;
	var currentNumValue = 3;
	var nextValue = Math.floor((Math.random() * 3) + 1);
	
	createNextBlock(nextValue);
	
	// Block Array
	var blockArray = new Array();
	for (i = 0; i < 6; i++)
	{
		blockArray[i] = new Array();
	}
	
	for (j = 0; j < 6; j++)
	{
		for (k = 0; k < 6; k++)
		{
			blockArray[j][k] = 0;
		}
	}
	
	// Position Array
	var posXArray = new Array();
	for (m = 0; m < 6; m++)
	{
		if (m === 0)
		{
			posXArray[m] = 0 - BLOCKHEIGHT;
		}
		else
		{
			posXArray[m] = posXArray[m - 1] + BLOCKHEIGHT;
		}
	}
	
	var posYArray = new Array();
	for (n = 0; n < 6; n++)
	{
		if (n === 0)
		{
			posYArray[n] = 0 - BLOCKWIDTH;
		}
		else
		{
			posYArray[n] = posYArray[n - 1] + BLOCKWIDTH;
		}
	}
	
	
	// Add high score to score list in order
	function addScoreList(inputScore)
	{
		var last = true;
		if (scoreList.length === 0)
		{
			scoreList[0] = inputScore;
		}
		else
		{
			for (i = 0; i < scoreList.length; i++)
			{
				if (inputScore >= scoreList[i])
				{
					scoreList.splice(i , 0, inputScore);
					last = false;
					break;
				}
			}
			if (last)
			{
				scoreList.push(inputScore);
			}
		}
		if (scoreList.length > 10)
		{
			addScoreList.pop();
		}
	}
	
	// Displays the score
	function scoreDisplay(array)
	{
		$('#score').empty();
		$('#score').append(document.createTextNode("SCORES:"));
		$('#score').append(document.createTextNode('\n\n'));
		for (i = 0; i < array.length; i++)
		{
			$('#score').append(document.createTextNode(array[i]));
			$('#score').append(document.createTextNode('\n\n'));
		}
	}
	
	// Create a block In the Game Field
	function createBlock(faceNum, xPos, yPos)
	{
			var block = document.createElement('div');
			if (faceNum === 1)
			{
				block.id = 'one';
			}
			else if (faceNum === 2)
			{
				block.id = 'two';
			}
			else
			{
				block.id = 'block';
			}
			block.xPos = xPos;
			block.yPos = yPos;
			block.num = faceNum;
			$(block).appendTo(document.getElementById('field'));
			$(block).css("top", posXArray[xPos] + "px"); 
			$(block).css("left", posYArray[yPos] + "px"); 

			$(block).text(block.num);
			
			return block;
	}
	
	// Create a Block in the Next Field
	function createNextBlock(faceNum)
	{
			var block = document.createElement('div');
			if (faceNum === 1)
			{
				block.id = 'one';
			}
			else if (faceNum === 2)
			{
				block.id = 'two';
			}
			else
			{
				block.id = 'block';
			}
			block.num = faceNum;
			$(block).appendTo(document.getElementsByClassName('next'));
			$(block).text(block.num);
			return block;
	}
	
	
	// Insert Block Into Array
	function placeBlock(array, block)
	{
		array[block.xPos][block.yPos] = block;
	}
	
	// Create a New Block When sliding
	function createRandomBlock(array, direction, insertNum)
	{
		var placed = false;
		var randomNum;
		if (direction === "left")
		{
			while(!placed)
			{
				randomNum = Math.floor((Math.random() * 4) + 1);
				if(array[randomNum][4] === 0)
				{
					placeBlock(array, createBlock(insertNum, randomNum, 5));
					array[randomNum][4] = array[randomNum][5];
					array[randomNum][5] = 0;
					$(array[randomNum][4]).animate({left: "-=75"}, 'fast');
					placed = true;
				}
			}
		}
		if (direction === "right")
		{
			while(!placed)
			{
				randomNum = Math.floor((Math.random() * 4) + 1);
				if(array[randomNum][1] === 0)
				{
					placeBlock(array, createBlock(insertNum, randomNum, 0));
					array[randomNum][1] = array[randomNum][0];
					array[randomNum][0] = 0;
					$(array[randomNum][1]).animate({left: "+=75"}, 'fast');
					placed = true;
				}
			}
		}
		if (direction === "up")
		{
			while(!placed)
			{
				randomNum = Math.floor((Math.random() * 4) + 1);
				if(array[4][randomNum] === 0)
				{
					placeBlock(array, createBlock(insertNum, 5, randomNum));
					array[4][randomNum] = array[5][randomNum];
					array[5][randomNum] = 0;
					$(array[4][randomNum]).animate({top: "-=100"}, 'fast');
					placed = true;
				}
			}
		}
		if (direction === "down")
		{
			while(!placed)
			{
				randomNum = Math.floor((Math.random() * 4) + 1);
				if(array[1][randomNum] === 0)
				{
					placeBlock(array, createBlock(insertNum, 0, randomNum));
					array[1][randomNum] = array[0][randomNum];
					array[0][randomNum] = 0;
					$(array[1][randomNum]).animate({top: "+=100"}, 'fast');
					placed = true;
				}
			}
		}
	}
	
	// Tile Animations
	function flipOut(array, xPos, yPos)
	{
		$(array[xPos][yPos]).animate({width: "+=20", height: "+=20", top: "-=10", left: "-=10"}, 'fast');
		$(array[xPos][yPos]).animate({width: "-=20", height: "-=20", top: "+=10", left: "+=10"}, 'fast');
	}
	
	//Beginning Set Up
	//9 blocks
	
	function setup(array)
	{
		var beginCount = 0;
		var MAXBEGINBLOCK = 9;
		var randomPosX;
		var randomPosY;
		var randomFace;
	
		while(beginCount < MAXBEGINBLOCK)
		{
			randomPosX = Math.floor((Math.random() * 4) + 1);
			randomPosY = Math.floor((Math.random() * 4) + 1);
			randomFace = Math.floor((Math.random() * 3) + 1);
			if (array[randomPosX][randomPosY] === 0)
			{
				placeBlock(array, createBlock(randomFace, randomPosX, randomPosY));
				beginCount++;
			}
		}
	}


	// Can Move?
	function canMove(array, direction, xPos, yPos)
	{
		if(array[xPos][yPos] !== 0)
		{
			if (direction === "left")
			{
				if (yPos === 1)
				{
					return "stop";
				}
				else if (array[xPos][yPos - 1] === 0)
				{
					return "empty";
				}
				else if ((array[xPos][yPos - 1] !== 0) && (array[xPos][yPos - 1].num === array[xPos][yPos].num || array[xPos][yPos - 1].num + array[xPos][yPos].num === 3))
				{
					return "combine";
				}
				else
				{
					return "stop";
				}
			}
			if (direction === "right")
			{
				if (yPos === 4)
				{
					return "stop";
				}
				else if (array[xPos][yPos + 1] === 0)
				{
					return "empty";
				}
				else if ((array[xPos][yPos + 1] !== 0) && (array[xPos][yPos + 1].num === array[xPos][yPos].num || array[xPos][yPos + 1].num + array[xPos][yPos].num === 3))
				{
					return "combine";
				}
				else
				{
					return "stop";
				}
			}
			if (direction === "up")
			{
				if (xPos === 1)
				{
					return "stop";
				}
				else if (array[xPos - 1][yPos] === 0)
				{
					return "empty";
				}
				else if ((array[xPos - 1][yPos] !== 0) && (array[xPos - 1][yPos].num === array[xPos][yPos].num || array[xPos - 1][yPos].num + array[xPos][yPos].num === 3))
				{
					return "combine";
				}
				else
				{
					return "stop";
				}
			}
			if (direction === "down")
			{
				if (xPos === 4)
				{
					return "stop";
				}
				else if (array[xPos + 1][yPos] === 0)
				{
					return "empty";
				}
				else if ((array[xPos + 1][yPos] !== 0) && (array[xPos + 1][yPos].num === array[xPos][yPos].num || array[xPos + 1][yPos].num + array[xPos][yPos].num === 3))
				{
					return "combine";
				}
				else
				{
					return "stop";
				}
			}
		}
		else
		{
			return "stop";
		}
	}
	
	var oneCount = 0;
	var twoCount = 0;
	
	// Counts Ones and Twos in the Field 	
	function countingOnesTwos(array)
	{
		oneCount = 0;
		twoCount = 0;
		for(i = 1; i < 5; i++)
		{
			for(j = 1; j < 5; j++)
			{
				if (array[i][j].num === 1)
				{
					oneCount++;
				}
				if (array[i][j].num === 2)
				{
					twoCount++;
				}
			}
		}
	}
	
	// Moving Function
	function moving (array, direction)
	{
		var randomIndex = Math.floor(Math.random() * randomSeedIndexMax);
		var newNum = 3;
		var moved = false;
		if (direction === "left")
		{
			for(i = 1; i < 5; i++)
			{
				for(j = 1; j < 5; j++)
				{
					if(canMove(array, direction, i, j) === "empty")
					{
						array[i][j - 1] = array[i][j];
						array[i][j] = 0;
						$(array[i][j - 1]).animate({left: "-=75"}, 'fast');
						moved = true;
					}
					if(canMove(array, direction, i, j) === "combine")
					{
						if((array[i][j - 1].num === 1 && array[i][j].num === 2) || (array[i][j - 1].num === 2 && array[i][j].num === 1))
						{

							$(array[i][j]).animate({left: "-=75"}, 'fast');
							$(array[i][j]).fadeOut( function() { $(this).remove(); });
							array[i][j] = 0;
							$(array[i][j - 1]).fadeOut( function() { $(this).remove(); });
							array[i][j - 1] = createBlock(3, i, j - 1);
							moved = true;
							flipOut(array, i, j - 1);

						}
						else if (array[i][j].num !== 1 && array[i][j].num !== 2)
						{
							newNum = array[i][j].num * 2;
							$(array[i][j]).animate({left: "-=75"}, 'fast');
							$(array[i][j]).fadeOut( function() { $(this).remove(); });
							array[i][j] = 0;
							$(array[i][j - 1]).fadeOut( function() { $(this).remove(); });
							array[i][j - 1] = createBlock(newNum, i, j - 1);
							moved = true;
							flipOut(array, i, j - 1);
						}
					}
				}
			}
		}
		if (direction === "right")
		{
			for(i = 1; i < 5; i++)
			{
				for(j = 4; j >= 1; j--)
				{
					if(canMove(array, direction, i, j) === "empty")
					{
						array[i][j + 1] = array[i][j];
						array[i][j] = 0;
						$(array[i][j + 1]).animate({left: "+=75"}, 'fast');
						moved = true;
					}
					if(canMove(array, direction, i, j) === "combine")
					{
						if((array[i][j + 1].num === 1 && array[i][j].num === 2) || (array[i][j + 1].num === 2 && array[i][j].num === 1))
						{

							$(array[i][j]).animate({left: "+=75"}, 'fast');
							$(array[i][j]).fadeOut( function() { $(this).remove(); });
							array[i][j] = 0;
							$(array[i][j + 1]).fadeOut( function() { $(this).remove(); });
							array[i][j + 1] = createBlock(3, i, j + 1);
							moved = true;
							flipOut(array, i, j + 1);
						}
						else if (array[i][j].num !== 1 && array[i][j].num !== 2)
						{
							newNum = array[i][j].num * 2;
							$(array[i][j]).animate({left: "+=75"}, 'fast');
							$(array[i][j]).fadeOut( function() { $(this).remove(); });
							array[i][j] = 0;
							$(array[i][j + 1]).fadeOut( function() { $(this).remove(); });
							array[i][j + 1] = createBlock(newNum, i, j + 1);
							moved = true;
							flipOut(array, i, j + 1);
						}
					}
				}
			}
		}
		if (direction === "up")
		{
			for(j = 1; j < 5; j++)
			{
				for(i = 1; i < 5; i++)
				{
					if(canMove(array, direction, i, j) === "empty")
					{
						array[i - 1][j] = array[i][j];
						array[i][j] = 0;
						$(array[i - 1][j]).animate({top: "-=100"}, 'fast');
						moved = true;
					}
					if(canMove(array, direction, i, j) === "combine")
					{
						if((array[i - 1][j].num === 1 && array[i][j].num === 2) || (array[i - 1][j].num === 2 && array[i][j].num === 1))
						{

							$(array[i][j]).animate({top: "-=100"}, 'fast');
							$(array[i][j]).fadeOut( function() { $(this).remove(); });
							array[i][j] = 0;
							$(array[i - 1][j]).fadeOut( function() { $(this).remove(); });
							array[i - 1][j] = createBlock(3, i - 1, j);
							moved = true;
							flipOut(array, i - 1, j);
						}
						else if (array[i][j].num !== 1 && array[i][j].num !== 2)
						{
							newNum = array[i][j].num * 2;
							$(array[i][j]).animate({top: "-=100"}, 'fast');
							$(array[i][j]).fadeOut( function() { $(this).remove(); });
							array[i][j] = 0;
							$(array[i - 1][j]).fadeOut( function() { $(this).remove(); });
							array[i - 1][j] = createBlock(newNum, i - 1, j);
							moved = true;
							flipOut(array, i - 1, j);
						}
					}
				}
			}
		}
		if (direction === "down")
		{
			for(j = 1; j < 5; j++)
			{
				for(i = 4; i >= 1; i--)
				{
					if(canMove(array, direction, i, j) === "empty")
					{
						array[i + 1][j] = array[i][j];
						array[i][j] = 0;
						$(array[i + 1][j]).animate({top: "+=100"}, 'fast');
						moved = true;
					}
					if(canMove(array, direction, i, j) === "combine")
					{
						if((array[i + 1][j].num === 1 && array[i][j].num === 2) || (array[i + 1][j].num === 2 && array[i][j].num === 1))
						{

							$(array[i][j]).animate({top: "+=100"}, 'fast');
							$(array[i][j]).fadeOut( function() { $(this).remove(); });
							array[i][j] = 0;
							$(array[i + 1][j]).fadeOut( function() { $(this).remove(); });
							array[i + 1][j] = createBlock(3, i + 1, j);
							moved = true;
							flipOut(array, i + 1, j);
						}
						else if (array[i][j].num !== 1 && array[i][j].num !== 2)
						{
							newNum = array[i][j].num * 2;
							$(array[i][j]).animate({top: "+=100"}, 'fast');
							$(array[i][j]).fadeOut( function() { $(this).remove(); });
							array[i][j] = 0;
							$(array[i + 1][j]).fadeOut( function() { $(this).remove(); });
							array[i + 1][j] = createBlock(newNum, i + 1, j);
							moved = true;
							flipOut(array, i + 1, j);
						}
					}
				}
			}
		}
		if(moved)
		{
			// Highlight larger blocks
			highLightHighestBlock(array);
			
			// Creates and Moves the next block into the field
			createRandomBlock(array, direction, nextValue);
			
			// Code to balance out the number ones and twos.
			countingOnesTwos(array);
			if(oneCount >= twoCount)
			{
				if (adjustmentProbArray[oneCount - twoCount] > Math.floor(Math.random() * 10))
				{
					nextValue = 2;
				}
				else
				{
					nextValue = newBlockArray[randomIndex];
				}
			}
			else if (oneCount <= twoCount)
			{
				if (adjustmentProbArray[twoCount - oneCount] > Math.floor(Math.random() * 10))
				{
					nextValue = 1;
				}
				else
				{
					nextValue = newBlockArray[randomIndex];
				}
			}
			
			$('.next').empty();
			createNextBlock(nextValue);
			return newNum;
		}
	}
	
	
	
	// Check if Game over
	function gameOverCheck(array)
	{
		for(i = 1; i < 5; i++)
		{
			for(j = 1; j < 5; j++)
			{	
				if(array[i][j] === 0)
				{
					return false;
				}
				if(j !== 1)
				{
					if((array[i][j].num === array[i][j - 1].num) && array[i][j].num !== 1 && array[i][j].num !== 2)
					{
						return false;
					}
					if((array[i][j].num === 1 && array[i][j - 1].num === 2) || (array[i][j].num === 2 && array[i][j - 1].num === 1))
					{
						return false;
					}

					if((array[j][i].num === array[j - 1][i].num) && array[j][i].num !== 1 && array[j][i].num !== 2)
					{
						return false;
					}
					if((array[j][i].num === 1 && array[j - 1][i].num === 2) || (array[j][i].num === 2 && array[j - 1][i].num === 1))
					{
						return false;
					}
				}
			}
		}
		return true;
	}
	
	// Scoring the Game
	function scoring(array)
	{
		var totalScore = 0;
		
		var faceNum = new Array;
		faceNum = [1,2,3,6,12,24,48,96,192,384,768,1536,3072,6144];
		
		var scoreValues = new Array;
		scoreValues = [0,0,3,9,27,81,243,729,2187,6561,19683,59049,177147,531441];
		
		var faceNumCount = new Array(14);
		faceNumCount = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		
		for(i = 1; i < 5; i++)
		{
			for(j = 1; j < 5; j++)
			{
				for(k = 0; k < 14; k++)
				{
					if(array[i][j].num === faceNum[k])
					{
						faceNumCount[k]++;
					}
				}
			}
		}
		for(l = 0; l < 14; l++)
		{
			totalScore += scoreValues[l] * faceNumCount[l];
		}
		return totalScore;
	}
	
	// Reset the Game;
	function reSet(array)
	{
		randomSeedIndexMax = 9;
		maxNumValue = 3;
		currentNumValue = 3;
		nextValue = Math.floor((Math.random() * 3) + 1);
		score = 0;
		
		// Remove Existing BLocks
		for(i = 1; i < 5; i++)
		{
			for(j = 1; j < 5; j++)
			{
				$(array[i][j]).remove();
				array[i][j] = 0;
			}
		}
		setup(array);
		$('.next').empty();
		createNextBlock(nextValue);
		$(document.getElementById('gameover')).animate({top: "-=450"}, 'fast', function() { $(this).remove(); });
	}
	
	function gameOverAnimation(inputScore)
	{
		var gameOverPanel = document.createElement('div');
		var scorePanel = document.createElement('div');
		gameOverPanel.id = 'gameover';
		scorePanel.id = 'texttile';
		$(gameOverPanel).appendTo(document.getElementById('field'));
		$(scorePanel).appendTo(gameOverPanel);

		$(scorePanel).html("NO MORE MOVES!<br/> SCORE: " + inputScore);
		$(gameOverPanel).animate({top: "+=480"}, 'fast');
		$(gameOverPanel).animate({top: "-=70"}, 'fast');
		$(gameOverPanel).animate({top: "+=40"}, 'fast');

	}
	
	function startUpAnimation()
	{
		$(document.getElementById('startgame')).animate({top: "-=450"}, 'fast', function() { $(this).remove(); });
	}
	
	function highLightHighestBlock(array)
	{
		var highestNum = 6;
		for(i = 1; i < 5; i++)
		{
			for(j = 1; j < 5; j++)
			{
				if (array[i][j].num >= highestNum && array[i][j] !== 0)
				{
					highestNum = array[i][j].num;
				}
			}
		}
		for(i = 1; i < 5; i++)
		{
			for(j = 1; j < 5; j++)
			{
				if (array[i][j].num === highestNum)
				{
					array[i][j].id = 'red';
				}
				else if (array[i][j].num !== 1 && array[i][j].num !== 2)
				{
					array[i][j].id = 'block';
				}
			}
		}
	}
	
	// Main
	
	var gameovertrue = true;
	setup(blockArray);
	$('body').keydown(function(event){
		
		if (gameovertrue === false)
		{
			if(event.which == 37)
			{
				//gameOverAnimation(score);
				currentNumValue = moving(blockArray, "left");
			}
			if(event.which == 39)
			{
				currentNumValue = moving(blockArray, "right");
			}
			if(event.which == 38)
			{
				currentNumValue = moving(blockArray, "up");
			}
			if(event.which == 40)
			{
				currentNumValue = moving(blockArray, "down");
			}
			
			if (currentNumValue > maxNumValue)
			{
				maxNumValue = currentNumValue;
				randomSeedIndexMax++;
			}
			
			if(gameOverCheck(blockArray))
			{
				score = scoring(blockArray);
				gameOverAnimation(score);
				addScoreList(score);
				scoreDisplay(scoreList);
				gameovertrue = true;
			}
		}
		
	});
	var resetbutton = false;
	$('#reset').click(function() {
		if (resetbutton === true)
		{
			reSet(blockArray);
			gameovertrue = false;
			$(document.getElementById('field')).focus();
		}
	});
	
	$('#ok').click(function() {
		startUpAnimation()
		gameovertrue = false;
		resetbutton = true;
		$(document.getElementById('field')).focus();
	});
	
});