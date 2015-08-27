$(document).ready(function(){
	// Variables
	var actionphase = true;
	var buyphase = false;
	var attackphase = false;
	var enemyphase = false;
	var movephase = false;
	var discardphase = false;
	var drawphase = false;
	var gold = 0;
	var gem = 0;
	var health = 10;
	$("#heart").html(health);
	var goldreserve = 0;
	var action = 1;
	var baseposition = 4;
	var enemylegaltarget = false;
	var unitlegaltarget = false;
	

	//Hidden Stuff
	$(".playpanel").hide();
	$(".damage").hide();
	$(".unitcolumn4").hide();
	$(".unitcolumn5").hide();
	$(".unitcolumn6").hide();
	$("#enemycolumn4").hide();
	$("#enemycolumn5").hide();
	$("#enemycolumn6").hide();
	$(".mousehover").hide();

	
	// UI Stuff
	var buypanelopen = false;
	$('.buypanelbutton').on('click', function(){
		if (!buypanelopen)
		{
			$('.buypanel').animate({right: "+=850"}, 'fast');
			buypanelopen = true;
		}
		else if (buypanelopen)
		{
			$('.buypanel').animate({right: "-=850"}, 'fast');
			buypanelopen = false;
		}
	});
	$(".discard").html("DISCARD");

	function money()
	{
		$(".turngold").html(gold);
		$(".reservegold").html("+" + goldreserve);
		$(".gemnumber").html(gem);
	}
	
	// Array Randomiser
	function shuffle(array){var currentIndex = array.length, temporaryValue, randomIndex;
		while (0 !== currentIndex) {
    // Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
    // And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}
	
	//Icons on Buy Cards, Units and Enemies
	function drawicons(buy, enemy, carddiv, hurt)
	{
		var coin = document.createElement('div');
		var gem = document.createElement('div');
		var sword = document.createElement('div');
		var shield = document.createElement('div');
		var arrow = document.createElement('div');
		var helmet = document.createElement('div');
		var mask = document.createElement('div');
		var chest = document.createElement('div');
		chest.className = "iconprice";
		coin.className = "iconprice";
		gem.className = "iconprice";
		sword.className = "iconstats";
		shield.className = "iconstats";
		arrow.className = "iconstats";
		helmet.className = "iconstats";
		mask.className = "iconstats";

		if (buy && !enemy)
		{
			if(carddiv.cost > 0 && carddiv.gem > 0)
			{
				$(carddiv).append($(gem));
				$(gem).css({left: 82, top: -10});
				$(gem).css({'background-position': '-6px 15px'})
				$(gem).css({'font-size': 40});
				gem.style.backgroundImage = "url('images/finished/gem.png')";
				$(gem).html(carddiv.gem);
			}
			if(carddiv.cost > 0)
			{
				$(carddiv).append($(coin));
				$(coin).css({left: 80, top: -45});
				$(coin).css({'background-position': '-3px 15px'})
				$(coin).css({'font-size': 40});
				coin.style.backgroundImage = "url('images/finished/coin.png')";
				$(coin).html(carddiv.cost);
			}
			if(!carddiv.cost && carddiv.gem)
			{
				$(carddiv).append($(gem));
				$(gem).css({left: 82, top: -45});
				$(gem).css({'background-position': '-6px 15px'})
				$(gem).css({'font-size': 40});
				gem.style.backgroundImage = "url('images/finished/gem.png')";
				$(gem).html(carddiv.gem);
			}
		}
		if (carddiv.type === "unit")
		{
			//Sword Icon
			$(carddiv).append($(sword));
			$(sword).css({left: -60, top: 120});
			$(sword).css({'background-position': '45px 5px'})
			$(sword).css({'font-size': 40});
			sword.style.backgroundImage = "url('images/finished/sword.png')";
			$(sword).html(carddiv.attack);
			//Shield Icon
			if(hurt)
			{
				shield.className = "iconstatshurt";
			}
			$(carddiv).append($(shield));
			$(shield).css({left: 25, top: 120});
			$(shield).css({'background-position': '35px 0px'})
			$(shield).css({'font-size': 40});
			shield.style.backgroundImage = "url('images/finished/shield.png')";
			$(shield).html(carddiv.health);
		}
		if(enemy)
		{
			//Chest Icon
			if(carddiv.rewardgem || carddiv.rewardgold)
			{
				$(carddiv).append($(chest));
				$(chest).css({left: -20, top: -35});
				$(chest).css({'background-position': '8px 0px'})
				$(chest).css({'font-size': 40});
				chest.style.backgroundImage = "url('images/finished/chest.png')";
			}
			//Sword Icon
			$(carddiv).append($(sword));
			$(sword).css({left: -60, top: 40});
			$(sword).css({'background-position': '45px 5px'})
			$(sword).css({'font-size': 40});
			sword.style.backgroundImage = "url('images/finished/sword.png')";
			$(sword).html(carddiv.attack);
			//Shield Icon
			if(!carddiv.shroud)
			{
				if(hurt)
				{
					shield.className = "iconstatshurt";
					helmet.className = "iconstatshurt";
				}
				$(carddiv).append($(shield));
				$(shield).css({left: 25, top: 40});
				$(shield).css({'background-position': '35px 0px'})
				$(shield).css({'font-size': 40});
				shield.style.backgroundImage = "url('images/finished/shield.png')";
				$(shield).html(carddiv.health);
			}
			//Archers
			if(carddiv.id === "banditarcher" || carddiv.id === "cursedknight")
			{
				$(carddiv).append($(arrow));
				$(arrow).css({left: 30, top: -50});
				$(arrow).css({'background-position': '18px 0px'})
				$(arrow).css({'font-size': 40});
				arrow.style.backgroundImage = "url('images/finished/arrow3.png')";
				$(arrow).html(1);
			}
			//Shroud
			if(carddiv.shroud)
			{
				$(carddiv).append($(helmet));
				$(helmet).css({left: 25, top: 40});
				$(helmet).css({'background-position': '25px -10px'})
				$(helmet).css({'font-size': 40});
				helmet.style.backgroundImage = "url('images/finished/helmet.png')";
				$(helmet).html(carddiv.health);
			}
			//Stealth
			if(carddiv.stealth)
			{
				$(carddiv).append($(mask));
				$(mask).css({left: 29, top: -45});
				$(mask).css({'background-position': '18px 0px'})
				$(mask).css({'font-size': 40});
				mask.style.backgroundImage = "url('images/finished/mask2.png')";
			}
		}
	}
	//
	// Deck, Hand, Discard, Draw
	var deckarray = new Array();
	deckarray = ["peasantlabor","peasantlabor","peasantlabor","peasantlabor","peasantlabor","peasantlabor","peasantlabor","healingpotion","healingpotion","healingpotion"];
	shuffle(deckarray);
	var discardarray = new Array();
	var handarray = new Array();
	for (var p = 0; p < 10000; p++)
	{
		handarray[p] = document.createElement('div');
		handarray[p].className = "card";
		handarray[p].played = false;
		handarray[p].inhand = false;
	}
	// Draw Function
	var cardsdrawn = 0;
	var cardsinhand = 0;
	function drawcard(deck, hand, discard)
	{
		if(!deck.length)
		{
			var discardsize = discard.length;
			for(var h = 0; h < discardsize; h++)
			{
				deck[h] = discard[0];
				discard.shift();
			}
			shuffle(deck);
			$(".deck").attr("id", "deckfull");
			$(".discard").attr("id", "discardempty");
		}
		hand[cardsdrawn].id = deck[0];
		if(deck[0] === "peasantlabor" || deck[0] === "mercenarycontract" || deck[0] === "divinefavor")
		{
			hand[cardsdrawn].type = "both";
		}
		else if (deck[0] === "noblefavors")
		{
			hand[cardsdrawn].type = "treasure";
		}
		else
		{
			hand[cardsdrawn].type = "action";
		}
		deck.shift();
		if (!deck.length)
		{
			$(".deck").attr("id", "deckempty");
		}
		document.body.appendChild(hand[cardsdrawn]);
		hand[cardsdrawn].style.left = 1000;
		hand[cardsdrawn].inhand = true;
		$(hand[cardsdrawn]).animate({left: cardsinhand * 105 + 5}, 'slow');
		cardsinhand++;
		cardsdrawn++;
		$(".deck").html(deck.length);
		$('.deckcount').html('Deck:' + deck.length + 'Dis:' + discard.length);
	}
	// Play Area
	var actionresolved = false;
	var cardsplayed = 0;
	var actioninprocess = new Object();
	actioninprocess.used = false;
	// Play Cards
	$.each(handarray, function(index){
		$(this).on('click', function(){
			actionresolved = false;
			//Checking for legal targets
			enemylegaltarget = false;
			unitlegaltarget = false;
			for (var r = 0; r < enemyarray.length; r++)
			{
				if(enemyarray[r].column > 0 && enemyarray[r].column < 7 && !enemyarray[r].shroud && !enemyarray[r].killed)
				{
					enemylegaltarget = true;
				}
			}
			for (r = 0; r < unitcolumnarray.length; r++)
			{
				if(!unitcolumnarray[r].empty)
				{
					unitlegaltarget = true;
				}
			}
			if(!handarray[index].played && !actioninprocess.used && actionphase && action && !buyhold.used &&(handarray[index].type === "both"||handarray[index].type === "action"))
			{
				//Peasant Labor
				if(handarray[index].id === "peasantlabor" && enemylegaltarget)
				{
					actioninprocess.used = true;
					actioninprocess.id = handarray[index].id;
					actionresolved = true;
					
					//Target Flag Animate
					$('.phasesbutton').animate({opacity: 0.0, left: "-=450"},'slow');
					setTimeout(function(){$('.phasesbutton').attr("id","selectenemy")},400);
					setTimeout(function(){$('.phasesbutton').html("")},400);
					$('.phasesbutton').animate({opacity: 1.0, left: "+=450"},'slow');
				}
				//Mercenary Contract
				if(handarray[index].id === "mercenarycontract" && enemylegaltarget)
				{
					actioninprocess.used = true;
					actioninprocess.id = handarray[index].id;
					actionresolved = true;
					
					//Target Flag Animate
					$('.phasesbutton').animate({opacity: 0.0, left: "-=450"},'slow');
					setTimeout(function(){$('.phasesbutton').attr("id","selectenemy")},400);
					setTimeout(function(){$('.phasesbutton').html("")},400);
					$('.phasesbutton').animate({opacity: 1.0, left: "+=450"},'slow');
				}
				//Divine Favor
				if(handarray[index].id === "divinefavor" && enemylegaltarget)
				{
					actioninprocess.used = true;
					actioninprocess.id = handarray[index].id;
					actionresolved = true;
					
					//Target Flag Animate
					$('.phasesbutton').animate({opacity: 0.0, left: "-=450"},'slow');
					setTimeout(function(){$('.phasesbutton').attr("id","selectenemy")},400);
					setTimeout(function(){$('.phasesbutton').html("")},400);
					$('.phasesbutton').animate({opacity: 1.0, left: "+=450"},'slow');
				}
				//Healing Potion
				if(handarray[index].id === "healingpotion")
				{
					var currenthealth = health;
					if(health < 8)
					{
						health = health + 2;
					}
					else
					{
						health = 10;
					}
					action++;
					actionresolved = true;
					
					//Heal Animation
					var currenthealth = health;
					var healnum = document.createElement('div');
					healnum.className = "heal";
					document.body.appendChild(healnum);
					$(healnum).fadeIn('0',0.0);
					$(healnum).animate({opacity: 0.0},'fast');
					$(healnum).html('+' + 2);
					$(healnum).animate({left: $('#basecolumn').position().left + 5, top: $('#basecolumn').position().top - 80}, 0.0);
					$(healnum).animate({opacity: 1.0},0.0);
					$(healnum).animate({opacity: 0.0, top: "-=60"},'fast');
					$(healnum).animate({top: -1000},'fast');
					$('#heart').html(health);
					//
				}
				//Fireball 
				if(handarray[index].id === "fireball")
				{
					for(var e = 0; e < enemyarray.length; e++)
					{
						if(!enemyarray[e].killed && enemyarray[e].column > 0 && enemyarray[e].column < 7)
						{
							enemyarray[e].health--;
							enemyarray[e].health--;
						// Damage Animation
							var damagenum = document.createElement('div');
							damagenum.className = "damage";
							document.body.appendChild(damagenum);
							$(damagenum).fadeIn('0',0.0);
							$(damagenum).animate({opacity: 0.0},'fast');
							$(damagenum).html('-2');
							$(damagenum).animate({left: $(enemyarray[e]).position().left + 5, top: $(enemyarray[e]).position().top - 50}, 0.0);
							$(damagenum).animate({opacity: 1.0},0.0);
							$(damagenum).animate({opacity: 0.0, top: "-=60"},'fast');
							$(damagenum).animate({top: -1000},'fast');
						//
							drawicons(false, true, enemyarray[e], true);
							if(enemyarray[e].health <= 0)
							{
								enemyarray[e].killed = true;
								goldreserve = goldreserve + enemyarray[e].rewardgold;
								gem = gem + enemyarray[e].rewardgem;
								$(enemyarray[e]).animate({opacity: 0.0},'fast');
								$(enemyarray[e]).hide('fast');
							}
						}
					}
					money();
					actionresolved = true;
				}
				// Skillful Bureaucrat
				if(handarray[index].id === "skillfulbureaucrat")
				{
					action++;
					drawcard(deckarray, handarray, discardarray);
					drawcard(deckarray, handarray, discardarray);
					actionresolved = true;
					$(".deck").animate({bottom: "+=10"},'fast');
					$(".deck").animate({bottom: "-=10"},'fast');
				}
				// Training
				if(handarray[index].id === "training" && unitlegaltarget)
				{
					actioninprocess.used = true;
					actioninprocess.id = handarray[index].id;
					actionresolved = true;
					//Target Unit Flag
					$('.phasesbutton').animate({opacity: 0.0, left: "-=450"},'slow');
					setTimeout(function(){$('.phasesbutton').attr("id","selectunit")},400);
					setTimeout(function(){$('.phasesbutton').html("")},400);
					$('.phasesbutton').animate({opacity: 1.0, left: "+=450"},'slow');
				}
				// Action Successful Used
				if (actionresolved)
				{
					handarray[index].played = true;
					handarray[index].inhand = false;
				// Animation Etc.

					//Play Area
					$('.playpanel').fadeIn('0',0.0);
					$('.playpanel').animate({left: 200, top: 30},'fast');
					$('.playpanel').animate({opacity: 1.0},'fast');
					for (var t = 0; t < 10000; t++)
					{
						if (handarray[t].played)
						{
							$(handarray[t]).fadeIn('0',0.0);
							$(handarray[t]).animate({opacity: 1.0},'fast');
						}
					}
					$(this).animate({left: $(".playpanel").position().left + 20 + cardsplayed * 110, bottom: $(".playpanel").position().top + 300}, 'fast');
					// Shiftcards
					cardsinhand--;
					for (var v = index + 1; v < 10000; v++)
					{
						if (handarray[v].inhand)
						{
							$(handarray[v]).animate({left: "-=105"}, 'slow');
						}
					}
					//
					if (actioninprocess.used)
					{
						$('.playpanel').animate({opacity: 0.0},'fast');
						for (t = 0; t < 10000; t++)
						{
							if (handarray[t].played)
							{
								$(handarray[t]).animate({opacity: 0.0});
								$(handarray[t]).hide('fast');
							}
						}
						$('.playpanel').hide('fast');
					}
					cardsplayed++;
					action--;
					$('.phasesbutton').html("&nbsp" + action);
				}
			}
		});
	});
	// Create Enemy Units
	var enemytypes = new Array();
	enemytypes = ["bandit", "banditarcher", "brokenknight", "brute", "cursedknight", "taintedpriest"];
	var enemyarray = new Array();
	
	for(var i = 0; i < 100; i++)
	{
		enemyarray[i] = document.createElement('div');
		enemyarray[i].className = 'enemy';
		enemyarray[i].style.zIndex = "-1";
		if(i < 3)
		{
			enemyarray[i].id =  enemytypes[0];
		}
		if(i >= 3 && i < 7)
		{
			enemyarray[i].id = enemytypes[1];
		}
		if(i >= 7 && i < 11)
		{
			enemyarray[i].id = enemytypes[2];
		}
		if(i >= 11 && i < 13)
		{
			enemyarray[i].id = enemytypes[3];
		}
		if(i >= 13 && i < 16)
		{
			enemyarray[i].id = enemytypes[4];
		}
		if(i >= 16 && i < 100)
		{
			enemyarray[i].id = enemytypes[5];
		}
		//Bandit
		if (enemyarray[i].id === 'bandit')
		{
			enemyarray[i].health = 2;
			enemyarray[i].attack = 2;
			enemyarray[i].killed = false;
			enemyarray[i].shroud = false;
			enemyarray[i].stealth = false;
			enemyarray[i].rewardgold = 0;
			enemyarray[i].rewardgem = 0;
			enemyarray[i].column = 0;
			enemyarray[i].style.left = 10;
			enemyarray[i].style.top = 50;
		}
		//Bandit Archer
		if (enemyarray[i].id === 'banditarcher')
		{
			enemyarray[i].health = 4;
			enemyarray[i].attack = 0;
			enemyarray[i].killed = false;
			enemyarray[i].shroud = false;
			enemyarray[i].stealth = false;
			enemyarray[i].rewardgold = 0;
			enemyarray[i].rewardgem = 0;
			enemyarray[i].column = 0;
			enemyarray[i].style.left = 10;
			enemyarray[i].style.top = 50;
		}
		//Broken Knight
		if (enemyarray[i].id === 'brokenknight')
		{
			enemyarray[i].health = 4;
			enemyarray[i].attack = 4;
			enemyarray[i].killed = false;
			enemyarray[i].shroud = false;
			enemyarray[i].stealth = false;
			enemyarray[i].rewardgold = 1;
			enemyarray[i].rewardgem = 0;
			enemyarray[i].column = 0;
			enemyarray[i].style.left = 10;
			enemyarray[i].style.top = 50;
		}
		//Brute
		if (enemyarray[i].id === 'brute')
		{
			enemyarray[i].health = 10;
			enemyarray[i].attack = 4;
			enemyarray[i].killed = false;
			enemyarray[i].shroud = false;
			enemyarray[i].stealth = false;
			enemyarray[i].rewardgold = 0;
			enemyarray[i].rewardgem = 1;
			enemyarray[i].column = 0;
			enemyarray[i].style.left = 10;
			enemyarray[i].style.top = 50;
		}
		//Cursed Knight
		if (enemyarray[i].id === 'cursedknight')
		{
			enemyarray[i].health = 6;
			enemyarray[i].attack = 6;
			enemyarray[i].killed = false;
			enemyarray[i].shroud = true;
			enemyarray[i].stealth = false;
			enemyarray[i].rewardgold = 1;
			enemyarray[i].rewardgem = 1;
			enemyarray[i].column = 0;
			enemyarray[i].style.left = 10;
			enemyarray[i].style.top = 50;
		}
		//Tainted Mage
		if (enemyarray[i].id === 'taintedpriest')
		{
			enemyarray[i].health = 6;
			enemyarray[i].attack = 6;
			enemyarray[i].killed = false;
			enemyarray[i].shroud = false;
			enemyarray[i].stealth = true;
			enemyarray[i].rewardgold = 2;
			enemyarray[i].rewardgem = 1;
			enemyarray[i].column = 0;
			enemyarray[i].style.left = 10;
			enemyarray[i].style.top = 50;
		}
	}	
	// Placement Area
	//Draws the div
	document.body.appendChild(enemyarray[0]);
	//Displays stats

	drawicons(false, true, enemyarray[0], false);
	
	// Move Enemies Function
	var moveCounter = 0;
	function moveEnemies(array)
	{
		for (var j = moveCounter; j >= 0; j--)
		{
			if (!array[j].killed)
			{
				array[j].column++;
				array[j].style.zIndex = "0";
				$(array[j]).animate({left: "+=130"}, 'slow');
				//$(array[j]).html(array[j].id + "Stats:" + array[j].attack + "/" + array[j].health);
				drawicons(false, true, array[j], false);
				if(array[j].column >= baseposition)
				{
					health = health - array[j].attack;
					$("#heart").html(health);
					array[j].killed = true;
					// Damage Animation
					var damagenum = document.createElement('div');
					damagenum.className = "damage";
					document.body.appendChild(damagenum);
					$(damagenum).fadeIn('0',0.0);
					$(damagenum).animate({opacity: 0.0},'fast');
					$(damagenum).html(0 - array[j].attack);
					$(damagenum).animate({left: $("#basecolumn").position().left + 5, top: $("#basecolumn").position().top - 50}, 0.0);
					$(damagenum).animate({opacity: 1.0},'fast');
					$(damagenum).animate({top: "-=100"},'fast');
					$(damagenum).animate({opacity: 0.0},'fast');
					$(damagenum).animate({top: -1000},'fast');
					//
					$(array[j]).animate({opacity: 0.0},'slow');
					if(health <= 0)
					{
						alert('You are dead!');
					}
				}
			}
		}
		document.body.appendChild(array[moveCounter+1]);
		//$(array[moveCounter+1]).html((array[moveCounter+1]).id + "Stats:" + array[moveCounter+1].attack + '/' + array[moveCounter+1].health);
		drawicons(false, true, array[moveCounter+1], false);
		moveCounter++;
	}

	// Buy
	var buytypes = new Array();
	buytypes = ["peasantlabor","healingpotion","mercenarycontract","noblefavors","skillfulbureaucrat","training","medic","soldier", "knight", "divinefavor", "fireball", "mage"];
	
	var buyslotarray = new Array();
	buyslotarray = [document.getElementsByClassName('buyslot1'),document.getElementsByClassName('buyslot2'),document.getElementsByClassName('buyslot3'),document.getElementsByClassName('buyslot4'),document.getElementsByClassName('buyslot5'),document.getElementsByClassName('buyslot6'),document.getElementsByClassName('buyslot7'),document.getElementsByClassName('buyslot8'),document.getElementsByClassName('buyslot9'),document.getElementsByClassName('buyslot10'),document.getElementsByClassName('buyslot11'),document.getElementsByClassName('buyslot12')];
	for (var m = 0; m < buyslotarray.length; m++)
	{
		buyslotarray[m].id = buytypes[m];
		$(buyslotarray[m]).attr("id", buytypes[m]);
		buyslotarray[m].limit = 10;
		// Peasant Labor
		if (buyslotarray[m].id === "peasantlabor")
		{
			buyslotarray[m].cost = 1;
			buyslotarray[m].gem = 0;
			buyslotarray[m].type = "both";
		}
		// Healing Potion
		if (buyslotarray[m].id === "healingpotion")
		{
			buyslotarray[m].cost = 2;
			buyslotarray[m].gem = 0;
			buyslotarray[m].type = "action";
		}
		// Mercenary Contract
		if (buyslotarray[m].id === "mercenarycontract")
		{
			buyslotarray[m].cost = 3;
			buyslotarray[m].gem = 0;
			buyslotarray[m].type = "both";
		}
		// Noble Favors
		if (buyslotarray[m].id === "noblefavors")
		{
			buyslotarray[m].cost = 3;
			buyslotarray[m].gem = 0;
			buyslotarray[m].type = "treasure";
		}
		// Skillful Bureaucrat
		if (buyslotarray[m].id === "skillfulbureaucrat")
		{
			buyslotarray[m].cost = 5;
			buyslotarray[m].gem = 0;
			buyslotarray[m].type = "action";
		}
		// Training
		if (buyslotarray[m].id === "training")
		{
			buyslotarray[m].cost = 5;
			buyslotarray[m].gem = 0;
			buyslotarray[m].type = "action";
		}
		// Medic
		if (buyslotarray[m].id === "medic")
		{
			buyslotarray[m].cost = 3;
			buyslotarray[m].gem = 0;
			buyslotarray[m].type = "supportunit";
		}
		// Soldier
		if (buyslotarray[m].id === "soldier")
		{
			buyslotarray[m].cost = 3;
			buyslotarray[m].gem = 0;
			buyslotarray[m].attack = 2;
			buyslotarray[m].health = 2;
			buyslotarray[m].type = "unit";
		}
		// Knight
		if (buyslotarray[m].id === "knight")
		{
			buyslotarray[m].cost = 6;
			buyslotarray[m].gem = 0;
			buyslotarray[m].attack = 3;
			buyslotarray[m].health = 3;
			buyslotarray[m].type = "unit";
		}
		// Divine Favor
		if (buyslotarray[m].id === "divinefavor")
		{
			buyslotarray[m].cost = 0;
			buyslotarray[m].gem = 1;
			buyslotarray[m].type = "both";
		}
		// Fireball
		if (buyslotarray[m].id === "fireball")
		{
			buyslotarray[m].cost = 8;
			buyslotarray[m].gem = 0;
			buyslotarray[m].type = "action";
		}
		// Mage
		if (buyslotarray[m].id === "mage")
		{
			buyslotarray[m].cost = 10;
			buyslotarray[m].gem = 1;
			buyslotarray[m].type = "supportunit";
		}
		//
		drawicons(true, false, buyslotarray[m], false);
	}
	var buyhold = new Object();
	buyhold.used = false;
	buyhold.id = "none";
	buyhold.type = "none";
	$.each(buyslotarray, function(index){
		$(this).on('click', function(){
			if (buyphase && buyslotarray[index].cost <= (gold + goldreserve) && buyslotarray[index].gem <= gem && buyslotarray[index].limit > 0 && !buyhold.used)
			{
				// Animation
				$(buyslotarray[index]).animate({top: "-=10"},'fast');
				$(buyslotarray[index]).animate({top: "+=10"},'fast');
				//
				buyslotarray[index].limit--;
				gem = gem - buyslotarray[index].gem; 
				if (buyslotarray[index].cost > gold)
				{
					goldreserve = goldreserve - (buyslotarray[index].cost - gold);
					gold = 0;
				}
				else
				{
					gold = gold - buyslotarray[index].cost;
				}
				//$(buyslotarray[index]).html(buyslotarray[index].id + "Cost: " + buyslotarray[index].cost + "Limit:" + buyslotarray[index].limit);
				if (buyslotarray[index].type === "unit" || buyslotarray[index].type === "supportunit")
				{
					
					buyhold.type =  buyslotarray[index].type;
					buyhold.id =  buyslotarray[index].id;
					buyhold.used = true;
					// Closes Buy Panel
					if (buypanelopen)
					{
						$('.buypanel').animate({right: "-=850"}, 'fast');
						buypanelopen = false;
					}
					// Animate Unit Placement Flag
					$('.phasesbutton').animate({opacity: 0.0, left: "-=450"},'slow');
					setTimeout(function(){$('.phasesbutton').attr("id","placeunit")},400);
					setTimeout(function(){$('.phasesbutton').html("")},400);
					$('.phasesbutton').animate({opacity: 1.0, left: "+=450"},'slow');
				}
				else
				{
					discardarray.unshift(buyslotarray[index].id);
					$(".discard").attr("id", discardarray[0]);
					$(".discard").animate({bottom: "-=10"},'fast');
					$(".discard").animate({bottom: "+=10"},'fast');
				}
			}
			money();
		});
	});
	//Unit Placement
	var unitcolumnarray = new Array();
	unitcolumnarray = [document.getElementsByClassName('unitcolumn1'),document.getElementsByClassName('unitcolumn2'),document.getElementsByClassName('unitcolumn3'),document.getElementsByClassName('unitcolumn4'),document.getElementsByClassName('unitcolumn5'),document.getElementsByClassName('unitcolumn6')];
	for (var n = 0; n < unitcolumnarray.length; n++)
	{
		unitcolumnarray[n].column = n+1;
		unitcolumnarray[n].empty = true;
		if(n < 3)
		{
			unitcolumnarray[n].unlocked = true;
		}
		else
		{
			unitcolumnarray[n].unlocked = false;
		}
	}
	$.each(unitcolumnarray, function(index){
		$(this).on('click', function(){
			// Buy Placement
			if (buyhold.used && unitcolumnarray[index].unlocked && buyhold.type === "unit")
			{
				// Action Flag return
				$('.phasesbutton').animate({opacity: 0.0, left: "-=450"},'slow');
				setTimeout(function(){$('.phasesbutton').attr("id","buydone")},400);
				setTimeout(function(){$('.phasesbutton').html("")},400);
				$('.phasesbutton').animate({opacity: 1.0, left: "+=450"},'slow');
				//
				
				unitcolumnarray[index].id = buyhold.id;
				$(unitcolumnarray[index]).attr("id", buyhold.id);
				unitcolumnarray[index].empty = false;

				//Soldier
				if (unitcolumnarray[index].id === "soldier")
				{
					unitcolumnarray[index].attack = 2;
					unitcolumnarray[index].health = 2;
					unitcolumnarray[index].killed = false;
					unitcolumnarray[index].disabled = false;
				}
				//Knight
				if (unitcolumnarray[index].id === "knight")
				{
					unitcolumnarray[index].attack = 3;
					unitcolumnarray[index].health = 3;
					unitcolumnarray[index].killed = false;
					unitcolumnarray[index].disabled = false;
				}
				buyhold.used = false;
				unitcolumnarray[index].type = "unit";
				drawicons(false, false, unitcolumnarray[index], false);
			}
			// Action Target
			if(actioninprocess.used && !unitcolumnarray[index].killed)
			{
				//Bring action Flag Animate back
				$('.phasesbutton').animate({opacity: 0.0, left: "-=450"},'slow');
				setTimeout(function(){$('.phasesbutton').attr("id","actiondone")},400);
				setTimeout(function(){$('.phasesbutton').html(action)},400);
				$('.phasesbutton').animate({opacity: 1.0, left: "+=450"},'slow');
				
				// Training
				if(actioninprocess.id === "training")
				{
					unitcolumnarray[index].attack++;
					drawicons(false, false, unitcolumnarray[index], false);
					actioninprocess.used = false;
				}
			}
		});
	});
	
	//Support Units
	var support1 = $(".supportcolumn1");
	var support2 = $(".supportcolumn2");
	support1.unlocked = true;
	support1.empty = true;
	support2.unlocked = false;
	support2.empty = true;
	var supportarray = new Array();
	supportarray = [support1, support2];
	var supportslotcost = 6;
	
	$.each(supportarray, function(index){
		$(this).on('click', function(){
			// Buy Placement
			if (buyhold.used && supportarray[index].unlocked && buyhold.type === "supportunit")
			{
				supportarray[index].id = buyhold.id;
				$(supportarray[index]).attr("id", buyhold.id);
				supportarray[index].empty = false;

				//Medic and Mage

				buyhold.used = false;
				// Buy Done Flag return
				$('.phasesbutton').animate({opacity: 0.0, left: "-=450"},'slow');
				setTimeout(function(){$('.phasesbutton').attr("id","buydone")},400);
				setTimeout(function(){$('.phasesbutton').html("")},400);
				$('.phasesbutton').animate({opacity: 1.0, left: "+=450"},'slow');
				//
			}
			
			// Buying Support Slot
			if (buyphase && supportslotcost <= (gold + goldreserve) && !supportarray[index].unlocked && !buyhold.used)
			{
				$('.supportcolumn2').attr("id", "supportunlocked"); 
				supportarray[index].unlocked = true;
				if (supportslotcost > gold)
				{
					goldreserve = goldreserve - (supportslotcost - gold);
					gold = 0;
				}
				else
				{
					gold = gold - supportslotcost;
				}
				money();
			}
		});
	});
	
	//Buying Extra Columns
	$("#buycolumngold").html(buycolumngold);
	var columnsbought = 0;
	var column4cost = 4;
	var column5cost = 6;
	var column6cost = 6;
	$("#buycolumngold").html(column4cost);
	$("#buycolumngem").html(1);
	$("#buycolumngem").hide();
	$('.buycolumn').on('click', function(){
		if (buyphase && !buyhold.used)
		{
			if(!columnsbought && column4cost <= (gold + goldreserve))
			{
				$(this).animate({left: "+=130"}, 'slow');
				$("#buycolumngem").animate({left: "+=130"}, 'slow');
				$("#buycolumngold").animate({left: "+=130"}, 'slow')
				$("#buycolumngold").html(column5cost);
				
				$('#basecolumn').animate({left: "+=130"}, 'slow');
				$('#heart').animate({left: "+=130"}, 'slow');
				$(supportarray[1]).animate({left: "+=130"}, 'slow');
				$('.unitcolumn4').fadeIn('0',0.0);
				$('.unitcolumn4').animate({opacity: 1.0},'fast');
				$('#enemycolumn4').fadeIn('0',0.0);
				$('#enemycolumn4').animate({opacity: 1.0},'fast');
				unitcolumnarray[3].unlocked = true;
				columnsbought++;
				baseposition++;
				if (column4cost > gold)
				{
					goldreserve = goldreserve - (column4cost - gold);
					gold = 0;
				}
				else
				{
					gold = gold - column4cost;
				}
			}
			else if(columnsbought === 1 && column5cost <= (gold + goldreserve))
			{
				$(this).animate({left: "+=130"}, 'slow');
				

				$("#buycolumngem").animate({left: "+=80"}, 'fast');
				$('#buycolumngem').fadeIn('0',0.0);
				$('#buycolumngem').animate({opacity: 1.0},'fast');
				$("#buycolumngold").animate({left: "+=100"}, 'slow')
				$("#buycolumngold").html(column6cost);
				
				$('#basecolumn').animate({left: "+=130"}, 'slow');
				$('#heart').animate({left: "+=130"}, 'slow');
				$(supportarray[1]).animate({left: "+=130"}, 'slow');
				$('.unitcolumn5').fadeIn('0',0.0);
				$('.unitcolumn5').animate({opacity: 1.0},'fast');
				$('#enemycolumn5').fadeIn('0',0.0);
				$('#enemycolumn5').animate({opacity: 1.0},'fast');
				unitcolumnarray[4].unlocked = true;
				columnsbought++;
				baseposition++;
				if (column5cost > gold)
				{
					goldreserve = goldreserve - (column5cost - gold);
					gold = 0;
				}
				else
				{
					gold = gold - column5cost;
				}
			}
			else if(columnsbought === 2 && column6cost <= (gold + goldreserve) && gem )
			{
				$(this).hide('fast');
				$("#buycolumngem").hide('fast');
				$("#buycolumngold").hide('fast');
				
				$('#basecolumn').animate({left: "+=130"}, 'slow');
				$('#heart').animate({left: "+=130"}, 'slow');
				$(supportarray[1]).animate({left: "+=130"}, 'slow');
				$('.unitcolumn6').fadeIn('0',0.0);
				$('.unitcolumn6').animate({opacity: 1.0},'fast');
				$('#enemycolumn6').fadeIn('0',0.0);
				$('#enemycolumn6').animate({opacity: 1.0},'fast');
				unitcolumnarray[5].unlocked = true;
				columnsbought++;
				baseposition++;
				gem--;
				if (column6cost > gold)
				{
					goldreserve = goldreserve - (column6cost - gold);
					gold = 0;
				}
				else
				{
					gold = gold - column6cost;
				}
			}
			money();
		}
	});
	
	// Targeting Enemies
	$.each(enemyarray, function(index){
		$(this).on('click', function(){
			if(enemyarray[index].column > 0 && !enemyarray[index].killed && !enemyarray[index].shroud && actioninprocess.used)
			{
				//Bring action Flag Animate back
				$('.phasesbutton').animate({opacity: 0.0, left: "-=450"},'slow');
				setTimeout(function(){$('.phasesbutton').attr("id","actiondone")},400);
				setTimeout(function(){$('.phasesbutton').html(action)},400);
				$('.phasesbutton').animate({opacity: 1.0, left: "+=450"},'slow');
				//		
				
				var enemyhealth = enemyarray[index].health;
				// Peasant Labor
				if(actioninprocess.id === "peasantlabor")
				{
					enemyarray[index].health--;
					actioninprocess.used = false;
				}
				// Mercenary Contract
				if(actioninprocess.id === "mercenarycontract")
				{
					enemyarray[index].health--;
					enemyarray[index].health--;
					actioninprocess.used = false;
				}
				// Divine Favor
				if(actioninprocess.id === "divinefavor")
				{
					enemyarray[index].health--;
					enemyarray[index].health--;
					enemyarray[index].health--;
					actioninprocess.used = false;
				}
				drawicons(false, true, enemyarray[index], true);
				// Damage Animation
				var damagenum = document.createElement('div');
				damagenum.className = "damage";
				document.body.appendChild(damagenum);
				$(damagenum).fadeIn('0',0.0);
				$(damagenum).animate({opacity: 0.0},'fast');
				$(damagenum).html(enemyarray[index].health - enemyhealth) ;
				$(damagenum).animate({left: $(enemyarray[index]).position().left + 5, top: $(enemyarray[index]).position().top - 50}, 0.0);
				$(damagenum).animate({opacity: 1.0},0.0);
				$(damagenum).animate({opacity: 0.0, top: "-=60"},'fast');
				$(damagenum).animate({top: -1000},'fast');
					//
				if(enemyarray[index].health <= 0)
				{
					goldreserve = goldreserve + enemyarray[index].rewardgold;
					gem = gem + enemyarray[index].rewardgem;
					enemyarray[index].killed = true;
					$(enemyarray[index]).animate({opacity: 0.0},'fast');
					$(enemyarray[index]).hide('fast');
					money();
				}
			}
		});
	});
	// Units Attack
	function unitsaction(units, enemy, support)
	{
		var currenthealth = health;
		for(var u = 0; u < units.length; u++)
		{
			for(var e = 0; e < enemy.length; e++)
			{
				if(!units[u].killed && !units[u].disabled && !enemy[e].killed && units[u].column === enemy[e].column && !enemy[e].stealth && !units[u].empty)
				{
					var currentenemyhealth = enemy[e].health;
					enemy[e].health = enemy[e].health - units[u].attack;
					$(enemy[e]).html(enemy[e].health);
					$(units[u]).animate({top: "-=10"},'fast');
					$(units[u]).animate({top: "+=10"},'fast');
					// Damage Animation
					var damagenum = document.createElement('div');
					damagenum.className = "damage";
					document.body.appendChild(damagenum);
					$(damagenum).fadeIn('0',0.0);
					$(damagenum).animate({opacity: 0.0},'fast');
					$(damagenum).html(0 - units[u].attack);
					$(damagenum).animate({left: $(enemy[e]).position().left + 5, top: $(enemy[e]).position().top - 50}, 0.0);
					$(damagenum).animate({opacity: 1.0},0.0);
					$(damagenum).animate({opacity: 0.0, top: "-=60"},'fast');
					$(damagenum).animate({top: -1000},'fast');
					//
					if(currentenemyhealth > enemy[e].health)
					{
						drawicons(false, true, enemy[e], true);
					}
					if(enemy[e].health <= 0)
					{
						enemy[e].killed = true;
						goldreserve = goldreserve + enemy[e].rewardgold;
						gem = gem + enemy[e].rewardgem;
						$(enemy[e]).animate({opacity: 0.0},'fast');
						$(enemy[e]).hide('fast');
					}
				}
			}
		}
		for (var s = 0; s < support.length; s++)
		{
			//Medic
			if(support[s].id === "medic")
			{
				if(health < 10)
				{
					health++;
				}
				// Heal Animation
				var healnum = document.createElement('div');
				healnum.className = "heal";
				document.body.appendChild(healnum);
				$(healnum).fadeIn('0',0.0);
				$(healnum).animate({opacity: 0.0},'fast');
				$(healnum).html(1);
				$(healnum).animate({left: $(support[s]).position().left + 25, top: $(support[s]).position().top - 80}, 0.0);
				$(healnum).animate({opacity: 1.0},0.0);
				$(healnum).animate({opacity: 0.0, top: "-=60"},'fast');
				$(healnum).animate({top: -1000},'fast');
				//
			}
			//Mage
			if(support[s].id === "mage")
			{
				//Mage Animation
				var mageanimate = false;
				//
				for(var e = 0; e < enemy.length; e++)
				{
					if(!enemy[e].killed && enemy[e].column > 0 && enemy[e].column < 7)
					{
						if(!mageanimate)
						{
							$(support[s]).animate({top: "-=10"}, 'fast');
							$(support[s]).animate({top: "+=10"}, 'fast');
							mageanimate = true;
						}
						enemy[e].health--;
					// Damage Animation
						var damagenum = document.createElement('div');
						damagenum.className = "damage";
						document.body.appendChild(damagenum);
						$(damagenum).fadeIn('0',0.0);
						$(damagenum).animate({opacity: 0.0},'fast');
						$(damagenum).html('-1');
						$(damagenum).animate({left: $(enemy[e]).position().left + 5, top: $(enemy[e]).position().top - 50}, 0.0);
						$(damagenum).animate({opacity: 1.0},0.0);
						$(damagenum).animate({opacity: 0.0, top: "-=60"},'fast');
						$(damagenum).animate({top: -1000},'fast');
					//
						if(enemy[e].health <= 0)
						{
							enemy[e].killed = true;
							goldreserve = goldreserve + enemy[e].rewardgold;
							gem = gem + enemy[e].rewardgem;
							$(enemy[e]).animate({opacity: 0.0},'fast');
							$(enemy[e]).hide('fast');
							money();
						}
					}
				}
			}
		}
		//Healing Animation at base
		if (health > currenthealth)
		{
			var healnum = document.createElement('div');
			healnum.className = "heal";
			document.body.appendChild(healnum);
			$(healnum).fadeIn('0',0.0);
			$(healnum).animate({opacity: 0.0},'fast');
			$(healnum).html('+' + (health - currenthealth));
			$(healnum).animate({left: $('#basecolumn').position().left + 5, top: $('#basecolumn').position().top - 80}, 0.0);
			$(healnum).animate({opacity: 1.0},0.0);
			$(healnum).animate({opacity: 0.0, top: "-=60"},'fast');
			$(healnum).animate({top: -1000},'fast');
			$('#heart').html(health);
		}
	}
	
	// Enemies Attack
	function enemyattack(units, enemy, support)
	{
		currenthealth = health;
		for(var e = 0; e < enemy.length; e++)
		{
			for(var u = 0; u < units.length; u++)
			{
				//Enemies Attack Units
				if(!units[u].killed && !enemy[e].killed && units[u].column === enemy[e].column && !units[u].empty)
				{
					var currentunithealth = units[u].health;
					units[u].health = units[u].health - enemy[e].attack;
					$(this).html(units[u].id + "Stat:" + units[u].attack + "/" + units[u].health);
					$(enemy[e]).animate({top: "+=10"},'fast');
					$(enemy[e]).animate({top: "-=10"},'fast');
					// Damage Animation
					var damagenum = document.createElement('div');
					damagenum.className = "damage";
					document.body.appendChild(damagenum);
					$(damagenum).fadeIn('0',0.0);
					$(damagenum).animate({opacity: 0.0},'fast');
					$(damagenum).html(0 - enemy[e].attack);
					$(damagenum).animate({left: $(units[u]).position().left + 10, top: $(units[u]).position().top + 30}, 0.0);
					$(damagenum).animate({opacity: 1.0},'fast');
					$(damagenum).animate({top: "+=100"},'fast');
					$(damagenum).animate({opacity: 0.0},'fast');
					$(damagenum).animate({top: -1000},'fast');
					//
					if(units[u].health < currentunithealth)
					{
						drawicons(false, false, units[u], true);
					}
					//
					if(units[u].health <= 0)
					{
						$(units[u]).attr("id","empty");
						units[u].killed = true;
						units[u].id = "empty";
						$(damagenum).animate({opacity: 1.0},'fast');
						$(units[u]).empty();
					}
				}
			}
			if(!enemy[e].killed && enemy[e].column > 0)
			{
				//Enemies Special Abilities
					//Bandit Archer and Cursed Knight
				if(enemy[e].id === "banditarcher" || enemy[e].id === "cursedknight")
				{
					health--;
					$(enemy[e]).animate({left: "+=20"}, 'fast');
					$(enemy[e]).animate({left: "-=20"}, 'fast');
					// Direct Damage Animation
					var directdamagenum = document.createElement('div');
					directdamagenum.className = "damage";
					document.body.appendChild(directdamagenum);
					$(directdamagenum).fadeIn('0',0.0);
					$(directdamagenum).animate({opacity: 0.0},'fast');
					$(directdamagenum).html(1);
					$(directdamagenum).animate({left: $(enemy[e]).position().left + 25, top: $(enemy[e]).position().top - 80}, 0.0);
					$(directdamagenum).animate({opacity: 1.0},0.0);
					$(directdamagenum).animate({opacity: 0.0, top: "-=60"},'fast');
					$(directdamagenum).animate({top: -1000},'fast');
					//
				}
			}
		}
		if (health < currenthealth)
		{
			var directdamagenum = document.createElement('div');
			directdamagenum.className = "damage";
			document.body.appendChild(directdamagenum);
			$(directdamagenum).fadeIn('0',0.0);
			$(directdamagenum).animate({opacity: 0.0},'fast');
			$(directdamagenum).html(health - currenthealth);
			$(directdamagenum).animate({left: $('#basecolumn').position().left + 5, top: $('#basecolumn').position().top - 80}, 0.0);
			$(directdamagenum).animate({opacity: 1.0},0.0);
			$(directdamagenum).animate({opacity: 0.0, top: "-=60"},'fast');
			$(directdamagenum).animate({top: -1000},'fast');
			$('#heart').html(health);
		}
		$('#heart').html(health);
		if(health <= 0)
		{
			alert("You are dead!");
		}
	}
	//Starting Setup
	for (var a = 0; a < 5; a++)
	{
		drawcard(deckarray, handarray, discardarray);
	}
	//Phases
	var clicked = false;
	$('.phasesbutton').html("&nbsp" + action);
	$('.phasesbutton').on('click', function(){
		if(!clicked)
		{
			clicked = true;
			if (!buyhold.used && !actioninprocess.used)
			{

					

				//Action Done
				if(actionphase)
				{
					//Animate Flag Action To Buy
					$('.phasesbutton').animate({opacity: 0.0, left: "-=450"},'slow');
					setTimeout(function(){$('.phasesbutton').attr("id","buydone")},400);
					$('.phasesbutton').animate({opacity: 1.0, left: "+=450"},'slow');
					//Play array into discard array
					//then treasure cards played
					//then buy phase
					$('.phasesbutton').html("");
					cardsplayed = 0;
					buyphase = true;
					actionphase = false;
					action = 1;
					for (var q = 0; q < 10000; q++)
					{
						if(handarray[q].played)
						{
							discardarray.unshift(handarray[q].id);
							$(handarray[q]).animate({opacity: 0.0},'fast');
							$(handarray[q]).animate({left: -1000},'fast');
							$(handarray[q]).hide('fast');
						}
					}
					for (q = 0; q < 10000; q++)
					{
						handarray[q].played = false;
					}
					//Play Treasure Cards
					for (q = 0; q < 10000; q++)
					{
						if(handarray[q].inhand && (handarray[q].type === "treasure" || handarray[q].type === "both"))
						{
							// Peasant Labor
							if(handarray[q].id === "peasantlabor")
							{
								gold++;
							}
							// Mercenary Contract
							if(handarray[q].id === "mercenarycontract")
							{
								gold++;
							}
							// Noble Favors
							if(handarray[q].id === "noblefavors")
							{
								gold = gold + 2;
							}
							// Divine Favors
							if(handarray[q].id === "divinefavor")
							{
								gold = gold + 3;
							}
							$(handarray[q]).animate({left: $(".info").position().left + 5 + cardsplayed * 50, bottom: -125}, 'fast');
							handarray[q].inhand = false;
							handarray[q].played = true;
							discardarray.unshift(handarray[q].id);
							cardsplayed++;
						}
					}
					if(gold)
					{
						moneysound.play()
					}

					for (q = 0; q < 10000; q++)
					{
						if (handarray[q].played)
						{
							$(handarray[q]).animate({opacity: 0.0},'fast');
							$(handarray[q]).animate({left: -1000},'fast');
							handarray[q].played = false;
						}
					}
					$('.playpanel').animate({opacity: 0.0},'fast');
					$('.playpanel').hide('fast');
					// Discard Cards
					for (q = 0; q < 10000; q++)
					{
						if (handarray[q].inhand)
						{
							discardarray.unshift(handarray[q].id);
							handarray[q].inhand = false;
							$(handarray[q]).animate({left: 1080, bottom: 10}, 'slow');
							$(handarray[q]).animate({opacity: 0.0},'fast');
							$(handarray[q]).hide('fast');
						}
					}
					$('.deckcount').html('Deck:' + deckarray.length + 'Dis:' + discardarray.length);
					money();
					$(".discard").attr("id", discardarray[0]);
					$(".discard").animate({bottom: "-=10"},'fast');
					$(".discard").animate({bottom: "+=10"},'fast');
					cardsplayed = 0;
					// Opens Buy Panel
					if (!buypanelopen)
					{
						$('.buypanel').animate({right: "+=850"}, 'fast');
						buypanelopen = true;
					}
				}
				else if (buyphase)
				{
					//Animate Flag Buy to Fight
					$('.phasesbutton').animate({opacity: 0.0, left: "-=450"},'slow');

					// Closes Buy Panel
					if (buypanelopen)
					{
						$('.buypanel').animate({right: "-=850"}, 'fast');
						buypanelopen = false;
					}
					buyphase = false;
					actionphase = true;
					gold = 0;
					cardsinhand = 0;
					money();
					for (a = 0; a < 5; a++)
					{
						drawcard(deckarray, handarray, discardarray);
					}
					//Animations
					$(".deck").animate({bottom: "+=10"},'fast');
					$(".deck").animate({bottom: "-=10"},'fast');
					//function where all the things happen
					//Units attack
					//Enemies do things
					//Enemies move and damage player
					//New turn,
					//New cards
					unitsaction(unitcolumnarray, enemyarray, supportarray);
					setTimeout(function(){enemyattack(unitcolumnarray, enemyarray, enemyarray)},500);
					setTimeout(function(){moveEnemies(enemyarray)},1000);
					
					// Bring Flag back 
					setTimeout(function(){$('.phasesbutton').attr("id","actiondone")},400);
					setTimeout(function(){$('.phasesbutton').html("&nbsp" + action)},400);
					$('.phasesbutton').animate({opacity: 1.0, left: "+=450"},'slow');
				}
			}
			setTimeout(function(){clicked = false},500);
		}	
	});
	money();
	// Current Mouse position
	var currentMousePos = { x: -1, y: -1 };
    $(document).mousemove(function(event) {
		currentMousePos.x = event.pageX;
		currentMousePos.y = event.pageY;
    });
	//
	//	Sounds
	var moneysound = document.createElement('audio');
    moneysound.setAttribute('src', 'sounds/money.wav');
	moneysound.addEventListener("load", function() {
		moneysound.play();}, true);
	//
	
	// Tutor
	//$('#tutorbox').html("Hello!  Welcome to my little card game!");
	//$('#tutor').css({left: "40%", top: "40%"});
	
});