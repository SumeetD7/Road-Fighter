	let b= new Bump(PIXI);
let appContainer = new PIXI.Application({width: 360, height: 640});
document.body.appendChild(appContainer.view);
appContainer.renderer.backgroundColor = 0x000000
PIXI.loader.add('bg', 'bg_tile_regular.png')
		.add('car', 'test.svg')
		.add('enemy', 'testEnemy.svg')
		.add('BG_roadBoundary','BG_roadBoundary.svg')
		.add('enemyY','testEnemyY.svg')
		.add('enemyB','testEnemyB.svg')
	  .load(setup);

//var fs = require('fs')	;  
//var testIndex = fs.readFileSync('TimeStamp.json');
//var testIndexWords = JSON.parse(testIndex);
function Reset()
{

	//let inputDetectionBox;
	//let initialMousePos;
	// appContainer.ticker.add(null);
	 backgroundSprite = [];
	 boundarySprite = [];
	 
	 	enemiesr1 = [];
	//let enemiesr2 = [];
		enemiesb = [];
		enemiesy1 = [];
		mouseIsDown = false;

		accelaration = 0;
//	let oiler = 2.7182;
		velocity = 0;
		enemyVelocity = 0;
		enemyLagCorrectionAcc = false;
		enemyLagCorrectionDec = false;

	lastVelocity = 0;
	lastEnemyVelocity = 0;
	lastSplitVelocity = 0;
	carHorizontalSpeed = 3;

	canScroll = false;
	numberOfBackgroundTilesToLoad = 20;
	numberOfEnemyBatchesToLoad = 20;
	endBoundaryNumber = 8;

	/*let backgroundContainer;
	let backgroundColliderContainer;
	let playerContainer;
	let enemy1Container;
	let enemy2Container;
	let enemy3Container;
	let textContainer;*/
	gameLoopTimer = 0;
	textSeconds = "";
	textMilliseconds ="";
	timeSecond = 0;
	stopText = "";
	resetTimer = 0;
	totalTimer = 0;
	maxResetTime = 120;
	maxBlinkTime = 240;
	redDestroyTime = 0;
	yellowDestroyTime = 0;
	blueDestroyTime = 0;
	myTicker = PIXI.ticker.shared;
	gameStartCondition = false;
	mouseOutOfGame = false;
	endBoundary = false;
	boundaryLimit = 670;
	hitType1 = false;
	hitType11 = false;
	hitType2 = false;
	yellowLeftMove = false;
	//let hitEnemy = false;
	accelarationTime = 0;
	decelarationTime = 0;
	accelarationTimeEnemy =0;
	decelarationTimeEnemy =0;
	GameLoopIterator++;
	counter++;
	//gameTimeArray = [];
	FinalGameLoopTimer = 0;
}

	let inputDetectionBox;
	let initialMousePos;

	let backgroundSprite;
	let boundarySprite;
	let car;
	let enemiesr1;
	//let enemiesr2 = [];
	let enemiesb;
	let enemiesy1;
	let mouseIsDown ;

	let accelaration;
//	let oiler = 2.7182;
	let velocity ;
	let enemyVelocity ;
	let enemyLagCorrectionAcc ;
	let enemyLagCorrectionDec ;

	let lastVelocity ;
	let lastEnemyVelocity ;
	let lastSplitVelocity ; 
	let carHorizontalSpeed ;

	let canScroll;
	let numberOfBackgroundTilesToLoad ;
	let numberOfEnemyBatchesToLoad ;
	let endBoundaryNumber ;

	let backgroundContainer;
	let backgroundColliderContainer;
	let playerContainer;
	let enemy1Container;
	let enemy2Container;
	let enemy3Container;
	let textContainer;
	let gameLoopTimer;
	let textSeconds;
	let textMilliseconds;
	let timeSecond;
	let stopText;
	let resetTimer ;
	let totalTimer ;
	let maxResetTime ;
	let maxBlinkTime ;
	let redDestroyTime ;
	let yellowDestroyTime;
	let blueDestroyTime;
	let myTicker;
	let gameStartCondition;
	let mouseOutOfGame;
	let endBoundary;
	let boundaryLimit;
	let hitType1;
	let hitType11;
	let hitType2;
	let yellowLeftMove;
	//let hitEnemy = false;
	let accelarationTime ;
	let decelarationTime ;
	let accelarationTimeEnemy;
	let decelarationTimeEnemy;
	let enterKey;
	let GameLoopIterator = 0;
	let counter = 0;
	let storage;
	let x;
	let gameTimeArray =[];
	let FinalGameLoopTimer;
	let minTime = 0;

function setup()
{
	Reset();
	CarSetup();
	TextSetup();
    gameLoopTimer = 0;
    timeSecond = 0;
	
	backgroundContainer = new PIXI.Container();
	backgroundColliderContainer = new PIXI.Container();
	playerContainer = new PIXI.Container();
	enemy1Container = new PIXI.Container();
	enemy2Container = new PIXI.Container();
	enemy3Container = new PIXI.Container();
	textContainer = new PIXI.Container();
	enterKey = keyboard("Enter");

	SetupBackgroundLevel();
	SetupInputDetection();
	KeyBoardInputHandler();
	invokeGameLoop();
	
	//appContainer.ticker.add(delta => GameLoop(delta));

	appContainer.stage.addChild(backgroundContainer);
	appContainer.stage.addChild(backgroundColliderContainer);
    appContainer.stage.addChild(enemy3Container);
	appContainer.stage.addChild(enemy2Container);
	appContainer.stage.addChild(enemy1Container);
    appContainer.stage.addChild(inputDetectionBox);
    playerContainer.addChild(car);
	appContainer.stage.addChild(playerContainer);
	textContainer.addChild(textSeconds);
	textContainer.addChild(textMilliseconds);
	textContainer.addChild(stopText);
	appContainer.stage.addChild(textContainer);

	canScroll = true;

}
function invokeGameLoop()
{	

	if(GameLoopIterator == 1)
	{appContainer.ticker.add(delta => GameLoop(delta));}
}
function GameLoop(delta)
{	

	if(mouseOutOfGame)
	{
		onDragEnd();
		canScroll = false;
		return;
	}
	endBoundary = b.hit(car,boundarySprite[endBoundaryNumber]);
	

	MoveRed1EnemyCars();
	//MoveRed2EnemyCars();
	MoveYellowEnemyCars();
	//MoveBlueEnemyCars();


	
	if(!endBoundary && gameStartCondition)
	{
		 gameLoopTimer++;
		// console.log(car.position.x);

		 SetupTimer();
		
	  	 MoveRoadVertically();
		 SetupCollisionDetection();
		 SetupBlinkTime();
		 SetupAcceleration();
		 SetupDecceleration();
		 SetupEnemyAcceleration();
		 SetupEnemyDeceleartion();
		 CheckBoundaryCollision();
		 CheckEndLine();
	}
}

function CarSetup()
{
	car = new PIXI.Sprite(PIXI.loader.resources.car.texture);
	car.anchor = {x:0.5, y:1};
	car.position = {x:180, y:600}
	car.scale.x = 0.25;
	car.scale.y = 0.25;
}

function TextSetup()
{
	textSeconds = new PIXI.Text('                Click to start!                  ',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'Left'});
	textMilliseconds = new PIXI.Text('                Click to start!                  ',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
	stopText = new PIXI.Text('                                 ',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'Left'});
}

function SetupBackgroundLevel()

{
	// var request = new XMLHttpRequest();
 // request.open("GET", "BG_tile.svg");
 // request.setRequestHeader("Content-Type", "image/svg+xml");
 // request.addEventListener("load", function(event) {
	//  var response = event.target.responseText;
	//  console.log(response);
	//  var doc = new DOMParser();
	//  var xml = doc.parseFromString(response, "image/svg+xml");
	//  var rect = xml.getElementsByClassName("cls-1");
	//   rect.fill = "#000000";
	// 	console.log(response);
	//  var result = response.slice(0, response.indexOf("<svg"));
	//  result += xml.documentElement.outerHTML;
 // });
 // request.send();


for(var j=0;j<numberOfEnemyBatchesToLoad;j++)
{
	let tempEnemies11 = new PIXI.Sprite(PIXI.loader.resources.enemy.texture);

	tempEnemies11.anchor = {x:0.5, y:1};
 	tempEnemies11.position = {x:Math.random()*180+90, y:Math.random()*200 - 660*j}
 	tempEnemies11.scale = {x:0.25,y:0.25};
	enemy1Container.addChild(tempEnemies11);
	enemiesr1.push(tempEnemies11);
}

for(var l=0;l<numberOfEnemyBatchesToLoad;l++)
{
	let tempEnemies21 = new PIXI.Sprite(PIXI.loader.resources.enemyY.texture);
	tempEnemies21.anchor = {x:0.5, y:1};
 	tempEnemies21.position = {x:90 + Math.random()*180, y:Math.random()*300 - 560*l}
 	tempEnemies21.scale = {x:0.25,y:0.25};
	enemy2Container.addChild(tempEnemies21);
	enemiesy1.push(tempEnemies21);
}

for(var m=0; m<numberOfEnemyBatchesToLoad; m++)
{
	let tempEnemies31 = new PIXI.Sprite(PIXI.loader.resources.enemyB.texture);
	tempEnemies31.anchor = {x:0.5, y:1};
 	tempEnemies31.position = {x:Math.random()*180+90, y:Math.random()*300 - 720*j}
 	tempEnemies31.scale = {x:0.5,y:3};
	enemy3Container.addChild(tempEnemies31);
	enemiesb.push(tempEnemies31);
}

for(var i=0;i<numberOfBackgroundTilesToLoad;i++)
{
 	let tempBackgroundSprite = new PIXI.Sprite(PIXI.loader.resources.bg.texture);

 	tempBackgroundSprite.anchor = {x:0.5, y:1};
	let yPos = 640 - (i*1920);
 	tempBackgroundSprite.position = {x:180, y:yPos}
	backgroundContainer.addChild(tempBackgroundSprite);
	backgroundSprite.push(tempBackgroundSprite);
	

	//rendering boundary sprite with the same transform values
	let tempBoundarySprite = new PIXI.Sprite(PIXI.loader.resources.BG_roadBoundary.texture);
	tempBoundarySprite.anchor = {x:0.5, y:1};
 	tempBoundarySprite.position = {x:180, y:yPos}
	backgroundColliderContainer.addChild(tempBoundarySprite);
	boundarySprite.push(tempBoundarySprite);
}
}
function KeyBoardInputHandler()
{
	enterKey.release = () => { setup();};
	//enterKey.release  = () => {  appContainer.ticker.start();
	//};

}
function SetupInputDetection()
{
	inputDetectionBox = new PIXI.Graphics();
	inputDetectionBox.hitArea = new PIXI.Rectangle(0, 0, 360, 640);
	inputDetectionBox.interactive = true;
	inputDetectionBox
        .on('pointerdown', onDragStart)
		.on('pointermove', onDrag)
		.on('pointerout', onPointerOutOfFocus)
		.on('pointerover', onPointerInFocus)		
        .on('pointerup', onDragEnd);

}
function SetupTimer()
{
	 var time_millisecond = gameLoopTimer % 60;
		 if(time_millisecond==0)
		 	{
		 		timeSecond++;
	         	textSeconds.text = timeSecond;
	 		}
	     textMilliseconds.text ='\n'+ time_millisecond;
}
function CheckBoundaryCollision()
{
	if(car.position.x>270 )
		 {
		 	hitType1 = true;
		 	hitType11 = true;
		 }
		 if(car.position.x<90 )
		 {
		 	hitType2 = true;
		 	hitType11 = true;
		 }
}
function CheckEndLine()
{
	if(Math.abs(boundarySprite[endBoundaryNumber].position.y- car.position.y)<50)
        {
        	stopText.text = "                      Stop                \n            Press Enter to Reset";
        	//console.log(gameLoopTimer);
        	if(Math.abs(boundarySprite[endBoundaryNumber].position.y- car.position.y)<30)
        	{
        		FinalGameLoopTimer = gameLoopTimer;
        		CheckMinTime();
        		//console.log(gameLoopTimer);
        		//window.sessionStorage.setItem(counter.toString(),gameLoopTimer.toString());
        		
        		//FinalGameLoopTimer=JSON.parse(window.sessionStorage.getItem(counter.toString()));
        		//storage.setItem(counter,gameLoopTimer);
        		//x = storage(gameLoopTimer);
        		//console.log(window.sessionStorage(gameLoopTimer));
        	}
        }
    /*if(Math.abs(boundarySprite[endBoundaryNumber].position.y- car.position.y)<5)
        {
        	console.log(gameLoopTimer);
        }*/
}
function CheckMinTime()
{
	gameTimeArray.push(FinalGameLoopTimer);
	minTime = gameTimeArray[0];
	for(var r =0; r< gameTimeArray.length; r++)
	{
		if(gameTimeArray[r] < minTime)
		{
			minTime = gameTimeArray[r];
		}
	}
	console.log(minTime);
}
function SetupBlinkTime()
{
	if(hitType11)
		{
			totalTimer += myTicker.deltaTime;
			if(totalTimer >= 0 && totalTimer < maxBlinkTime )
            	{

            	if((Math.floor(totalTimer/10))%2 == 0)
            		car.alpha = 1;
            	else
            		car.alpha = 0;
            	}          		           	
            	if (totalTimer >= maxBlinkTime)
            	{
	            	totalTimer = 0;
	            	
            		inputDetectionBox.interactive = true;
            		canScroll = true;
            		car.alpha = 1;
            		hitType11 = false;
            		car.isSprite = true;
	            }
	            

        	}

}
function SetupCollisionDetection()
{
		if( hitType1)
			{
				
            	resetTimer += myTicker.deltaTime;
            	if(resetTimer >= 0 && resetTimer < maxResetTime)
            	{
            	//car.position.x -= 10;
            	car.rotation = -0.5;
            	onDragEnd();
            	}
            	if (resetTimer >= maxResetTime)
            	{
	            	resetTimer = 0;
	            	
            		inputDetectionBox.interactive = true;
            		canScroll = true;
            		car.rotation = 0;
            		car.setTransform(car.position.x - 10 ,car.position.y,0.25,0.25,0,0,0,0,0);
            		hitType1 = false;
            	
	            }
	            

        	}
        else if(hitType2 )
        	{
				
            	resetTimer += myTicker.deltaTime;
            	if(resetTimer >= 0 && resetTimer < maxResetTime)
            	{
            	//car.position.x -= 10;
            	car.rotation = 0.5;
            	onDragEnd();
            	if((Math.floor(resetTimer/10))%2 == 0)
            		car.alpha = 1;
            	else
            		car.alpha = 0;

            	}
            	if (resetTimer >= maxResetTime)
            	{
	            	resetTimer = 0;
	            	car.rotation = 0;
	            	car.setTransform(car.position.x + 10,car.position.y,0.25,0.25,0,0,0,0,0);
            		inputDetectionBox.interactive = true;
            		canScroll = true;
            		hitType2 = false;
	            }
	        }
		   
	    
}
function SetupEnemyAcceleration()
{
	if(enemyLagCorrectionAcc)
	{
		
		if(enemyVelocity < 6)
		
		{	
			enemyVelocity += 0.2 * myTicker.deltaTime;
			
		}
		else
		{
			enemyVelocity = 6;
			

		}
		
	}
}
function SetupEnemyDeceleartion()
{
	if(!enemyLagCorrectionAcc)
	{
		
		
		if(enemyVelocity > 0 )
		
		{	
		
			enemyVelocity -= 0.4 * myTicker.deltaTime;
		
			//lastVelocity = velocity;
		}
		else
		{
			enemyVelocity = 0;
			//enemyLagCorrectionDec = false;
			//decelarationTimeEnemy = 0;
		}
		
	}
}
function SetupAcceleration()
{
	if(mouseIsDown)
	{
		if(velocity < 13 )
		{	
			velocity += 0.2 * myTicker.deltaTime;
		}
		else
		{
			velocity = 13;
		}
	}
}
function SetupDecceleration()
{
	if(!mouseIsDown)	
	{
		if(velocity > 0 )
		{   
			velocity -= 0.4*myTicker.deltaTime;
		}
		else
		{   
			velocity = 0;
		}	
	}
}
function AlternateDeceleration()
{
		if(velocity > 6 )
		{   
			velocity -= 0.4*myTicker.deltaTime;
			//enemyVelocity =  0.01*myTicker.deltaTime;
		}
		else
		{   
			velocity = lastSplitVelocity;
			//enemyVelocity = 6;
		}

}

function onPointerOutOfFocus(event)
{
	mouseOutOfGame = true;
}
function onPointerInFocus(event)
{
	mouseOutOfGame = false;
}

function onDragStart(event)
{
 
  	gameStartCondition = true;
  	canScroll = true;
  	mouseIsDown = true;
	//accelaration = accelaration * Math.pow(oiler, (-(accelaration+10)));
	
	accelarationTime = 0;

	enemyLagCorrectionAcc = true;
	//enemyLagCorrectionDec = false;
	initialMousePos = event.data.originalEvent.pageX;
	decelarationTime = 0;
	decelarationTimeEnemy = 0;
	accelarationTimeEnemy = 0;
	//count++;
}

function onDragEnd()
{

	mouseIsDown = false;
	//enemyVelocity = 0;
	enemyLagCorrectionAcc = false;
	
	//enemyLagCorrectionDec = true;
	initialMousePos = 0;

}

function onDrag(dragData)
{
	MoveCarHorizontally(dragData);
}

function MoveCarHorizontally(dragData)
{
	if(!mouseIsDown)
	{
		return;
	}

	let mousePos = dragData.data.originalEvent.pageX;
	if(Math.abs(mousePos - initialMousePos) < 0.5)
	{
		return;
	}

	//Left
	if(mousePos > initialMousePos)
	{
		car.x += carHorizontalSpeed;
	}
	else
	{
		car.x -= carHorizontalSpeed;
	}
	

	initialMousePos = mousePos;
}

function MoveRoadVertically()
{
	if(canScroll)
	{   

		for(var i=0;i<numberOfBackgroundTilesToLoad;i++)
		{
			backgroundSprite[i].y += velocity;
			boundarySprite[i].y += velocity;
		}
	}
}

function MoveRed1EnemyCars()
{
		
		for(var j=0;j<enemiesr1.length;j++)
		{	
			if(!endBoundary )
			{//console.log(enemiesr1[0].position.y);
				if(enemiesr1[j].position.y < boundaryLimit)
				{
				enemiesr1[j].y += enemyVelocity-2;
				
				/*for(var j1=0; j1<enemiesy1.lenth ; j1++)
				{
					if()
				}*/
				
				if(b.hit(car,enemiesr1[j]))
					{onDragEnd(); 
					hitType1 = true;
				    hitType11 = true;}
                }
                else
                {
                	enemiesr1[j].y = 8000;
                }
            }
            else

          	{
            	enemiesr1[j].y -= 2;
            	if(enemiesr1[j].position.y < -100)
            	{
            	enemiesr1[j].y = 8000;
            	redDestroyTime = myTicker.deltaTime;
            	if(redDestroyTime >= 60)
            	{
            		enemiesr1.length = 0;
            	}	
            	}
            	
            } 
        }          
}
/*function MoveYellowEnemyCars()
{
		for(var j=0;j<enemiesy1.length;j++)
		{
			if(!endBoundary)
			{
				if(enemiesy1[j].position.y < boundaryLimit)
            	{
            	enemiesy1[j].y += enemyVelocity-2;
            	//enemiesy1[j].x = 180+Math.sin(enemiesy1[j].y*0.005)*45;
            	//if(enemiesy1[j].y >= 198)
            	
            	//let tempX = car.position.x ;
            	//let s1 = 0;
            	//let s2 = 0;
            	if(enemiesy1[j].x < car.position.x)
            	{
            		if(enemiesy1[j].y >= 150 && enemiesy1[j].y <350)
		            	{

		            		enemiesy1[j].x +=1;
		            		
		            	} 
		        }
		        if(enemiesy1[j].x > car.position.x)
		        {
		        	if(enemiesy1[j].y >= 150 && enemiesy1[j].y <350)
		            	{

		            		enemiesy1[j].x -=1;
		            		
		            	}
		        }
            	if(b.hit(car,enemiesy1[j]))
            		{onDragEnd();
            		hitType1 = true;
            		hitType11 = true;}
					
            	}
           	    
            	else
            	{
            	 	enemiesy1[j].y = 8000;
            	}
            }
            else
            {
            	enemiesy1[j].y -= 2;
            	//enemiesy1[j].x = 180+Math.sin(enemiesy1[j].y*0.005)*45;
            	if(enemiesy1[j].position.y < -100)
            	{
            	enemiesy1[j].y = 8000;
            	//console.log(enemiesy1[j].y);
            	yellowDestroyTime = myTicker.deltaTime;
            	if(yellowDestroyTime >= 60)
            	{
            		enemiesy1.length = 0;
            	}
            	}
            
            } 
        }          
}*/
function MoveYellowEnemyCars()
{
		for(var j=0;j<enemiesy1.length;j++)
		{
			if(!endBoundary)
			{
				if(enemiesy1[j].position.y < boundaryLimit)
            	{
            	enemiesy1[j].y += enemyVelocity-3.7;
            	/*if(!yellowLeftMove)
            	{
            		//enemiesy1[j].x++;
            		for(var j1=0; j1< enemiesr1.length ; j1++)
            		{
            			if(b.hit(enemiesr1[j1],enemiesy1[j]))
            			{
            				yellowLeftMove = true;
            			}
            			else 
            			{
            				if(enemiesy1[j].x < 270)
            					enemiesy1[j].x+= 0.2;
            				else
            					yellowLeftMove = true;
            			}
            			
            		}
            		
            	}
            	if(yellowLeftMove)
            	{
            		//enemiesy1[j].x--;
            		for(var j2=0; j2< enemiesr1.length ; j2++)
            		{
            			if(b.hit(enemiesr1[j2],enemiesy1[j]))
            			{
            				yellowLeftMove = false;
            			}
            			else
            			{
            				if(enemiesy1[j].x > 90)
            					enemiesy1[j].x-= 0.1;
            				else
            					yellowLeftMove = false;

            			}
            		}
            	}*/
            	//if(enemiesy1[j].y >= 198)
            	
            	//let tempX = car.position.x ;
            	//let s1 = 0;
            	//let s2 = 0;
            	
            	if(b.hit(car,enemiesy1[j]))
            		{onDragEnd();
            		hitType1 = true;
            		hitType11 = true;}
					
            	}
           	    
            	else
            	{
            	 	enemiesy1[j].y = 8000;
            	}
            }
            else
            {
            	enemiesy1[j].y -= 3.7;
            	//enemiesy1[j].x = 180+Math.sin(enemiesy1[j].y*0.005)*45;
            	if(enemiesy1[j].position.y < -100)
            	{
            	enemiesy1[j].y = 8000;
            	//console.log(enemiesy1[j].y);
            	yellowDestroyTime = myTicker.deltaTime;
            	if(yellowDestroyTime >= 60)
            	{
            		enemiesy1.length = 0;
            	}
            	}
            
            } 
        }          
}
function MoveBlueEnemyCars()
{
		for(var j=0;j<enemiesb.length;j++)
		{
			if(!endBoundary)
			{
				/*if(enemiesb[j].position.y < boundaryLimit)
            	{
            	enemiesb[j].y += enemyVelocity-2;
            	if(enemiesb[j].y >= 200)
            	{
            		if(enemiesb[j].x >= car.position.x && enemiesb[j].x <= 270)
            		{
            			enemiesb[j].x += 1; 
            		}
            		else if(enemiesb[j].x <= car.position.x && enemiesb[j].x >= 90)
            		{
            			enemiesb[j].x -= 1; 
            		}
            		else if(enemiesb[j].x < 90)
            		{
            			enemiesb[j].x = 90;
            		}
            		else if(enemiesb[j].x > 270)
            		{
            			enemiesb[j].x = 270;
            		}
            	}*/
            	enemiesb[j].y += velocity;
            	if(b.hit(car,enemiesb[j]))
            		{AlternateDeceleration();
            			lastSplitVelocity = velocity;
            		
            			}
					
            	}
            	else
            	{
            	 	enemiesb[j].y = 8000;
            	}
            }
           /* else
            {
            	enemiesb[j].y -= 2;
            	//enemiesb[j].x = 180+Math.sin(enemiesr3[j].y*0.005)*45;
            	if(enemiesb[j].position.y < -100)
            	{
            	enemiesb[j].y = 8000;
            	//console.log(enemiesy1[j].y);
            	blueDestroyTime = myTicker.deltaTime;
            	if(blueDestroyTime >= 60)
            	{
            		enemiesb.length = 0;
            	}
            	}
            
            }*/
        }          

function keyboard(value) {
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);
  
  window.addEventListener(
    "keydown", downListener, false
  );
  window.addEventListener(
    "keyup", upListener, false
  );
  
  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };
  
  return key;
}